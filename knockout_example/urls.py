from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

from tastypie.api import Api
from school.api.resources import ClassroomResource, TeacherResource, StudentResource

v1_api = Api(api_name='v1')
v1_api.register(ClassroomResource())
v1_api.register(TeacherResource())
v1_api.register(StudentResource())

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'school.views.home', name='home'),
    # url(r'^knockout_example/', include('knockout_example.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
    (r'^api/', include(v1_api.urls)),
    
    
)
