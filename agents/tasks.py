from celery_app import celery_app
import asyncio
from agents.base import BaseAgent
from redis_client import redis_client

@celery_app.task(name="agents.tasks.run_agent")
def run_agent_task(run_id: str, campaign_id: str, tier: str, prompt: str, config: dict = None):
    """
    Celery task that instantiates the Orchestrator and runs the full pipeline.
    """
    from agents.orchestrator import Orchestrator
    
    async def main():
        await redis_client.connect()
        try:
            # For simplicity, we use the Orchestrator for all campaigns now
            orchestrator = Orchestrator(
                client_id="unknown", # This could be passed in
                campaign_id=campaign_id,
                tier=tier,
                config=config or {"topic": prompt}
            )
            await orchestrator.run_pipeline()
        finally:
            await redis_client.disconnect()

    asyncio.run(main())
