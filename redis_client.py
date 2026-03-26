import redis.asyncio as redis
from config import settings

class RedisClient:
    def __init__(self):
        self.redis = None

    async def connect(self):
        self.redis = redis.from_url(settings.REDIS_URL, decode_responses=True)

    async def disconnect(self):
        if self.redis:
            await self.redis.aclose()

    async def publish(self, channel: str, message: str):
        if self.redis:
            await self.redis.publish(channel, message)

redis_client = RedisClient()
