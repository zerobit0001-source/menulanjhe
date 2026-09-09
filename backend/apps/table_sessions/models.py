import secrets
from django.db import models
from apps.common.models import UUIDTimeStampedModel


def generate_session_token() -> str:
    return secrets.token_urlsafe(32)


class TableSession(UUIDTimeStampedModel):
    table = models.ForeignKey("tables.Table", on_delete=models.CASCADE, related_name="sessions")
    status = models.CharField(
        max_length=20, choices=[("OPEN", "Open"), ("CLOSED", "Closed")], default="OPEN"
    )
    session_token = models.CharField(max_length=64, unique=True, db_index=True, default=generate_session_token)
    closed_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Session({self.table_id}, {self.status})"

    def close(self):
        from django.utils import timezone

        self.status = "CLOSED"
        self.closed_at = timezone.now()
        self.save(update_fields=["status", "closed_at", "updated_at"])