from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from apps.common.mixins import TenantScopedQuerySetMixin
from apps.tenants.permissions import HasTenantPermission
from .models import TableSession
from .serializers import TableSessionSerializer


class TableSessionViewSet(TenantScopedQuerySetMixin, viewsets.ReadOnlyModelViewSet):
    queryset = TableSession.objects.select_related("table__branch")
    serializer_class = TableSessionSerializer
    tenant_lookup = "table__branch__tenant"
    permission_classes = [HasTenantPermission]
    required_permission = "table.view"
    permission_codenames = {"close": "table.update"}
    filterset_fields = ["table", "status"]

    @action(detail=True, methods=["post"])
    def close(self, request, pk=None):
        session = self.get_object()
        if session.status == "CLOSED":
            return Response({"code": "ALREADY_CLOSED", "message": "این نشست قبلاً بسته شده."}, status=400)
        session.close()
        return Response(self.get_serializer(session).data)