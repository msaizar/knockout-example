from django.contrib import admin
from school.models import Classroom, Teacher, Student, ClassroomTeacher, ClassroomStudent

admin.site.register(Classroom)
admin.site.register(Teacher)
admin.site.register(Student)
admin.site.register(ClassroomTeacher)
admin.site.register(ClassroomStudent)
