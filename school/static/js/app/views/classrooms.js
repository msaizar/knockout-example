function ClassroomsView() {
    var self = this;
    self.shouldShowCreate = ko.observable(true);
    self.shouldShowClass = ko.observable(false);
    self.classroomName = ko.observable();    
    self.editClass = ko.observable(new Classroom(null, ''));
    self.editClassroomForm = new Classroom(null, '');

    self.studentsInClass = ko.computed(function() {
        var flag;
        return ko.utils.arrayFilter(window.students(), function(item) {
            flag = false;
            ko.utils.arrayForEach(self.editClass().students(), function(item2) {
                if (item.id() == item2) {
                    flag = true;
                }
            });
            return flag;
        });
    });
    
    self.teachersInClass = ko.computed(function() {
        var flag;
        return ko.utils.arrayFilter(window.teachers(), function(item) {
            flag = false;
            ko.utils.arrayForEach(self.editClass().teachers(), function(item2) {
                if (item.id() == item2) {
                    flag = true;
                }
            });
            return flag;
        });
    });

/*    
    self.teacherTypeahead = $("#teacher-typeahead").typeahead();



    self.updateTypeahead = function() {
        self.teacherTypeahead.data('typeahead').source = $.map(window.teachers(), function(obj) {
            return obj.fullName(); 
        });
    }
*/
    self.saveEdit = function() {
        if (self.validate(self.editClassroomForm.classroomName())) {            
            self.editClassroomForm.save();
        }
    
    }

    self.save = function() {
        if (self.validate(self.classroomName())) {
            var classroom = new Classroom(null, self.classroomName());
            classroom.save();
            self.reset();
        }
    }   


    self.reset = function() {
        self.classroomName('');
    }
    

    self.validate = function(field) {
        var validate = true;
        ko.utils.arrayForEach(window.classrooms(), function(item) {
            if (field == item.classroomName()) {
                app.alerts.setError('Classroom name already exists');
                validate = false;
            }                    
        });

        if ($.trim(field) == "") {
            app.alerts.setError('You must enter a classroom name');
            validate = false;
        }

        return validate;
    }
    self.disableAll = function() {
        self.shouldShowCreate(false);
        self.shouldShowClass(false);        
    }
    
    self.enableClass = function(classroom) {
        $('#tabs a[href="#classrooms"]').tab('show');
        self.disableAll();
        self.editClass(classroom);
        self.editClassroomForm.id(classroom.id());
        self.editClassroomForm.classroomName(classroom.classroomName());
        self.shouldShowClass(true);
    }
    
    self.enableCreate = function() {
        $('#tabs a[href="#classrooms"]').tab('show');
        self.editClass(new Classroom(null, ''));
        self.editClassroomForm.id(-1);
        self.disableAll();
        self.shouldShowCreate(true);
    }
    
    self.numberOfClassrooms = function() {    
        return window.classrooms().length;
    }
}