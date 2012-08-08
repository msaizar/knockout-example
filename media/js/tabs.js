function TabsModel() {
    var self = this;
    self.shouldShowSplashScreen = ko.observable(true);
    self.shouldShowClassrooms = ko.observable(false);
    self.shouldShowTeachers = ko.observable(false);
    self.shouldShowStudents = ko.observable(false);
    
    
    self.disableAll = function() {    
        self.shouldShowSplashScreen(false);
        self.shouldShowClassrooms(false);
        self.shouldShowTeachers(false);
        self.shouldShowStudents(false);
    }
    
    self.enableSplashScreen = function() {
        self.disableAll();
        self.shouldShowSplashScreen(true);
    }
    
    self.enableTeachers = function() {    
        self.disableAll();
        self.shouldShowTeachers(true);
    }
    
    self.enableStudents = function() {    
        self.disableAll();
        self.shouldShowStudents(true);
    }
    
    self.enableClassrooms = function() {    
        self.disableAll();
        self.shouldShowClassrooms(true);
    }
}


window.tabs = new TabsModel();
ko.applyBindings(window.tabs);