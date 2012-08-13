window.teachers = ko.observableArray([]);
window.students = ko.observableArray([]);
window.classrooms = ko.observableArray([]);


var App = function() {
    var self = this;
    self.tabs = new TabsModel();
    self.classroomsView = new ClassroomsView();
    self.teachersView = new TeachersView();
    self.studentsView = new StudentsView();
    self.createClassroomForm = new CreateClassroomForm();
    self.createTeacherForm = new CreateTeacherForm();
    self.createStudentForm = new CreateStudentForm();
    self.alerts = new AlertsView();
}



app = new App();

ko.applyBindings(app);
