from rest_framework import serializers
from .models import RestaurantProfile


class RestaurantProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestaurantProfile
        fields = [
            "id", "name", "slug", "logo", "cover_image", "description",
            "phone", "address", "website", "social_links", "created_at", "updated_at",
        ]
        read_only_fields = ["id", "slug", "created_at", "updated_at"]