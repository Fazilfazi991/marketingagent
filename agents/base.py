import json
from datetime import datetime, timezone
from database import AsyncSessionLocal
from models import AgentRun, Client
from redis_client import redis_client
from agents.router import LLMRouter
from sqlalchemy.future import select

PLAN_AGENTS = {
    "free": ["ResearchAgent", "StrategyAgent"],
    "starter": ["ResearchAgent", "StrategyAgent", "BlogWriterAgent", "SocialMediaAgent"],
    "growth": ["ResearchAgent", "StrategyAgent", "BlogWriterAgent", "SocialMediaAgent", "EmailAgent", "ImageBriefAgent", "DALLEImageAgent"],
    "agency_pro": ["ResearchAgent", "StrategyAgent", "BlogWriterAgent", "SocialMediaAgent", "EmailAgent", "ImageBriefAgent", "DALLEImageAgent", "SEOAgent", "AnalyticsAgent"]
}

class BaseAgent:
    def __init__(self, run_id: str, campaign_id: str, tier: str, client_id: str = None):
        self.run_id = run_id
        self.campaign_id = campaign_id
        self.tier = tier
        self.client_id = client_id

    async def plan_check(self):
        if not self.client_id:
            return # Skip if no client context
        async with AsyncSessionLocal() as session:
            client = await session.get(Client, self.client_id)
            if not client: return
            
            allowed = PLAN_AGENTS.get(client.plan, ["free"])
            if self.__class__.__name__ not in allowed:
                await self.emit_status("failed", f"Agent {self.__class__.__name__} is not available on your {client.plan} plan.")
                raise Exception(f"Plan mismatch: Upgrade required for {self.__class__.__name__}")

    async def emit_status(self, status: str, message: str):
        """Publish status updates to Redis pub/sub matching the client's campaign channel."""
        channel = f"agent_status:{self.campaign_id}"
        payload = {
            "run_id": self.run_id,
            "campaign_id": self.campaign_id,
            "status": status,
            "message": message,
            "timestamp": datetime.now(timezone.utc).isoformat()
        }
        await redis_client.publish(channel, json.dumps(payload))

    async def call_llm(self, prompt: str) -> str:
        """Call the LLM Router based on tier."""
        await self.emit_status("running", f"Calling LLM provider for tier: {self.tier}")
        result = await LLMRouter.generate(prompt, self.tier)
        return result

    async def save_result(self, status: str, result_data: dict = None, error_message: str = None):
        """Save the outcome to the AgentRun record in Postgres."""
        async with AsyncSessionLocal() as session:
            run = await session.get(AgentRun, self.run_id)
            if run:
                run.status = status
                if result_data:
                    run.result = result_data
                if error_message:
                    run.error_message = error_message
                if status in ["success", "failed"]:
                    run.completed_at = datetime.now(timezone.utc)
                await session.commit()
                
        await self.emit_status(status, "Run completed successfully" if status == "success" else f"Run failed: {error_message}")

    async def execute(self, prompt: str):
        """Main execution flow for the agent."""
        try:
            await self.emit_status("started", "Agent execution started")
            llm_output = await self.call_llm(prompt)
            await self.save_result("success", result_data={"output": llm_output})
        except Exception as e:
            await self.save_result("failed", error_message=str(e))
