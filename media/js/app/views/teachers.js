function TeachersView() {
    var self = this;
    self.shouldShowCreate = ko.observable(true);
    self.shouldShowTeacher = ko.observable(false);

    self.disableAll = function() {
        self.shouldShowCreate(false);
        self.shouldShowTeacher(false);        
    }
    
    self.enableTeacher = function() {
        self.disableAll();
        self.shouldShowTeacher(true);
    }
    
    self.enableCreate = function() {
        self.disableAll();
        self.shouldShowCreate(true);
    }
    
    
    self.numberOfTeachers = function() {    
        return window.teachers().length;
    }
}