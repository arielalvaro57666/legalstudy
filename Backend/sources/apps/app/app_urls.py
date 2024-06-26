from rest_framework import routers
from django.urls import path
from . import app_views


router = routers.DefaultRouter()

urlpatterns = [
    path('calculo', app_views.Calculo.as_view(), name='calculo'),
    path('chat_create', app_views.ChatCreateAPIView.as_view(), name='chatcreate')
]

