from rest_framework import serializers
from django.contrib.auth.models import User
from .models import FavoriteList, Cart, CartItem

from products.serializers import ProductSerializer
from products.models import Product

class FavoriteListSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True)

    class Meta:
        model = FavoriteList
        fields = ["user", "products", "created_at"]

class AddRemoveSerializer(serializers.Serializer):
    product_id = serializers.UUIDField()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, min_length=8)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name']

    def create(self, validated_data):
        user = User.objects.create_user(
        username=validated_data['username'],
        email=validated_data['email'],
        password=validated_data['password'],
        first_name=validated_data.get('first_name', ''),
        last_name=validated_data.get('last_name', '')
    )
        return user
    
class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer
    
    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity', 'total_price']
        depth = 1

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.ReadOnlyField()
    
    class Meta:
        model = Cart
        fields = ['id', 'user', 'items', 'total_price', 'created_at']

class UpdateCartItemSerializer(serializers.Serializer):
    product_id = serializers.UUIDField()
    quantity = serializers.IntegerField(min_value=1)

    def validate(self, data):
        try:
            product = Product.objects.get(id=data['product_id'])
            if product.quantity < data['quantity']:
                raise serializers.ValidationError("Недостатньо товару на складі.")
        except Product.DoesNotExist:
            raise serializers.ValidationError("Товар не знайдено.")
        return data
        
class AddRemoveCartItemSerializer(serializers.Serializer):
    product_id = serializers.UUIDField()