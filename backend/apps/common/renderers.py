from rest_framework.renderers import JSONRenderer


class EnvelopeJSONRenderer(JSONRenderer):
    def render(self, data, accepted_media_type=None, renderer_context=None):
        renderer_context = renderer_context or {}
        response = renderer_context.get("response")
        status_code = getattr(response, "status_code", 200)
        is_ok = status_code < 400

        if data is None:
            wrapped = {"ok": is_ok}
        elif isinstance(data, dict):
            wrapped = {"ok": is_ok, **data}
        elif isinstance(data, list):
            wrapped = {"ok": is_ok, "results": data}
        else:
            wrapped = {"ok": is_ok, "data": data}

        return super().render(wrapped, accepted_media_type, renderer_context)