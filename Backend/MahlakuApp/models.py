from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    email = models.EmailField(_('email address'), unique=True)
    username = models.CharField(max_length=150, unique=True)
    
    # Remove unused fields
    first_name = None
    last_name = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        return self.name

    @classmethod
    def create_initial_categories(cls):
        categories = ['School Uniform', 'Traditional Dresses', 'Wedding Dresses']
        for cat in categories:
            cls.objects.get_or_create(name=cat)

class School(models.Model):
    name = models.CharField(max_length=200, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

class Product(models.Model):
    # Common fields for all products
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField()
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Category relationship
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    
    # School relationship (only for school uniforms)
    school = models.ForeignKey(School, on_delete=models.SET_NULL, blank=True, null=True)
    
    # Size options
    SIZE_CHOICES = [
        ('XS', 'Extra Small'),
        ('S', 'Small'),
        ('M', 'Medium'),
        ('L', 'Large'),
        ('XL', 'Extra Large'),
        ('XXL', 'Double Extra Large'),
    ]
    size = models.CharField(max_length=5, choices=SIZE_CHOICES, blank=True, null=True)
    
    def __str__(self):
        return f"{self.name} - {self.category}"
    
    class Meta:
        ordering = ['-created_at']

# REMOVED Order and OrderItem models

class CustomerCareRequest(models.Model):  # Renamed from HelpRequest
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    address = models.TextField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    resolved = models.BooleanField(default=False)

    def __str__(self):
        return f"Request from {self.name} - {self.created_at.strftime('%Y-%m-%d')}"