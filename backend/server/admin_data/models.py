from django.db import models
from django.contrib.auth.models import User
from products.models import Product

class Order(models.Model):
    user = models.ForeignKey(User, verbose_name = "Клієнт", on_delete=models.CASCADE, related_name='orders')
    created_at = models.DateTimeField(verbose_name = "Створено", auto_now_add=True)
    status = models.CharField(
            max_length=20,
            choices=[
                ('pending', 'Очікує обробки'),
                ('processing', 'Проводиться обробка'),
                ('completed', 'Виконано'),
                ('cancelled', 'Відмінено'),
            ],
            default='pending',
            verbose_name = "Статус",
        ) 
        
    def __str__(self):
        return f"Замовлення {self.id} для {self.user.username}"

    def total_price(self):
        return sum(item.total_price() for item in self.items.all())

    class Meta:
        verbose_name = "Замовлення"
        verbose_name_plural = "Замовлення"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, verbose_name = "Замовлення",on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, verbose_name = "Товар",on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(verbose_name = "Кількість", default=1)

    def __str__(self):
        return f"{self.quantity} x {self.product.name}"

    def total_price(self):
        return self.product.price * self.quantity

    class Meta:
        verbose_name = "Елемент замовлення"
        verbose_name_plural = "Елементи замовлення"