from django.urls import path
from base.views import product_view as views

app_name = 'product'


urlpatterns = [
    path('', views.getProducts, name='products'),
    path('top', views.getTopProducts, name='topProduct'),
    path('<str:pk>/', views.getProduct, name='product'),
    path('<str:pk>/reviews', views.createProductReview, name='create_review'),

    path('create', views.createProduct, name='product-create'),
    path('uploade', views.uploadImage, name='image-upload'),
    path('update/<str:pk>', views.updateProduct, name='product-update'),
    path('delete/<str:pk>', views.deleteProducts, name='product-delete'),
]