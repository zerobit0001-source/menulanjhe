import pytest
from django.contrib.auth import get_user_model

from apps.tenants.models import Membership, Role, Tenant
from tests.conftest import PASSWORD

User = get_user_model()
LOGIN = "/api/v1/auth/login/"
ME = "/api/v1/auth/me/"
SELECT = "/api/v1/auth/select_tenant/"
CHANGE = "/api/v1/auth/change_password/"
REFRESH = "/api/v1/auth/refresh/"
ONBOARD = "/api/v1/platform/onboard_tenant/"


def login(client, phone, password=PASSWORD):
    return client.post(LOGIN, {"phone_number": phone, "password": password}, format="json")


# ------------------------------------------------------------------ login
def test_login_success(anon, tenant_a):
    res = login(anon, tenant_a[1].phone_number)
    body = res.json()
    assert res.status_code == 200 and body["ok"] is True
    assert body["access"] and body["refresh"]


def test_login_wrong_password(anon, tenant_a):
    res = login(anon, tenant_a[1].phone_number, "wrong-password")
    assert res.status_code == 401 and res.json()["ok"] is False


def test_login_unknown_user(anon, db):
    assert login(anon, "09999999999").status_code == 401


def test_login_inactive_user_rejected(anon, tenant_a):
    user = tenant_a[1]
    user.is_active = False
    user.save()
    assert login(anon, user.phone_number).status_code == 401


def test_login_missing_fields(anon, db):
    assert anon.post(LOGIN, {}, format="json").status_code == 400


def test_no_public_registration_endpoint(anon, db):
    for path in ("/api/v1/auth/register/", "/api/v1/auth/signup/"):
        assert anon.post(path, {"phone_number": "09120000000", "password": "Pass12345!"}, format="json").status_code == 404


# ------------------------------------------------------------------ me / select tenant
def test_me_requires_auth(anon, db):
    assert anon.get(ME).status_code == 401


def test_me_lists_memberships(make_client, tenant_a):
    tenant, user = tenant_a
    body = make_client(user).get(ME).json()
    assert body["user"]["phone_number"] == user.phone_number
    assert [m["role"] for m in body["memberships"]] == ["owner"]
    assert body["memberships"][0]["tenant_id"] == str(tenant.id)


def test_me_never_exposes_password(make_client, tenant_a):
    body = make_client(tenant_a[1]).get(ME).json()
    assert "password" not in body["user"]


def test_select_tenant_returns_working_token(make_client, tenant_a):
    tenant, user = tenant_a
    client = make_client(user)
    res = client.post(SELECT, {"tenant_id": str(tenant.id)}, format="json")
    assert res.status_code == 200
    assert res.json()["role"] == "owner" and res.json()["tenant_id"] == str(tenant.id)
    client.credentials(HTTP_AUTHORIZATION=f"Bearer {res.json()['access']}")
    assert client.get("/api/v1/admin/branches/").status_code == 200


def test_select_tenant_where_not_member_is_rejected(make_client, tenant_a, tenant_b):
    client = make_client(tenant_a[1])
    res = client.post(SELECT, {"tenant_id": str(tenant_b[0].id)}, format="json")
    assert res.status_code == 400 and res.json()["ok"] is False


def test_select_tenant_with_garbage_id(make_client, tenant_a):
    assert make_client(tenant_a[1]).post(SELECT, {"tenant_id": "not-a-uuid"}, format="json").status_code == 400


def test_select_tenant_requires_auth(anon, tenant_a):
    assert anon.post(SELECT, {"tenant_id": str(tenant_a[0].id)}, format="json").status_code == 401


def test_admin_requires_authentication(anon, db):
    assert anon.get("/api/v1/admin/products/").status_code == 401


def test_admin_requires_active_tenant(make_client, tenant_a):
    """بعد از Login ولی قبل از Select-Tenant، هیچ مسیر /admin/ جواب نمی‌ده."""
    client = make_client(tenant_a[1])
    for path in ("products", "orders", "tables", "staff", "branches", "dashboard", "reports"):
        assert client.get(f"/api/v1/admin/{path}/").status_code == 403, path


def test_user_in_two_tenants_can_switch_and_sees_only_selected(make_client, tenant_a, tenant_b, catalog_a, catalog_b):
    (ta, user), (tb, _) = tenant_a, tenant_b
    Membership.objects.create(user=user, tenant=tb, role=Role.objects.get(is_system=True, codename="manager"))
    client = make_client(user, ta)
    assert {p["name"] for p in client.get("/api/v1/admin/products/").json()["results"]} == {"Espresso", "Latte"}

    res = client.post(SELECT, {"tenant_id": str(tb.id)}, format="json")
    assert res.json()["role"] == "manager"
    client.credentials(HTTP_AUTHORIZATION=f"Bearer {res.json()['access']}")
    assert {p["name"] for p in client.get("/api/v1/admin/products/").json()["results"]} == {"Tea"}


