"""
مهم‌ترین تست‌های پروژه: کافه‌ی B هیچ‌چیز از کافه‌ی A نباید ببیند، تغییر بدهد، حذف کند
یا با ارجاع (FK) دستکاری کند.
"""
import pytest

from apps.customers.models import Customer
from apps.menus.models import Category, Menu
from apps.orders.models import Order
from apps.products.models import Product
from apps.tables.models import Table
from apps.tenants.models import Membership, Role

ADMIN = "/api/v1/admin"


# ------------------------------------------------------------------ lists
@pytest.mark.parametrize("resource", ["products", "categories", "menus", "tables", "branches", "orders", "customers"])
def test_lists_never_contain_other_tenants_rows(owner_a, owner_b, catalog_a, catalog_b, place_order, resource):
    place_order(catalog_a, "iso-1")
    place_order(catalog_b, "iso-1")  # همون کلید برای tenant دیگه مجازه
    Customer.objects.create(tenant=catalog_a["tenant"], name="A-customer")
    Customer.objects.create(tenant=catalog_b["tenant"], name="B-customer")
    ids_a = {r["id"] for r in owner_a.get(f"{ADMIN}/{resource}/").json()["results"]}
    ids_b = {r["id"] for r in owner_b.get(f"{ADMIN}/{resource}/").json()["results"]}
    assert ids_a and ids_b, f"{resource}: هر دو tenant باید داده داشته باشن"
    assert ids_a.isdisjoint(ids_b)


def test_staff_and_role_lists_are_scoped(owner_a, owner_b, staff_client, tenant_a, tenant_b):
    staff_client(tenant_a[0], "cashier", "09125550101")
    a = {m["user"]["phone_number"] for m in owner_a.get(f"{ADMIN}/staff/").json()["results"]}
    b = {m["user"]["phone_number"] for m in owner_b.get(f"{ADMIN}/staff/").json()["results"]}
    assert "09125550101" in a and "09125550101" not in b
    assert a.isdisjoint(b)


def test_custom_roles_are_private_to_their_tenant(owner_a, owner_b):
    res = owner_a.post(f"{ADMIN}/roles/", {"name": "Shift", "codename": "shift", "permission_codenames": ["order.view"]},
                       format="json")
    assert res.status_code == 201, res.content
    names_b = {r["codename"] for r in owner_b.get(f"{ADMIN}/roles/").json()["results"]}
    assert "shift" not in names_b
    assert "owner" in names_b  # نقش‌های سیستمی برای همه هست


# ------------------------------------------------------------------ detail / update / delete
@pytest.mark.parametrize("resource,key", [
    ("products", "espresso"), ("categories", "category"), ("menus", "menu"), ("tables", "table"), ("branches", "branch"),
])
def test_cannot_read_update_or_delete_other_tenants_object(owner_b, catalog_a, catalog_b, resource, key):
    obj = catalog_a[key]
    url = f"{ADMIN}/{resource}/{obj.id}/"
    assert owner_b.get(url).status_code == 404
    assert owner_b.patch(url, {"name": "hacked"}, format="json").status_code == 404
    assert owner_b.put(url, {"name": "hacked"}, format="json").status_code == 404
    assert owner_b.delete(url).status_code == 404
    obj.refresh_from_db()
    assert getattr(obj, "name", None) != "hacked"


def test_cannot_use_other_tenants_product_actions(owner_b, catalog_a, catalog_b):
    pid = catalog_a["espresso"].id
    assert owner_b.post(f"{ADMIN}/products/{pid}/toggle_active/").status_code == 404
    cid = catalog_a["category"].id
    assert owner_b.post(f"{ADMIN}/categories/{cid}/toggle_active/").status_code == 404
    tid = catalog_a["table"].id
    old = catalog_a["table"].qr_token
    assert owner_b.post(f"{ADMIN}/tables/{tid}/regenerate_token/").status_code == 404
    catalog_a["table"].refresh_from_db()
    assert catalog_a["table"].qr_token == old


def test_cannot_reorder_other_tenants_categories(owner_b, catalog_a, catalog_b):
    cat = catalog_a["category"]
    res = owner_b.post(f"{ADMIN}/categories/reorder/", {"items": [{"id": str(cat.id), "sort_order": 9}]}, format="json")
    assert res.status_code == 400
    cat.refresh_from_db()
    assert cat.sort_order == 0


