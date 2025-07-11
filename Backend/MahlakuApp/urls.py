from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'categories', views.CategoryViewSet)
router.register(r'schools', views.SchoolViewSet)
router.register(r'products', views.ProductViewSet)
router.register(r'customer-care', views.CustomerCareRequestViewSet, basename='customer-care')  # Updated endpoint

urlpatterns = [
    path('', include(router.urls)),
]