from rest_framework import serializers
from django.utils.text import slugify
from .models import Product


class AdminProductSerializer(serializers.ModelSerializer):
    slug = serializers.SlugField(required=False, allow_blank=True)

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

    def create(self, validated_data):
        if not validated_data.get("slug"):
            validated_data["slug"] = self._generate_unique_slug(name=validated_data["name"], category=validated_data["category"])
        return super().create(validated_data)

    def _generate_unique_slug(self, name, category):
        base_slug = slugify(name, allow_unicode=True) or "product"
        slug = base_slug
        counter = 2
        while Product.objects.filter(slug=slug, category=category).exists():
            slug = f"{base_slug}-{counter}"
            counter += 1
        return slug

class PublicProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id", "name", "slug", "description", "image", "price", "is_available", "is_featured"]
        read_only_fields = fields