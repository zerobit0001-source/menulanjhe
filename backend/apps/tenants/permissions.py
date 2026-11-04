# from rest_framework.permissions import BasePermission
# 
# 
# class HasTenantPermission(BasePermission):
#     message = "شما اجازه دسترسی به این بخش را ندارید."
# 
#     def has_permission(self, request, view):
#         if not (getattr(request, "tenant", None) and getattr(request, "membership", None)):
#             return False
# 
#         per_action = getattr(view, "permission_codenames", None)
#         codename = None
#         if per_action and hasattr(view, "action") and view.action in per_action:
#             codename = per_action[view.action]
#         else:
#             codename = getattr(view, "required_permission", None)
# 
#         if codename is None:
#             return True
# 
#         return request.membership.has_permission(codename)


from rest_framework.permissions import BasePermission


METHOD_TO_ACTION = {
    "POST": "create",
    "PUT": "update",
    "PATCH": "partial_update",
    "DELETE": "destroy",
}


class HasTenantPermission(BasePermission):
    message = "شما اجازه دسترسی به این بخش را ندارید."

    def has_permission(self, request, view):
        if not (getattr(request, "tenant", None) and getattr(request, "membership", None)):
            return False

        per_action = getattr(view, "permission_codenames", None) or {}
        action = getattr(view, "action", None) or METHOD_TO_ACTION.get(request.method)

        if action in per_action:
            codename = per_action[action]
        else:
            codename = getattr(view, "required_permission", None)

        if codename is None:
            return True

        return request.membership.has_permission(codename)
