from django.db.models import Q
from rest_framework import viewsets
from rest_framework.response import Response

from apps.accounts.models import User
from apps.common.exceptions import ApplicationError
from apps.common.mixins import TenantScopedQuerySetMixin

from .models import Membership, Role
from .permissions import HasTenantPermission
from .serializers import MembershipSerializer, RoleSerializer, StaffInviteSerializer
from .services import PrivilegeEscalationError, assign_role


class RoleViewSet(TenantScopedQuerySetMixin, viewsets.ModelViewSet):
    serializer_class = RoleSerializer
    permission_classes = [HasTenantPermission]
    permission_codenames = {
        "create": "staff.manage_roles",
        "update": "staff.manage_roles",
        "partial_update": "staff.manage_roles",
        "destroy": "staff.manage_roles",
    }
    http_method_names = ["get", "post", "head", "options"]

    def get_queryset(self):
        tenant = getattr(self.request, "tenant", None)
        if tenant is None:
            return Role.objects.none()
        return Role.objects.filter(Q(is_system=True) | Q(tenant=tenant)).prefetch_related("permissions")


class StaffViewSet(TenantScopedQuerySetMixin, viewsets.ModelViewSet):
    serializer_class = MembershipSerializer
    permission_classes = [HasTenantPermission]
    permission_codenames = {
        "create": "staff.create",
        "update": "staff.update",
        "partial_update": "staff.update",
        "destroy": "staff.delete",
    }
    required_permission = "staff.view"

    def get_queryset(self):
        return Membership.objects.filter(tenant=self.request.tenant).select_related("user", "role")

    def create(self, request, *args, **kwargs):
        serializer = StaffInviteSerializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        role = serializer.context["role"]
        data = serializer.validated_data

        user, _ = User.objects.get_or_create(
            phone_number=data["phone_number"],
            defaults={"full_name": data.get("full_name", "")},
        )
        membership, created = Membership.objects.get_or_create(
            user=user, tenant=request.tenant, defaults={"role": role, "is_active": True}
        )
        if not created:
            raise ApplicationError("این کاربر قبلاً عضو این مستاجر است.", code="ALREADY_MEMBER")

        return Response(MembershipSerializer(membership).data, status=201)

    def update(self, request, *args, **kwargs):
        membership = self.get_object()
        new_role_id = request.data.get("role")
        if new_role_id:
            try:
                new_role = Role.objects.get(id=new_role_id)
            except Role.DoesNotExist:
                raise ApplicationError("Role not found.", code="ROLE_NOT_FOUND", status_code=404)
            try:
                assign_role(actor_membership=request.membership, target_membership=membership, new_role=new_role)
            except PrivilegeEscalationError as exc:
                raise ApplicationError(str(exc), code="PRIVILEGE_ESCALATION_DENIED", status_code=403)
        return Response(MembershipSerializer(membership).data)