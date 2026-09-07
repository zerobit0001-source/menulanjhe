from django.db import models
from apps.common.models import UUIDTimeStampedModel


class Branch(UUIDTimeStampedModel):
    tenant = models.ForeignKey("tenants.Tenant", on_delete=models.CASCADE, related_name="branches")
    name = models.CharField(max_length=255)
    slug = models.SlugField()
    address = models.CharField(max_length=500, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    is_active = models.BooleanField(default=True)
    is_default = models.BooleanField(default=False)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["tenant", "slug"], name="uniq_branch_slug_per_tenant"),
        ]
        indexes = [models.Index(fields=["tenant", "is_active"])]

    def __str__(self):
        return f"{self.name} ({self.tenant_id})"