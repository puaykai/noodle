from django.conf.urls import url
from . import views

app_name = 'account'
urlpatterns = [
    url(r'^$', views.main, name="index"),

    # AJAX end-point
    url(r'^login/$', views.my_login, name="login"),
    url(r'^logout/$', views.my_logout, name="logout"),
]
