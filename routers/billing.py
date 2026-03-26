from fastapi import APIRouter, Depends, HTTPException, Request, Header
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from pydantic import BaseModel
import stripe
import os

from database import get_db
from models import Client
from auth import get_current_user
from config import settings

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
webhook_secret = os.getenv("STRIPE_WEBHOOK_SECRET")

router = APIRouter(prefix="/billing", tags=["Billing"])

class CheckoutRequest(BaseModel):
    plan: str # starter, growth, agency_pro

@router.post("/checkout")
async def create_checkout_session(
    req: CheckoutRequest, 
    db: AsyncSession = Depends(get_db), 
    current_user: dict = Depends(get_current_user)
):
    result = await db.execute(select(Client).where(Client.user_id == current_user["user_id"]))
    client = result.scalar_one_or_none()
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")

    # Map plans to Stripe Price IDs (Placeholders)
    prices = {
        "starter": "price_starter_id",
        "growth": "price_growth_id",
        "agency_pro": "price_pro_id"
    }
    
    try:
        if not client.stripe_customer_id:
            customer = stripe.Customer.create(
                email=current_user.get("email"),
                metadata={"client_id": client.id}
            )
            client.stripe_customer_id = customer.id
            await db.commit()

        session = stripe.checkout.Session.create(
            customer=client.stripe_customer_id,
            payment_method_types=['card'],
            line_items=[{'price': prices.get(req.plan), 'quantity': 1}],
            mode='subscription',
            success_url=f"{os.getenv('FRONTEND_URL')}/billing?success=true",
            cancel_url=f"{os.getenv('FRONTEND_URL')}/billing?canceled=true",
        )
        return {"url": session.url}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/webhook")
async def stripe_webhook(request: Request, stripe_signature: str = Header(None)):
    payload = await request.body()
    try:
        event = stripe.Webhook.construct_event(payload, stripe_signature, webhook_secret)
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid signature")

    # Handle events
    if event['type'] == 'customer.subscription.created':
        subscription = event['data']['object']
        # Update client in DB (Logic needs async session)
        pass
    elif event['type'] == 'customer.subscription.deleted':
        # Revoke access
        pass
        
    return {"status": "success"}
