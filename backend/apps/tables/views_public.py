from django.shortcuts import get_object_or_404
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Table


class ResolveTableView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, qr_token):
        table = get_object_or_404(
            Table.objects.select_related("branch__tenant"),
            qr_token=qr_token,
            is_active=True,
            branch__is_active=True,
            branch__tenant__is_active=True,
        )
        
        menu = table.branch.menus.filter(is_active=True, is_published=True).first()

        return Response(
            {
                "table_id": str(table.id),
                "table_name": table.name,
                "tenant_slug": table.branch.tenant.slug,
                "branch_id": str(table.branch_id),
                "menu_slug": menu.slug if menu else None,
            }
        )