from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from pydantic import BaseModel
from typing import List

from database import get_db
from models import Campaign, Client
from auth import get_current_user

router = APIRouter(prefix="/campaigns", tags=["Campaigns"])

class CampaignCreate(BaseModel):
    name: str

class CampaignResponse(BaseModel):
    id: str
    client_id: str
    name: str
    status: str

    class Config:
        from_attributes = True

@router.post("/", response_model=CampaignResponse)
async def create_campaign(campaign_data: CampaignCreate, db: AsyncSession = Depends(get_db), current_user: dict = Depends(get_current_user)):
    user_id = current_user["user_id"]
    result = await db.execute(select(Client).where(Client.user_id == user_id))
    client = result.scalar_one_or_none()
    if not client:
         raise HTTPException(status_code=400, detail="Client not found")
    
    new_campaign = Campaign(client_id=client.id, name=campaign_data.name)
    db.add(new_campaign)
    await db.commit()
    await db.refresh(new_campaign)
    return new_campaign

@router.get("/", response_model=List[CampaignResponse])
async def list_campaigns(db: AsyncSession = Depends(get_db), current_user: dict = Depends(get_current_user)):
    user_id = current_user["user_id"]
    result = await db.execute(select(Client).where(Client.user_id == user_id))
    client = result.scalar_one_or_none()
    if not client:
        return []

    result = await db.execute(select(Campaign).where(Campaign.client_id == client.id))
    campaigns = result.scalars().all()
    return list(campaigns)

@router.get("/{campaign_id}", response_model=CampaignResponse)
async def get_campaign(campaign_id: str, db: AsyncSession = Depends(get_db), current_user: dict = Depends(get_current_user)):
    result = await db.execute(
        select(Campaign).join(Client).where(Campaign.id == campaign_id, Client.user_id == current_user["user_id"])
    )
    campaign = result.scalar_one_or_none()
    if not campaign:
         raise HTTPException(status_code=404, detail="Campaign not found")
    return campaign
