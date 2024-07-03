from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import Product, Order, OrderItem, ShippingAddress, User
from base.serializer import ProductSerializer, OrderItemSerializer, OrderSerializer
from rest_framework import status
from datetime import datetime


@api_view(['POST'])
def addOrderItems(request):
    user = request.user
    data = request.data
    orderItems = data['orderItems']

    try:
            order = Order.objects.create(
                user=user,
                paymentMethod=data['paymentMethod'],
                texPrice=data['texPrice'],
                shippingPrice=data['shippingPrice'],
                totalPrice=data['totalPrice']
            )
            shipping = ShippingAddress.objects.create(
                order=order,
                address=data['shippingAddress']['address'],
                city=data['shippingAddress']['city'],
                postalcode=data['shippingAddress']['postaclcode'],
                country=data['shippingAddress']['country']
            )
            for i in orderItems:
                product = Product.objects.get(_id=i['_id'])

                item = OrderItem.objects.create(
                    product=product,
                    order=order,
                    name=product.name,
                    qty=i['qty'],
                    price=i['price'],
                    image=product.image.url
                )

                product.countInStack -= item.qty
                product.save()

            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'detail': e.args}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    try:
        user = request.user
        orders = user.order_set.all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        return Response({'detail':'Order does not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['get'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):
    user = request.user
    order = Order.objects.get(_id=pk)

    try:
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            return Response({'detail': 'Not authorized to view this order'}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail':'Order does not exists'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    try:
        order = Order.objects.get(_id=pk)
        order.isPaid = True
        order.paidAt = datetime.now()
        order.save()
        return Response('Order was paid')
    except:
        return Response({'detail':'Something went wrong'}, status=status.HTTP_400_BAD_REQUEST)