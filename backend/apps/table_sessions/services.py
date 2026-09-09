from django.db import transaction
from apps.tables.models import Table
from .models import TableSession


@transaction.atomic
def get_or_open_session(*, table: Table) -> TableSession:
    existing = TableSession.objects.select_for_update().filter(table=table, status="OPEN").first()
    if existing:
        return existing
    return TableSession.objects.create(table=table)