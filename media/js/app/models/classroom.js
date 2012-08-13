var Classroom = function(id, classroomName, teacherId) {
    var self = this;
    self.id = ko.observable(id);
    self.classroomName = ko.observable(classroomName);
    self.teachers = ko.observableArray([]);
    self.teachers.push(teacherId);
    
    self.addTeacher = function(teacherId) {
        self.teachers.push(teacherId);
    }
    
    self.removeTeacher = function(teacherId) {
        self.teachers.remove(function(teacher) {
            return teacher.id() == teacherId;
        });
    }
}