import io
import os
import pytest
from django.core.files.storage import default_storage
from django.core.files.uploadedfile import SimpleUploadedFile
from PIL import Image

from apps.products.models import Product

URL = "/api/v1/admin/products/"


def make_image(fmt="PNG", size=(3000, 2000), mode="RGB", name=None):
    img = Image.new(mode, size, (200, 80, 40, 255) if mode == "RGBA" else (200, 80, 40))
    buf = io.BytesIO()
    img.save(buf, format=fmt)
    ext = {"PNG": "png", "JPEG": "jpg", "WEBP": "webp", "GIF": "gif"}[fmt]
    ctype = {"PNG": "image/png", "JPEG": "image/jpeg", "WEBP": "image/webp", "GIF": "image/gif"}[fmt]
    return SimpleUploadedFile(name or f"photo.{ext}", buf.getvalue(), content_type=ctype)


def create_product(client, catalog, image=None, name="Cake"):
    data = {"category": str(catalog["category"].id), "name": name, "price": "30000"}
    if image is not None:
        data["image"] = image
    return client.post(URL, data, format="multipart")


@pytest.mark.parametrize("fmt", ["PNG", "JPEG", "WEBP"])
def test_all_allowed_formats_become_webp(owner_a, catalog_a, fmt):
    res = create_product(owner_a, catalog_a, make_image(fmt))
    assert res.status_code == 201, res.content
    product = Product.objects.get(id=res.json()["id"])
    assert product.image and product.optimized_image
    assert product.optimized_image.name.endswith(".webp")
    with product.optimized_image.open("rb") as f:
        assert Image.open(f).format == "WEBP"


def test_resized_keeping_aspect_ratio_and_smaller(owner_a, catalog_a):
    upload = make_image("PNG", size=(3000, 2000))
    original_size = upload.size
    res = create_product(owner_a, catalog_a, upload)
    product = Product.objects.get(id=res.json()["id"])
    with product.optimized_image.open("rb") as f:
        img = Image.open(f)
        assert max(img.size) == 1280
        assert abs(img.width / img.height - 1.5) < 0.01
    assert product.optimized_image.size < original_size


def test_small_image_is_not_upscaled(owner_a, catalog_a):
    res = create_product(owner_a, catalog_a, make_image("JPEG", size=(400, 300)))
    product = Product.objects.get(id=res.json()["id"])
    with product.optimized_image.open("rb") as f:
        assert Image.open(f).size == (400, 300)


def test_transparency_is_preserved(owner_a, catalog_a):
    img = Image.new("RGBA", (500, 500), (0, 0, 0, 0))
    img.paste((200, 80, 40, 255), (100, 100, 400, 400))
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    upload = SimpleUploadedFile("logo.png", buf.getvalue(), content_type="image/png")
    res = create_product(owner_a, catalog_a, upload)
    product = Product.objects.get(id=res.json()["id"])
    with product.optimized_image.open("rb") as f:
        assert Image.open(f).mode == "RGBA"


def test_original_is_kept_and_both_urls_returned(owner_a, catalog_a):
    res = create_product(owner_a, catalog_a, make_image("JPEG"))
    body = res.json()
    assert body["ok"] is True
    assert body["image"].endswith(".jpg") or ".jpg" in body["image"]
    assert body["optimized_image"].endswith(".webp")


def test_file_over_5mb_rejected(owner_a, catalog_a):
    noise = Image.frombytes("RGB", (2000, 2000), os.urandom(2000 * 2000 * 3))
    buf = io.BytesIO()
    noise.save(buf, format="PNG")
    assert len(buf.getvalue()) > 5 * 1024 * 1024
    big = SimpleUploadedFile("big.png", buf.getvalue(), content_type="image/png")
    res = create_product(owner_a, catalog_a, big)
    assert res.status_code == 400
    assert res.json()["ok"] is False
    assert not Product.objects.filter(name="Cake").exists()


def test_fake_image_rejected_even_with_image_extension(owner_a, catalog_a):
    fake = SimpleUploadedFile("evil.jpg", b"<?php echo 'hi'; ?>", content_type="image/jpeg")
    assert create_product(owner_a, catalog_a, fake).status_code == 400


