from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import declarative_base
from supabase import create_client, Client

from config import settings

# SQLAlchemy setup
engine = create_async_engine(settings.DATABASE_URL, echo=settings.DEBUG)
AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

Base = declarative_base()

# Dependency to get DB session
async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()

# Supabase setup function
def get_supabase_client() -> Client:
    if not settings.SUPABASE_URL or not settings.SUPABASE_KEY:
        raise ValueError("Supabase credentials are not set in the configuration.")
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

# Initialize a global supabase client
supabase_client = get_supabase_client() if settings.SUPABASE_URL and settings.SUPABASE_KEY else None
