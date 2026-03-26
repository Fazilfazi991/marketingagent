from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from config import settings
from database import engine, Base
from redis_client import redis_client
from routers import clients, campaigns, content, agents, integrations, billing, analytics

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Create database tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    # Connect to Redis
    await redis_client.connect()
    
    yield
    
    # Shutdown: Close Redis connection
    await redis_client.disconnect()

app = FastAPI(
    title=settings.APP_NAME,
    description="Multi-tenant AI marketing agent SaaS API",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(clients.router)
app.include_router(campaigns.router)
app.include_router(content.router)
app.include_router(agents.router)
app.include_router(integrations.router)
app.include_router(billing.router)
app.include_router(analytics.router)

@app.get("/")
async def root():
    return {
        "message": "Welcome to the Marketing Agents API",
        "docs": "/docs",
        "status": "running"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
