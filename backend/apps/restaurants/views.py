from rest_framework import generics
from apps.tenants.permissions import HasTenantPermission
from .models import RestaurantProfile
from .serializers import RestaurantProfileSerializer


class RestaurantProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = RestaurantProfileSerializer
    permission_classes = [HasTenantPermission]
    required_permission = "settings.view"
    permission_codenames = {"update": "settings.manage", "partial_update": "settings.manage"}

    def get_object(self):
        return RestaurantProfile.objects.get(tenant=self.request.tenant)