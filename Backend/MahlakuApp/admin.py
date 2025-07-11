from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Category, School, Product, CustomerCareRequest

class CustomUserAdmin(UserAdmin):
    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2'),
        }),
    )
    list_display = ('email', 'username', 'is_staff')
    search_fields = ('email', 'username')
    ordering = ('email',)

class SchoolAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at')
    search_fields = ('name',)
    ordering = ('name',)

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'school', 'price', 'stock')
    list_filter = ('category', 'school')
    search_fields = ('name', 'description')
    fieldsets = (
        (None, {
            'fields': ('name', 'description', 'price', 'stock', 'image')
        }),
        ('Category Information', {
            'fields': ('category',),
        }),
        ('School Uniform Specific', {
            'fields': ('school', 'size'),
            'classes': ('collapse',),
        }),
    )
    
    def get_fieldsets(self, request, obj=None):
        fieldsets = super().get_fieldsets(request, obj)
        if obj and obj.category.name != 'School Uniform':
            fieldsets = (fieldsets[0], fieldsets[1])
        return fieldsets

class CustomerCareRequestAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'created_at', 'resolved')
    list_filter = ('resolved', 'created_at')
    search_fields = ('name', 'email', 'phone', 'message')
    readonly_fields = ('created_at',)
    fields = ('name', 'email', 'phone', 'address', 'message', 'resolved', 'created_at')
    list_editable = ('resolved',)  # Allow marking as resolved from list view

# Register models
admin.site.register(User, CustomUserAdmin)
admin.site.register(Category)
admin.site.register(School, SchoolAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(CustomerCareRequest, CustomerCareRequestAdmin)

# Create initial categories
from django.apps import apps
from django.db.utils import OperationalError, ProgrammingError

try:
    Category = apps.get_model('MahlakuApp', 'Category')
    Category.create_initial_categories()
except (LookupError, OperationalError, ProgrammingError):
    pass