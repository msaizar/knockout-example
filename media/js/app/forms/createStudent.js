function CreateStudentForm() {
    var self = this;
    self.studentName = ko.observable();
    
    self.save = function() {
        self.validate();
        var person = new Person(null, self.studentName());
        window.students.push(person);
        self.reset();
        app.alerts.text('Student saved successfully!');
        app.alerts.show();
        app.alerts.setSuccess();
        $(app.alerts.getSelector()).fadeOut(10000, function() {
            // Animation complete.
        });
    }
    
    self.reset = function() {
        self.studentName('');
    }
    
    self.validate = function() {
        return true;
    }
}