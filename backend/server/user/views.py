from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from .serializers import FavoriteListSerializer, AddRemoveSerializer
from .serializers import AddRemoveCartItemSerializer, AddRemoveSerializer, CartSerializer, UpdateCartItemSerializer
from .serializers import UserSerializer, RegisterSerializer
from .models import FavoriteList
from products.models import Product
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.db.models import Q
from django.contrib.auth import authenticate, login, logout
from .models import Cart, CartItem


class FavoriteListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        lst, created = FavoriteList.objects.get_or_create(user = user)
        

        serializer = FavoriteListSerializer(lst)
        return Response(serializer.data)
    

class AddFavoriteListView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        serializer = AddRemoveSerializer(data=request.data)

        if not serializer.is_valid():
            return Response({"detail": "error"})
        
        pr_id = serializer.validated_data["product_id"]

        try:
            product = Product.objects.get(id = pr_id)

            lst, created = FavoriteList.objects.get_or_create(user = user)

            lst.products.add(product)
            return Response({"detail": "success"})
        except Product.DoesNotExist:
            return Response({"detail": "error"})
        

class RemoveFavoriteListView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        serializer = AddRemoveSerializer(data=request.data)
        print(request.data)
        if not serializer.is_valid():
            return Response({"detail": "error"})
        
        pr_id = serializer.validated_data["product_id"]
        print(pr_id)

        try:
            product = Product.objects.get(id = pr_id)

            lst, created = FavoriteList.objects.get_or_create(user = user)

            lst.products.remove(product)
            return Response({"detail": "success"})
        except Product.DoesNotExist:
            return Response({"detail": "error"})
        

class RegisterView(CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]  


class LoginView(APIView):
    permission_classes = [AllowAny] 

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({"detail": "success"})
        return Response({"detail": "error"})
    

class UserDetailView(APIView):
    # serializer_class = UserSerializer
    # permission_classes = []

    def get(self, request):
        # Повертаємо аутентифікованого користувача
        if self.request.user.is_authenticated:
            print(request.user)
            serializer = UserSerializer(request.user)
            return Response(serializer.data)
        return Response({})
    

class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({"detail": "success"})
    

class AddToCartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = AddRemoveCartItemSerializer(data=request.data)
        if serializer.is_valid():
            cart, _ = Cart.objects.get_or_create(user=request.user)
            product = Product.objects.get(id=serializer.validated_data['product_id'])
            cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
            cart_item.quantity+=1
            product.quantity -= 1
            product.save()
            cart_item.save()           
            return Response({"detail": "success"})
        return Response(serializer.errors)


class CartDetailView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CartSerializer

    def get_object(self):
        cart, _ = Cart.objects.get_or_create(user=self.request.user)
        return cart
    

class RemoveFromCartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = AddRemoveCartItemSerializer(data=request.data)
        if serializer.is_valid():
            product_id = serializer.validated_data['product_id']
            cart = Cart.objects.get(user=request.user)
            try:
                product = Product.objects.get(id=product_id)
                cart_item = CartItem.objects.get(cart=cart, product_id=product_id)
                product.quantity += cart_item.quantity
                product.save()
                cart_item.delete()
                return Response({"detail": "success"})
            except CartItem.DoesNotExist:
                return Response({"error": "Товар не знайдено у кошику"})
        return Response(serializer.errors)
    

class UpdateCartItemQuantityView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = UpdateCartItemSerializer(data=request.data)
        if serializer.is_valid():
            product_id = serializer.validated_data['product_id']
            cart = Cart.objects.get(user=request.user)
            try:
                product = Product.objects.get(id=product_id)
                cart_item = CartItem.objects.get(cart=cart, product_id=product_id)
                diff = cart_item.quantity - serializer.validated_data['quantity']
                product.quantity += diff
                cart_item.quantity = serializer.validated_data['quantity']

                product.save()
                cart_item.save()
                return Response({"detail": "success"})
            except CartItem.DoesNotExist:
                return Response({"error": "Товар не знайдено у кошику"})
        return Response(serializer.errors)