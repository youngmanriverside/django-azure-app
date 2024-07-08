"""azureproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from .views import benefit, chatbot, analysis, home, interview, demo, home2, transcribe
from .routers import router

urlpatterns = [
    path('', home, name='home'),
    path('home2', home2, name='home2'),
    path('demo', demo, name='chatbot'),
    path('chatbot', chatbot, name='chatbot'),
    path('benefit', benefit),
    path('health', include('restaurant_review.urls')),
    path('admin/', admin.site.urls),
    path('employee/', include('employee.urls')),
    path('employer/', include('employer.urls')),
    path('plan/', include('plan.urls')),
    path('analysis/', analysis),
    path('interview', interview),
    path('transcribe/', transcribe, name='transcribe'),
    path('api/', include(router.urls))
]
