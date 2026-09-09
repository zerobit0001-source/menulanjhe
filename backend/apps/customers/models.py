from django.db import models
from apps.common.models import UUIDTimeStampedModel


class Customer(UUIDTimeStampedModel):
    tenant = models.ForeignKey("tenants.Tenant", on_delete=models.CASCADE, related_name="customers")
    name = models.CharField(max_length=255, blank=True)
    phone = models.CharField(max_length=20, blank=True, db_index=True)
    notes = models.TextField(blank=True)

    def __str__(self):
        return self.name or self.phone or str(self.id)