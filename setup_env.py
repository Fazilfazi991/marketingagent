import os

# Ensure the .env file exists for configuration
env_content = """
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
SUPABASE_JWT_SECRET=your_supabase_jwt_secret
DATABASE_URL=postgresql+asyncpg://postgres:password@db.project-ref.supabase.co:5432/postgres
REDIS_URL=redis://localhost:6379/0
OPENAI_API_KEY=sk-...
CLAUDE_API_KEY=...
GEMINI_API_KEY=...
KIMI_API_KEY=...
"""

with open("c:/Users/Perfect Elect/Downloads/Website Works/marketing-agents-api/.env", "w") as f:
    f.write(env_content.strip())
