
from models import Course

def getCourse(reg_id):
  return Course.objects.get(reg_id=reg_id)


def searchCourse(reg_id="", title="", prof=""):
  pass


