from django.contrib import admin
from .models import Category, Brand, Product, ProductImage, BlogPost, RepairBooking, ContactMessage

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ['name', 'category']
    list_filter = ['category']

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'brand', 'price', 'status', 'featured']
    list_filter = ['category', 'brand', 'status', 'featured']
    search_fields = ['name', 'specs']
    list_editable = ['featured', 'status']
    inlines = [ProductImageInline]

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'published', 'published_at']
    list_filter = ['category', 'published']
    search_fields = ['title', 'content']
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ['published']

@admin.register(RepairBooking)
class RepairBookingAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'phone', 'brand', 'model', 'status', 'preferred_date', 'created_at']
    list_filter = ['status', 'device_type']
    search_fields = ['full_name', 'phone', 'brand', 'model']
    list_editable = ['status']

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'phone', 'is_read', 'created_at']
    list_filter = ['is_read']
    search_fields = ['name', 'email', 'message']
    list_editable = ['is_read']
