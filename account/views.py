from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required


def main(request):
    return HttpResponse("Hello accounts", status=200)


def my_login(request):
    print "type : %s" % type(request)
    if request.method == "POST" and request.POST.get('username') and request.POST.get('password'):
        username = request.POST.get('username')
        password = request.POST.get('password')
        if User.objects.filter(username=username).exists():
            user = authenticate(username=username, password=password)
            if user is not None:
                if user.is_active:
                    login(request, user)
                    return HttpResponse("KEY_LOGIN_SUCCESS", status=200)
                else:
                    return HttpResponse("KEY_USER_ACCOUNT_DISABLED", status=200)
            else:
                return HttpResponse("KEY_INVALID_LOGIN", status=200)
        else:
            try:
                User.objects.create_user(username, "", password).save()
            except:
                return HttpResponse("KEY_CREATE_USER_FAILED", status=200)
            return HttpResponse("KEY_CREATE_USER_SUCCESS", status=200)


@login_required
def my_logout(request):
    logout(request)
