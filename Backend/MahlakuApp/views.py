# MahlakuApp/views.py
from rest_framework import viewsets, permissions
from rest_framework.permissions import AllowAny
from .models import Category, School, Product, CustomerCareRequest
from .serializers import CategorySerializer, CustomerCareRequestSerializer, SchoolSerializer, ProductSerializer

class ReadOnlyOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAdminUser]

class SchoolViewSet(viewsets.ModelViewSet):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer
    permission_classes = [ReadOnlyOrAdmin]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        name = self.request.query_params.get('name')
        if name:
            queryset = queryset.filter(name__icontains=name)
        return queryset

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [ReadOnlyOrAdmin]
    
    def get_serializer_context(self):
        return {'request': self.request}
    
    def get_queryset(self):
        queryset = super().get_queryset()
        school_id = self.request.query_params.get('school')
        category = self.request.query_params.get('category')
        
        if school_id:
            queryset = queryset.filter(school=school_id)
        if category:
            queryset = queryset.filter(category__name=category)
        return queryset

class CustomerCareRequestViewSet(viewsets.ModelViewSet):
    queryset = CustomerCareRequest.objects.all()
    serializer_class = CustomerCareRequestSerializer
    permission_classes = [AllowAny] 
    
    def perform_create(self, serializer):
        serializer.save()