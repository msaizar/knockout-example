function TeachersView() {
    var self = this;
    self.shouldShowCreate = ko.observable(true);
    self.shouldShowTeacher = ko.observable(false);
    self.editTeacher = new Teacher(null, '', '');
    
    self.teacherName = ko.observable();
    
    self.teacherClasses = ko.computed(function() {
        var flag;
        return ko.utils.arrayFilter(window.classrooms(), function(item) {
            flag = false;
            ko.utils.arrayForEach(item.teachers(), function(item2) {
                if (self.editTeacher.id() == item2) {
                    flag = true;
                }
            });
            return flag;
        });
    });
    
    
    self.saveEdit = function() {
        if (self.validate(self.editTeacher.fullName())) {
            self.editTeacher.save();
        }
    }
    
    self.save = function() {
        if (self.validate(self.teacherName())) {
            var names = $.trim(self.teacherName()).split(" ");
            var tea = new Teacher(null, names[0], names[1]);
            tea.save();
            self.reset();
        }
    }
    
    self.reset = function() {
        self.teacherName('');
    }
    
    self.validate = function(field) {
        var validate = true;
        ko.utils.arrayForEach(window.teachers(), function(item) {
            if (field == item.fullName()) {
                app.alerts.setError('Teacher name already exists');
                validate = false;
            }                    
        });
        if ($.trim(field) == "") {
            app.alerts.setError('You must enter a teachers name');
            validate = false;
        }
        return validate;
    }
    
    self.disableAll = function() {
        self.shouldShowCreate(false);
        self.shouldShowTeacher(false);        
    }
    
    self.enableTeacher = function(teacher) {
        $('#tabs a[href="#teachers"]').tab('show');
        
        self.editTeacher.firstName(teacher.firstName());
        self.editTeacher.id(teacher.id());
        self.editTeacher.lastName(teacher.lastName());
        self.disableAll();
        self.shouldShowTeacher(true);
    }
    
    self.enableCreate = function() {
        $('#tabs a[href="#teachers"]').tab('show');
        
        self.disableAll();
        self.editTeacher.id(null);
        self.shouldShowCreate(true);
    }
    
    self.numberOfTeachers = function() {    
        return window.teachers().length;
    }
}