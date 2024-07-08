from django.urls import path
from .views import *

urlpatterns = [
    path('', interview, name='interview'),
    path('analysis', analysis, name='video-analysis')
]
