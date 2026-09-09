from django.conf import settings
from rest_framework import serializers
from .models import Table


class AdminTableSerializer(serializers.ModelSerializer):
    public_url = serializers.SerializerMethodField()

    class Meta:
        model = Table
        fields = ["id", "branch", "name", "number", "capacity", "qr_token", "public_url",
                  "is_active", "created_at"]
        read_only_fields = ["id", "qr_token", "public_url", "created_at"]

    def validate_branch(self, branch):
        tenant = self.context["request"].tenant
        if branch.tenant_id != tenant.id:
            raise serializers.ValidationError("این شعبه متعلق به رستوران شما نیست.")
        return branch

    def get_public_url(self, table):
        base = settings.PUBLIC_TABLE_URL_BASE.rstrip("/")
        return f"{base}/{table.qr_token}"