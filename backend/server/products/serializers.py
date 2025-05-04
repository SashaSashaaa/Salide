from rest_framework import serializers
from .models import Product, ProductCategory

class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = '__all__'
        
class ProductSerializer(serializers.ModelSerializer):
    thumbnail = serializers.SerializerMethodField()
    category = ProductCategorySerializer()
    def get_thumbnail(self, obj):
        return obj.thumbnail.url
    
    class Meta:
        model = Product
        fields = ["id", "category", "name", "description", "created_at", "image", "thumbnail", "main_description", "price", "quantity"]
    