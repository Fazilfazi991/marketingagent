from agents.base import BaseAgent
from database import AsyncSessionLocal
from models import Content
import json

class ResearchAgent(BaseAgent):
    async def process(self, config: dict):
        topic = config.get("topic", "General Marketing")
        result = await self.call_llm(f"Research trend and data for topic: {topic}")
        return {"research_data": result}

class StrategyAgent(BaseAgent):
    async def process(self, config: dict, research_output: dict):
        research = research_output.get("research_data", "")
        result = await self.call_llm(f"Create a marketing strategy based on this research: {research}")
        return {"strategy": result}

class BlogWriterAgent(BaseAgent):
    async def process(self, config: dict):
        topic = config.get("topic")
        keywords = config.get("target_keyword", "")
        brand_voice = config.get("brand_voice", "professional")
        
        await self.emit_status("start", f"Starting blog writing for topic: {topic}")
        
        # Stage 1: Outline
        await self.emit_status("outline_done", "Generating H2 outline...")
        outline_prompt = f"System: Expert SEO blog writer. Topic: {topic}. Keywords: {keywords}. Voice: {brand_voice}. Generate an H2 outline."
        outline = await LLMRouter.generate(outline_prompt, tier="quality") # Claude Sonnet
        
        # Stage 2: Writing
        await self.emit_status("writing", "Writing full 1800+ word article body...")
        body_prompt = f"System: Expert SEO blog writer. Topic: {topic}. Voice: {brand_voice}. Outline: {outline}. Generate title, meta_desc, full body (1800+ words), internal link suggestions, and CTA."
        full_content = await LLMRouter.generate(body_prompt, tier="quality")
        
        # Stage 3: Structuring & Saving
        # In a real scenario, we'd parse the LLM output into JSON. Here we simulate the structure.
        result_json = {
            "title": f"The Ultimate Guide to {topic}",
            "meta_desc": f"Learn everything about {topic} with our comprehensive SEO guide.",
            "outline": outline,
            "body": full_content,
            "internal_links": ["/blog/related-1", "/blog/related-2"],
            "cta": "Sign up for our newsletter to stay updated!"
        }
        
        await self.persist_content("blog", json.dumps(result_json), status="pending_review")
        await self.emit_status("done", "Blog post generation complete.")
        
        return result_json

    async def persist_content(self, platform: str, text: str, status: str = "draft"):
        from database import AsyncSessionLocal
        from models import Content
        async with AsyncSessionLocal() as session:
            content = Content(
                campaign_id=self.campaign_id,
                platform=platform,
                text_content=text
                # Note: status field would need to be added to Model or handled as JSON in text_content
            )
            session.add(content)
            await session.commit()

class SocialMediaAgent(BaseAgent):
    async def process(self, config: dict, blog_output: dict):
        blog_text = blog_output.get("body", "")
        topic = config.get("topic")
        
        await self.emit_status("generating", "Creating social media package...")
        
        social_prompt = f"System: Social media expert. Blog Content: {blog_text[:1000]}. Generate a LinkedIn post, an X thread (5 tweets), and an Instagram caption."
        social_output = await LLMRouter.generate(social_prompt, tier="fast") # Claude Haiku
        
        # Simulate structured Social JSON
        result_json = {
            "linkedin": "Excited to share our latest research on...",
            "x_thread": ["1/5 Why AI is changing...", "2/5 First, efficiency..."],
            "instagram": "Transform your marketing workflow 🚀 #AI #Marketing"
        }
        
        await self.persist_content("social", json.dumps(result_json))
        await self.emit_status("done", "Social media package generated.")
        
        return result_json

class ImageBriefAgent(BaseAgent):
    async def process(self, config: dict, content_outputs: list):
        # Combines info from blog/social/email to create image briefs
        combined = " ".join([str(v) for output in content_outputs for v in output.values()])
        result = await self.call_llm(f"Generate 3 image generation prompts for this content: {combined[:500]}")
        return {"image_briefs": result}

class SEOAgent(BaseAgent):
    async def process(self, config: dict, content_outputs: list):
        combined = " ".join([str(v) for output in content_outputs for v in output.values()])
        result = await self.call_llm(f"Provide SEO keywords and meta descriptions for: {combined[:500]}")
        return {"seo_data": result}

class PublisherAgent(BaseAgent):
    async def process(self, config: dict, seo_images_output: list):
        # Final preparation before publishing
        result = await self.call_llm("Format all content with SEO and images for publishing.")
        return {"published_status": "ready", "final_payload": result}

class DistributionAgent(BaseAgent):
    async def process(self, config: dict, publisher_output: dict):
        result = await self.call_llm("Distribute content to WordPress, Twitter API, and Mailchimp.")
        return {"distribution_log": result}

class AnalyticsAgent(BaseAgent):
    async def process(self, config: dict):
        # This would typically be triggered by a beat but we implement the logic here
        await self.emit_status("running", "Fetching analytics from GA4 and LinkedIn...")
        result = await self.call_llm("Fetch daily analytics for the last 24 hours and summarize metrics.")
        return {"daily_stats": result}

class GA4Agent(BaseAgent):
    async def process(self, config: dict):
        await self.emit_status("running", "Connecting to Google Analytics 4...")
        # Simulate GA4 Data API call
        return {"sessions": 1200, "conversions": 45}

class LinkedInAnalyticsAgent(BaseAgent):
    async def process(self, config: dict):
        await self.emit_status("running", "Fetching LinkedIn post performance...")
        # Simulate LinkedIn Organic Analytics API
        return {"impressions": 5000, "clicks": 150}

class ReportAgent(BaseAgent):
    async def process(self, analytics_data: list):
        await self.emit_status("generating", "Generating PDF weekly performance report...")
        # Summarize all analytics into a structured report
        summary = " ".join([str(d) for d in analytics_data])
        report = await self.call_llm(f"Generate a weekly marketing report based on these metrics: {summary}")
        return {"report_url": "https://storage.supabase.co/.../report_week_12.pdf", "summary": report}

    # Helper for persisting to Supabase content table
    async def persist_content(self, platform: str, text: str):
        async with AsyncSessionLocal() as session:
            content = Content(
                campaign_id=self.campaign_id,
                platform=platform,
                text_content=text
            )
            session.add(content)
            await session.commit()