def test_gif_not_allowed(owner_a, catalog_a):
    assert create_product(owner_a, catalog_a, make_image("GIF", size=(50, 50))).status_code == 400


def test_product_without_image_still_works(owner_a, catalog_a):
    res = create_product(owner_a, catalog_a)
    assert res.status_code == 201
    assert res.json()["image"] is None and res.json()["optimized_image"] is None


def test_client_cannot_set_optimized_image_directly(owner_a, catalog_a):
    res = create_product(owner_a, catalog_a)
    pid = res.json()["id"]
    res = owner_a.patch(f"{URL}{pid}/", {"optimized_image": make_image("PNG", size=(50, 50))}, format="multipart")
    assert Product.objects.get(id=pid).optimized_image.name in ("", None)


def test_replacing_image_regenerates_and_deletes_old_files(owner_a, catalog_a):
    res = create_product(owner_a, catalog_a, make_image("PNG", size=(800, 800)))
    product = Product.objects.get(id=res.json()["id"])
    old_original, old_optimized = product.image.name, product.optimized_image.name
    assert default_storage.exists(old_original) and default_storage.exists(old_optimized)

    res = owner_a.patch(f"{URL}{product.id}/", {"image": make_image("JPEG", size=(900, 600))}, format="multipart")
    assert res.status_code == 200, res.content
    product.refresh_from_db()
    assert product.optimized_image.name != old_optimized
    assert not default_storage.exists(old_original)
    assert not default_storage.exists(old_optimized)
    assert default_storage.exists(product.optimized_image.name)


def test_clearing_image_clears_optimized_too(owner_a, catalog_a):
    res = create_product(owner_a, catalog_a, make_image("PNG", size=(300, 300)))
    pid = res.json()["id"]
    res = owner_a.patch(f"{URL}{pid}/", {"image": ""}, format="multipart")
    assert res.status_code == 200, res.content
    product = Product.objects.get(id=pid)
    assert not product.image and not product.optimized_image


def test_patching_other_fields_keeps_images(owner_a, catalog_a):
    res = create_product(owner_a, catalog_a, make_image("PNG", size=(300, 300)))
    pid = res.json()["id"]
    before = Product.objects.get(id=pid).optimized_image.name
    owner_a.patch(f"{URL}{pid}/", {"price": "99000"}, format="multipart")
    assert Product.objects.get(id=pid).optimized_image.name == before


def test_public_menu_exposes_optimized_image(owner_a, catalog_a, anon):
    create_product(owner_a, catalog_a, make_image("PNG", size=(500, 500)))
    res = anon.get(f"/api/v1/public/menus/{catalog_a['menu'].slug}/")
    products = res.json()["categories"][0]["products"]
    with_image = [p for p in products if p["optimized_image"]]
    assert with_image and with_image[0]["optimized_image"].startswith("http")


def test_multipart_product_is_available_by_default(owner_a, catalog_a, anon):
    res = create_product(owner_a, catalog_a, make_image("PNG", size=(300, 300)))
    assert res.json()["is_available"] is True
    assert res.json()["is_featured"] is False
    menu = anon.get(f"/api/v1/public/menus/{catalog_a['menu'].slug}/").json()
    names = [p["name"] for p in menu["categories"][0]["products"]]
    assert "Cake" in names


def test_multipart_can_still_set_booleans_explicitly(owner_a, catalog_a):
    res = owner_a.post(URL, {"category": str(catalog_a["category"].id), "name": "X", "price": "1000",
                             "is_available": "false", "is_featured": "true"}, format="multipart")
    assert res.json()["is_available"] is False and res.json()["is_featured"] is True


def test_multipart_patch_does_not_reset_booleans(owner_a, catalog_a):
    res = create_product(owner_a, catalog_a)
    pid = res.json()["id"]
    res = owner_a.patch(f"{URL}{pid}/", {"price": "5000"}, format="multipart")
    assert res.json()["is_available"] is True
