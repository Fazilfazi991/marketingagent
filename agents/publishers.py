import httpx
import json
import asyncio
from agents.base import BaseAgent
from security import decrypt_data
from sqlalchemy.future import select
from models import ClientIntegration, Client, Campaign
from database import AsyncSessionLocal

class BasePublisher(BaseAgent):
    async def get_creds(self, provider: str):
        async with AsyncSessionLocal() as session:
            # Join campaign -> client -> integration to find keys
            result = await session.execute(
                select(ClientIntegration)
                .join(Client)
                .join(Campaign)
                .where(Campaign.id == self.campaign_id, ClientIntegration.provider == provider)
            )
            integration = result.scalar_one_or_none()
            if not integration:
                raise ValueError(f"No integration found for {provider}")
            return decrypt_data(integration.credentials)

class WordPressPublisher(BasePublisher):
    async def publish(self, title: str, content: str, featured_image_id: int = None, yoast_meta: dict = None):
        creds = await self.get_creds("wordpress")
        url = f"{creds['url'].rstrip('/')}/wp-json/wp/v2/posts"
        
        payload = {
            "title": title,
            "content": content,
            "status": "publish"
        }
        if featured_image_id:
            payload["featured_media"] = featured_image_id
        if yoast_meta:
            payload["meta"] = {
                "_yoast_wpseo_title": yoast_meta.get("title"),
                "_yoast_wpseo_metadesc": yoast_meta.get("description")
            }

        async with httpx.AsyncClient() as client:
            response = await client.post(
                url, json=payload, auth=(creds['username'], creds['app_password'])
            )
            response.raise_for_status()
            return response.json().get("link")

class WebflowPublisher(BasePublisher):
    async def publish(self, collection_id: str, fields: dict):
        creds = await self.get_creds("webflow")
        url = f"https://api.webflow.com/v2/collections/{collection_id}/items"
        
        headers = {
            "Authorization": f"Bearer {creds['api_token']}",
            "accept": "application/json",
            "content-type": "application/json"
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(url, json={"fields": fields}, headers=headers)
            response.raise_for_status()
            return response.json().get("id")

class LinkedInPublisher(BasePublisher):
    async def post(self, text: str, person_urn: str):
        creds = await self.get_creds("linkedin")
        url = "https://api.linkedin.com/v2/ugcPosts"
        
        headers = {"Authorization": f"Bearer {creds['access_token']}"}
        payload = {
            "author": person_urn,
            "lifecycleState": "PUBLISHED",
            "specificContent": {
                "com.linkedin.ugc.ShareContent": {
                    "shareCommentary": {"text": text},
                    "shareMediaCategory": "NONE"
                }
            },
            "visibility": {"com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"}
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(url, json=payload, headers=headers)
            response.raise_for_status()
            return response.json().get("id")

class TwitterPublisher(BasePublisher):
    async def post_thread(self, text: str):
        creds = await self.get_creds("twitter")
        url = "https://api.twitter.com/2/tweets"
        headers = {"Authorization": f"Bearer {creds['access_token']}"}
        
        # Simple split into 280 chars
        chunks = [text[i:i+280] for i in range(0, len(text), 280)]
        
        last_tweet_id = None
        tweet_ids = []
        
        async with httpx.AsyncClient() as client:
            for chunk in chunks:
                payload = {"text": chunk}
                if last_tweet_id:
                    payload["reply"] = {"in_reply_to_tweet_id": last_tweet_id}
                
                response = await client.post(url, json=payload, headers=headers)
                response.raise_for_status()
                last_tweet_id = response.json().get("data", {}).get("id")
                tweet_ids.append(last_tweet_id)
                
        return tweet_ids

class MailchimpPublisher(BasePublisher):
    async def send_campaign(self, campaign_id: str):
        creds = await self.get_creds("mailchimp")
        dc = creds.get("data_center", "us1")
        url = f"https://{dc}.api.mailchimp.com/3.0/campaigns/{campaign_id}/actions/send"
        
        async with httpx.AsyncClient() as client:
            response = await client.post(url, auth=("apikey", creds['api_key']))
            response.raise_for_status()
            return True
