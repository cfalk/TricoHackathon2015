
# Set to `True` to enable debugging options.
DEBUG = False


def build_course(obj_dict):
  from NotBionic.models import Course
  import json

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

      if field=="instructor":
        # Convert "Last, First" into "First Last"
        if val.count(",")==1:
          tup = val.split(",")
          val = "{} {}".format(tup[1].strip(), tup[0].strip())

      # Allow special types for specified fields.
      if field in special_types:
        val = special_types[field](val)

      setattr(course, field, val)


  times = json.loads(obj_dict["start_times"])
  course.earliest_time = min(times)

  times = json.loads(obj_dict["end_times"])
  course.latest_time = max(times)

  course.save()


def clean_row(headers, row):

  import datetime, json

  list_fields = {"days","end_times","start_times"}
  new_row = []

  for i, tup in enumerate(zip(headers, row)):
    header = tup[0]
    val = tup[1]
    if header in list_fields:
      val = val.replace("'","\"")

    if header=="days":
      val = val.replace("\"T\"","\"Tu\"")

    elif header=="start_times" or header=="end_times":
      # Translate each time to an integer number of seconds.
      val = val.replace(".","").replace(" ","")
      times = json.loads(val)
      cleaned = []

      for time_str in times:
        if time_str:
          time = datetime.datetime.strptime(str(time_str),"%I:%M%p")
          seconds = 60*(time.hour*60+time.minute)
          cleaned.append(seconds)

      if not cleaned:
        raise Exception("No '{}' available!".format(header))

      val = json.dumps(cleaned)

    new_row.append(val)


  return new_row

def construct_courses_from_CSV(filename):

  import csv, random

  with open(filename) as f:
    reader = csv.reader(f)
    headers = reader.next()

    data = [row for row in reader]
    errors = 0
    iteration = 0

    if DEBUG:
      debug_limit = 25
      random.shuffle(data)


    for row in data:
      try:

        row = clean_row(headers, row)
        obj_dict = {key:val for key, val in zip(headers, row)}
        build_course(obj_dict)

      except Exception as e:
        errors += 1

      iteration+=1

      if DEBUG:
        if (iteration%25==0): print iteration
        if iteration==debug_limit: break

    percentage = 100.0*(iteration-errors)/iteration
    print "Complete {}% of {}".format(percentage, iteration)


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

