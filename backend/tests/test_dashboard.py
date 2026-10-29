from apps.menus.models import Category
from apps.products.models import Product


def test_dashboard_categories_sorted_by_most_products(owner_a, catalog_a):
    menu = catalog_a["menu"]
    big = Category.objects.create(menu=menu, name="Big")
    for i in range(5):
        Product.objects.create(category=big, name=f"b{i}", slug=f"b{i}", price=1000)
    empty = Category.objects.create(menu=menu, name="Empty")

    body = owner_a.get("/api/v1/admin/dashboard/").json()
    counts = [c["product_count"] for c in body["categories"]]
    assert counts == sorted(counts, reverse=True)
    assert body["categories"][0]["name"] == "Big" and counts[0] == 5
    assert body["categories"][-1]["id"] == str(empty.id) and counts[-1] == 0
