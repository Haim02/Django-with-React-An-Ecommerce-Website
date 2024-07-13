from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import Product, Review
from base.serializer import ProductSerializer
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''

    try:
        products = Product.objects.filter(name__icontains=query)

        page = request.query_params.get('page')
        paginator = Paginator(products, 5)

        try:
            products = paginator.page(page)
        except PageNotAnInteger:
            products = paginator.page(1)
        except EmptyPage:
            products = paginator.page(paginator.num_pages)

        if page == None:
            page = 1

        page = int(page)

        serializer = ProductSerializer(products, many=True)
        return Response({'products':serializer.data, 'page':page,'pages':paginator.num_pages, 'status':status.HTTP_200_OK})
    except Exception as e:
        return Response({'detail': e.args}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def getProduct(request, pk):
    try:
        product = Product.objects.get(_id=pk)
        if product == None:
            return Response({'detail':'Product not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        return Response({'detail':'Product not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    try:
        user = request.user
        product = Product.objects.get(_id=pk)
        data = request.data

        alreadyExists = product.review_set.filter(user=user).exists()

        if alreadyExists:
            return Response({'detail': 'User already reviewd'}, status=status.HTTP_400_BAD_REQUEST)

        elif data['rating'] == 0:
            return Response({'details': 'Please select a rating'}, status=status.HTTP_400_BAD_REQUEST)

        else:
            review = Review.objects.create(
                user=user,
                product=product,
                name=user.username,
                rating=data['rating'],
                comment=data['comment']
            )

            review = product.review_set.all()
            product.numReviews = len(review)

            total = 0
            for i in review:
                total += i.rating
                product.rating = total / len(review)
            product.save()

            return Response({'detail': 'Review Added'}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'detail': e.args}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProducts(request, pk):
    print('user', request.user)
    try:
        product = Product.objects.get(_id=pk)
        if product == None:
            return Response({'detail': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

        product.delete()
        return Response({'detail': 'Product was deleded'}, status=status.HTTP_200_OK)
    except Exception as e :
        return Response({'detail': e.args}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user

    try:
        product = Product.objects.create(
            user=user,
            name='Sample Name',
            price=0,
            brand='Sample Brand',
            countInStock=0,
            category='Sample Category',
            description='',
        )

        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    except:
        return Response({'detail': 'Something went wrong'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(_id=pk)

    try:
        product.name = data['name']
        product.price = data['price']
        product.brand = data['brand']
        product.countInStock = data['countInStock']
        product.category = data['category']
        product.description = data['description']

        product.save()
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        return Response({'detail': 'Something went wrong'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def uploadImage(request):
    data = request.data

    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)

    product.image = request.FILES.get('imgae')
    product.save()
    return Response({'detail': 'Image was uploaded'}, status=status.HTTP_200_OK)

