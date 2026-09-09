from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from apps.table_sessions.models import TableSession
from .exceptions import InvalidTableSession
from .serializers import CreateDineInOrderSerializer, OrderSerializer
from .services import create_dine_in_order


class CreateGuestOrderView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = CreateDineInOrderSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        session = TableSession.objects.select_related("table__branch__tenant").filter(
            session_token=data["session_token"], status="OPEN"
        ).first()
        if not session:
            raise InvalidTableSession("Table session نامعتبر یا بسته شده است.")

        order = create_dine_in_order(
            tenant=session.table.branch.tenant,
            branch=session.table.branch,
            session_token=data["session_token"],
            items=[{"product_id": str(i["product_id"]), "quantity": i["quantity"]} for i in data["items"]],
            idempotency_key=data["idempotency_key"],
            customer_data=data.get("customer"),
            notes=data.get("notes", ""),
        )
        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)