from rest_framework import serializers
from apps.menus.serializers import AdminCategorySerializer


class DashboardCategorySerializer(AdminCategorySerializer):
    product_count = serializers.IntegerField(read_only=True)

    class Meta(AdminCategorySerializer.Meta):
        fields = AdminCategorySerializer.Meta.fields + ["product_count"]
        read_only_fields = AdminCategorySerializer.Meta.read_only_fields + ["product_count"]