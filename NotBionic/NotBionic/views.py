from django.shortcuts import render
from django.http import HttpResponse

def explore(request):
	return render(request, "explore.html")

def profile(request):
	return render(request,"profile.html",{'classes':{
	'eight':['off','on','on','off','on','off','on'],
	'eight_2':['off','on','on','off','on','off','on'],
	'nine':['off','on','on','off','on','off','on'],
	'nine_2':['off','on','on','off','on','off','on'],
	'ten':['off','on','on','off','on','off','on'],
	'ten_2':['off','on','on','off','on','off','on'],
	'eleven':['off','on','on','off','on','off','on'],
	'eleven_2':['off','on','on','off','on','off','on'],
	'twelve':['off','on','on','off','on','off','on'],
	'twelve_2':['off','on','on','off','on','off','on'],
	'one':['off','on','on','off','on','off','on'],
	'one_2':['off','on','on','off','on','off','on'],
	'two':['off','on','on','off','on','off','on'],
	'two_2':['off','on','on','off','on','off','on'],
	'three':['off','on','on','off','on','off','on'],
	'three_2':['off','on','on','off','on','off','on'],
	'four':['off','on','on','off','on','off','on'],
	'four_2':['off','on','on','off','on','off','on'],
	},
	'user':{'name':'Brandon'}})


