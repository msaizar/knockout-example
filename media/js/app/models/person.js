var Person = function(id, name) {
    var self = this;
    self.id = ko.observable(id);
    self.name = ko.observable(name);
}