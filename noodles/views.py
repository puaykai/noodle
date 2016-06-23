from django.http import HttpResponse
from django.template import RequestContext
from django.shortcuts import render
import os, os.path


def main(request):
    return render(request, "index.html", {})
    # return HttpResponse(os.path.join(os.path.dirname(os.path.realpath(__file__)), "index.html"))
