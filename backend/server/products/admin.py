from django.contrib import admin
from .models import ProductCategory, Product
from imagekit.admin import AdminThumbnail
from django import forms
from ckeditor.widgets import CKEditorWidget

class ProductAdminForm(forms.ModelForm):
    description = forms.CharField(widget=CKEditorWidget(), label="Опис товара")
    class Meta:
        model = Product
        fields = '__all__'
    
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    form = ProductAdminForm
    admin_thumbnail = AdminThumbnail(image_field='thumbnail')
    list_display=("name", "category", "admin_thumbnail",)
    readonly_fields = ["created_at", "thumbnail", "id"]
    search_fields = ('name',)
    list_filter = ('category',)

@admin.register(ProductCategory)
class ProductCategoryAdmin(admin.ModelAdmin):
    list_display=("id", "name")
    readonly_fields = ["id"]