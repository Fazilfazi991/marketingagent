from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from datetime import datetime, timedelta
from typing import List

from database import get_db
from models import AnalyticsSnapshot, Client
from auth import get_current_user

router = APIRouter(prefix="/analytics", tags=["Analytics"])

@router.get("/snapshots", response_model=List[dict])
async def get_analytics_snapshots(
    db: AsyncSession = Depends(get_db), 
    current_user: dict = Depends(get_current_user)
):
    # 1. Fetch client
    result = await db.execute(select(Client).where(Client.user_id == current_user["user_id"]))
    client = result.scalar_one_or_none()
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")

    # 2. Get last 30 days of snapshots
    thirty_days_ago = datetime.utcnow() - timedelta(days=30)
    
    result = await db.execute(
        select(AnalyticsSnapshot)
        .where(AnalyticsSnapshot.client_id == client.id, AnalyticsSnapshot.snapshot_date >= thirty_days_ago)
        .order_by(AnalyticsSnapshot.snapshot_date.desc())
    )
    snapshots = result.scalars().all()
    
    # Format for response
    return [
        {
            "id": s.id,
            "platform": s.platform,
            "date": s.snapshot_date.isoformat(),
            "data": s.data,
            "summary": s.summary
        } for s in snapshots
    ]