def test_deactivated_membership_loses_access_immediately(make_client, tenant_a):
    tenant, user = tenant_a
    client = make_client(user, tenant)
    assert client.get("/api/v1/admin/branches/").status_code == 200
    Membership.objects.filter(user=user, tenant=tenant).update(is_active=False)
    assert client.get("/api/v1/admin/branches/").status_code == 403


def test_inactive_tenant_loses_access(make_client, tenant_a):
    tenant, user = tenant_a
    client = make_client(user, tenant)
    Tenant.objects.filter(id=tenant.id).update(is_active=False)
    assert client.get("/api/v1/admin/branches/").status_code == 403


def test_deleted_membership_loses_access(make_client, tenant_a):
    tenant, user = tenant_a
    client = make_client(user, tenant)
    Membership.objects.filter(user=user, tenant=tenant).delete()
    assert client.get("/api/v1/admin/branches/").status_code == 403


def test_tampered_token_is_rejected(anon, tenant_a):
    anon.credentials(HTTP_AUTHORIZATION="Bearer not.a.real.token")
    assert anon.get(ME).status_code == 401
    assert anon.get("/api/v1/admin/products/").status_code == 401


# ------------------------------------------------------------------ refresh / password
def test_refresh_returns_new_access(anon, tenant_a):
    refresh = login(anon, tenant_a[1].phone_number).json()["refresh"]
    res = anon.post(REFRESH, {"refresh": refresh}, format="json")
    assert res.status_code == 200 and res.json()["access"]


def test_refresh_with_garbage_rejected(anon, db):
    assert anon.post(REFRESH, {"refresh": "garbage"}, format="json").status_code == 401


def test_change_password_flow(make_client, anon, tenant_a):
    user = tenant_a[1]
    client = make_client(user)
    assert client.post(CHANGE, {"old_password": "nope", "new_password": "NewPass98765!"}, format="json").status_code == 400
    assert client.post(CHANGE, {"old_password": PASSWORD, "new_password": "123"}, format="json").status_code == 400
    assert client.post(CHANGE, {"old_password": PASSWORD, "new_password": "NewPass98765!"}, format="json").status_code == 200
    assert login(anon, user.phone_number, PASSWORD).status_code == 401
    assert login(anon, user.phone_number, "NewPass98765!").status_code == 200


def test_change_password_requires_auth(anon, db):
    assert anon.post(CHANGE, {"old_password": "a", "new_password": "b"}, format="json").status_code == 401


# ------------------------------------------------------------------ platform onboarding
def test_onboard_requires_authentication(anon, db):
    assert anon.post(ONBOARD, {}, format="json").status_code == 401


def test_onboard_forbidden_for_normal_users(owner_a):
    res = owner_a.post(ONBOARD, {"phone_number": "09127770000", "full_name": "X", "tenant_name": "X", "tenant_slug": "x"},
                       format="json")
    assert res.status_code == 403
    assert not Tenant.objects.filter(slug="x").exists()


def test_onboard_creates_full_setup(make_client, anon, platform_admin):
    client = make_client(platform_admin)
    res = client.post(ONBOARD, {"phone_number": "09127770001", "full_name": "Reza", "tenant_name": "Cafe Z",
                                "tenant_slug": "cafe-z"}, format="json")
    assert res.status_code == 201, res.content
    body = res.json()
    tenant = Tenant.objects.get(slug="cafe-z")
    assert str(tenant.id) == body["tenant_id"]
    assert tenant.restaurant.name == "Cafe Z"
    branch = tenant.branches.get()
    assert branch.is_default
    membership = Membership.objects.get(tenant=tenant)
    assert membership.role.codename == "owner"
    assert membership.user.phone_number == "09127770001"

    # صاحب کافه با رمز موقت می‌تونه وارد بشه
    assert login(anon, "09127770001", body["temporary_password"]).status_code == 200


def test_onboard_duplicate_slug_rejected(make_client, platform_admin, tenant_a):
    res = make_client(platform_admin).post(ONBOARD, {"phone_number": "09127770002", "full_name": "X",
                                                      "tenant_name": "Dup", "tenant_slug": "cafe-a"}, format="json")
    assert res.status_code == 400


def test_onboard_existing_user_keeps_password_and_gets_second_tenant(make_client, anon, platform_admin, tenant_a):
    user = tenant_a[1]
    res = make_client(platform_admin).post(ONBOARD, {"phone_number": user.phone_number, "full_name": "Same",
                                                      "tenant_name": "Second", "tenant_slug": "second"}, format="json")
    assert res.status_code == 201
    assert res.json()["temporary_password"] is None
    assert login(anon, user.phone_number).status_code == 200
    assert Membership.objects.filter(user=user).count() == 2
