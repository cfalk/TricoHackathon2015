
def pagify_courses(courses, page=1):
  # Returns a list of courses for a given `page`.

  per_page = 15 # The max number of courses to show per `page`

  start = (page-1)*per_page
  end = page*per_page

  return courses[start:end]



def get_course_by_reg_id(reg_id):
  # Returns one course that case-insensitively matches a `reg_id`
  #  or returns `none` if no course is found.

  return filter_courses({"reg_id__iexact":reg_id}).first()



def filter_courses(query, courses=None):
  # Returns all Course (or `none`) objects that match all
  #  specified key-values in `query`

  from django.db.models import Q
  from models import Course
  import operator

  if courses is None:
    courses = Course.objects.all()

  # Separately parse the time-related searches from the query.
  time_fields = ["starts", "ends", "day"]
  time_query = {f:query[f] for f in time_fields if f in query}
  query = {f:val for f, val in query.items() if f not in time_fields}

  if time_query:
    courses = filter_timeframe(time_query, courses=courses)

  # Allow `val` lists to perform `or` operations on a `field` and
  #  allow `val` single values to perform `and` operations.
  for field, val in query.items():
    # If not set, default search to be caseless and containment-based.
    if "__" not in field:
      field += "__icontains"

    if type(val)==list:
      Q_list = [Q(**{field:sub_val}) for sub_val in val]
      prepared_query = reduce(operator.or_, Q_list)
      courses = courses.filter(prepared_query)

    else:
      courses = courses.filter(**{field:val})

  return courses



def filter_timeframe(query, courses=None):
  # Returns the courses that are within a certain timeframe.

  from models import Course
  from django.db.models import Q
  import json, operator, datetime

  if courses is None:
    courses = Course.objects.all()


  # Variable Setup: field names to be used by the query.
  day_field = "day"
  start_field = "starts"
  end_field = "ends"


  if day_field in query:
    # Calculate the days that are to be removed.
    all_days = ["M","Tu","W","Th","F"]
    allowed_days = set(query[day_field])
    bad_days = [day for day in all_days if day not in allowed_days]

    # If no `bad_days` were specified, don't bother filtering.
    if bad_days:

      # Construct a Q-sequence that will apply the filter.
      day_query = [~Q(days__icontains=day) for day in bad_days]
      prepared_query = reduce(operator.and_, day_query)

      # Remove any courses that contained any "bad" days.
      courses = courses.filter(prepared_query)


  if start_field in query:
    # Expects input in the form: {start_field:"direction_04:00PM"} where
    #  direction may be "before", "after", or "at".
    if "_" in query[start_field]:
      direction, time_str = query[start_field].split("_")
    else:
      direction = "at"
      time_str = query[start_field]

    time = datetime.datetime.strptime(time_str.strip(),"%I:%M%p")
    seconds = 60*(time.hour*60+time.minute)

    if direction=="before":
      suffix = "__lt"
    elif direction=="after":
      suffix = "__gte"
    elif direction=="at":
      suffix = ""
    else:
      raise Exception("Unknown `direction` specified: '{}'".format(direction))

    prepared_query = {"earliest_time{}".format(suffix):seconds}
    courses = courses.filter(**prepared_query)

  if end_field in query:
    # Expects input in the form: {end_field:"direction_04:00PM"} where
    #  direction may be "before", "after", or "at".
    if "_" in query[end_field]:
      direction, time_str = query[end_field].split("_")
    else:
      direction = "at"
      time_str = query[end_field]

    time = datetime.datetime.strptime(time_str.strip(),"%I:%M%p")
    seconds = 60*(time.hour*60+time.minute)

    if direction=="before":
      suffix = "__lt"
    elif direction=="after":
      suffix = "__gte"
    elif direction=="at":
      suffix = ""
    else:
      raise Exception("Unknown `direction` specified: '{}'".format(direction))

    prepared_query = {"latest_time{}".format(suffix):seconds}
    courses = courses.filter(**prepared_query)

  return courses



def get_expanded_user(user):
  # Returns the `Expanded_User` entry associated with a `user`
  #  or creates one if it does not yet exist.

  from models import Expanded_User

  expanded = Expanded_User.objects.filter(user=user).first()

  if not expanded:
    expanded = Expanded_User()
    expanded.user = user
    expanded.save()

  return expanded



def get_course_value_set(field, courses=None):
  # Returns a set of the distinct values in a Course `field`.
  #  Also allows values to be chosen from a subset, `courses`.

  from models import Course

  if courses is None:
    courses = Course.objects.all()

  vals = courses.values_list(field, flat=True).distinct()

  return set(vals)




