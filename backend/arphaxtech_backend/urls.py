from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from core.views import (
    CategoryViewSet, ProductViewSet, BlogPostViewSet,
    RepairBookingViewSet, ContactMessageViewSet,
    admin_login, admin_logout, dashboard_stats,
)

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'products', ProductViewSet)
router.register(r'blog', BlogPostViewSet, basename='blog')
router.register(r'bookings', RepairBookingViewSet)
router.register(r'messages', ContactMessageViewSet)

urlpatterns = [
    path('django-admin/', admin.site.urls),
    path('api/auth/login/', admin_login),
    path('api/auth/logout/', admin_logout),
    path('api/dashboard/', dashboard_stats),
    path('api/', include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
