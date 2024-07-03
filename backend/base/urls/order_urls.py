from django.urls import path
from base.views import order_view as views

app_name='order'

urlpatterns = [
    path('add', views.addOrderItems, name='order-add'),
    path('myorders', views.getMyOrders, name='myorders'),
    path('<str:pk>', views.getOrderById, name='user-order'),
    path('<str:pk>/pay', views.updateOrderToPaid, name='pay'),
]
