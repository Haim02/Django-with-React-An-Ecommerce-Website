from django.test import TestCase
from base.models import  Order
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status

CREATE_USER_URL = reverse('user:register')
CREATE_ORDER_URL = reverse('order:order-add')
GET_PRODUCT_URL = reverse('product:product', kwargs={"pk": 0})


def create_user(**params):
    """create and return a new user"""
    return get_user_model().objects.create(**params)

class OrderApiTest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_add_order(self):
        user = {
            'name': 'ben@gmail.com',
            'email': 'ben@gmail.com',
            'password': 'ben1012345678'
        }

        userRegister = self.client.post(CREATE_USER_URL, user)


        order = {
            'user': userRegister.data['id'],
            'paymentMethod': 'paypal',
            'texPrice': 12.23,
            'shippingPrice': 34.99,
            'totalPrice': 184.99,
            'orderItems': 0
        }

        res = self.client.post(CREATE_ORDER_URL, order)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)


    def test_get_my_orders(self):
        user = {
            'name': 'ofek@gmail.com',
            'email': 'ofek@gmail.com',
            'password': 'ofek1012345678'
        }

        userRegister = self.client.post(CREATE_USER_URL, user)