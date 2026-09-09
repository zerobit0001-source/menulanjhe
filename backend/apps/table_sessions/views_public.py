from django.shortcuts import get_object_or_404
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.tables.models import Table

from .serializers import TableSessionSerializer
from .services import get_or_open_session


class StartTableSessionView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        qr_token = request.data.get("qr_token")
        if not qr_token:
            return Response({"code": "QR_TOKEN_REQUIRED", "message": "qr_token الزامی است."}, status=400)

        table = get_object_or_404(
            Table.objects.select_related("branch"),
            qr_token=qr_token,
            is_active=True,
            branch__is_active=True,
            branch__tenant__is_active=True,
        )
        session = get_or_open_session(table=table)
        return Response(TableSessionSerializer(session).data, status=201)