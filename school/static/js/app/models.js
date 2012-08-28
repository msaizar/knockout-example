var Teacher = function(id, firstName, lastName) {
    var self = this;
    self.id = ko.observable(id);
    self.firstName = ko.observable(firstName);
    self.lastName = ko.observable(lastName);
    self.fullName = ko.computed({
        read: function () {
            return self.firstName() + " " + self.lastName(); 
        },
        write: function (value) {
            var names = $.trim(value).split(" ");
            self.firstName(names[0]);
            self.lastName(names[1]);
        },
        owner: self,
    });
    
    self.save = function() {
        
        var obj;
        var type;
        var url;
        
        if (self.id() == null) {
            obj = {first_name: self.firstName(), last_name: self.lastName()}; 
            type = 'POST';
            url = '/api/v1/teacher/?format=json';
        }
        else {
            obj = {id: self.id(), first_name: self.firstName(), last_name: self.lastName()}; 
            type = 'PUT';
            url = '/api/v1/teacher/' + self.id() + '/?format=json';   
        }
        $.ajax({
            url: url,
            data: JSON.stringify(obj),
            type: type,
            contentType: 'application/json',
            success: function (response) {
                var person = new Teacher(response.id, response.first_name, response.last_name);
                var found = false;
                ko.utils.arrayForEach(window.teachers(), function(teacher) {
                    if (teacher.id() == person.id()) {
                        teacher.firstName(person.firstName());
                        teacher.lastName(person.lastName());
                        found = true;
                    }
                });
                if (!found) {
                    window.teachers().push(person);
                }
                app.alerts.setSuccess('Teacher saved successfully!');
            },
            error: function (response) {
                app.alerts.setError('Failed to save teacher!');
            }
        });
        
    };
}

var Student = function(id, firstName, lastName) {
    var self = this;
    self.id = ko.observable(id);
    self.firstName = ko.observable(firstName);
    self.lastName = ko.observable(lastName);
    
    self.fullName = ko.computed({
        read: function () {
            return self.firstName() + " " + self.lastName(); 
        },
        write: function (value) {
            var names = $.trim(value).split(" ");
            self.firstName(names[0]);
            self.lastName(names[1]);
        },
        owner: self,
    });
    
    self.save = function() {
        
        var obj;
        var type;
        var url;
        
        if (self.id() == null) {
            obj = {first_name: self.firstName(), last_name: self.lastName()}; 
            type = 'POST';
            url = '/api/v1/student/?format=json';
        }
        else {
            obj = {id: self.id(), first_name: self.firstName(), last_name: self.lastName()}; 
            type = 'PUT';
            url = '/api/v1/student/' + self.id() + '/?format=json';   
        }
        $.ajax({
            url: url,
            data: JSON.stringify(obj),
            type: type,
            contentType: 'application/json',
            success: function (response) {
                var person = new Student(response.id, response.first_name, response.last_name);
                var found = false;
                ko.utils.arrayForEach(window.students(), function(student) {
                    if (student.id() == person.id()) {
                        student.firstName(person.firstName());
                        student.lastName(person.lastName());
                        found = true;
                    }
                });
                if (!found) {
                    window.students().push(person);
                }
                app.alerts.setSuccess('Student saved successfully!');
            },
            error: function (response) {
                app.alerts.setError('Failed to save student!');
            }
        });
        
    };
}

var Classroom = function(id, classroomName) {
    var self = this;
    self.id = ko.observable(id);

    self.classroomName = ko.observable(classroomName);
    self.teachers = ko.observableArray([]);
    self.students = ko.observableArray([]);
    
    self.addTeacher = function(teacherId) {
        self.teachers.push(teacherId);
    }
    
    self.removeTeacher = function(teacherId) {
        self.teachers.remove(function(teacher) {
            return teacher.id() == teacherId;
        });
    }
    self.addStudent = function(studentId) {
        self.students.push(studentId);
    }
    
    self.removeStudent = function(studentId) {
        self.students.remove(function(student) {
            return student.id() == studentId;
        });
    }
}

