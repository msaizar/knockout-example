function AlertsView() {
    var self = this;
    self.shouldShow = ko.observable(false);
    self.text = ko.observable('');
    self.isInfo = ko.observable(false);
    self.isSuccess = ko.observable(false);
    self.isError = ko.observable(false);
    self.selector = ko.observable('#alert')
    
    self.disableType = function() {
        self.isInfo(false);
        self.isSuccess(false);
        self.isError(false);
    }
    
    self.getSelector = function() {
        return self.selector();
    }
    
    self.hide = function() {
        self.shouldShow(false);
    }
    
    self.show = function() {
        self.shouldShow(true);
    }
    
    self.setError = function() {
        self.disableType();
        self.isError(true);
    }
    
    self.setSuccess = function() {
        self.disableType();
        self.isSuccess(true);
    }
    
    self.setInfo = function() {
        self.disableType();
        self.isInfo(true);
    }
    
    
}