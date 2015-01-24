from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()
from NotBionic import views

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'NotBionic.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^$', views.explore, name='home'),
    url(r'^explore/$', views.explore, name='explore'),
    url(r'^profile/$', views.profile, name='profile'),

    # Authentication view
    url(r'^auth/$', views.auth, name='auth'),
    url(r'^logout/$', views.logout_view, name='logout'),

    # JSON-returning views:
    url(r'^course/(?P<reg_id>[a-zA-Z0-9]+)/?$', views.get_course),
    url(r'^user_courses/?$', views.get_user_schedule),
    url(r'^courses/(?P<page>[1-9][0-9]*)?/?$', views.get_courses),
    url(r'^possible_values/?$', views.get_possible_values),

    # Database-modifying views:
    url(r'^add_course/?$', views.edit_course, {"operation":"add"}),
    url(r'^remove_course/?$', views.edit_course, {"operation":"remove"}),

    # Pre-rendered Course Info
    url(r'^render_course/(?P<reg_id>[a-zA-Z0-9]+)/?$', views.render_course),

    url(r'^admin/', include(admin.site.urls)),
)
