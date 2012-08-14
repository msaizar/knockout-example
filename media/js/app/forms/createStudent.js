function CreateStudentForm() {
    var self = this;
    self.studentName = ko.observable();
    
    self.save = function() {
        if (self.validate()) {
            var person = new Person(null, self.studentName());
            window.students.push(person);
            self.reset();
            app.alerts.setSuccess('Student saved successfully!');
        }
    }
    
    self.reset = function() {
        self.studentName('');
    }
    
    self.validate = function() {
        var validate = true;
        ko.utils.arrayForEach(window.students(), function(item) {
            if (self.studentName() == item.name()) {
                app.alerts.setError('Student name already exists');
                validate = false;
            }                    
        });
        if ($.trim(self.teacherName()) == "") {
            app.alerts.setError('You must enter a students name');
            validate = false;
        }
        return validate;
    }
}