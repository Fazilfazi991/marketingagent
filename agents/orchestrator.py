import asyncio
import uuid
import logging
from typing import Dict, Any

from agents.specialized import (
    ResearchAgent, StrategyAgent, BlogWriterAgent, SocialMediaAgent, 
    EmailAgent, SEOAgent, PublisherAgent, 
    DistributionAgent, AnalyticsAgent
)
from agents.image_agent import ImageBriefAgent, DALLEImageAgent
from redis_client import redis_client

logger = logging.getLogger(__name__)

class Orchestrator:
    def __init__(self, client_id: str, campaign_id: str, tier: str, config: Dict[str, Any]):
        self.client_id = client_id
        self.campaign_id = campaign_id
        self.tier = tier
        self.config = config

    async def run_pipeline(self):
        """Executes the specialized agent pipeline."""
        try:
            # 1. Research (Sequential)
            research_agent = ResearchAgent(str(uuid.uuid4()), self.campaign_id, self.tier)
            research_out = await research_agent.process(self.config)
            
            # 2. Strategy (Sequential)
            strategy_agent = StrategyAgent(str(uuid.uuid4()), self.campaign_id, self.tier)
            strategy_out = await strategy_agent.process(self.config, research_out)

            # 3. Content Creation (Parallel)
            blog_agent = BlogWriterAgent(str(uuid.uuid4()), self.campaign_id, self.tier)
            social_agent = SocialMediaAgent(str(uuid.uuid4()), self.campaign_id, self.tier)
            # EmailAgent...

            blog_out = await blog_agent.process(self.config)
            social_out = await social_agent.process(self.config, blog_out)
            
            # 4. Images & SEO (Parallel)
            brief_agent = ImageBriefAgent(str(uuid.uuid4()), self.campaign_id, self.tier)
            seo_agent = SEOAgent(str(uuid.uuid4()), self.campaign_id, self.tier)

            opt_results = await asyncio.gather(
                brief_agent.process(self.config, blog_out),
                seo_agent.process(self.config, [blog_out, social_out]),
                return_exceptions=True
            )
            # Extract image brief and call DALLE
            image_brief = opt_results[0].get("image_prompt")
            dalle = DALLEImageAgent(str(uuid.uuid4()), self.campaign_id, self.tier)
            image_url = await dalle.generate(image_brief, str(uuid.uuid4()))

            # 5. Publisher (Sequential)
            publisher = PublisherAgent(str(uuid.uuid4()), self.campaign_id, self.tier)
            publisher_out = await publisher.process(self.config, {"blog": blog_out, "image": image_url})

            logger.info(f"Pipeline completed for campaign {self.campaign_id}")

        except Exception as e:
            logger.error(f"Orchestrator pipeline failed: {str(e)}")
            # Since errors are handled per-agent inside process/execute usually, 
            # this catch is for catastrophic orchestrator failures.
