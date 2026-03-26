import httpx
import base64
from openai import AsyncOpenAI
from agents.base import BaseAgent
from agents.router import LLMRouter
from database import AsyncSessionLocal
from models import Client, Content
from sqlalchemy.future import select
from config import settings

class ImageBriefAgent(BaseAgent):
    async def process(self, config: dict, blog_output: dict):
        # Fetch client brand colors/niche from the DB
        async with AsyncSessionLocal() as session:
            result = await session.execute(select(Client).where(Client.id == self.client_id))
            client = result.scalar_one_or_none()
            brand_colors = client.settings.get("brand_colors", "corporate blue and white") if client and client.settings else "modern vibrant"
            niche = client.settings.get("niche", "Technology") if client and client.settings else "General"

        title = blog_output.get("title", "Marketing Campaign")
        
        prompt = f"""
        System: Visual Prompt Engineer for DALL-E 3.
        Topic: {title}
        Niche: {niche}
        Brand Palette: {brand_colors}
        Task: Generate a highly detailed cinematic DALL-E 3 prompt that reflects this niche and uses the brand colors. 
        Focus on professional lighting, 8k resolution, and a clean modern aesthetic.
        """
        
        brief = await LLMRouter.generate(prompt, tier="fast")
        return {"image_prompt": brief}

class DALLEImageAgent(BaseAgent):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)

    async def generate(self, brief: str, content_id: str):
        await self.emit_status("generating", "Generating HD image with DALL-E 3...")
        
        response = await self.client.images.generate(
            model="dall-e-3",
            prompt=brief,
            size="1792x1024",
            quality="hd",
            n=1,
            response_format="b64_json"
        )
        
        image_b64 = response.data[0].b64_json
        image_bytes = base64.b64_decode(image_b64)
        
        public_url = await self.upload_to_supabase(image_bytes, content_id)
        await self.attach_to_content(content_id, public_url)
        
        return public_url

    async def upload_to_supabase(self, image_bytes: bytes, content_id: str):
        from database import supabase
        path = f"content-images/{self.client_id}/{content_id}.png"
        
        # Upload to 'marketing-assets' bucket (ensure it exists)
        supabase.storage.from_("marketing-assets").upload(
            path, image_bytes, {"content-type": "image/png"}
        )
        
        # Get public URL
        res = supabase.storage.from_("marketing-assets").get_public_url(path)
        return res

    async def attach_to_content(self, content_id: str, url: str):
        async with AsyncSessionLocal() as session:
            content = await session.get(Content, content_id)
            if content:
                # We'll store it as JSON or a dedicated field if we update the model
                # For now, let's assume we store it in a results JSON if we had one, 
                # or just as a prefix in text_content for simplicity in Phase 1
                content.text_content = f"IMAGE_URL: {url}\n\n" + content.text_content
                await session.commit()

class StabilityImageAgent(BaseAgent):
    async def generate(self, brief: str, content_id: str):
        await self.emit_status("generating", "Generating image with Stability AI (Fallback)...")
        
        url = "https://api.stability.ai/v1/generation/stable-diffusion-v1-6/text-to-image"
        headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": f"Bearer {settings.STABILITY_API_KEY}"
        }
        payload = {
            "text_prompts": [{"text": brief}],
            "cfg_scale": 7,
            "height": 1024,
            "width": 1024,
            "samples": 1,
            "steps": 30,
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(url, headers=headers, json=payload)
            response.raise_for_status()
            
            data = response.json()
            image_b64 = data["artifacts"][0]["base64"]
            image_bytes = base64.b64_decode(image_b64)
            
            # Use DALLE agent's upload logic (or move to a utility)
            # For brevity in this script, we'll assume sharing the utility
            pass 
