from django.core.cache import cache
from django.db import connection
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView


class HealthView(APIView):
    authentication_classes = []
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        checks = {}
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1")
            checks["database"] = "ok"
        except Exception:
            checks["database"] = "error"
        try:
            cache.set("health-check", "1", 5)
            checks["cache"] = "ok" if cache.get("health-check") == "1" else "error"
        except Exception:
            checks["cache"] = "error"

        healthy = all(value == "ok" for value in checks.values())
        return Response(checks, status=200 if healthy else 503)
