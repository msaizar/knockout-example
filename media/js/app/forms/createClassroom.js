function CreateClassroomForm() {
    var self = this;
    self.teacherName = ko.observable();
    self.classroomName = ko.observable();
    
    self.save = function() {
        self.validate();
        var person = new Person(null, self.teacherName());
        window.teachers.push(person);
        window.classrooms.push(new Classroom(null, self.classroomName(), person.id() ));
        self.reset();
        app.alerts.text('Classroom saved successfully!');
        app.alerts.show();
        app.alerts.setSuccess();
        $(app.alerts.getSelector()).fadeOut(10000, function() {
            // Animation complete.
        });
    }
    
    self.reset = function() {
        self.teacherName('');
        self.classroomName('');
    }
    
    self.validate = function() {
        return true;
    }
}