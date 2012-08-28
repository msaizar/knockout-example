function StudentsView() {
    var self = this;
    
    self.shouldShowCreate = ko.observable(true);
    self.shouldShowStudent = ko.observable(false);

    self.studentName = ko.observable();
    self.editStudent = new Student(null, '', '');
    
    
    self.studentClasses = ko.computed(function() {
        var flag;
        return ko.utils.arrayFilter(window.classrooms(), function(item) {
            flag = false;
            ko.utils.arrayForEach(item.students(), function(item2) {
                if (self.editStudent.id() == item2) {
                    flag = true;
                }
            });
            return flag;
        });
    });
    
    
    self.saveEdit = function() {
        if (self.validate(self.editStudent.fullName())) {
            self.editStudent.save();
        }
    }
    
    self.save = function() {
        if (self.validate(self.studentName())) {
            var names = $.trim(self.studentName()).split(" ");
            var stu = new Student(null, names[0], names[1]);
            stu.save();
            self.reset();
        }
    }
    
    self.reset = function() {
        self.studentName('');
    }
    
    self.validate = function(field) {
        var validate = true;
        ko.utils.arrayForEach(window.students(), function(item) {
            if (field == item.fullName()) {
                app.alerts.setError('Student name already exists');
                validate = false;
            }                    
        });
        if ($.trim(field) == "") {
            app.alerts.setError('You must enter a students name');
            validate = false;
        }
        return validate;
    }

    self.disableAll = function() {
        self.shouldShowCreate(false);
        self.shouldShowStudent(false);        
    }
    
    self.enableStudent = function(student) {
        $('#tabs a[href="#students"]').tab('show');
        
        self.editStudent.id(student.id());
        self.editStudent.firstName(student.firstName());
        self.editStudent.lastName(student.lastName());
        
        self.disableAll();
        self.shouldShowStudent(true);
    }
    
    self.enableCreate = function() {
        $('#tabs a[href="#students"]').tab('show');
        
        self.disableAll();
        self.editStudent.id(null);
        self.shouldShowCreate(true);
    }
    
    
    
    self.numberOfStudents = function() {    
        return window.students().length;
    }
}