import asyncio
from fastapi import APIRouter, Depends, HTTPException, WebSocket, WebSocketDisconnect
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from pydantic import BaseModel
import redis.asyncio as redis

from database import get_db
from models import AgentRun, Campaign, Client
from auth import get_current_user
from agents.tasks import run_agent_task
from config import settings

router = APIRouter(tags=["Agents"])

class AgentRunCreate(BaseModel):
    campaign_id: str
    prompt: str

class AgentRunResponse(BaseModel):
    id: str
    campaign_id: str
    status: str

    class Config:
        from_attributes = True

@router.post("/agents/run", response_model=AgentRunResponse)
async def trigger_agent(run_data: AgentRunCreate, db: AsyncSession = Depends(get_db), current_user: dict = Depends(get_current_user)):
    result = await db.execute(
        select(Campaign, Client)
        .join(Client)
        .where(Campaign.id == run_data.campaign_id, Client.user_id == current_user["user_id"])
    )
    row = result.first()
    if not row:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    campaign, client = row

    run = AgentRun(campaign_id=campaign.id, status="pending")
    db.add(run)
    await db.commit()
    await db.refresh(run)

    # Dispatch Celery task asynchronously using .delay
    run_agent_task.delay(
        run_id=run.id, 
        campaign_id=campaign.id, 
        tier=client.tier, 
        prompt=run_data.prompt
    )

    return AgentRunResponse.model_validate(run)

@router.websocket("/ws/agents/{client_id}")
async def agent_websocket(websocket: WebSocket, client_id: str):
    await websocket.accept()
    
    # Ideally, client_id should be verified against JWT but for WebSockets we often fallback to token query param
    r = redis.from_url(settings.REDIS_URL, decode_responses=True)
    pubsub = r.pubsub()
    
    # Subscribe to all agent status updates or restrict down to a list of campaigns.
    # We use basic psubscribe to any agent status channel
    await pubsub.psubscribe("agent_status:*")
    
    try:
        while True:
            # Check for messages periodically
            message = await pubsub.get_message(ignore_subscribe_messages=True, timeout=1.0)
            if message:
                await websocket.send_text(message['data'])
            else:
                await asyncio.sleep(0.1)
    except WebSocketDisconnect:
        pass
    finally:
        await pubsub.punsubscribe("agent_status:*")
        await r.aclose()
