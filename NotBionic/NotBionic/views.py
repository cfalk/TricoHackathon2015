from django.shortcuts import render
from django.http import HttpResponse, HttpResponseForbidden
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required

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


def get_user_schedule(request):
  # Sends a json object (below) with the `reg_id`s of this user's courses.
  # FORMAT: {"schedule":["IDx", ...], "shopping_cart":["IDy", ...]}

  from retrieval import get_expanded_user
  import json

  user = request.user

  if user.is_authenticated():

    expanded_user = get_expanded_user(user)
    courses = expanded_user.get_courses()
    response = json.dumps(courses)

    return HttpResponse(response, content_type="application/json")

  else:
    return HttpResponseForbidden()




@require_http_methods(["GET"])
def get_course(request, reg_id=""):
  # Sends json data for a single course matching a reg_id.

  from retrieval import get_course_by_reg_id
  import json

  course = get_course_by_reg_id(reg_id)
  data = course.to_dict() if course else []
  response = json.dumps(data)

  return HttpResponse(response, content_type="application/json")


@require_http_methods(["POST"])
def edit_course(request, operation="add"):
  # Adds/removes a single course `reg_id` to either a user's "schedule"
  #  or "shopping_cart" (set by `location`). Expects a POST with data of
  #  the format: {"reg_id":"IDx", "location":"shopping_cart|schedule"}

  from retrieval import get_course_by_reg_id, get_expanded_user

  try:
    if not request.user.is_authenticated():
      raise Exception("User is not authenticated!")

    reg_id = request.POST["reg_id"]
    location = request.POST["location"]
    operation = request.POST["operation"]

    course = get_course_by_reg_id(reg_id)

    if not course:
      raise Exception("Course not found!")

    expanded = get_expanded_user(request.user)

    if operation == "add":
      expanded.add_course(reg_id, location)
    elif operation == "remove":
      expanded.remove_course(reg_id, location)
    else:
      raise Exception("Invalid operation specified!")

    return HttpResponse("Success!")

  except:
    return HttpResponse("Failed!")




