from django.db import models
from django.contrib.auth.models import User

class Expanded_User(models.Model):
    schedule = models.TextField(default="[]")
    shopping_cart = models.TextField(default="[]")
    completed_courses = models.TextField(default="[]")
    school = models.CharField(max_length=100)
    previous_courses = models.TextField()

    user = models.ForeignKey(User, unique=True)


class Course(models.Model):
    name = models.CharField(max_length=255, null=True)
    reg_id = models.CharField(max_length=100)
    description = models.TextField(null=True)
    course_cap = models.IntegerField(null=True)
    semester = models.CharField(max_length=100, null=True)
    department = models.CharField(max_length=100, null=True)
    division = models.CharField(max_length=100, null=True)
    instructor = models.CharField(max_length=100, null=True)
    days = models.TextField(default="[]")
    start_times = models.TextField(default="[]")
    end_times = models.TextField(default="[]")
    keyword = models.CharField(max_length=100, null=True)



