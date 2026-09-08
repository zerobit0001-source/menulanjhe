from rest_framework import serializers
from .models import Product


class AdminProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            "id", "category", "name", "slug", "description", "image", "price",
            "is_available", "is_featured", "sort_order", "created_at", "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def validate_category(self, category):
        tenant = self.context["request"].tenant
        if category.menu.branch.tenant_id != tenant.id:
            raise serializers.ValidationError("این دسته‌بندی متعلق به رستوران شما نیست.")
        return category


class PublicProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id", "name", "slug", "description", "image", "price", "is_available", "is_featured"]
        read_only_fields = fields