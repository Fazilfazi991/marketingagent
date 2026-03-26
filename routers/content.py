from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from pydantic import BaseModel
from typing import List

from database import get_db
from models import Content, Campaign, Client, ContentVersion
from auth import get_current_user

router = APIRouter(prefix="/content", tags=["Content"])

class ContentCreate(BaseModel):
    campaign_id: str
    platform: str
    text_content: str

class ContentResponse(BaseModel):
    id: str
    campaign_id: str
    platform: str
    text_content: str

    class Config:
        from_attributes = True

@router.post("/", response_model=ContentResponse)
async def create_content(content_data: ContentCreate, db: AsyncSession = Depends(get_db), current_user: dict = Depends(get_current_user)):
    result = await db.execute(
        select(Campaign).join(Client).where(Campaign.id == content_data.campaign_id, Client.user_id == current_user["user_id"])
    )
    if not result.scalar_one_or_none():
         raise HTTPException(status_code=403, detail="Not authorized to add content to this campaign")
    
    new_content = Content(campaign_id=content_data.campaign_id, platform=content_data.platform, text_content=content_data.text_content)
    db.add(new_content)
    await db.commit()
    await db.refresh(new_content)
    return new_content

@router.get("/campaign/{campaign_id}", response_model=List[ContentResponse])
async def list_campaign_content(campaign_id: str, db: AsyncSession = Depends(get_db), current_user: dict = Depends(get_current_user)):
    result = await db.execute(
        select(Campaign).join(Client).where(Campaign.id == campaign_id, Client.user_id == current_user["user_id"])
    )
    if not result.scalar_one_or_none():
         raise HTTPException(status_code=403, detail="Not authorized")
    
    result = await db.execute(select(Content).where(Content.campaign_id == campaign_id))
    contents = result.scalars().all()
    return list(contents)

class RegenerateRequest(BaseModel):
    feedback: str

@router.post("/{content_id}/regenerate")
async def regenerate_content(
    content_id: str, 
    req: RegenerateRequest, 
    db: AsyncSession = Depends(get_db), 
    current_user: dict = Depends(get_current_user)
):
    # 1. Fetch current content and verify ownership
    result = await db.execute(
        select(Content).join(Campaign).join(Client).where(
            Content.id == content_id, Client.user_id == current_user["user_id"]
        )
    )
    content = result.scalar_one_or_none()
    if not content:
        raise HTTPException(status_code=404, detail="Content not found")

    # 2. Save current version
    version = ContentVersion(
        content_id=content.id,
        body=content.text_content
    )
    db.add(version)
    
    # 3. Trigger regeneration task
    # We simulate triggering the agent again with feedback
    from celery_app import celery_app
    task = celery_app.send_task(
        "agents.tasks.run_agent_with_feedback",
        args=[content.id, req.feedback]
    )
    
    await db.commit()
    return {"task_id": task.id, "message": "Regeneration started"}
