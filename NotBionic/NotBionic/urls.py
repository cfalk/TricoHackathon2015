from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()
from NotBionic import views

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'NotBionic.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^$', views.explore, name='home'),
    url(r'^explore/', views.explore, name='explore'),
    url(r'^profile/', views.profile, name='profile'),
    url(r'^admin/', include(admin.site.urls)),
)
