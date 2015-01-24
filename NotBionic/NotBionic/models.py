from django.db import models
from django.contrib.auth.models import User

class Expanded_User(models.Model):
    schedule = models.CharField(max_length=200)
    potential_courses = models.CharField(max_length=200)
    school = models.CharField(max_length=20)
    user = models.ForeignKey('User')
    previous_courses = models.CharField(max_length=200)
    fulfilled_requirements = models.CharField(max_length=200)

class Course(models.Model):
    name = models.CharField(max_length=50)
    reg_id = models.CharField(max_length=15)
    description = models.CharField(max_length=400)
    course_cap = models.IntegerField()
    semester = models.CharField(max_length=10)
    department = models.CharField(max_length=15)
    division = models.CharField(max_length=15)
    instructor = models.CharField(max_length=20)
    days = models.CharField(max_length=3)
    start_time = models.CharField(max_length=10)
    keyword = models.CharField(max_length=20)
