from .serializers import ProductCategorySerializer, ProductSerializer
from .models import Product, ProductCategory
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend

class ProductsCategoryView(ListAPIView):
    queryset = ProductCategory.objects.all()
    serializer_class = ProductCategorySerializer

class OneProductView(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 20

class ProductsView(ListAPIView):
    # filter_backends = [DjangoFilterBackend, filters.SearchFilter]    
    # filterset_fields = ('name',)
    # search_fields = ["name"]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = ProductPagination
    
    def get_queryset(self):
        category_id = self.request.query_params.get('category')
        name = self.request.query_params.get('name')

        queryset = Product.objects.all()

        if category_id:
            queryset = queryset.filter(category_id=category_id)
        
        if name:
            queryset = queryset.filter(name__icontains=name)
            
        return queryset