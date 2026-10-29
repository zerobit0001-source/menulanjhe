from tests.conftest import guest_order_payload

ORDERS = "/api/v1/public/orders/"


def disable(client):
    res = client.patch("/api/v1/admin/restaurant_profile/", {"public_ordering_enabled": False}, format="json")
    assert res.status_code == 200, res.content
    return res


def test_enabled_by_default(anon, catalog_a):
    res = anon.post(ORDERS, guest_order_payload(catalog_a), format="json")
    assert res.status_code == 201


def test_disabled_blocks_guest_orders(owner_a, anon, catalog_a):
    disable(owner_a)
    res = anon.post(ORDERS, guest_order_payload(catalog_a), format="json")
    assert res.status_code == 403
    body = res.json()
    assert body["ok"] is False and body["code"] == "PUBLIC_ORDERING_DISABLED"


def test_can_be_turned_back_on(owner_a, anon, catalog_a):
    disable(owner_a)
    owner_a.patch("/api/v1/admin/restaurant_profile/", {"public_ordering_enabled": True}, format="json")
    assert anon.post(ORDERS, guest_order_payload(catalog_a), format="json").status_code == 201


def test_cashier_manual_orders_still_work_when_disabled(owner_a, catalog_a):
    disable(owner_a)
    res = owner_a.post("/api/v1/admin/orders/", {
        "order_type": "TAKEAWAY",
        "items": [{"product_id": str(catalog_a["espresso"].id), "quantity": 1}],
    }, format="json")
    assert res.status_code == 201, res.content


def test_menu_and_resolve_tell_frontend(owner_a, anon, catalog_a):
    menu_url = f"/api/v1/public/menus/{catalog_a['menu'].slug}/"
    resolve_url = f"/api/v1/public/tables/resolve/{catalog_a['table'].qr_token}/"
    assert anon.get(menu_url).json()["ordering_enabled"] is True
    assert anon.get(resolve_url).json()["ordering_enabled"] is True
    disable(owner_a)
    assert anon.get(menu_url).json()["ordering_enabled"] is False
    assert anon.get(resolve_url).json()["ordering_enabled"] is False


def test_only_own_tenant_is_affected(owner_a, anon, catalog_a, catalog_b):
    disable(owner_a)
    payload_b = {"qr_token": catalog_b["table"].qr_token, "idempotency_key": "kb",
                 "items": [{"product_id": str(catalog_b["tea"].id), "quantity": 1}]}
    assert anon.post(ORDERS, payload_b, format="json").status_code == 201


def test_cashier_cannot_toggle_setting(staff_client, tenant_a):
    cashier = staff_client(tenant_a[0], "cashier", "09125550001")
    res = cashier.patch("/api/v1/admin/restaurant_profile/", {"public_ordering_enabled": False}, format="json")
    assert res.status_code == 403
