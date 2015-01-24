def getCourse(college, semester, reg):
  import subprocess
  import json

  url = "http://dev-trico-cc.haverford.edu/api/course/get"
  command = "curl -i -H \"Content-Type: application/json\" -X POST -d '{{\"college\":\"{}\", \"semester\":\"{}\", \"reg_id\":\"{}\"}}' http://dev-trico-cc.haverford.edu/api/course/get".format(college, semester, reg)

  raw = subprocess.check_output(command, shell=True)
  print "____________________"

  # Remove the "header" information.
  response = "".join(raw.split("\n")[6:])

  #return the class' json object
  return json.loads(response)["response"][0]


def main():
  courses = range(10)
  errors = 0

  for course in courses:
    try:
      info = getCourse("haverford","spring_2014","PSYCH100A001")
      print info

    except Exception as e:
      print e
      errors += 1

  success_rate = 100.0*(len(courses)-errors)/errors if errors else 100.0
  print "Finished! ({}% success)".format(success_rate)


if __name__=="__main__":
  main()
