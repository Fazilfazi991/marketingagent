from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from pydantic import BaseModel
from database import get_db
from models import Client
from auth import get_current_user

router = APIRouter(prefix="/clients", tags=["Clients"])

class ClientCreate(BaseModel):
    name: str
    tier: str = "standard"

class ClientResponse(BaseModel):
    id: str
    user_id: str
    name: str
    tier: str

    class Config:
        from_attributes = True

@router.post("/", response_model=ClientResponse)
async def create_client(client_data: ClientCreate, db: AsyncSession = Depends(get_db), current_user: dict = Depends(get_current_user)):
    user_id = current_user["user_id"]
    result = await db.execute(select(Client).where(Client.user_id == user_id))
    existing_client = result.scalar_one_or_none()
    
    if existing_client:
        return existing_client

    new_client = Client(user_id=user_id, name=client_data.name, tier=client_data.tier)
    db.add(new_client)
    await db.commit()
    await db.refresh(new_client)
    return new_client

@router.get("/me", response_model=ClientResponse)
async def get_my_client(db: AsyncSession = Depends(get_db), current_user: dict = Depends(get_current_user)):
    user_id = current_user["user_id"]
    result = await db.execute(select(Client).where(Client.user_id == user_id))
    client = result.scalar_one_or_none()
    if not client:
        raise HTTPException(status_code=404, detail="Client setup not found.")
    return client
