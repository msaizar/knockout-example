function CreateTeacherForm() {
    var self = this;
    self.teacherName = ko.observable();
    
    
    self.save = function() {
        if (self.validate()) {
            var person = new Person(null, self.teacherName());
            window.teachers.push(person);
            self.reset();
            app.alerts.text('Teacher saved successfully!');
            app.alerts.setSuccess();
            app.createClassroomForm.updateTypeahead();        
            $(app.alerts.getSelector()).fadeOut(10000, function() {
                // Animation complete.
            });
        }
    }
    
    self.reset = function() {
        self.teacherName('');
    }
    
    self.validate = function() {
        var validate = true;
        ko.utils.arrayForEach(window.teachers(), function(item) {
            if (self.teacherName() == item.name()) {
                app.alerts.text('Teacher name already exists');
                app.alerts.setError();
                validate = false;
            }                    
        });
        return validate;
    }
}