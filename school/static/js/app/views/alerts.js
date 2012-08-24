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
        $(self.getSelector()).stop();
        $(self.getSelector()).fadeTo(0, 1);
        self.shouldShow(false);
    }
    
    self.show = function() {
        self.shouldShow(true);
        $(self.getSelector()).show();        
        $(self.getSelector()).fadeOut(10000, function() {
            // Animation complete.
        });
    }
    
    self.setError = function(text) {
        self.hide();
        self.disableType();
        self.text(text);
        self.isError(true);
        self.show();
    }
    
    self.setSuccess = function(text) {
        self.hide();
        self.disableType();
        self.text(text);
        self.isSuccess(true);
        self.show();
    }
    
    self.setInfo = function(text) {
        self.hide();
        self.disableType();
        self.text(text);
        self.isInfo(true);
        self.show();
    }
    
    
}