from django.urls import path
from .views import *
from employee.views import applicants

urlpatterns = [
    path('', employer, name='formEmployer'),
    path('applicants/', applicants, name='applicants'),
]