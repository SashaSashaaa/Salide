from django.db import models
from imagekit.models import ImageSpecField
from imagekit.processors import Thumbnail, ResizeToFit
import uuid
from PIL import Image

class ProductCategory(models.Model):
    id = models.UUIDField(verbose_name="Код категорії", default=uuid.uuid4, primary_key=True)
    name = models.CharField(verbose_name="Ім'я категорії", max_length=100)
    image = models.ImageField(verbose_name="Картинка", upload_to='category/', blank=True, null=True)
    
    def _resize_image(self):
        img_path = self.image.path
        img = Image.open(img_path)
        if img.height > 500 or img.width > 500:
            img.thumbnail((500, 500))
            img.save(img_path, format='JPEG', quality=85)

    def save(self, *args, **kwargs):
        try:
            old_instance = ProductCategory.objects.get(pk=self.pk)
            if old_instance.image != self.image:
                if old_instance.image:
                    old_instance.image.delete(save=False)
        except ProductCategory.DoesNotExist:
            pass

        super().save(*args, **kwargs)
        if self.image:
            self._resize_image()

    class Meta:
        verbose_name = "Категорія товару"
        verbose_name_plural = "Категорії товарів"

    def __str__(self):
        return self.name
    
class Product(models.Model):
    id = models.UUIDField(verbose_name="Код товара", default=uuid.uuid4, primary_key=True)
    name = models.CharField(max_length=100)
    category = models.ForeignKey(ProductCategory, on_delete=models.PROTECT, verbose_name="Категорія продукта")
    main_description = models.TextField(verbose_name="Короткий опис", default="Ваш опис")
    description = models.TextField(verbose_name="Опис")
    price = models.IntegerField("Ціна", default=0)
    quantity = models.IntegerField("Кількість", default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='products', null=True, blank=True)
    thumbnail = ImageSpecField(source='image', processors=[ResizeToFit(400, 400)], format='JPEG', options={'quality': 60})

    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Товари"

    def __str__(self):
        return self.name