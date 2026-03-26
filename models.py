from sqlalchemy import Column, String, Text, DateTime, ForeignKey, JSON, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import uuid

from database import Base

def generate_uuid():
    return str(uuid.uuid4())

class Client(Base):
    __tablename__ = "clients"

    id = Column(String, primary_key=True, default=generate_uuid)
    # The authenticated user_id from Supabase Auth
    user_id = Column(String, unique=True, nullable=False, index=True) 
    name = Column(String, nullable=False)
    tier = Column(String, default="standard") # standard, premium, enterprise
    schedule_config = Column(JSON, default={"hour": 9, "day_of_week": "monday"})
    stripe_customer_id = Column(String, nullable=True)
    stripe_subscription_id = Column(String, nullable=True)
    plan_active = Column(Boolean, default=False)
    plan = Column(String, default="free") 
    ga4_property_id = Column(String, nullable=True)
    ga4_credentials = Column(JSON, nullable=True) # Service account JSON
    linkedin_token = Column(String, nullable=True)
    logo_url = Column(String, nullable=True)
    brand_voice = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    campaigns = relationship("Campaign", back_populates="client", cascade="all, delete-orphan")

class Campaign(Base):
    __tablename__ = "campaigns"

    id = Column(String, primary_key=True, default=generate_uuid)
    client_id = Column(String, ForeignKey("clients.id"), nullable=False, index=True)
    name = Column(String, nullable=False)
    status = Column(String, default="draft") # draft, active, paused, completed
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    client = relationship("Client", back_populates="campaigns")
    contents = relationship("Content", back_populates="campaign", cascade="all, delete-orphan")
    agent_runs = relationship("AgentRun", back_populates="campaign", cascade="all, delete-orphan")

class Content(Base):
    __tablename__ = "contents"

    id = Column(String, primary_key=True, default=generate_uuid)
    campaign_id = Column(String, ForeignKey("campaigns.id"), nullable=False, index=True)
    platform = Column(String, nullable=False) # e.g., twitter, linkedin, blog
    text_content = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    campaign = relationship("Campaign", back_populates="contents")

class AgentRun(Base):
    __tablename__ = "agent_runs"

    id = Column(String, primary_key=True, default=generate_uuid)
    campaign_id = Column(String, ForeignKey("campaigns.id"), nullable=False, index=True)
    status = Column(String, default="pending") # pending, running, success, failed
    result = Column(JSON, nullable=True) # Output from the agent
    error_message = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    completed_at = Column(DateTime(timezone=True), nullable=True)

    campaign = relationship("Campaign", back_populates="agent_runs")

class ClientIntegration(Base):
    __tablename__ = "client_integrations"

    id = Column(String, primary_key=True, default=generate_uuid)
    client_id = Column(String, ForeignKey("clients.id"), nullable=False, index=True)
    provider = Column(String, nullable=False) # wordpress, webflow, linkedin, twitter, mailchimp
    credentials = Column(Text, nullable=False) # Fernet encrypted JSON string
    settings = Column(JSON, nullable=True) # Non-sensitive config
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    client = relationship("Client")

class ContentVersion(Base):
    __tablename__ = "content_versions"

    id = Column(String, primary_key=True, default=generate_uuid)
    content_id = Column(String, ForeignKey("contents.id"), nullable=False, index=True)
    body = Column(Text, nullable=False)
    version = Column(JSON, nullable=True) # Could be simple int or metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    content = relationship("Content")

class AnalyticsSnapshot(Base):
    __tablename__ = "analytics_snapshots"

    id = Column(String, primary_key=True, default=generate_uuid)
    client_id = Column(String, ForeignKey("clients.id"), nullable=False, index=True)
    platform = Column(String, nullable=False) # ga4, linkedin
    snapshot_date = Column(DateTime(timezone=True), nullable=False)
    data = Column(JSON, nullable=False)
    summary = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    client = relationship("Client")
