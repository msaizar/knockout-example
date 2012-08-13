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
        self.validate();
        var exists = false;
        var person;
        ko.utils.arrayForEach(window.teachers(), function(item) {
            if (self.teacherName == item.name()) {
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