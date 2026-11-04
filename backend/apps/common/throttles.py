from rest_framework.throttling import SimpleRateThrottle


class _BodyKeyThrottle(SimpleRateThrottle):
    body_field = ""

    def get_cache_key(self, request, view):
        value = request.data.get(self.body_field) if hasattr(request.data, "get") else None
        value = str(value).strip() if value is not None else ""
        if not value:
            return None
        return self.cache_format % {"scope": self.scope, "ident": value[:128]}


class LoginPhoneThrottle(_BodyKeyThrottle):
    scope = "auth_login_phone"
    body_field = "phone_number"


class TableQrThrottle(_BodyKeyThrottle):
    scope = "public_order_table"
    body_field = "qr_token"
