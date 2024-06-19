from rest_framework import routers
from django.urls import path
from . import app_views


router = routers.DefaultRouter()

router.register('chats', app_views.Chat, basename="chats")

urlpatterns = [
    path('calculo', app_views.Calculo.as_view(), name='calculo')
]

