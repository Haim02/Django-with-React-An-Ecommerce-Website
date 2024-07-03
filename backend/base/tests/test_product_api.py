from django.test import TestCase
from base.models import Product
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status

GET_PRODUCTS_URL = reverse('product:products')
GET_PRODUCT_URL = reverse('product:product', kwargs={"pk": 0})

class ProductApiTest(TestCase):
    def setUp(self) -> None:
        self.client = APIClient()

    def test_get_products(self):
        res = self.client.get(GET_PRODUCTS_URL)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    # def test_get_product(self):
    #     res = self.client.get(GET_PRODUCT_URL)
    #     self.assertEqual(res.status_code, status.HTTP_200_OK)