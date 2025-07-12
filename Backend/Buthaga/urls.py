from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.contrib import admin
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/', include('MahlakuApp.urls')),
    
    # Serve React's index.html for all non-API routes
    re_path(r'^(?!api/|admin/|static/|media/).*', 
            TemplateView.as_view(template_name='index.html')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)