$('#tabs').tab();

window.teachers = ko.observableArray([]);
window.students = ko.observableArray([]);
window.classrooms = ko.observableArray([]);




var App = function() {
    var self = this;
    self.classroomsView = new ClassroomsView();
    self.teachersView = new TeachersView();
    self.studentsView = new StudentsView();
    self.alerts = new AlertsView();
}



app = new App();
ko.applyBindings(app);


$.ajax({
    url: '/api/v1/classroom/?format=json',
    type: 'GET',
    contentType: 'application/json',
    success: function (response) {
        $.each(response.objects, function(i, e) {
            var classroom = new Classroom(e.id, e.identifier);
            $.each(e.students, function(i, e){
                classroom.addStudent(e.split("/")[4]);
            });
            $.each(e.teachers, function(i, e){
                classroom.addTeacher(e.split("/")[4]);                
            });
            
            window.classrooms.push(classroom);
        });         
    },
    error: function (response) {
    }
});

$.ajax({
    url: '/api/v1/teacher/?format=json',
    type: 'GET',
    contentType: 'application/json',
    success: function (response) {
        $.each(response.objects, function(i, e) {
            var teacher = new Teacher(e.id, e.first_name, e.last_name);
            window.teachers.push(teacher);
        }); 
        //app.createClassroomForm.updateTypeahead();
        
    },
    error: function (response) {
    }
});

$.ajax({
    url: '/api/v1/student/?format=json',
    type: 'GET',
    contentType: 'application/json',
    success: function (response) {
        $.each(response.objects, function(i, e) {
            var student = new Student(e.id, e.first_name, e.last_name);
            window.students.push(student);
        }); 
    },
    error: function (response) {
    }
});
