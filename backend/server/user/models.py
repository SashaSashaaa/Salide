from django.db import models
import uuid
from django.contrib.auth.models import User
from products.models import Product
from django.db.models.signals import post_save
from django.dispatch import receiver

class FavoriteList(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, verbose_name="Користувач", related_name="favorited_by")
    products = models.ManyToManyField(Product, verbose_name="Продукти", related_name="favorite_list")
    created_at = models.DateTimeField("Дата створення", auto_now_add=True)

    def __str__(self):
        return self.user.username
    
    class Meta:
        verbose_name = "Список улюбленого"
        verbose_name_plural = "Списки улюбленого"


class Cart(models.Model):
    id = models.UUIDField(verbose_name="ID Кошика", default=uuid.uuid4,
    primary_key=True)
    user = models.OneToOneField(User, verbose_name="Користувач",
    on_delete=models.CASCADE, related_name='cart')
    created_at = models.DateTimeField(verbose_name="Дата",
    auto_now_add=True)

    def __str__(self):
        return f"Кошик для {self.user.username}"
    
    def total_price(self):
        return sum(item.total_price() for item in self.items.all())
    
    class Meta:
        verbose_name = "Кошик"
        verbose_name_plural = "Кошики"

@receiver(post_save, sender=User)
def create_cart(sender, instance, created, **kwargs):
    if created:
        Cart.objects.create(user=instance)

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, verbose_name="Кошик", on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, verbose_name="Товар", on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(verbose_name="Кількість", default=0)
    
    def __str__(self):
        return f"{self.product.name} x {self.quantity}"

    def total_price(self):
        return self.product.price * self.quantity
    
    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Товари"