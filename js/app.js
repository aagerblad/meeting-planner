$(function() {
    //We instantiate our model
    var model = new Model();
    createTestData(model);
    //And create the needed controllers and views
    //var exampleView = new ExampleView($("#exampleView"),model);
    //var exampleViewController = new ExampleViewController(exampleView,model);
    var dayView = new DayView($('#days'), model);
    var dayController = new DayController(dayView, model);
    var parkedListView = new ParkedListView($('#parkedList'), model);
    var parkedListController = new ParkedListController(parkedListView, model);
    var modalView = new ModalView($('#newActivityModal'), model);
    var modalController = new ModalController(modalView, model);
});