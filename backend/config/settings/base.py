import os
from pathlib import Path
from dotenv import load_dotenv
from datetime import timedelta

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent.parent

_dotenv_local = BASE_DIR / ".env.local"
# load_dotenv(BASE_DIR / ".env")
load_dotenv(_dotenv_local if _dotenv_local.exists() else BASE_DIR / ".env")


def _env_list(name, default=""):
    return [item.strip() for item in os.getenv(name, default).split(",") if item.strip()]

def _env_bool(name, default=False):
    value = os.getenv(name)
    return default if value is None else value.strip().lower() in ("1", "true", "yes", "on")

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.getenv("DEBUG") == "True"

ALLOWED_HOSTS = _env_list("ALLOWED_HOSTS")


# Application definition

DJANGO_APPS = [
    'daphne',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

THIRD_PARTY_APPS = [
    "rest_framework",
    "rest_framework_simplejwt",
    "corsheaders",
    "channels",
    "drf_spectacular",
    "django_filters",
]

LOCAL_APPS = [
    "apps.common",
    "apps.accounts",
    "apps.tenants",
    "apps.restaurants",
    "apps.branches",
    "apps.menus",
    "apps.products",
    "apps.themes",
    "apps.tables",
    "apps.table_sessions",
    "apps.customers",
    "apps.orders",
    "apps.printing",
    "apps.realtime",
    "apps.reports",
]

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS


MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    "apps.tenants.middleware.TenantContextMiddleware",
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'


# Database
# https://docs.djangoproject.com/en/6.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}



if os.getenv("DATABASE_URL"):
    import environ

    DATABASES = {"default": environ.Env.db_url_config(os.environ["DATABASE_URL"])}
    DATABASES["default"]["CONN_MAX_AGE"] = int(os.getenv("DB_CONN_MAX_AGE", "60"))
    DATABASES["default"]["CONN_HEALTH_CHECKS"] = True





# Password validation
# https://docs.djangoproject.com/en/6.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/6.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Tehran'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/6.1/howto/static-files/

STATIC_URL = 'static/'


# Email
# https://docs.djangoproject.com/en/6.1/topics/email/#topic-email-configuration

MAILERS = {
    'default': {
        'BACKEND': 'django.core.mail.backends.console.EmailBackend',
    },
}


AUTH_USER_MODEL = "accounts.User"


# Rest Framework

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": (
        "rest_framework.permissions.IsAuthenticated",
    ),
    "DEFAULT_FILTER_BACKENDS": ("django_filters.rest_framework.DjangoFilterBackend",),
    "EXCEPTION_HANDLER": "apps.common.exceptions.custom_exception_handler",
    "DEFAULT_PAGINATION_CLASS": "apps.common.pagination.DefaultPagination",
    "DEFAULT_RENDERER_CLASSES": (
        "apps.common.renderers.EnvelopeJSONRenderer",
    ),
    "PAGE_SIZE": 20,

    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
    "DEFAULT_THROTTLE_CLASSES": ("rest_framework.throttling.ScopedRateThrottle",),
    "DEFAULT_THROTTLE_RATES": {
        "auth_login": "20/min",
        "auth_login_phone": "10/min",
        "auth_refresh": "60/min",
        "auth_change_password": "5/min",
        "public_menu": "120/min",
        "public_resolve": "120/min",
        "public_order": "60/min",
        "public_order_table": "10/min",
    },
    "NUM_PROXIES": int(os.getenv("NUM_PROXIES", "0")),
}


SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=30),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
    "ROTATE_REFRESH_TOKENS": True,
}



PUBLIC_TABLE_URL_BASE = os.getenv("PUBLIC_TABLE_URL_BASE")


ASGI_APPLICATION = "config.asgi.application"

# CHANNEL_LAYERS = {
#     "default": {
#         "BACKEND": "channels_redis.core.RedisChannelLayer",
#         "CONFIG": {
#             "hosts": [("127.0.0.1", 6379)],
#         },
#     }
# }

# in development...
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels.layers.InMemoryChannelLayer",
    }
}




