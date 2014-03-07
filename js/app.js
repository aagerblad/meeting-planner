$(function() {
    //We instantiate our model
    var model = new Model();
    
    //And create the needed controllers and views
    //var exampleView = new ExampleView($("#exampleView"),model);
    //var exampleViewController = new ExampleViewController(exampleView,model);
    var parkedListView = new ParkedListView($('#parkedList'), model);
    var parkedListController = new ParkedListController(parkedListView, model);
});