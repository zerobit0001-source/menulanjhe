from django.db import models
from apps.common.models import UUIDTimeStampedModel


class RestaurantProfile(UUIDTimeStampedModel):
    tenant = models.OneToOneField("tenants.Tenant", on_delete=models.CASCADE, related_name="restaurant")
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    logo = models.ImageField(upload_to="restaurants/logos/", null=True, blank=True)
    cover_image = models.ImageField(upload_to="restaurants/covers/", null=True, blank=True)
    description = models.TextField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    address = models.CharField(max_length=500, blank=True)
    website = models.URLField(blank=True)
    social_links = models.JSONField(default=dict, blank=True)

    def __str__(self):
        return self.name