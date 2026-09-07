PERMISSIONS = [
    ("menu.view", "View menus"), ("menu.create", "Create menus"),
    ("menu.update", "Update menus"), ("menu.delete", "Delete menus"),
    ("category.view", "View categories"), ("category.create", "Create categories"),
    ("category.update", "Update categories"), ("category.delete", "Delete categories"),
    ("product.view", "View products"), ("product.create", "Create products"),
    ("product.update", "Update products"), ("product.delete", "Delete products"),
    ("table.view", "View tables"), ("table.create", "Create tables"),
    ("table.update", "Update tables"), ("table.delete", "Delete tables"),
    ("order.view", "View orders"), ("order.create", "Create orders"),
    ("order.update", "Update orders"), ("order.cancel", "Cancel orders"),
    ("order.complete", "Complete orders"),
    ("staff.view", "View staff"), ("staff.create", "Create staff"),
    ("staff.update", "Update staff"), ("staff.delete", "Delete staff"),
    ("staff.manage_roles", "Change a staff member's role"),
    ("customer.view", "View customers"),
    ("financial.view", "View financial data"), ("financial.manage", "Manage financial data"),
    ("accounting.view", "View accounting data"), ("accounting.manage", "Manage accounting data"),
    ("reports.view", "View reports"),
    ("settings.view", "View settings"), ("settings.manage", "Manage settings"),
    ("subscription.view", "View subscription"), ("subscription.manage", "Manage subscription"),
]

ROLES = {
    "owner": {"name": "Owner", "rank": 100},
    "manager": {"name": "Manager", "rank": 80},
    "accountant": {"name": "Accountant", "rank": 60},
    "cashier": {"name": "Cashier", "rank": 40},
    "waiter": {"name": "Waiter", "rank": 30},
    "staff": {"name": "Staff", "rank": 10},
}

ALL = [p[0] for p in PERMISSIONS]

ROLE_PERMISSIONS = {
    "owner": ALL,
    "manager": [
        "menu.view", "menu.create", "menu.update", "menu.delete",
        "category.view", "category.create", "category.update", "category.delete",
        "product.view", "product.create", "product.update", "product.delete",
        "table.view", "table.create", "table.update", "table.delete",
        "order.view", "order.create", "order.update", "order.cancel", "order.complete",
        "staff.view", "staff.create", "staff.update",
        "customer.view", "reports.view", "settings.view",
    ],
    "cashier": [
        "table.view", "order.view", "order.create", "order.update",
        "order.cancel", "order.complete", "customer.view",
    ],
    "waiter": ["table.view", "order.view", "order.create", "customer.view"],
    "staff": ["order.view"],
    "accountant": ["financial.view", "accounting.view", "accounting.manage", "reports.view"],
}