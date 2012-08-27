function ClassroomsView() {
    var self = this;
    self.shouldShowCreate = ko.observable(true);
    self.shouldShowClass = ko.observable(false);
    self.classroomName = ko.observable();    
    self.editClass = ko.observable(new Classroom(null, ''));

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
    
    }

    self.save = function() {
        if (self.validate()) {
            var obj = {identifier: self.classroomName()}

            $.ajax({
                url: '/api/v1/classroom/?format=json',
                data: JSON.stringify(obj),
                type: 'POST',
                contentType: 'application/json',
                success: function (response) {
                    var classroom = new Classroom(response.id, response.identifier);
                    window.classrooms.push(person);
                    self.reset();
                    app.alerts.setSuccess('Classroom saved successfully!');
                },
                error: function (response) {
                    app.alerts.setError('Failed to save classroom!');
                }
            });
        }
    }   


    self.reset = function() {
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

        if ($.trim(self.classroomName()) == "") {
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
        self.shouldShowClass(true);
    }
    
    self.enableCreate = function() {
        $('#tabs a[href="#classrooms"]').tab('show');
        self.editClass(new Classroom(null, ''));
        self.disableAll();
        self.shouldShowCreate(true);
    }
    
    self.numberOfClassrooms = function() {    
        return window.classrooms().length;
    }
}