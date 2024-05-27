from django.urls import path
from .views import *

urlpatterns = [
    path('', employee, name='formEmployee'),
    path('applicants', applicants, name='applicants'),
]