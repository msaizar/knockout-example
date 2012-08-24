function ClassroomsView() {
    var self = this;
    self.shouldShowCreate = ko.observable(true);
    self.shouldShowClass = ko.observable(false);

    self.disableAll = function() {
        self.shouldShowCreate(false);
        self.shouldShowClass(false);        
    }
    
    self.enableClass = function() {
        self.disableAll();
        self.shouldShowClass(true);
    }
    
    self.enableCreate = function() {
        self.disableAll();
        self.shouldShowCreate(true);
    }
    
    self.numberOfClassrooms = function() {    
        return window.classrooms().length;
    }
}