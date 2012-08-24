var Teacher = function(id, firstName, lastName) {
    var self = this;
    self.id = ko.observable(id);
    self.firstName = ko.observable(firstName);
    self.lastName = ko.observable(lastName);
    self.fullName = ko.computed(function() {
        return self.firstName() + " " + self.lastName();
    }, self);
}

var Student = function(id, firstName, lastName) {
    var self = this;
    self.id = ko.observable(id);
    self.firstName = ko.observable(firstName);
    self.lastName = ko.observable(lastName);
    self.fullName = ko.computed(function() {
        return self.firstName() + " " + self.lastName();
    }, self);
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

