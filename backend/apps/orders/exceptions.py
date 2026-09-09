from apps.common.exceptions import ApplicationError


class InvalidStateTransition(ApplicationError):
    default_code = "INVALID_STATE_TRANSITION"


class InvalidTableSession(ApplicationError):
    default_code = "INVALID_TABLE_SESSION"
    status_code = 400


class ProductNotAvailable(ApplicationError):
    default_code = "PRODUCT_UNAVAILABLE"
    status_code = 400