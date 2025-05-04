from rest_framework import serializers
from products.serializers import ProductSerializer
from .models import OrderItem, Order 
from user.models import Cart

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'quantity', 'total_price']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    total_price = serializers.FloatField()
    
    class Meta:
        model = Order
        fields = ['id', 'created_at', 'status', 'items', 'total_price']

class CreateOrderSerializer(serializers.Serializer):
    def save(self, **kwargs):
        user = self.context['request'].user
        cart = Cart.objects.get(user=user)
        
        if not cart.items.exists():
            raise serializers.ValidationError("Кошик порожній")

        order = Order.objects.create(user=user)

        for cart_item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=cart_item.product,
                quantity=cart_item.quantity
            )
        
        cart.items.all().delete()
        
        return order