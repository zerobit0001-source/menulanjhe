from django.shortcuts import get_object_or_404
from rest_framework import permissions
from rest_framework.generics import RetrieveAPIView

from .models import Menu
from .serializers import PublicMenuSerializer


class PublicMenuDetailView(RetrieveAPIView):
    serializer_class = PublicMenuSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = "slug"

    def get_object(self):
        return get_object_or_404(
            Menu.objects.select_related("branch__tenant__restaurant").prefetch_related("categories__products"),
            slug=self.kwargs["slug"],
            is_published=True,
            is_active=True,
            branch__is_active=True,
            branch__tenant__is_active=True,
        )