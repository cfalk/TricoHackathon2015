
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


def filter_courses(search_dict):
  # Returns all Course (or `none`) objects that match all
  #  specified key-values in `search_dict`

  from models import Course

  return Course.objects.filter(**search_dict)


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


def get_course_value_set(field):
  return ["test","test1","test2"]


