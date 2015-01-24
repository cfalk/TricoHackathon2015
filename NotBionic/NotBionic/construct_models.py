
# Set to `True` to enable debugging options.
DEBUG = True


def build_course(obj_dict):
  from NotBionic.models import Course

  course = Course()

  fields = [
              "start_times", "end_times", "semester",
              "description", "reg_id", "division",
              "instructor", "days", "title", "college",
              "seminar", "course_num",
              "distribution", "description", "location",
              "department", "course_cap", "department_num",
            ]

  # If a field requires a non-string type, specify it with a key-val
  #  in the format field-constructor (eg, {"length":int} ).
  special_types = dict()

  for field in fields:

    val = obj_dict[field]

    if val:

      # Allow special types for specified fields.
      if field in special_types:
        val = special_types[field](val)

      setattr(course, field, val)

  course.save()


def construct_courses_from_CSV(filename):
  import csv, random

  with open(filename) as f:
    reader = csv.reader(f)
    headers = reader.next()

    data = [row for row in reader]
    errors = 0

    if DEBUG:
      debug_limit = 2000
      iteration = 0
      random.shuffle(data)


    for row in data:
      try:

        obj_dict = {key:val for key, val in zip(headers, row)}
        build_course(obj_dict)

      except:
        errors += 1

      if DEBUG:
        iteration+=1
        if (iteration%25==0): print iteration
        if iteration==debug_limit: break



if __name__=="__main__":

  # Set the PATH so that the Django settings may be used.
  import os, sys
  project = "NotBionic"
  full_path = os.path.dirname(os.path.realpath(__file__))+"/"
  django_path = full_path[:full_path.rfind("/{}/".format(project))]
  if django_path not in sys.path:
    sys.path = [django_path] + sys.path
    os.environ['DJANGO_SETTINGS_MODULE'] = '{}.settings'.format(project)

  construct_courses_from_CSV("NotBionic/data/trico_catalog.csv")

