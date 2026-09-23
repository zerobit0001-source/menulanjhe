from django.conf import settings
from rest_framework import serializers
from .models import Table


class AdminTableSerializer(serializers.ModelSerializer):
    public_url = serializers.SerializerMethodField()
    menu_slug = serializers.SerializerMethodField()

    class Meta:
        model = Table
        fields = ["id", "branch", "name", "number", "capacity", "qr_token", "menu_slug",
                  "public_url", "is_active", "created_at"]
        read_only_fields = ["id", "qr_token", "menu_slug", "public_url", "created_at"]

    def validate_branch(self, branch):
        tenant = self.context["request"].tenant
        if branch.tenant_id != tenant.id:
            raise serializers.ValidationError("این شعبه متعلق به رستوران شما نیست.")
        return branch

    def _get_published_menu(self, table):
        return table.branch.menus.filter(is_active=True, is_published=True).first()

    def get_menu_slug(self, table):
        menu = self._get_published_menu(table)
        return menu.slug if menu else None

    def get_public_url(self, table):
        menu = self._get_published_menu(table)
        if not menu:
            return None
        base = settings.PUBLIC_TABLE_URL_BASE.rstrip("/")
        return f"{base}/{menu.slug}?qr={table.qr_token}"