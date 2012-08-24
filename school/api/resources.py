from tastypie.resources import ModelResource
from school.models import Classroom, Teacher, Student
from tastypie import fields
from tastypie.authorization import Authorization


class TeacherResource(ModelResource):
    class Meta:
        queryset = Teacher.objects.all()
        list_allowed_methods = ['get', 'post']
        detail_allowed_methods = ['get', 'post', 'put', 'delete']
        authorization = Authorization()
        always_return_data = True
                
                
class StudentResource(ModelResource):
    class Meta:
        queryset = Student.objects.all()
        list_allowed_methods = ['get', 'post']
        detail_allowed_methods = ['get', 'post', 'put', 'delete']
        authorization = Authorization()
        always_return_data = True

class ClassroomResource(ModelResource):
    teachers = fields.ToManyField(TeacherResource, 'teacher')
    students = fields.ToManyField(StudentResource, 'student')
    
    class Meta:
        queryset = Classroom.objects.all()
        list_allowed_methods = ['get', 'post']
        detail_allowed_methods = ['get', 'post', 'put', 'delete']
        authorization = Authorization()
        always_return_data = True

