from django.urls import path
from .views import FavoriteListView, AddFavoriteListView, RemoveFavoriteListView
from .views import UserDetailView, RegisterView, LoginView, LogoutView
from .views import CartDetailView, AddToCartView, RemoveFromCartView, UpdateCartItemQuantityView

urlpatterns = [
    path('user/', UserDetailView.as_view(), name='user-detail'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    
    path('favorites/', FavoriteListView.as_view(), name='favorite-list'),
    path('favorites/add/', AddFavoriteListView.as_view(), name='add-to-favorites'),
    path('favorites/remove/', RemoveFavoriteListView.as_view(), name='remove-fromfavorites'),

    path('cart/', CartDetailView.as_view(), name='cart-detail'),
    path('cart/add/', AddToCartView.as_view(), name='add-to-cart'),
    path('cart/remove/', RemoveFromCartView.as_view(), name='remove-from-cart'),
    path('cart/update/', UpdateCartItemQuantityView.as_view(), name='update-cart-itemquantity'),
]