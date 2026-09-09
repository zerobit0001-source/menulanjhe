from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from apps.common.mixins import TenantScopedQuerySetMixin
from apps.tenants.permissions import HasTenantPermission
from .models import Table
from .serializers import AdminTableSerializer


class TableViewSet(TenantScopedQuerySetMixin, viewsets.ModelViewSet):
    queryset = Table.objects.select_related("branch")
    serializer_class = AdminTableSerializer
    tenant_lookup = "branch__tenant"
    permission_classes = [HasTenantPermission]
    permission_codenames = {
        "create": "table.create", "update": "table.update",
        "partial_update": "table.update", "destroy": "table.delete",
        "regenerate_token": "table.update",
    }
    required_permission = "table.view"

    def perform_create(self, serializer):
        serializer.save()

    @action(detail=True, methods=["post"], url_path="regenerate_token")
    def regenerate_token(self, request, pk=None):
        table = self.get_object()
        table.regenerate_token()
        return Response(self.get_serializer(table).data)