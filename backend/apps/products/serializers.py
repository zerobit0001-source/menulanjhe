from rest_framework import serializers
from django.utils.text import slugify
from .models import Product
from apps.common.fields import TomanPriceField, FormSafeBooleanField
from apps.common.image_service import ImageValidationError, validate_image_upload, optimize_image
from django.core.files.storage import default_storage



class AdminProductSerializer(serializers.ModelSerializer):
    slug = serializers.SlugField(required=False, allow_blank=True)
    category_name = serializers.CharField(source="category.name", read_only=True)
    price = TomanPriceField()
    is_available = FormSafeBooleanField(required=False)
    is_featured = FormSafeBooleanField(required=False)

    class Meta:
        model = Product
        fields = [
            "id", "category", "name", "slug", "description", "image", "optimized_image", "price", "category_name",
            "is_available", "is_featured", "sort_order", "created_at", "updated_at",
        ]
        read_only_fields = ["id", "optimized_image", "created_at", "updated_at"]

    def validate_category(self, category):
        tenant = self.context["request"].tenant
        if category.menu.branch.tenant_id != tenant.id:
            raise serializers.ValidationError("این دسته‌بندی متعلق به رستوران شما نیست.")
        return category

    def validate_image(self, value):
        if value is None:
            return value
        try:
            validate_image_upload(value)
        except ImageValidationError as exc:
            raise serializers.ValidationError(str(exc))
        value.seek(0)
        return value

    def create(self, validated_data):
        if not validated_data.get("slug"):
            validated_data["slug"] = self._generate_unique_slug(name=validated_data["name"], category=validated_data["category"])

        image = validated_data.get("image")
        if image:
            validated_data["optimized_image"] = optimize_image(image)
        return super().create(validated_data)

    def update(self, instance, validated_data):
        old_files = []
        if "image" in validated_data:
            image = validated_data["image"]
            old_files = [f.name for f in (instance.image, instance.optimized_image) if f]
            # عکس جدید → نسخه‌ی بهینه‌ی جدید | عکس پاک شد (null) → نسخه‌ی بهینه هم پاک می‌شه
            validated_data["optimized_image"] = optimize_image(image) if image else None

        instance = super().update(instance, validated_data)

        for name in old_files:
            if name not in (instance.image.name, instance.optimized_image.name):
                default_storage.delete(name)
        return instance

    def _generate_unique_slug(self, name, category):
        base_slug = slugify(name, allow_unicode=True) or "product"
        slug = base_slug
        counter = 2
        while Product.objects.filter(slug=slug, category=category).exists():
            slug = f"{base_slug}-{counter}"
            counter += 1
        return slug

class PublicProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.name", read_only=True)
    price = TomanPriceField()

    class Meta:
        model = Product
        fields = ["id", "name", "slug", "description", "image", "optimized_image", "price", "category_name", "is_available", "is_featured"]
        read_only_fields = fields