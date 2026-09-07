import secrets
from django.contrib.auth import get_user_model
from django.db import transaction
# from apps.branches.models import Branch
# from apps.restaurants.models import RestaurantProfile
from .models import Membership, Role, Tenant

User = get_user_model()


class PrivilegeEscalationError(Exception):
    pass


def generate_temporary_password() -> str:
    return secrets.token_urlsafe(9)


@transaction.atomic
def onboard_new_tenant(*, phone_number: str, full_name: str, tenant_name: str, tenant_slug: str):
    user, created = User.objects.get_or_create(
        phone_number=phone_number,
        defaults={"full_name": full_name},
    )

    temporary_password = None
    if created:
        temporary_password = generate_temporary_password()
        user.set_password(temporary_password)
        user.save(update_fields=["password"])

    tenant = Tenant.objects.create(name=tenant_name, slug=tenant_slug)
    # RestaurantProfile.objects.create(tenant=tenant, name=tenant_name, slug=tenant_slug)
    # Branch.objects.create(tenant=tenant, name=f"{tenant_name} - Main", slug="main", is_default=True)

    owner_role = Role.objects.get(is_system=True, codename="owner")
    Membership.objects.create(user=user, tenant=tenant, role=owner_role, is_active=True)

    return {"user": user, "tenant": tenant, "temporary_password": temporary_password}


@transaction.atomic
def assign_role(*, actor_membership: Membership, target_membership: Membership, new_role: Role) -> Membership:
    if new_role.codename == "owner" or target_membership.role.codename == "owner":
        raise PrivilegeEscalationError("من نمی‌توانم نقش مالک را تغییر دهم یا به کسی نقش مالک بدهم.")

    if actor_membership.role.codename != "owner" and new_role.rank >= actor_membership.role.rank:
        raise PrivilegeEscalationError("من نمی‌توانم نقشی را به کسی بدهم که سطح آن برابر یا بالاتر از سطح من باشد.")

    target_membership.role = new_role
    target_membership.save(update_fields=["role", "updated_at"])
    return target_membership