from django.shortcuts import render
from django.http import HttpResponse, HttpResponseForbidden, HttpResponseRedirect
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout



def profile(request):
    # Returns the profile (schedule) page.

    return render(request,"profile.html")



def logout_view(request):
    # Kills the login-session of a user.

    logout(request)
    return HttpResponseRedirect("/explore/")



def explore(request):
    # Returns the search/explore page.

    from models import Course
    from retrieval import get_course_value_set

    fields = Course._meta.get_all_field_names()
    fields.remove(u"id")

    field_map = {field:list(get_course_value_set(field)) for field in fields}

    return render(request, "explore.html", {
                                            "field_list":fields,
                                            "value_list":field_map
                                           })



def auth(request):
    # Authenticates a user and redirects them to a specified page.

    username = request.POST['username']
    password = request.POST['password']
    redirect = request.POST.get('next', "/profile/")

    user = authenticate(username=username, password=password)

    if user is not None:
        if user.is_active:
            login(request,user)
            return HttpResponseRedirect(redirect)
        else:
            return HttpResponse("Invalid Login!")
    else:
        return HttpResponse("Invalid Login!")



def get_user_schedule(request):
  # Sends a json object (below) with the `reg_id`s of this user's courses.
  # FORMAT: {"schedule":["IDx", ...], "shopping_cart":["IDy", ...]}

  from retrieval import get_expanded_user
  import json

  user = request.user

  if user.is_authenticated():

    expanded_user = get_expanded_user(user)
    courses = expanded_user.get_courses()

  else:

    courses = {"schedule":[], "shopping_cart":[]}

  response = json.dumps(courses)

  return HttpResponse(response, content_type="application/json")




@require_http_methods(["GET"])
def get_course(request, reg_id=""):
  # Sends json data for a single course matching a reg_id.

  from retrieval import get_course_by_reg_id
  import json

  course = get_course_by_reg_id(reg_id)
  data = course.to_dict() if course else []
  response = json.dumps(data)

  return HttpResponse(response, content_type="application/json")



@require_http_methods(["GET"])
def get_courses(request, page=1):
  # Returns a JSON object of courses that belong to a given `page`
  #  of courses. Also allows filtering of data.

  import json
  from retrieval import pagify_courses, filter_courses, get_free_times

  request.GET.items()

  # Collect querylists if necessary.
  queries = {}
  for key, val in request.GET.items():
    if "[]" in key:
      key = key.replace("[]","")
      val = request.GET.getlist(key+"[]")
    queries[key] = val

  if "suggestions" in queries and queries["suggestions"]=="on":
    randomize = True

    if request.user.is_authenticated():
      slots = get_free_times(request.user)
      print slots

    del queries["suggestions"]
  else:
    randomize = False


  # Clean and integerize the `page`.
  if not page:
    page = 1
  else:
    page = int(page)


  # Apply any available filters and pagify the courses.
  courses = filter_courses(queries)
  courses = pagify_courses(courses, page=page)

  # Construct the JSON response from the courses.
  data = [course.to_dict() for course in courses]
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

  except Exception as e:
    return HttpResponse("Failed!")



@require_http_methods(["GET"])
def get_possible_values(request):
  # Returns an ordered list of all unique values of a Course `field`
  #  as a JSON object.

  from retrieval import get_course_value_set
  import json

  if "field" in request.GET:
    field = request.GET["field"]

    # Get a sorted list of all unique values for this field.
    data = list(get_course_value_set(field))
    data.sort()

  else:
    data = []

  response = json.dumps(data)

  return HttpResponse(response, content_type="application/json")


@require_http_methods(["GET"])
def get_possible_fields(request):
  # Returns a sorted list of all available Course fields as a
  #  JSON object.

  from models import Course
  import json

  data = Course._meta.get_all_field_names()
  data.remove(u"id")
  data.sort()

  response = json.dumps(data)

  return HttpResponse(response, content_type="application/json")



@require_http_methods(["GET"])
def render_course(request, reg_id=""):
  # Sends an html page containing course info.
  from retrieval import get_course_by_reg_id
  course = get_course_by_reg_id(reg_id)
  course_reg_id = course.reg_id
  department_num = course_reg_id[:len(course_reg_id)-3]
  department = department_num[0:4]
  cleaned_reg_id = department_num
  return render(request, "course_info.html", {
                                              "course":course,
                                              "cleaned_reg_id": cleaned_reg_id,
                                             })




