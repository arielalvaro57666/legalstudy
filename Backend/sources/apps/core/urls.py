from django.urls import path, include
from rest_framework import routers

from apps.app import app_urls

router = routers.DefaultRouter()

router.registry.extend(app_urls.router.registry) # App app

urlpatterns = [
    path('', include('apps.app.app_urls'))
]

urlpatterns += router.urls