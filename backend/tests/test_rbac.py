import pytest

from apps.tenants.models import Membership, Role
from apps.tenants.permission_matrix import ROLE_PERMISSIONS, ROLES

ADMIN = "/api/v1/admin"

# (method, path, permission لازم، body)
ENDPOINTS = [
    ("GET", "/orders/", "order.view", None),
    ("GET", "/products/", "product.view", None),
    ("GET", "/categories/", "category.view", None),
    ("GET", "/menus/", "menu.view", None),
    ("GET", "/tables/", "table.view", None),
    ("GET", "/staff/", "staff.view", None),
    ("GET", "/customers/", "customer.view", None),
    ("GET", "/reports/", "reports.view", None),
    ("GET", "/dashboard/", "reports.view", None),
    ("GET", "/restaurant_profile/", "settings.view", None),
    ("GET", "/branches/", "settings.view", None),
    ("POST", "/products/", "product.create", {}),
    ("POST", "/categories/", "category.create", {}),
    ("POST", "/menus/", "menu.create", {}),
    ("POST", "/tables/", "table.create", {}),
    ("POST", "/staff/", "staff.create", {}),
    ("POST", "/roles/", "staff.manage_roles", {}),
    ("POST", "/orders/", "order.create", {}),
    ("POST", "/branches/", "settings.manage", {}),
    ("PATCH", "/restaurant_profile/", "settings.manage", {"phone": "02100000000"}),
]


@pytest.mark.parametrize("role", list(ROLES))
@pytest.mark.parametrize("method,path,perm,body", ENDPOINTS, ids=[f"{m} {p}" for m, p, _, _ in ENDPOINTS])
def test_permission_matrix(staff_client, tenant_a, catalog_a, role, method, path, perm, body):
    """ماتریس کامل: هر نقش فقط به endpointهایی که Permission‌شو داره دسترسی داره؛ بقیه دقیقاً ۴۰۳."""
    client = staff_client(tenant_a[0], role, "09125559999")
    kwargs = {"format": "json"}
    if body is not None:
        kwargs["data"] = body
    res = getattr(client, method.lower())(f"{ADMIN}{path}", **kwargs)
    allowed = perm in ROLE_PERMISSIONS[role]
    if allowed:
        assert res.status_code not in (401, 403), f"{role} باید به {method} {path} دسترسی داشته باشه ولی {res.status_code}"
    else:
        assert res.status_code == 403, f"{role} نباید به {method} {path} دسترسی داشته باشه ولی {res.status_code}"


# ------------------------------------------------------------------ مثال‌های واقعی از نیازمندی‌های پروژه
def test_cashier_can_create_manual_order_but_not_see_finance(staff_client, tenant_a, catalog_a):
    cashier = staff_client(tenant_a[0], "cashier", "09125551001")
    res = cashier.post(f"{ADMIN}/orders/", {"order_type": "TAKEAWAY",
                       "items": [{"product_id": str(catalog_a["espresso"].id), "quantity": 1}]}, format="json")
    assert res.status_code == 201
    assert cashier.get(f"{ADMIN}/reports/").status_code == 403
    assert cashier.get(f"{ADMIN}/dashboard/").status_code == 403


def test_waiter_can_take_orders_but_not_change_their_status_or_see_finance(staff_client, tenant_a, catalog_a, place_order):
    waiter = staff_client(tenant_a[0], "waiter", "09125551002")
    assert waiter.post(f"{ADMIN}/orders/", {"order_type": "DINE_IN", "table_id": str(catalog_a["table"].id),
                       "items": [{"product_id": str(catalog_a["espresso"].id), "quantity": 1}]}, format="json").status_code == 201
    order = place_order(catalog_a, "w1")
    for action in ("confirm", "complete", "cancel"):
        assert waiter.post(f"{ADMIN}/orders/{order.id}/{action}/").status_code == 403
    assert waiter.get(f"{ADMIN}/reports/").status_code == 403


