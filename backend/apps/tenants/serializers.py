from rest_framework import serializers
from apps.accounts.serializers import UserSerializer
from .models import Membership, Permission, Role


class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = ["id", "codename", "description"]


class RoleSerializer(serializers.ModelSerializer):
    permissions = PermissionSerializer(many=True, read_only=True)
    permission_codenames = serializers.SlugRelatedField(
        source="permissions", slug_field="codename", many=True, queryset=Permission.objects.all(), write_only=True
    )

    class Meta:
        model = Role
        fields = ["id", "name", "codename", "is_system", "rank", "permissions", "permission_codenames"]
        read_only_fields = ["id", "is_system", "rank"]

    def create(self, validated_data):
        permissions = validated_data.pop("permissions", [])
        tenant = self.context["request"].tenant
        role = Role.objects.create(tenant=tenant, is_system=False, rank=0, **validated_data)
        role.permissions.set(permissions)
        return role


class MembershipSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    role_codename = serializers.CharField(source="role.codename", read_only=True)

    class Meta:
        model = Membership
        fields = ["id", "user", "role", "role_codename", "branch", "is_active", "created_at"]
        read_only_fields = ["id", "user", "role_codename", "created_at"]


class StaffInviteSerializer(serializers.Serializer):
    phone_number = serializers.CharField()
    full_name = serializers.CharField(required=False, allow_blank=True)
    role_id = serializers.UUIDField()

    def validate_role_id(self, value):
        try:
            role = Role.objects.get(id=value)
        except Role.DoesNotExist:
            raise serializers.ValidationError("نقش مشخص شده وجود ندارد.")
        if role.codename == "owner":
            raise serializers.ValidationError("شما نمی‌توانید کاربر را به عنوان مالک دعوت کنید.")
        if role.tenant_id is not None and role.tenant_id != self.context["request"].tenant.id:
            raise serializers.ValidationError("نقش مشخص شده متعلق به یک مستاجر دیگر است.")
        self.context["role"] = role
        return value