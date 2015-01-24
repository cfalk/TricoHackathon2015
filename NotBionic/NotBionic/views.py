from django.shortcuts import render
from django.http import HttpResponse

def explore(request):
	return render(request, "explore.html")

def profile(request):
	return render(request,"profile.html")
