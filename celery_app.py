from celery import Celery
from config import settings

celery_app = Celery(
    "marketing_agents",
    broker=settings.REDIS_URL,
    backend=settings.REDIS_URL
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
)

# We will discover tasks from our agents package automatically
celery_app.autodiscover_tasks(["agents"])

from celery.schedules import crontab

celery_app.conf.beat_schedule = {
    "sync-client-schedules": {
        "task": "agents.tasks.sync_client_schedules",
        "schedule": 60.0, # Every 60 seconds
    },
    "run-daily-analytics": {
        "task": "agents.tasks.run_all_analytics",
        "schedule": crontab(hour=6, minute=0), # 6:00 AM UTC
    },
    "generate-weekly-reports": {
        "task": "agents.tasks.generate_weekly_reports",
        "schedule": crontab(hour=8, minute=0, day_of_week="monday"), # Mon 8:00 AM UTC
    },
}
