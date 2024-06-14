from django.urls import re_path

from . import ws_consumers

websocket_urlpatterns = [
    re_path(r'ws/socket', ws_consumers.ChatConsumer.as_asgi())
]