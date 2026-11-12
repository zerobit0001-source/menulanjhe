# import os
# from django.core.exceptions import ImproperlyConfigured
# from .base import *
# from .base import ALLOWED_HOSTS, SECRET_KEY, _env_bool
# 
# DEBUG = False
# 
# if not SECRET_KEY or len(SECRET_KEY) < 32 or SECRET_KEY.startswith("django-insecure"):
#     raise ImproperlyConfigured("Secret key must be set, at least 32 characters long, and random (not the default Django value).")
# 
# if not ALLOWED_HOSTS:
#     raise ImproperlyConfigured("ALLOWED_HOSTS is empty. Please specify domains separated by commas: ALLOWED_HOSTS=api.example.com")
# 
# if not os.getenv("DATABASE_URL"):
#     raise ImproperlyConfigured("DATABASE_URL is not set. Production must use PostgreSQL, not SQLite.")
# 
# if not os.getenv("REDIS_URL"):
#     raise ImproperlyConfigured(
#         "REDIS_URL is not set. Without Redis, WebSocket between processes won't work and Rate Limit will be separate for each Worker."
#     )
# 
# 
# SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
# 
# USE_HTTPS = _env_bool("USE_HTTPS", True)
# SECURE_SSL_REDIRECT = USE_HTTPS
# SECURE_REDIRECT_EXEMPT = [r"^api/health/$"]
# SESSION_COOKIE_SECURE = USE_HTTPS
# CSRF_COOKIE_SECURE = USE_HTTPS
# 
# 
# SECURE_HSTS_SECONDS = int(os.getenv("SECURE_HSTS_SECONDS", "0")) if USE_HTTPS else 0
# SECURE_HSTS_INCLUDE_SUBDOMAINS = SECURE_HSTS_SECONDS > 0
# SECURE_HSTS_PRELOAD = False
# 
# SECURE_CONTENT_TYPE_NOSNIFF = True
# SECURE_REFERRER_POLICY = "same-origin"
# X_FRAME_OPTIONS = "DENY"
# 
# 
# MAILERS = {
#     "default": {
#         "BACKEND": "django.core.mail.backends.smtp.EmailBackend",
#         "OPTIONS": {
#             key: value
#             for key, value in {
#                 "host": os.getenv("EMAIL_HOST"),
#                 "port": int(os.getenv("EMAIL_PORT", "587")) if os.getenv("EMAIL_HOST") else None,
#                 "username": os.getenv("EMAIL_HOST_USER"),
#                 "password": os.getenv("EMAIL_HOST_PASSWORD"),
#                 "use_tls": _env_bool("EMAIL_USE_TLS", True) if os.getenv("EMAIL_HOST") else None,
#             }.items()
#             if value is not None
#         },
#     }
# }
# 
# ENABLE_API_DOCS = _env_bool("ENABLE_API_DOCS", False)
# 


# After ready to production 
import os
from django.core.exceptions import ImproperlyConfigured
from .base import *
from .base import ALLOWED_HOSTS, SECRET_KEY, _env_bool, _env_list

DEBUG = False

if not SECRET_KEY or len(SECRET_KEY) < 32 or SECRET_KEY.startswith("django-insecure"):
    raise ImproperlyConfigured("Secret key must be set, at least 32 characters long, and random (not the default Django value).")

if not ALLOWED_HOSTS:
    raise ImproperlyConfigured("ALLOWED_HOSTS is empty. Please specify domains separated by commas: ALLOWED_HOSTS=api.example.com")

# Internal Docker hostnames: the Next.js server reaches Django at http://web:8000
# and the container healthcheck uses localhost. Neither is reachable from outside
# (only nginx publishes ports), so allowing them is safe.
for _internal_host in _env_list("INTERNAL_ALLOWED_HOSTS", "web,localhost,127.0.0.1"):
    if _internal_host not in ALLOWED_HOSTS:
        ALLOWED_HOSTS.append(_internal_host)

if not os.getenv("DATABASE_URL"):
    raise ImproperlyConfigured("DATABASE_URL is not set. Production must use PostgreSQL, not SQLite.")

if not os.getenv("REDIS_URL"):
    raise ImproperlyConfigured(
        "REDIS_URL is not set. Without Redis, WebSocket between processes won't work and Rate Limit will be separate for each Worker."
    )


SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

USE_HTTPS = _env_bool("USE_HTTPS", True)
# The HTTP -> HTTPS redirect is done by nginx. Doing it in Django as well would
# break the internal calls from Next.js (http://web:8000 has no
# X-Forwarded-Proto header, so Django would answer every one of them with 301).
SECURE_SSL_REDIRECT = _env_bool("SECURE_SSL_REDIRECT", False)
SECURE_REDIRECT_EXEMPT = [r"^api/health/$"]
SESSION_COOKIE_SECURE = USE_HTTPS
CSRF_COOKIE_SECURE = USE_HTTPS


SECURE_HSTS_SECONDS = int(os.getenv("SECURE_HSTS_SECONDS", "0")) if USE_HTTPS else 0
SECURE_HSTS_INCLUDE_SUBDOMAINS = SECURE_HSTS_SECONDS > 0
SECURE_HSTS_PRELOAD = False

SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_REFERRER_POLICY = "same-origin"
X_FRAME_OPTIONS = "DENY"


MAILERS = {
    "default": {
        "BACKEND": "django.core.mail.backends.smtp.EmailBackend",
        "OPTIONS": {
            key: value
            for key, value in {
                "host": os.getenv("EMAIL_HOST"),
                "port": int(os.getenv("EMAIL_PORT", "587")) if os.getenv("EMAIL_HOST") else None,
                "username": os.getenv("EMAIL_HOST_USER"),
                "password": os.getenv("EMAIL_HOST_PASSWORD"),
                "use_tls": _env_bool("EMAIL_USE_TLS", True) if os.getenv("EMAIL_HOST") else None,
            }.items()
            if value is not None
        },
    }
}

ENABLE_API_DOCS = _env_bool("ENABLE_API_DOCS", False)
