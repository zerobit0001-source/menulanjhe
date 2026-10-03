from rest_framework import serializers
from apps.menus.serializers import AdminCategorySerializer


class DashboardCategorySerializer(AdminCategorySerializer):
    product_count = serializers.IntegerField(read_only=True)

    class Meta(AdminCategorySerializer.Meta):
        fields = AdminCategorySerializer.Meta.fields + ["product_count"]
        read_only_fields = AdminCategorySerializer.Meta.read_only_fields + ["product_count"]


class ReportQuerySerializer(serializers.Serializer):
    period = serializers.ChoiceField(choices=["today", "week", "month", "custom"], default="today")
    from_date = serializers.CharField(required=False, source="from")
    to_date = serializers.CharField(required=False, source="to")
    limit = serializers.IntegerField(required=False, default=10, min_value=1, max_value=50)