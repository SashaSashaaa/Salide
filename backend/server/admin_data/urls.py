from django.urls import path
from .views import CheckoutView, UserOrdersView

urlpatterns = [
    path('checkout/', CheckoutView.as_view(), name='checkout'),
    path('user-orders/', UserOrdersView.as_view(), name='user-orders'),
]