from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.common.mixins import TenantScopedQuerySetMixin
from apps.tenants.permissions import HasTenantPermission

from .models import Product
from .serializers import AdminProductSerializer


class ProductViewSet(TenantScopedQuerySetMixin, viewsets.ModelViewSet):
    queryset = Product.objects.select_related("category", "category__menu", "category__menu__branch")
    serializer_class = AdminProductSerializer
    tenant_lookup = "category__menu__branch__tenant"
    permission_classes = [HasTenantPermission]
    permission_codenames = {
        "create": "product.create", "update": "product.update",
        "partial_update": "product.update", "destroy": "product.delete",
        "toggle_active": "product.update",
    }
    required_permission = "product.view"
    filterset_fields = ["category", "is_available", "is_featured"]

    @action(detail=True, methods=["post"], url_path="toggle_active")
    def toggle_active(self, request, pk=None):
        product = self.get_object()
        product.is_available = not product.is_available
        product.save(update_fields=["is_available", "updated_at"])
        return Response(self.get_serializer(product).data)