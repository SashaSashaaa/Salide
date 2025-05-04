from django.urls import path
from .views import ProductsView, ProductsCategoryView, OneProductView

urlpatterns = [
    path("products/", ProductsView.as_view()),
    path("products/<uuid:pk>/", OneProductView.as_view()),
    path("categories/", ProductsCategoryView.as_view()),
]