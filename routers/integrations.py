from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from pydantic import BaseModel
from typing import List, Optional

from database import get_db
from models import ClientIntegration, Client
from auth import get_current_user
from security import encrypt_data

router = APIRouter(prefix="/clients/{client_id}/integrations", tags=["Integrations"])

class IntegrationCreate(BaseModel):
    provider: str
    credentials: dict
    settings: Optional[dict] = None

class IntegrationResponse(BaseModel):
    id: str
    provider: str
    settings: Optional[dict]
    
    class Config:
        from_attributes = True

@router.post("/", response_model=IntegrationResponse)
async def create_integration(client_id: str, data: IntegrationCreate, db: AsyncSession = Depends(get_db), current_user: dict = Depends(get_current_user)):
    # Verify client ownership
    result = await db.execute(select(Client).where(Client.id == client_id, Client.user_id == current_user["user_id"]))
    if not result.scalar_one_or_none():
        raise HTTPException(status_code=403, detail="Not authorized")
        
    encrypted_creds = encrypt_data(data.credentials)
    new_integration = ClientIntegration(
        client_id=client_id,
        provider=data.provider,
        credentials=encrypted_creds,
        settings=data.settings
    )
    db.add(new_integration)
    await db.commit()
    await db.refresh(new_integration)
    return new_integration

@router.get("/", response_model=List[IntegrationResponse])
async def list_integrations(client_id: str, db: AsyncSession = Depends(get_db), current_user: dict = Depends(get_current_user)):
    result = await db.execute(select(ClientIntegration).join(Client).where(Client.id == client_id, Client.user_id == current_user["user_id"]))
    return list(result.scalars().all())

@router.delete("/{integration_id}")
async def delete_integration(client_id: str, integration_id: str, db: AsyncSession = Depends(get_db), current_user: dict = Depends(get_current_user)):
    result = await db.execute(
        select(ClientIntegration).join(Client).where(
            ClientIntegration.id == integration_id, 
            Client.id == client_id, 
            Client.user_id == current_user["user_id"]
        )
    )
    integration = result.scalar_one_or_none()
    if not integration:
        raise HTTPException(status_code=404, detail="Integration not found")
        
    await db.delete(integration)
    await db.commit()
    return {"message": "Deleted"}
