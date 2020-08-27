import re
from django.urls import path,re_path
from api import views

urlpatterns = [
    path('api/urls/', views.UrlList.as_view()),
    path('api/urls/<int:pk>/', views.UrlDetail.as_view()),
    path('*', views.UrlRedirect.as_view()),
    re_path(r"(.*?)", views.UrlRedirect.as_view()),
]