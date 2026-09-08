from rest_framework import serializers
from django.utils.text import slugify
from apps.products.serializers import PublicProductSerializer
from .models import Category, Menu


class AdminMenuSerializer(serializers.ModelSerializer):
    slug = serializers.SlugField(required=False, allow_blank=True)

    class Meta:
        model = Menu
        fields = ["id", "branch", "name", "slug", "description", "is_active", "is_published",
                  "created_at", "updated_at"]
        read_only_fields = ["id", "created_at", "updated_at"]

    def validate_branch(self, branch):
        tenant = self.context["request"].tenant
        if branch.tenant_id != tenant.id:
            raise serializers.ValidationError("این شعبه متعلق به رستوران شما نیست.")
        return branch

    def create(self, validated_data):
        if not validated_data.get("slug"):
            validated_data["slug"] = self._generate_unique_slug(
                name=validated_data["name"], branch=validated_data["branch"]
            )
        return super().create(validated_data)

    def _generate_unique_slug(self, name, branch):
        base_slug = slugify(name, allow_unicode=True) or "menu"
        slug = base_slug
        counter = 2
        while Menu.objects.filter(branch=branch, slug=slug).exists():
            slug = f"{base_slug}-{counter}"
            counter += 1
        return slug


class AdminCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "menu", "name", "description", "image", "sort_order", "is_active",
                  "created_at", "updated_at"]
        read_only_fields = ["id", "created_at", "updated_at"]

    def validate_menu(self, menu):
        tenant = self.context["request"].tenant
        if menu.branch.tenant_id != tenant.id:
            raise serializers.ValidationError("این منو متعلق به رستوران شما نیست.")
        return menu


class CategoryReorderItemSerializer(serializers.Serializer):
    id = serializers.UUIDField()
    sort_order = serializers.IntegerField(min_value=0)


class CategoryReorderSerializer(serializers.Serializer):
    items = CategoryReorderItemSerializer(many=True)


class PublicCategorySerializer(serializers.ModelSerializer):
    products = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ["id", "name", "description", "image", "sort_order", "products"]
        read_only_fields = fields

    def get_products(self, category):
        products = category.products.filter(is_available=True).order_by("sort_order", "name")
        return PublicProductSerializer(products, many=True).data


class PublicMenuSerializer(serializers.ModelSerializer):
    categories = serializers.SerializerMethodField()
    restaurant_name = serializers.CharField(source="branch.tenant.restaurant.name", read_only=True)

    class Meta:
        model = Menu
        fields = ["id", "name", "slug", "description", "restaurant_name", "categories"]
        read_only_fields = fields

    def get_categories(self, menu):
        categories = menu.categories.filter(is_active=True).order_by("sort_order", "name")
        return PublicCategorySerializer(categories, many=True).data