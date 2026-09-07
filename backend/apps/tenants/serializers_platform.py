from rest_framework import serializers
from .models import Tenant


class OnboardTenantSerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length=20)
    full_name = serializers.CharField(max_length=255)
    tenant_name = serializers.CharField(max_length=255)
    tenant_slug = serializers.SlugField(max_length=255)

    def validate_tenant_slug(self, value):
        if Tenant.objects.filter(slug=value).exists():
            raise serializers.ValidationError("این نام مستعار قبلاً استفاده شده است. لطفاً یک نام مستعار منحصر به فرد انتخاب کنید.")
        return value