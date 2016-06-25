from django.conf.urls import url
from . import views

app_name = 'word'
urlpatterns = [
    url(r'^$', views.main, name='index'),
]