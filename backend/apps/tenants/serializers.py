from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Membership


class SelectTenantSerializer(serializers.Serializer):
    tenant_id = serializers.UUIDField()

    def validate_tenant_id(self, value):
        user = self.context["request"].user
        membership = Membership.objects.filter(
            user=user, tenant_id=value, is_active=True, tenant__is_active=True
        ).first()
        if not membership:
            raise serializers.ValidationError("شما عضو این رستوران نیستید یا دسترسی شما غیرفعال شده است.")
        self.context["membership"] = membership
        return value

    def create(self, validated_data):
        membership = self.context["membership"]
        user = self.context["request"].user
        refresh = RefreshToken.for_user(user)
        refresh["active_tenant_id"] = str(membership.tenant_id)
        return {
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "tenant_id": str(membership.tenant_id),
            "role": membership.role.codename,
        }