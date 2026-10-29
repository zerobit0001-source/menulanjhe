from rest_framework import serializers
from .models import RestaurantProfile
from apps.common.fields import FormSafeBooleanField


class RestaurantProfileSerializer(serializers.ModelSerializer):
    public_ordering_enabled = FormSafeBooleanField(required=False)

    class Meta:
        model = RestaurantProfile
        fields = [
            "id", "name", "slug", "logo", "cover_image", "description",
            "phone", "address", "website", "social_links", "public_ordering_enabled", "created_at", "updated_at",
        ]
        read_only_fields = ["id", "slug", "created_at", "updated_at"]