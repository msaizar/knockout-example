function CreateStudentForm() {
    var self = this;
    self.studentName = ko.observable();
    
    self.save = function() {
        if (self.validate()) {
            var person = new Person(null, self.studentName());
            window.students.push(person);
            self.reset();
            app.alerts.text('Student saved successfully!');
            app.alerts.setSuccess();
        }
    }
    
    self.reset = function() {
        self.studentName('');
    }
    
    self.validate = function() {
        var validate = true;
        ko.utils.arrayForEach(window.students(), function(item) {
            if (self.studentName() == item.name()) {
                app.alerts.text('Student name already exists');
                app.alerts.setError();
                validate = false;
            }                    
        });
        return validate;
    }
}