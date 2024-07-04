from rest_framework import routers
from django.urls import path
from . import app_views


router = routers.DefaultRouter()

urlpatterns = [
    path("calculo", app_views.Calculo.as_view(), name="calculo"),
    path("chat_create", app_views.ChatCreateAPIView.as_view(), name="chatcreate"),
    path("chat_retrieve/<uuid:roomID>", app_views.ChatRetrieveAPIView.as_view(), name="chatretrieve"),
    path("chat_list", app_views.ChatListAPIView.as_view(), name="chatlist"),
    path("chat_count", app_views.ChatCounterRetrieveAPIView.as_view(), name="chatcount"),
    path("message_create", app_views.MessageCreateAPIView.as_view(), name="messagereate"),
    path("register_create", app_views.RegisterCreateAPIView.as_view(), name="registercreate"),
    path("register_retrieve", app_views.RegisterRetrieveAPIView.as_view(), name="registerretrieve")
]

