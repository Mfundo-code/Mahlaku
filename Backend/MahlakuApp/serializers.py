from rest_framework import serializers
from .models import Category, School, Product, CustomerCareRequest

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(slug_field='name', queryset=Category.objects.all())
    school = serializers.SlugRelatedField(
        slug_field='name', 
        queryset=School.objects.all(), 
        required=False,
        allow_null=True
    )
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = '__all__'
        extra_kwargs = {
            'school': {'required': False},
            'size': {'required': False}
        }
    
    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.image.url)
        return None
    
    def validate(self, data):
        if 'category' in data and data['category'].name == 'School Uniform' and not data.get('school'):
            raise serializers.ValidationError("School is required for School Uniform products")
        
        if 'category' in data and data['category'].name != 'School Uniform' and 'size' in data:
            data.pop('size', None)
            
        return data

# Updated CustomerCareRequest serializer
class CustomerCareRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerCareRequest
        fields = ['id', 'name', 'email', 'phone', 'address', 'message', 'created_at', 'resolved']
        read_only_fields = ['id', 'created_at', 'resolved']