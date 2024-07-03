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
                name=user.name,
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
    except:
        return Response({'detail': 'Something went wrong'}, status=status.HTTP_400_BAD_REQUEST)