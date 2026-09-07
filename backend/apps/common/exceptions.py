from rest_framework.exceptions import APIException
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

    data = response.data
    if isinstance(data, dict) and "code" in data and "message" in data:
        return response

    response.data = {"code": "ERROR", "message": str(data)}
    return response