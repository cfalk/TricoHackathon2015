from django.shortcuts import render
from django.http import HttpResponse

def explore(request):
	return HttpResponse("Hello world! This is the explore page")

def profile(request):
	return render(request,"profile.html")
