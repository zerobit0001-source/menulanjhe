from rest_framework import serializers
from rest_framework.fields import empty

class TomanPriceField(serializers.DecimalField):
    def __init__(self, **kwargs):
        kwargs.setdefault("max_digits", 12)
        kwargs.setdefault("decimal_places", 2)
        kwargs.setdefault("coerce_to_string", False)
        super().__init__(**kwargs)

    def to_representation(self, value):
        value = super().to_representation(value)
        return int(value)


class FormSafeBooleanField(serializers.BooleanField):
    default_empty_html = empty