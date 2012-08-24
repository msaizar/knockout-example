from django.db import models
import datetime

# Create your models here.


class Person(models.Model):
    first_name = models.TextField(blank=False)
    last_name = models.TextField(blank=False)
    created = models.DateTimeField(blank=True, default=datetime.datetime.now)
    deleted = models.BooleanField(default=False)
    def __unicode__(self):
        return u"%s %s" % (self.first_name, self.last_name)

class Teacher(Person):
    """(Class description)"""
    salary = models.TextField(blank=True)


class Student(Person):
    """(Class description)"""
    telephone = models.TextField(blank=True)


class ClassroomTeacher(models.Model):
    classroom = models.ForeignKey('Classroom')
    teacher = models.ForeignKey('Teacher')
    
class ClassroomStudent(models.Model):
    classroom = models.ForeignKey('Classroom')
    student = models.ForeignKey('Student')

class Classroom(models.Model):
    """(Class description)"""
    identifier = models.TextField(blank=False, unique=True)
    description = models.TextField(blank=True)
    created = models.DateTimeField(blank=True, default=datetime.datetime.now)
    deleted = models.BooleanField(default=False)
    teacher = models.ManyToManyField("Teacher", through="ClassroomTeacher")
    student = models.ManyToManyField("Student", through="ClassroomStudent")
    class Admin:
        list_display = ('',)
        search_fields = ('',)
    def __unicode__(self):
        return u"%s" % (self.identifier)