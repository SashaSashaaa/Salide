from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView
from .models import  Order
from .serializers import CreateOrderSerializer, OrderSerializer

class CheckoutView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        serializer = CreateOrderSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            order = serializer.save()
            return Response({"detail": "success", "data": order.id})
        return Response(serializer.errors)

class UserOrdersView(ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        print(self.request.user)
        return Order.objects.filter(user=self.request.user).order_by('-created_at')