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
        
    }
    
    self.save = function() {
        if (self.validate()) {
            var names = $.trim(self.studentName()).split(" ");
            var obj = {first_name: names[0], last_name: names[1]}; 
            
            $.ajax({
                url: '/api/v1/student/?format=json',
                data: JSON.stringify(obj),
                type: 'POST',
                contentType: 'application/json',
                success: function (response) {
                    var person = new Student(response.id, response.first_name, response.last_name);
                    window.students.push(person);
                    self.reset();
                    app.alerts.setSuccess('Student saved successfully!');
                },
                error: function (response) {
                    app.alerts.setError('Failed to save student!');
                }
            });
        }
    }
    
    self.reset = function() {
        self.studentName('');
    }
    
    self.validate = function() {
        var validate = true;
        ko.utils.arrayForEach(window.students(), function(item) {
            if (self.studentName() == item.fullName()) {
                app.alerts.setError('Student name already exists');
                validate = false;
            }                    
        });
        if ($.trim(self.studentName()) == "") {
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
        
        self.editStudent.firstName(student.firstName());
        self.editStudent.id(student.id());
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