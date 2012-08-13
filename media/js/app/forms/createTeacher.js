function CreateTeacherForm() {
    var self = this;
    self.teacherName = ko.observable();
    
    self.save = function() {
        self.validate();
        var person = new Person(null, self.teacherName());
        window.teachers.push(person);
        self.reset();
        app.alerts.text('Teacher saved successfully!');
        app.alerts.show();
        app.alerts.setSuccess();
        $(app.alerts.getSelector()).fadeOut(10000, function() {
            // Animation complete.
        });
    }
    
    self.reset = function() {
        self.teacherName('');
    }
    
    self.validate = function() {
        return true;
    }
}