def test_orders_are_isolated(owner_b, catalog_a, catalog_b, place_order):
    order = place_order(catalog_a, "iso-order")
    url = f"{ADMIN}/orders/{order.id}/"
    assert owner_b.get(url).status_code == 404
    for action in ("confirm", "complete", "cancel"):
        assert owner_b.post(f"{url}{action}/").status_code == 404
    order.refresh_from_db()
    assert order.status == "PENDING"


def test_customers_are_isolated(owner_b, catalog_a, catalog_b, anon):
    anon.post("/api/v1/public/orders/", {**{"qr_token": catalog_a["table"].qr_token, "idempotency_key": "c1",
              "items": [{"product_id": str(catalog_a["espresso"].id), "quantity": 1}]},
              "customer": {"name": "Ali", "phone": "09120001111"}}, format="json")
    assert Customer.objects.filter(tenant=catalog_a["tenant"]).count() == 1
    assert owner_b.get(f"{ADMIN}/customers/").json()["count"] == 0
    cid = Customer.objects.get().id
    assert owner_b.get(f"{ADMIN}/customers/{cid}/").status_code == 404


def test_cannot_modify_other_tenants_staff(owner_b, staff_client, tenant_a):
    cashier = staff_client(tenant_a[0], "cashier", "09125550102")
    mid = cashier.membership.id
    manager_role = Role.objects.get(is_system=True, codename="manager")
    assert owner_b.patch(f"{ADMIN}/staff/{mid}/", {"role": str(manager_role.id)}, format="json").status_code == 404
    assert owner_b.delete(f"{ADMIN}/staff/{mid}/").status_code == 404
    cashier.membership.refresh_from_db()
    assert cashier.membership.role.codename == "cashier"


# ------------------------------------------------------------------ FK injection (ارجاع به داده‌ی tenant دیگر)
def test_cannot_create_menu_in_other_tenants_branch(owner_b, catalog_a, catalog_b):
    res = owner_b.post(f"{ADMIN}/menus/", {"branch": str(catalog_a["branch"].id), "name": "Evil"}, format="json")
    assert res.status_code == 400
    assert not Menu.objects.filter(name="Evil").exists()


def test_cannot_create_category_in_other_tenants_menu(owner_b, catalog_a, catalog_b):
    res = owner_b.post(f"{ADMIN}/categories/", {"menu": str(catalog_a["menu"].id), "name": "Evil"}, format="json")
    assert res.status_code == 400
    assert not Category.objects.filter(name="Evil").exists()


def test_cannot_create_product_in_other_tenants_category(owner_b, catalog_a, catalog_b):
    res = owner_b.post(f"{ADMIN}/products/", {"category": str(catalog_a["category"].id), "name": "Evil", "price": 1},
                       format="json")
    assert res.status_code == 400
    assert not Product.objects.filter(name="Evil").exists()


def test_cannot_move_own_product_into_other_tenants_category(owner_b, catalog_a, catalog_b):
    res = owner_b.patch(f"{ADMIN}/products/{catalog_b['tea'].id}/", {"category": str(catalog_a["category"].id)},
                        format="json")
    assert res.status_code == 400
    catalog_b["tea"].refresh_from_db()
    assert catalog_b["tea"].category_id == catalog_b["category"].id


def test_cannot_create_table_in_other_tenants_branch(owner_b, catalog_a, catalog_b):
    res = owner_b.post(f"{ADMIN}/tables/", {"branch": str(catalog_a["branch"].id), "name": "Evil", "number": 99,
                                           "capacity": 2}, format="json")
    assert res.status_code == 400
    assert not Table.objects.filter(name="Evil").exists()


def test_manual_order_cannot_reference_other_tenants_data(owner_b, catalog_a, catalog_b):
    item = [{"product_id": str(catalog_b["tea"].id), "quantity": 1}]
    # شعبه‌ی tenant دیگه
    res = owner_b.post(f"{ADMIN}/orders/", {"order_type": "DINE_IN", "branch": str(catalog_a["branch"].id),
                                           "items": item}, format="json")
    assert res.status_code == 400
    # میز tenant دیگه
    res = owner_b.post(f"{ADMIN}/orders/", {"order_type": "DINE_IN", "table_id": str(catalog_a["table"].id),
                                           "items": item}, format="json")
    assert res.status_code == 400
    # محصول tenant دیگه
    res = owner_b.post(f"{ADMIN}/orders/", {"order_type": "TAKEAWAY",
                                           "items": [{"product_id": str(catalog_a["espresso"].id), "quantity": 1}]},
                       format="json")
    assert res.status_code == 400
    assert Order.objects.count() == 0


