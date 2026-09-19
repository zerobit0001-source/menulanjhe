from rest_framework import mixins, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from apps.branches.models import Branch
from apps.common.exceptions import ApplicationError
from apps.common.mixins import TenantScopedQuerySetMixin
from apps.tables.models import Table
from apps.tenants.permissions import HasTenantPermission
from .models import Order
from .serializers import CreateManualOrderSerializer, OrderSerializer
from .services import cancel_order, complete_order, confirm_order, create_manual_order


class OrderViewSet(TenantScopedQuerySetMixin, mixins.CreateModelMixin, viewsets.ReadOnlyModelViewSet):
    queryset = Order.objects.select_related("branch", "table", "customer").prefetch_related("items")
    serializer_class = OrderSerializer
    tenant_lookup = "tenant"
    permission_classes = [HasTenantPermission]
    required_permission = "order.view"
    permission_codenames = {
        "create": "order.create",
        "confirm": "order.update",
        "complete": "order.complete",
        "cancel": "order.cancel",
    }
    filterset_fields = ["status", "branch", "order_type"]

    def create(self, request, *args, **kwargs):
        serializer = CreateManualOrderSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        tenant = request.tenant

        branch_id = data.get("branch")
        if branch_id:
            branch = Branch.objects.filter(id=branch_id, tenant=tenant).first()
            if not branch:
                raise ApplicationError("این شعبه متعلق به رستوران شما نیست.", code="INVALID_BRANCH", status_code=400)
        else:
            branch = Branch.objects.filter(tenant=tenant, is_default=True).first()
            if not branch:
                raise ApplicationError("هیچ شعبه‌ای برای این رستوران تعریف نشده.", code="NO_BRANCH", status_code=400)

        table = None
        table_id = data.get("table_id")
        if table_id:
            table = Table.objects.filter(id=table_id, branch=branch).first()
            if not table:
                raise ApplicationError("این میز پیدا نشد یا متعلق به این شعبه نیست.", code="INVALID_TABLE", status_code=400)

        order = create_manual_order(
            tenant=tenant, branch=branch, order_type=data["order_type"],
            items=[{"product_id": str(i["product_id"]), "quantity": i["quantity"]} for i in data["items"]],
            idempotency_key=data.get("idempotency_key"),
            table=table,
            customer_data=data.get("customer"),
            notes=data.get("notes", ""),
            created_by_membership=request.membership,
        )
        return Response(OrderSerializer(order).data, status=201)

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