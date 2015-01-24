def getCourse(college, semester, reg):
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

  misc_info = raw_info["misc"]

  # Strip any "key: value" text from the `misc_info`.
  regex = re.compile("([a-zA-z ]+: [a-zA-Z0-9]+)")
  for match in regex.finditer(misc_info[0]):
    key, val = match.group().split(":")
    info[key.strip()] = val.strip()

  # Get the course's division from `misc_info` if it's available.
  if ";" in misc_info[0]:
    info["division"] = misc_info[0].split(";")[1].strip()
  else:
    info["division"] = ""

  # Get the course's description
  print misc_info[1].split("|")


  #print raw_info
  #print info
  return info


def main():
  courses = range(10)
  errors = 0

  for course in courses:
    try:
      info = getCourse("haverford","fall_2014","ANTHH103A001")
      info = parse_info(info)

    except Exception as e:
      print e
      errors += 1

  success_rate = 100.0*(len(courses)-errors)/errors if errors else 100.0
  print "Finished! ({}% success)".format(success_rate)


if __name__=="__main__":
  main()
