from django.shortcuts import render
from django.http import HttpResponse


def main(request):
    return HttpResponse("Hello music", status=200)
