


def get_course_by_reg_id(reg_id):
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


