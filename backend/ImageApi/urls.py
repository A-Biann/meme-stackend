# urls.py

from django.urls import path
from . import views

urlpatterns = [
    # ...
    path('api/get_image/', views.get_image_from_url, name='get_image_from_url'),
    # ...
]
