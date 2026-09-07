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
            raise serializers.ValidationError("Old password is incorrect.")
        return value

    def validate_new_password(self, value):
        validate_password(value)
        return value

    def save(self):
        user = self.context["request"].user
        user.set_password(self.validated_data["new_password"])
        user.save(update_fields=["password"])
        return user

