from django.contrib import admin
from .models import Cart, CartItem

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ['user', 'created_at', 'total_price']
    list_filter = ['created_at']
    search_fields = ['user__username']

    def items(self, obj):
        return [item.product.name for item in
obj.items.all()]

@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ['cart', 'product', 'quantity', 'total_price']