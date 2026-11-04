from rest_framework.exceptions import APIException, Throttled
from rest_framework.views import exception_handler as drf_exception_handler


class ApplicationError(APIException):
    status_code = 400
    default_code = "APPLICATION_ERROR"

    def __init__(self, message, code=None, status_code=None):
        self.code = code or self.default_code
        if status_code is not None:
            self.status_code = status_code
        super().__init__(detail={"code": self.code, "message": message})


def custom_exception_handler(exc, context):
    response = drf_exception_handler(exc, context)
    if response is None:
        return response

    if isinstance(exc, Throttled):
        wait = int(exc.wait) + 1 if exc.wait else None
        response.data = {
            "code": "RATE_LIMITED",
            "message": "تعداد درخواست‌ها بیش از حد مجاز است. لطفاً کمی بعد دوباره تلاش کنید.",
            "retry_after": wait,
        }
        return response

    data = response.data
    if isinstance(data, dict) and "code" in data and "message" in data:
        return response

    response.data = {"code": "ERROR", "message": str(data)}
    return response