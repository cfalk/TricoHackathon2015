from django.db import models
from django.contrib.auth.models import User
import json

class Expanded_User(models.Model):
    schedule = models.TextField(default="[]")
    shopping_cart = models.TextField(default="[]")
    completed_courses = models.TextField(default="[]")
    school = models.CharField(max_length=100)
    previous_courses = models.TextField()

    user = models.ForeignKey(User, unique=True)

    def get_courses(self):
      sched = json.loads(self.schedule)
      cart = json.loads(self.shopping_cart)
      return {"schedule":sched, "shopping_cart":cart}


    def add_course(self, reg_id, location):
      if location not in {"schedule", "shopping_cart"}:
        raise Exception("`location` must be 'schedule' or 'shopping_cart'!")

      current = json.loads( getattr(self, location) )
      current.append(reg_id)
      setattr(self, location, json.dumps(current))

      self.save()


class Course(models.Model):
    title = models.CharField(max_length=255, null=True)
    reg_id = models.CharField(max_length=100, default="")
    department_num = models.CharField(max_length=100, default="")
    course_cap = models.IntegerField(null=True)
    course_num = models.IntegerField(null=True)

    description = models.TextField(default="")

    semester = models.CharField(max_length=100, default="")
    seminar = models.CharField(max_length=100, default="")
    college = models.CharField(max_length=100, default="")
    location = models.CharField(max_length=255, default="")

    department = models.CharField(max_length=100, default="")

    division = models.CharField(max_length=100, null=True, default="")
    distribution = models.CharField(max_length=100, null=True, default="")

    days = models.TextField(default="[]")
    start_times = models.TextField(default="[]")
    end_times = models.TextField(default="[]")


    def _load_json_field(self, field):
      raw = getattr(self, field)
      return json.loads(raw.replace("'","\""))


    def to_dict(self):
        val_dict = {}

        for field in self._meta.get_all_field_names():
          val = getattr(self, field)

          # Return the json-ready value if possible.
          try:
            val = json.loads(val.replace("'","\""))
          except:
            pass

          val_dict[field] = val

        return val_dict



