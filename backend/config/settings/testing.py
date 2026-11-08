from .development import *  

PASSWORD_HASHERS = ["django.contrib.auth.hashers.MD5PasswordHasher"]

CHANNEL_LAYERS = {"default": {"BACKEND": "channels.layers.InMemoryChannelLayer"}}
CACHES = {"default": {"BACKEND": "django.core.cache.backends.locmem.LocMemCache"}}

REST_FRAMEWORK = {
    **REST_FRAMEWORK,
    "DEFAULT_THROTTLE_RATES": {k: "100000/min" for k in REST_FRAMEWORK["DEFAULT_THROTTLE_RATES"]},
}

PUBLIC_TABLE_URL_BASE = globals().get("PUBLIC_TABLE_URL_BASE") or "https://example.com/menu"


DATABASES["default"]["CONN_MAX_AGE"] = 0

CORS_ALLOWED_ORIGINS = ["https://app.example.com"]
CORS_ALLOWED_ORIGIN_REGEXES = []