class TenantScopedQuerySetMixin:
    tenant_lookup = "tenant"

    def get_queryset(self):
        qs = super().get_queryset()
        tenant = getattr(self.request, "tenant", None)
        if tenant is None:
            return qs.none()
        return qs.filter(**{self.tenant_lookup: tenant})