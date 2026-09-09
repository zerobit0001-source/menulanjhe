from rest_framework import viewsets
from apps.common.mixins import TenantScopedQuerySetMixin
from apps.tenants.permissions import HasTenantPermission
from .models import Customer
from .serializers import CustomerSerializer


class CustomerViewSet(TenantScopedQuerySetMixin, viewsets.ReadOnlyModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    tenant_lookup = "tenant"
    permission_classes = [HasTenantPermission]
    required_permission = "customer.view"
    filterset_fields = ["phone"]