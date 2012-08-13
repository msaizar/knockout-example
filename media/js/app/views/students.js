function StudentsView() {
    var self = this;
    
    var self = this;
    self.shouldShowCreate = ko.observable(true);
    self.shouldShowStudent = ko.observable(false);

    self.disableAll = function() {
        self.shouldShowCreate(false);
        self.shouldShowStudent(false);        
    }
    
    self.enableStudent = function() {
        self.disableAll();
        self.shouldShowStudent(true);
    }
    
    self.enableCreate = function() {
        self.disableAll();
        self.shouldShowCreate(true);
    }
    
    self.numberOfStudents = function() {    
        return window.students().length;
    }
}