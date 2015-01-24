
# Set to `True` to enable debugging options.
DEBUG = False


def queryCourse(college, semester, reg):
  import subprocess
  import json

  command = "curl -i -H \"Content-Type: application/json\" -X POST -d '{{\"college\":\"{}\", \"semester\":\"{}\", \"reg_id\":\"{}\"}}' http://dev-trico-cc.haverford.edu/api/course/get".format(college, semester, reg)

  raw = subprocess.check_output(command, shell=True)

  # Remove the "header" information.
  response = "".join(raw.split("\n")[6:])

  #return the class' json object
  return json.loads(response)["response"][0]


def parse_info(raw_info):
  import re

  info = {}

  # Grab the basic data.
  headers_to_rip = [
                    "number", "title", "dept_name", "instructor", "semester",
                    "days","end_times","start_times", "reg_id", "location",
                    "college"
                    ]

  for header in headers_to_rip:
    info[header] = raw_info[header]
    del raw_info[header]


  if "misc" in raw_info:

    misc_info = raw_info["misc"]

    # Strip any "key: value" text from the `misc_info`.
    regex = re.compile("([a-zA-z ]+: [a-zA-Z0-9]+)")
    for match in regex.finditer(misc_info[0]):
      key, val = match.group().split(":")
      key = key.strip().replace(" ","_").lower()
      info[key] = val.strip()

    # Get the course's division from `misc_info` if it's available.
    if ";" in misc_info[0]:
      info["division"] = misc_info[0].split(";")[1].strip()
    else:
      info["division"] = ""

    # Get the course's description
    if "|" in misc_info[1]:
      misc_parts = misc_info[1].split("|")
      info["description"] = misc_parts[1].strip()
    else:
      info["description"] = misc_info[1].strip()

  return info


def getCourses():
  import json

  files = ["bryn_mawr.json","haverford.json","swarthmore.json"]
  root_dir = "NotBionic/data/"

  courses = []

  for filename in files:
    with open("{}/{}".format(root_dir, filename)) as f:
      contents = f.read()
      course_list = json.loads(contents)["response"]
      courses.extend(course_list)

  return courses


def write_json_to_csv(json_list, filename):

  from unicode_csv import UnicodeWriter

  translate = {
    "class_nbr":"course_num",
    "crn":"course_num",
    "num":"course_num",
    "number":"department_num",
    "dist":"distribution",
    "div":"division",
    "lim":"course_cap",
    "graded_sem":"seminar",
    "graded_seminar":"seminar",
    "double_graded_seminar":"seminar",
    "dept_name":"department",
  }

  scrap = {"req", "sign", "note", "prerequisite", "prereq"}

  # Get all the available headers.
  header_set = {header for obj in json_list for header in obj.keys()}
  headers = [h for h in header_set if not (h in translate or h in scrap)]
  headers.extend(translate.values())

  headers = map(unicode, headers)
  headers = list(set(headers))
  headers.sort()

  with open(filename, "w") as f:

    # Prepare the csv.
    writer = UnicodeWriter(f)

    # Write "cleaned" headers to the CSV
    cleaned_headers = [unicode(h.replace(" ","_").lower()) for h in headers]
    writer.writerow(cleaned_headers)

    for obj in json_list:
      for key in translate.keys():
        if key in obj:
          new_key = translate[key]
          obj[new_key] = obj[key]

      vals = [unicode(obj.get(header, "")).strip() for header in headers]
      writer.writerow(vals)


def main():
  import time

  # Variable Setup
  csv_filename = "NotBionic/data/trico_catalog.csv"
  courses = getCourses()

  if DEBUG:
    csv_filename = "NotBionic/data/trico_catalog_test.csv"
    courses = courses[:100]

  t_start = time.time()
  errors = 0

  for i, course in enumerate(courses):
    try:
      info = queryCourse(course["college"], course["semester"], course["reg_id"])
      info = parse_info(info)
      courses[i].update(info)

    except Exception as e:
      print "------ ERROR: {}".format(e)
      errors += 1

  write_json_to_csv(courses, csv_filename)

  success_rate = 100.0*(len(courses)-errors)/len(courses) if errors else 100.0
  print "Finished! ({}% success)".format(success_rate)
  print "CSV written to '{}'".format(csv_filename)
  print "(Took {} seconds...)".format(time.time()-t_start)


if __name__=="__main__":

  # Set the PATH so that the Django settings may be used.
  import os, sys
  project = "NotBionic"
  full_path = os.path.dirname(os.path.realpath(__file__))+"/"
  django_path = full_path[:full_path.rfind("/{}/".format(project))]
  if django_path not in sys.path:
    sys.path = [django_path] + sys.path
    os.environ['DJANGO_SETTINGS_MODULE'] = '{}.settings'.format(project)

  main()
