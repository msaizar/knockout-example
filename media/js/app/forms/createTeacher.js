function CreateTeacherForm() {
    var self = this;
    self.teacherName = ko.observable();
    
    
    self.save = function() {
        if (self.validate()) {
            var person = new Person(null, self.teacherName());
            window.teachers.push(person);
            self.reset();
            app.alerts.setSuccess('Teacher saved successfully!');
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
                app.alerts.setError('Teacher name already exists');
                validate = false;
            }                    
        });
        if ($.trim(self.teacherName()) == "") {
            app.alerts.setError('You must enter a teachers name');
            validate = false;
        }
        return validate;
    }
}