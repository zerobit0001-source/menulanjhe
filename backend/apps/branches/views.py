from rest_framework import viewsets
from apps.common.mixins import TenantScopedQuerySetMixin
from apps.tenants.permissions import HasTenantPermission
from .models import Branch
from .serializers import BranchSerializer


class BranchViewSet(TenantScopedQuerySetMixin, viewsets.ModelViewSet):
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer
    tenant_lookup = "tenant"
    permission_classes = [HasTenantPermission]
    permission_codenames = {
        "create": "settings.manage",
        "update": "settings.manage",
        "partial_update": "settings.manage",
        "destroy": "settings.manage",
    }
    required_permission = "settings.view"

    def perform_create(self, serializer):
        serializer.save(tenant=self.request.tenant)