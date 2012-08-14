function CreateClassroomForm() {
    var self = this;
    self.teacherName = ko.observable();
    self.classroomName = ko.observable();    
    
    self.teacherTypeahead = $("#teacher-typeahead").typeahead();

    
    self.getTeachersForTypeahead = function() {
        var results = [];
        ko.utils.arrayForEach(window.teachers(), function(item) {
            results.push(item.name());        
        });
        return results;
    };
    
    self.updateTypeahead = function() {
        self.teacherTypeahead.data('typeahead').source = self.getTeachersForTypeahead();
    }
    
    self.save = function() {
        if (self.validate()) {
            var exists = false;
            var person;
            ko.utils.arrayForEach(window.teachers(), function(item) {
                if (self.teacherName() == item.name()) {
                    person = item;
                    exists = true;
                }                    
            });
        
            if (!exists) { 
                var person = new Person(null, self.teacherName());
                window.teachers.push(person);
            }
            window.classrooms.push(new Classroom(null, self.classroomName(), person.id() ));
            self.reset();
            self.updateTypeahead();
            app.alerts.setSuccess('Classroom saved successfully!');
        }
    }
    
    self.reset = function() {
        self.teacherName('');
        self.classroomName('');
    }
    
    self.validate = function() {
        var validate = true;
        ko.utils.arrayForEach(window.classrooms(), function(item) {
            if (self.classroomName() == item.classroomName()) {
                app.alerts.setError('Classroom name already exists');
                validate = false;
            }                    
        });
        if ($.trim(self.teacherName()) == "") {
            app.alerts.setError('You must enter a teachers name');
            validate = false;
        }
        if ($.trim(self.classroomName()) == "") {
            app.alerts.setError('You must enter a classroom name');
            validate = false;
        }
        
        return validate;
    }    
}