# from django.shortcuts import get_object_or_404
# from rest_framework import permissions
# from rest_framework.generics import RetrieveAPIView
# 
# from .models import Menu
# from .serializers import PublicMenuSerializer
# 
# 
# class PublicMenuDetailView(RetrieveAPIView):
#     serializer_class = PublicMenuSerializer
#     permission_classes = [permissions.AllowAny]
#     lookup_field = "slug"
# 
#     def get_object(self):
#         return get_object_or_404(
#             Menu.objects.select_related("branch__tenant__restaurant").prefetch_related("categories__products"),
#             slug=self.kwargs["slug"],
#             is_published=True,
#             is_active=True,
#             branch__is_active=True,
#             branch__tenant__is_active=True,
#         )

from django.http import Http404
from rest_framework import permissions
from rest_framework.generics import RetrieveAPIView

from apps.tables.models import Table

from .models import Menu
from .serializers import PublicMenuSerializer


class PublicMenuDetailView(RetrieveAPIView):
    serializer_class = PublicMenuSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = "slug"
    throttle_scope = "public_menu"

    def get_object(self):
        menus = Menu.objects.select_related("branch__tenant__restaurant").prefetch_related(
            "categories__products"
        ).filter(
            slug=self.kwargs["slug"],
            is_published=True,
            is_active=True,
            branch__is_active=True,
            branch__tenant__is_active=True,
        )

        qr = self.request.query_params.get("qr")
        if qr:
            table = Table.objects.filter(qr_token=qr, is_active=True).first()
            if table is None:
                raise Http404
            menus = menus.filter(branch_id=table.branch_id)

        found = list(menus[:2])
        if len(found) != 1:
            raise Http404
        return found[0]
