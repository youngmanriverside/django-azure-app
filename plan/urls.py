from django.urls import path
from .views import *

urlpatterns = [
    path('',plans ,name='plans'),
    path('/planForm', planForm, name='planForm'),
]