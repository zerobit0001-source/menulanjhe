from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError


class TenantContextMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self._jwt_auth = JWTAuthentication()

    def __call__(self, request):
        request.tenant = None
        request.membership = None

        auth_header = request.META.get("HTTP_AUTHORIZATION", "")
        if auth_header.startswith("Bearer "):
            try:
                raw_token = auth_header.split(" ", 1)[1]
                validated_token = self._jwt_auth.get_validated_token(raw_token)
                user = self._jwt_auth.get_user(validated_token)

                active_tenant_id = validated_token.get("active_tenant_id")
                if active_tenant_id:
                    from apps.tenants.models import Membership

                    membership = (
                        Membership.objects.select_related("tenant", "role")
                        .filter(
                            user=user,
                            tenant_id=active_tenant_id,
                            is_active=True,
                            tenant__is_active=True,
                        )
                        .first()
                    )
                    if membership:
                        request.tenant = membership.tenant
                        request.membership = membership
            except (InvalidToken, TokenError, Exception):
                pass

        return self.get_response(request)