# if os.getenv("REDIS_URL"):
#     from urllib.parse import urlparse
# 
#     _redis = urlparse(os.environ["REDIS_URL"])
#     _redis_base = f"{_redis.scheme}://{_redis.netloc}"
#     CHANNEL_LAYERS = {
#         "default": {
#             "BACKEND": "channels_redis.core.RedisChannelLayer",
#             "CONFIG": {"hosts": [f"{_redis_base}/0"]},
#         }
#     }
#     CACHES = {
#         "default": {
#             "BACKEND": "django.core.cache.backends.redis.RedisCache",
#             "LOCATION": f"{_redis_base}/1",
#         }
#     }

if os.getenv("REDIS_URL"):
    from urllib.parse import urlparse

    _redis = urlparse(os.environ["REDIS_URL"])
    _redis_base = f"{_redis.scheme}://{_redis.netloc}"
    CHANNEL_LAYERS = {
        "default": {
            "BACKEND": "channels_redis.core.RedisChannelLayer",
            # redis-py 8 defaults socket_timeout to 5s, the same as the 5s
            # BZPOPMIN that channels_redis blocks on while waiting for
            # messages. Every idle WebSocket then crashed with
            # "Timeout reading from redis" (close code 1011) after ~5s.
            # A larger read timeout restores the normal behaviour.
            "CONFIG": {
                "hosts": [
                    {
                        "address": f"{_redis_base}/0",
                        "socket_timeout": float(os.getenv("REDIS_SOCKET_TIMEOUT", "30")),
                        "socket_connect_timeout": 5,
                        "health_check_interval": 30,
                    }
                ]
            },
        }
    }
    CACHES = {
        "default": {
            "BACKEND": "django.core.cache.backends.redis.RedisCache",
            "LOCATION": f"{_redis_base}/1",
        }
    }

# Uploaded media files
# In production the frontend (Next.js) calls Django over the internal Docker
# network (http://web:8000), so DRF would build image URLs like
# http://web:8000/media/... that browsers can't reach. Setting MEDIA_URL to the
# full public URL (e.g. https://menu.example.com/media/) fixes that, because
# build_absolute_uri() leaves already-absolute URLs untouched.
# Uploaded media files
# MEDIA_URL = "/media/"
# MEDIA_ROOT = BASE_DIR / "media"
# 
# MAX_UPLOAD_SIZE_MB = 5
# IMAGE_MAX_DIMENSION = 1280
# IMAGE_WEBP_QUALITY = 82

MEDIA_URL = os.getenv("MEDIA_URL", "/media/")
if not MEDIA_URL.endswith("/"):
    MEDIA_URL += "/"
MEDIA_ROOT = BASE_DIR / "media"

MAX_UPLOAD_SIZE_MB = 5
IMAGE_MAX_DIMENSION = 1280
IMAGE_WEBP_QUALITY = 82



# Static files
STATIC_ROOT = BASE_DIR / "staticfiles"


# Cors - csrf
CORS_ALLOWED_ORIGINS = _env_list("CORS_ALLOWED_ORIGINS")
CORS_EXPOSE_HEADERS = ["Retry-After"]
CSRF_TRUSTED_ORIGINS = _env_list("CSRF_TRUSTED_ORIGINS")


# Loging
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {"standard": {"format": "%(asctime)s %(levelname)s %(name)s: %(message)s"}},
    "handlers": {"console": {"class": "logging.StreamHandler", "formatter": "standard"}},
    "root": {"handlers": ["console"], "level": os.getenv("LOG_LEVEL", "INFO")},
    "loggers": {"django.request": {"handlers": ["console"], "level": "WARNING", "propagate": False}},
}



# Swager documentation
ENABLE_API_DOCS = _env_bool("ENABLE_API_DOCS", default=DEBUG)

SPECTACULAR_SETTINGS = {
    "TITLE": "Restaurant / Cafe SaaS API",
    "DESCRIPTION": "API documentation for the Restaurant / Cafe SaaS project. This documentation provides details about the available endpoints, request/response formats, and authentication methods.",
    "VERSION": "1.0.0",
    "SERVE_INCLUDE_SCHEMA": False,
    "COMPONENT_SPLIT_REQUEST": True,
}
