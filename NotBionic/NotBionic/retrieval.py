
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

  from models import Course

  if courses is None:
    courses = Course.objects.all()

  # Separately parse the time-related searches from the query.
  time_fields = ["start", "end", "days"]
  time_query = {f:query[f] for f in time_fields if f in query}
  query = {f:val for f, val in query.items() if f in f not in time_fields}

  if time_query:
    courses = filter_timeframe(time_query, courses=courses)

  return courses.filter(**query)



def filter_timeframe(query, courses=None):
  # Returns the courses that are within a certain timeframe.

  from models import Course
  from django.db.models import Q
  import json, operator

  if courses is None:
    courses = Course.objects.all()

  if "days" in query:
    # Calculate the days that are to be removed.
    all_days = ["M","Tu","W","Th","F"]
    allowed_days = set(json.loads(query["days"]))
    bad_days = [day for day in all_days if day not in allowed_days]

    # Construct a Q-sequence that will apply the filter.
    day_query = [~Q(days__icontains=day) for day in bad_days]
    prepared_query = reduce(operator.and_, day_query)

    # Remove any courses that contained any "bad" days.
    courses = courses.filter(prepared_query)

  if "start_times" in query:
    pass



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




