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


class Course(models.Model):
    title = models.CharField(max_length=255, null=True)
    reg_id = models.CharField(max_length=100)
    department_num = models.CharField(max_length=100)
    course_cap = models.IntegerField(null=True)
    course_num = models.IntegerField(null=True)

    description = models.TextField(null=True)

    semester = models.CharField(max_length=100, null=True)
    seminar = models.CharField(max_length=100, null=True)
    college = models.CharField(max_length=100, null=True)
    location = models.CharField(max_length=255, null=True)

    department = models.CharField(max_length=100, null=True)

    division = models.CharField(max_length=100, null=True)
    distribution = models.CharField(max_length=100, null=True)

    days = models.TextField(default="[]")
    start_times = models.TextField(default="[]")
    end_times = models.TextField(default="[]")


    def get_start_times(self):
        return json.loads(self.start_times)

    def get_end_times(self):
        return json.loads(self.end_times)

    def get_days(self):
        return json.loads(self.days)


