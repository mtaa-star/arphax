from django.db.models import Count
from django.utils import timezone
from rest_framework import viewsets, status, filters
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .models import Category, Brand, Product, BlogPost, RepairBooking, ContactMessage
from .serializers import (
    CategorySerializer, BrandSerializer,
    ProductListSerializer, ProductDetailSerializer, ProductWriteSerializer,
    BlogPostListSerializer, BlogPostDetailSerializer,
    RepairBookingSerializer, RepairBookingAdminSerializer,
    ContactMessageSerializer, ContactMessageAdminSerializer,
)


# AUTH

@api_view(['POST'])
@permission_classes([AllowAny])
def admin_login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user and user.is_staff:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'username': user.username, 'email': user.email})
    return Response({'error': 'Invalid credentials or insufficient permissions.'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def admin_logout(request):
    request.user.auth_token.delete()
    return Response({'message': 'Logged out successfully.'})


# DASHBOARD

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminUser])
def dashboard_stats(request):
    now = timezone.now()
    thirty_days_ago = now - timezone.timedelta(days=30)
    return Response({
        'total_products': Product.objects.count(),
        'total_blog_posts': BlogPost.objects.filter(published=True).count(),
        'total_bookings': RepairBooking.objects.count(),
        'pending_bookings': RepairBooking.objects.filter(status='pending').count(),
        'in_progress_bookings': RepairBooking.objects.filter(status='in_progress').count(),
        'unread_messages': ContactMessage.objects.filter(is_read=False).count(),
        'total_messages': ContactMessage.objects.count(),
        'recent_bookings': RepairBookingAdminSerializer(
            RepairBooking.objects.order_by('-created_at')[:5], many=True
        ).data,
        'recent_messages': ContactMessageAdminSerializer(
            ContactMessage.objects.order_by('-created_at')[:5], many=True
        ).data,
        'bookings_this_month': RepairBooking.objects.filter(created_at__gte=thirty_days_ago).count(),
        'messages_this_month': ContactMessage.objects.filter(created_at__gte=thirty_days_ago).count(),
    })


# CATEGORIES

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.prefetch_related('brands').all()
    serializer_class = CategorySerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAuthenticated(), IsAdminUser()]


# PRODUCTS

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.select_related('category', 'brand').prefetch_related('images').all()
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'brand__name', 'specs', 'description']
    ordering_fields = ['price', 'created_at', 'name']

    def get_serializer_class(self):
        if self.action == 'list':
            return ProductListSerializer
        if self.action in ['create', 'update', 'partial_update']:
            return ProductWriteSerializer
        return ProductDetailSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'featured']:
            return [AllowAny()]
        return [IsAuthenticated(), IsAdminUser()]

    def get_queryset(self):
        qs = super().get_queryset()
        category = self.request.query_params.get('category')
        brand = self.request.query_params.get('brand')
        featured = self.request.query_params.get('featured')
        if category:
            qs = qs.filter(category__slug=category)
        if brand:
            qs = qs.filter(brand__name__iexact=brand)
        if featured:
            qs = qs.filter(featured=True)
        return qs

    @action(detail=False, methods=['get'], permission_classes=[AllowAny])
    def featured(self, request):
        qs = self.get_queryset().filter(featured=True)
        serializer = ProductListSerializer(qs, many=True, context={'request': request})
        return Response(serializer.data)


# BLOG

class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'excerpt', 'content']
    lookup_field = 'slug'

    def get_serializer_class(self):
        if self.action == 'list':
            return BlogPostListSerializer
        return BlogPostDetailSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAuthenticated(), IsAdminUser()]

    def get_queryset(self):
        qs = super().get_queryset()
        if not (self.request.user.is_authenticated and self.request.user.is_staff):
            qs = qs.filter(published=True)
        category = self.request.query_params.get('category')
        if category:
            qs = qs.filter(category=category)
        return qs

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated, IsAdminUser])
    def publish(self, request, slug=None):
        post = self.get_object()
        post.published = not post.published
        if post.published and not post.published_at:
            post.published_at = timezone.now()
        post.save()
        return Response({'published': post.published, 'message': f'Post {"published" if post.published else "unpublished"}.'})


# REPAIR BOOKINGS

class RepairBookingViewSet(viewsets.ModelViewSet):
    queryset = RepairBooking.objects.all()
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['full_name', 'phone', 'brand', 'model']
    ordering_fields = ['created_at', 'preferred_date', 'status']

    def get_serializer_class(self):
        if self.request.user.is_authenticated and self.request.user.is_staff:
            return RepairBookingAdminSerializer
        return RepairBookingSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAuthenticated(), IsAdminUser()]

    def get_queryset(self):
        qs = super().get_queryset()
        status_filter = self.request.query_params.get('status')
        if status_filter:
            qs = qs.filter(status=status_filter)
        return qs

    @action(detail=True, methods=['patch'], permission_classes=[IsAuthenticated, IsAdminUser])
    def update_status(self, request, pk=None):
        booking = self.get_object()
        new_status = request.data.get('status')
        if new_status not in dict(RepairBooking.STATUS_CHOICES):
            return Response({'error': 'Invalid status.'}, status=status.HTTP_400_BAD_REQUEST)
        booking.status = new_status
        if 'admin_notes' in request.data:
            booking.admin_notes = request.data['admin_notes']
        booking.save()
        return Response(RepairBookingAdminSerializer(booking).data)


# CONTACT MESSAGES

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()

    def get_serializer_class(self):
        if self.request.user.is_authenticated and self.request.user.is_staff:
            return ContactMessageAdminSerializer
        return ContactMessageSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAuthenticated(), IsAdminUser()]

    @action(detail=True, methods=['patch'], permission_classes=[IsAuthenticated, IsAdminUser])
    def mark_read(self, request, pk=None):
        msg = self.get_object()
        msg.is_read = True
        msg.save()
        return Response({'is_read': True})
