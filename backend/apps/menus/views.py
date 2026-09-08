from django.db import transaction
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.common.mixins import TenantScopedQuerySetMixin
from apps.tenants.permissions import HasTenantPermission

from .models import Category, Menu
from .serializers import AdminCategorySerializer, AdminMenuSerializer, CategoryReorderSerializer


class MenuViewSet(TenantScopedQuerySetMixin, viewsets.ModelViewSet):
    queryset = Menu.objects.select_related("branch")
    serializer_class = AdminMenuSerializer
    tenant_lookup = "branch__tenant"
    permission_classes = [HasTenantPermission]
    permission_codenames = {
        "create": "menu.create", "update": "menu.update",
        "partial_update": "menu.update", "destroy": "menu.delete",
    }
    required_permission = "menu.view"


class CategoryViewSet(TenantScopedQuerySetMixin, viewsets.ModelViewSet):
    queryset = Category.objects.select_related("menu", "menu__branch")
    serializer_class = AdminCategorySerializer
    tenant_lookup = "menu__branch__tenant"
    permission_classes = [HasTenantPermission]
    permission_codenames = {
        "create": "category.create", "update": "category.update",
        "partial_update": "category.update", "destroy": "category.delete",
        "reorder": "category.update", "toggle_active": "category.update",
    }
    required_permission = "category.view"
    filterset_fields = ["menu", "is_active"]

    @action(detail=False, methods=["post"])
    def reorder(self, request):
        serializer = CategoryReorderSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        items = serializer.validated_data["items"]

        ids = [item["id"] for item in items]
        categories = {c.id: c for c in self.get_queryset().filter(id__in=ids)}
        if len(categories) != len(ids):
            return Response({"code": "INVALID_CATEGORY", "message": "یک یا چند دسته‌بندی پیدا نشد."}, status=400)

        with transaction.atomic():
            for item in items:
                category = categories[item["id"]]
                category.sort_order = item["sort_order"]
                category.save(update_fields=["sort_order", "updated_at"])

        return Response(AdminCategorySerializer(categories.values(), many=True).data)

    @action(detail=True, methods=["post"], url_path="toggle_active")
    def toggle_active(self, request, pk=None):
        category = self.get_object()
        category.is_active = not category.is_active
        category.save(update_fields=["is_active", "updated_at"])
        return Response(self.get_serializer(category).data)