from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from apps.common.mixins import TenantScopedQuerySetMixin
from apps.tenants.permissions import HasTenantPermission
from .models import Order
from .serializers import OrderSerializer
from .services import cancel_order, complete_order, confirm_order


class OrderViewSet(TenantScopedQuerySetMixin, viewsets.ReadOnlyModelViewSet):
    queryset = Order.objects.select_related("branch", "table", "customer").prefetch_related("items")
    serializer_class = OrderSerializer
    tenant_lookup = "tenant"
    permission_classes = [HasTenantPermission]
    required_permission = "order.view"
    permission_codenames = {
        "confirm": "order.update",
        "complete": "order.complete",
        "cancel": "order.cancel",
    }
    filterset_fields = ["status", "branch", "order_type"]

    @action(detail=True, methods=["post"])
    def confirm(self, request, pk=None):
        order = confirm_order(self.get_object())
        return Response(self.get_serializer(order).data)

    @action(detail=True, methods=["post"])
    def complete(self, request, pk=None):
        order = complete_order(self.get_object())
        return Response(self.get_serializer(order).data)

    @action(detail=True, methods=["post"])
    def cancel(self, request, pk=None):
        order = cancel_order(self.get_object())
        return Response(self.get_serializer(order).data)