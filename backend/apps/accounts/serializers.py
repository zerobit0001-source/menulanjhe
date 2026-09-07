from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

from apps.tenants.models import Membership

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "phone_number", "email", "full_name", "is_active", "created_at"]
        read_only_fields = fields


class MembershipSummarySerializer(serializers.ModelSerializer):
    tenant_id = serializers.UUIDField(source="tenant.id")
    tenant_name = serializers.CharField(source="tenant.name")
    role = serializers.CharField(source="role.codename")

    class Meta:
        model = Membership
        fields = ["tenant_id", "tenant_name", "role", "is_active"]


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True)

    def validate_old_password(self, value):
        user = self.context["request"].user
        if not user.check_password(value):
            raise serializers.ValidationError("رمز عبور قدیمی اشتباه است.")
        return value

    def validate_new_password(self, value):
        validate_password(value)
        return value

    def save(self):
        user = self.context["request"].user
        user.set_password(self.validated_data["new_password"])
        user.save(update_fields=["password"])
        return user


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
        from rest_framework_simplejwt.tokens import RefreshToken

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