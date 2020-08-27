import re
from django.urls import path,re_path
from api import views

urlpatterns = [
    path('api/urls/', views.UrlList.as_view(),name ='list'),
    path('api/urls/<int:pk>/', views.UrlDetail.as_view(),name ='get'),
    path('*', views.UrlRedirect.as_view(),name ='redirect'),
    re_path(r"(.*?)", views.UrlRedirect.as_view(),name ='redirect'),
]