def test_cashier_can_run_the_whole_order_lifecycle(staff_client, tenant_a, catalog_a, place_order):
    cashier = staff_client(tenant_a[0], "cashier", "09125551003")
    order = place_order(catalog_a, "l1")
    assert cashier.post(f"{ADMIN}/orders/{order.id}/confirm/").status_code == 200
    assert cashier.post(f"{ADMIN}/orders/{order.id}/complete/").status_code == 200


def test_staff_role_is_read_only_on_orders(staff_client, tenant_a, catalog_a, place_order):
    staff = staff_client(tenant_a[0], "staff", "09125551004")
    order = place_order(catalog_a, "s1")
    assert staff.get(f"{ADMIN}/orders/").status_code == 200
    assert staff.get(f"{ADMIN}/orders/{order.id}/").status_code == 200
    assert staff.post(f"{ADMIN}/orders/{order.id}/cancel/").status_code == 403


def test_accountant_sees_reports_but_not_operations(staff_client, tenant_a, catalog_a):
    acc = staff_client(tenant_a[0], "accountant", "09125551005")
    assert acc.get(f"{ADMIN}/reports/?period=today").status_code == 200
    assert acc.get(f"{ADMIN}/orders/").status_code == 403
    assert acc.get(f"{ADMIN}/products/").status_code == 403


def test_manager_cannot_change_restaurant_settings(staff_client, tenant_a):
    manager = staff_client(tenant_a[0], "manager", "09125551006")
    assert manager.get(f"{ADMIN}/restaurant_profile/").status_code == 200
    assert manager.patch(f"{ADMIN}/restaurant_profile/", {"public_ordering_enabled": False}, format="json").status_code == 403


# ------------------------------------------------------------------ Privilege escalation
def _role(codename):
    return Role.objects.get(is_system=True, codename=codename)


def test_nobody_can_invite_an_owner(owner_a, staff_client, tenant_a):
    manager = staff_client(tenant_a[0], "manager", "09125552001")
    body = {"phone_number": "09125552002", "role_id": str(_role("owner").id)}
    assert owner_a.post(f"{ADMIN}/staff/", body, format="json").status_code == 400
    assert manager.post(f"{ADMIN}/staff/", body, format="json").status_code == 400
    assert not Membership.objects.filter(user__phone_number="09125552002").exists()


def test_manager_can_invite_lower_roles(staff_client, tenant_a):
    manager = staff_client(tenant_a[0], "manager", "09125552003")
    res = manager.post(f"{ADMIN}/staff/", {"phone_number": "09125552004", "full_name": "N",
                                          "role_id": str(_role("cashier").id)}, format="json")
    assert res.status_code == 201 and res.json()["role_codename"] == "cashier"


def test_manager_cannot_promote_anyone_to_manager_or_above(staff_client, tenant_a):
    manager = staff_client(tenant_a[0], "manager", "09125552005")
    cashier = staff_client(tenant_a[0], "cashier", "09125552006")
    url = f"{ADMIN}/staff/{cashier.membership.id}/"
    for target in ("manager", "owner"):
        res = manager.patch(url, {"role": str(_role(target).id)}, format="json")
        assert res.status_code == 403, target
    cashier.membership.refresh_from_db()
    assert cashier.membership.role.codename == "cashier"


def test_manager_can_demote_to_lower_role(staff_client, tenant_a):
    manager = staff_client(tenant_a[0], "manager", "09125552007")
    cashier = staff_client(tenant_a[0], "cashier", "09125552008")
    res = manager.patch(f"{ADMIN}/staff/{cashier.membership.id}/", {"role": str(_role("waiter").id)}, format="json")
    assert res.status_code == 200
    cashier.membership.refresh_from_db()
    assert cashier.membership.role.codename == "waiter"


def test_cashier_cannot_change_roles_including_own(staff_client, tenant_a):
    cashier = staff_client(tenant_a[0], "cashier", "09125552009")
    res = cashier.patch(f"{ADMIN}/staff/{cashier.membership.id}/", {"role": str(_role("manager").id)}, format="json")
    assert res.status_code == 403
    cashier.membership.refresh_from_db()
    assert cashier.membership.role.codename == "cashier"