def test_guest_order_cannot_mix_tenants(anon, catalog_a, catalog_b):
    """QR کافه‌ی A + محصول کافه‌ی B → رد می‌شه، چون محصول باید مال همون شعبه‌ی میز باشه."""
    res = anon.post("/api/v1/public/orders/", {"qr_token": catalog_a["table"].qr_token, "idempotency_key": "mix",
                    "items": [{"product_id": str(catalog_b["tea"].id), "quantity": 1}]}, format="json")
    assert res.status_code == 400 and res.json()["code"] == "PRODUCT_UNAVAILABLE"
    assert Order.objects.count() == 0


def test_staff_invite_cannot_use_other_tenants_custom_role(owner_a, owner_b):
    res = owner_a.post(f"{ADMIN}/roles/", {"name": "Secret", "codename": "secret", "permission_codenames": ["order.view"]},
                       format="json")
    role_id = res.json()["id"]
    res = owner_b.post(f"{ADMIN}/staff/", {"phone_number": "09125550103", "role_id": role_id}, format="json")
    assert res.status_code == 400


# ------------------------------------------------------------------ idempotency / reports / public
def test_idempotency_key_is_per_tenant(anon, catalog_a, catalog_b):
    a = anon.post("/api/v1/public/orders/", {"qr_token": catalog_a["table"].qr_token, "idempotency_key": "same",
                  "items": [{"product_id": str(catalog_a["espresso"].id), "quantity": 1}]}, format="json")
    b = anon.post("/api/v1/public/orders/", {"qr_token": catalog_b["table"].qr_token, "idempotency_key": "same",
                  "items": [{"product_id": str(catalog_b["tea"].id), "quantity": 1}]}, format="json")
    assert a.status_code == 201 and b.status_code == 201
    assert a.json()["id"] != b.json()["id"]


def test_dashboard_and_reports_only_count_own_data(owner_a, owner_b, catalog_a, catalog_b, place_order):
    place_order(catalog_a, "r1")
    place_order(catalog_a, "r2")
    dash_b = owner_b.get(f"{ADMIN}/dashboard/").json()
    assert dash_b["summary"]["pending_order_count"] == 0
    assert dash_b["summary"]["product_count"] == 1
    assert dash_b["recent_orders"] == []
    assert owner_b.get(f"{ADMIN}/reports/?period=today").json()["summary"]["orders_count"] == 0
    assert owner_a.get(f"{ADMIN}/reports/?period=today").json()["summary"]["orders_count"] == 2


def test_resolve_and_public_menu_never_cross_tenants(anon, catalog_a, catalog_b):
    resolved = anon.get(f"/api/v1/public/tables/resolve/{catalog_a['table'].qr_token}/").json()
    assert resolved["tenant_slug"] == "cafe-a" and resolved["menu_slug"] == "main-a"
    menu = anon.get("/api/v1/public/menus/main-a/").json()
    names = {p["name"] for c in menu["categories"] for p in c["products"]}
    assert names == {"Espresso", "Latte"}


def test_same_menu_slug_in_two_tenants_is_resolved_by_qr(owner_a, owner_b, anon, tenant_a, tenant_b):
    """دو کافه هر دو منوی «Main» می‌سازن → اسلاگ یکسان. نباید خطای سرور بده یا منوی کافه‌ی دیگه رو نشون بده."""
    for client, tenant in ((owner_a, tenant_a[0]), (owner_b, tenant_b[0])):
        branch = tenant.branches.get(is_default=True)
        res = client.post(f"{ADMIN}/menus/", {"branch": str(branch.id), "name": "Main", "is_published": True},
                          format="json")
        assert res.status_code == 201 and res.json()["slug"] == "main"
        Table.objects.create(branch=branch, name="T", number=1, capacity=2)
    qr_a = Table.objects.get(branch__tenant=tenant_a[0]).qr_token
    qr_b = Table.objects.get(branch__tenant=tenant_b[0]).qr_token

    assert anon.get("/api/v1/public/menus/main/").status_code in (200, 404)  # حداقل ۵۰۰ نباشه
    assert anon.get(f"/api/v1/public/menus/main/?qr={qr_a}").json()["restaurant_name"] == "Cafe cafe-a"
    assert anon.get(f"/api/v1/public/menus/main/?qr={qr_b}").json()["restaurant_name"] == "Cafe cafe-b"
