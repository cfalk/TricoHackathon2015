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

      if reg_id not in current:
        current.append(reg_id)
        setattr(self, location, json.dumps(current))

        self.save()


    def remove_course(self, reg_id, location):
      # Removes the course with a given `reg_id` from the user's
      #  "schedule" or"

      if location not in {"schedule", "shopping_cart"}:
        raise Exception("`location` must be 'schedule' or 'shopping_cart'!")

      current = json.loads( getattr(self, location) )

      if reg_id in current:
        current.remove(reg_id)

        setattr(self, location, json.dumps(current))

        self.save()




class Course(models.Model):
    title = models.CharField(max_length=255, null=True)
    reg_id = models.CharField(max_length=100, default="")
    department_num = models.CharField(max_length=100, default="")
    course_cap = models.CharField(max_length=100, default="")
    course_num = models.CharField(max_length=100, default="")
    level = models.CharField(max_length=100, default="")

    description = models.TextField(default="")

    semester = models.CharField(max_length=100, default="")
    seminar = models.CharField(max_length=100, default="")
    college = models.CharField(max_length=100, default="")
    location = models.CharField(max_length=255, default="")
    instructor = models.CharField(max_length=100, default="")

    department = models.CharField(max_length=100, default="")

    division = models.CharField(max_length=100, null=True, default="")
    distribution = models.CharField(max_length=100, null=True, default="")

    days = models.TextField(default="[]")
    start_times = models.TextField(default="[]")
    end_times = models.TextField(default="[]")

    earliest_time = models.IntegerField(null=True)
    latest_time = models.IntegerField(null=True)


    def clean_days(self):
        return self._load_json_field("days")


    def clean_start_times(self):
        times = self._load_json_field("start_times")
        return [self._load_time(time) for time in times]


    def clean_end_times(self):
        times = self._load_json_field("end_times")
        return [self._load_time(time) for time in times]


    def _load_json_field(self, field):
        raw = getattr(self, field)
        return json.loads(raw)


    def _load_time(self, seconds):
        # Convert a number of seconds into the corresponding time-of-day
        #  which is then returned as a string.

        minutes = int((seconds/60.0)%60)
        hours = int((seconds/60.0)/60)
        period = "am"

        if hours>=12:
          period = "pm"
          if hours>12:
            hours -= 12
        elif hours==0:
          hours = 12

        if minutes<10:
          minutes = "0{}".format(minutes)

        return "{}:{}{}".format(hours, minutes, period)



    def to_dict(self):
        # Returns a Python dictionary where the key-value pairs
        #  are {"field":"value", ...}.

        val_dict = {}

        for field in self._meta.get_all_field_names():
          val = getattr(self, field)

          # Return the json-ready value if possible.
          try:
            val = json.loads(val)
          except:
            pass

          val_dict[field] = val

        # Make the times human-readable.
        val_dict["start_times"] = self.clean_start_times()
        val_dict["end_times"] = self.clean_end_times()

        return val_dict


    def to_non_unicode_dict(self):
      # Returns a dict but without using unicode encodings.

      def _fix_type(val):
        if type(val)==list:
          return val
        else:
          return str(val)

      raw_dict = self.to_dict()
      non_unicode = {f:_fix_type(v) for f,v in raw_dict.items()}
      return non_unicode


