function CreateStudentForm() {
    var self = this;
    self.studentName = ko.observable();
    
    
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
}