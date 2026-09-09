import secrets
from django.db import models
from apps.common.models import UUIDTimeStampedModel


def generate_qr_token() -> str:
    return secrets.token_urlsafe(32)


class Table(UUIDTimeStampedModel):
    branch = models.ForeignKey("branches.Branch", on_delete=models.CASCADE, related_name="tables")
    name = models.CharField(max_length=100)
    number = models.PositiveIntegerField()
    capacity = models.PositiveIntegerField(default=2)
    qr_token = models.CharField(max_length=64, unique=True, db_index=True, default=generate_qr_token)
    is_active = models.BooleanField(default=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["branch", "number"], name="uniq_table_number_per_branch"),
        ]

    def __str__(self):
        return f"{self.name} ({self.branch_id})"

    def regenerate_token(self):
        self.qr_token = generate_qr_token()
        self.save(update_fields=["qr_token", "updated_at"])