def test_owner_role_cannot_be_changed_by_anyone(owner_a, staff_client, tenant_a):
    owner_membership = Membership.objects.get(tenant=tenant_a[0], role__codename="owner")
    manager = staff_client(tenant_a[0], "manager", "09125552010")
    for client in (owner_a, manager):
        res = client.patch(f"{ADMIN}/staff/{owner_membership.id}/", {"role": str(_role("staff").id)}, format="json")
        assert res.status_code == 403
    owner_membership.refresh_from_db()
    assert owner_membership.role.codename == "owner"


def test_owner_membership_cannot_be_deleted(owner_a, tenant_a):
    """اگه تنها Owner حذف بشه، کافه برای همیشه بدون صاحب می‌مونه."""
    owner_membership = Membership.objects.get(tenant=tenant_a[0], role__codename="owner")
    res = owner_a.delete(f"{ADMIN}/staff/{owner_membership.id}/")
    assert res.status_code == 403
    assert Membership.objects.filter(id=owner_membership.id).exists()


def test_manager_cannot_delete_staff(staff_client, tenant_a):
    manager = staff_client(tenant_a[0], "manager", "09125552011")
    cashier = staff_client(tenant_a[0], "cashier", "09125552012")
    assert manager.delete(f"{ADMIN}/staff/{cashier.membership.id}/").status_code == 403
    assert Membership.objects.filter(id=cashier.membership.id).exists()


def test_owner_can_remove_staff(owner_a, staff_client, tenant_a):
    cashier = staff_client(tenant_a[0], "cashier", "09125552013")
    assert owner_a.delete(f"{ADMIN}/staff/{cashier.membership.id}/").status_code == 204
    assert not Membership.objects.filter(id=cashier.membership.id).exists()


def test_inviting_existing_member_is_rejected(owner_a, staff_client, tenant_a):
    staff_client(tenant_a[0], "cashier", "09125552014")
    res = owner_a.post(f"{ADMIN}/staff/", {"phone_number": "09125552014", "role_id": str(_role("waiter").id)}, format="json")
    assert res.status_code == 400 and res.json()["code"] == "ALREADY_MEMBER"


# ------------------------------------------------------------------ Custom roles
def test_custom_role_grants_exactly_its_permissions(owner_a, make_fast_client, tenant_a, catalog_a):
    res = owner_a.post(f"{ADMIN}/roles/", {"name": "Shift Manager", "codename": "shift-manager",
                       "permission_codenames": ["order.view", "order.update", "table.view"]}, format="json")
    assert res.status_code == 201, res.content
    role_id = res.json()["id"]

    res = owner_a.post(f"{ADMIN}/staff/", {"phone_number": "09125553001", "full_name": "S", "role_id": role_id}, format="json")
    assert res.status_code == 201
    membership = Membership.objects.get(user__phone_number="09125553001")
    client = make_fast_client(membership.user, tenant_a[0])

    assert client.get(f"{ADMIN}/orders/").status_code == 200
    assert client.get(f"{ADMIN}/tables/").status_code == 200
    assert client.get(f"{ADMIN}/products/").status_code == 403
    assert client.get(f"{ADMIN}/reports/").status_code == 403
    assert client.post(f"{ADMIN}/orders/", {}, format="json").status_code == 403  # order.create نداره


def test_only_owner_can_create_roles(staff_client, tenant_a):
    manager = staff_client(tenant_a[0], "manager", "09125553002")
    res = manager.post(f"{ADMIN}/roles/", {"name": "X", "codename": "x", "permission_codenames": ["order.view"]}, format="json")
    assert res.status_code == 403


def test_system_roles_are_listed_and_read_only(owner_a):
    body = owner_a.get(f"{ADMIN}/roles/").json()
    codenames = {r["codename"] for r in body["results"]}
    assert set(ROLES) <= codenames
    owner_role = next(r for r in body["results"] if r["codename"] == "owner")
    assert owner_role["is_system"] is True
    assert owner_a.patch(f"{ADMIN}/roles/{owner_role['id']}/", {"name": "X"}, format="json").status_code == 405
    assert owner_a.delete(f"{ADMIN}/roles/{owner_role['id']}/").status_code == 405
