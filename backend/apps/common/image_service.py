import io
import uuid

from django.conf import settings
from django.core.files.base import ContentFile
from PIL import Image, ImageOps, UnidentifiedImageError

ALLOWED_FORMATS = {"JPEG", "PNG", "WEBP"}


class ImageValidationError(ValueError):
    """پیام این خطا مستقیم به کاربر نمایش داده می‌شه."""
    pass

def _setting(name, default):
    return getattr(settings, name, default)


def validate_image_upload(uploaded_file) -> Image.Image:
    max_mb = _setting("MAX_UPLOAD_SIZE_MB", 5)
    if uploaded_file.size > max_mb * 1024 * 1024:
        raise ImageValidationError(f"حجم عکس نباید بیشتر از {max_mb} مگابایت باشد.")

    try:
        uploaded_file.seek(0)
        probe = Image.open(uploaded_file)
        probe.verify()
        uploaded_file.seek(0)
        image = Image.open(uploaded_file)
    except (UnidentifiedImageError, OSError, SyntaxError, ValueError, Image.DecompressionBombError):
        raise ImageValidationError("فایل ارسالی یک عکس معتبر نیست.")

    if image.format not in ALLOWED_FORMATS:
        raise ImageValidationError("فقط فرمت‌های JPG، PNG و WEBP مجاز هستند.")

    if image.width * image.height > _setting("IMAGE_MAX_PIXELS", 40_000_000):
        raise ImageValidationError("ابعاد عکس بیش از حد بزرگ است.")

    return image


def optimize_image(uploaded_file, *, max_dimension=None, quality=None) -> ContentFile:
    max_dimension = max_dimension or _setting("IMAGE_MAX_DIMENSION", 1280)
    quality = quality or _setting("IMAGE_WEBP_QUALITY", 82)

    image = validate_image_upload(uploaded_file)

    try:
        image = ImageOps.exif_transpose(image)
        has_alpha = image.mode in ("RGBA", "LA") or (image.mode == "P" and "transparency" in image.info)
        image = image.convert("RGBA" if has_alpha else "RGB")

        image.thumbnail((max_dimension, max_dimension), Image.LANCZOS)

        buffer = io.BytesIO()
        image.save(buffer, format="WEBP", quality=quality, method=6)
    except (OSError, ValueError, Image.DecompressionBombError):
        raise ImageValidationError("پردازش عکس ناموفق بود. فایل دیگری امتحان کنید.")
    finally:
        uploaded_file.seek(0)

    return ContentFile(buffer.getvalue(), name=f"{uuid.uuid4().hex}.webp")
