from django.urls import path
from . import views

app_name = 'animation'

urlpatterns = [
    path('', views.home, name='home'),
    path('documentation/', views.documentation, name='documentation'),
    path('underconstruction/', views.underconstruction, name='underconstruction'),
] 