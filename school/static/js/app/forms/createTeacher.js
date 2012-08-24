function CreateTeacherForm() {
    var self = this;
    self.teacherName = ko.observable();
    
    
    self.save = function() {
        if (self.validate()) {
            var names = $.trim(self.teacherName()).split(" ");
            var obj = {first_name: names[0], last_name: names[1]}; 
            
            $.ajax({
                url: '/api/v1/teacher/?format=json',
                data: JSON.stringify(obj),
                type: 'POST',
                contentType: 'application/json',
                success: function (response) {
                    var person = new Teacher(response.id, response.first_name, response.last_name);
                    window.teachers.push(person);
                    self.reset();
                    app.alerts.setSuccess('Teacher saved successfully!');
                    app.createClassroomForm.updateTypeahead();
                },
                error: function (response) {
                    app.alerts.setError('Failed to save teacher!');
                }
            });
        }
    }
    
    self.reset = function() {
        self.teacherName('');
    }
    
    self.validate = function() {
        var validate = true;
        ko.utils.arrayForEach(window.teachers(), function(item) {
            if (self.teacherName() == item.fullName()) {
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