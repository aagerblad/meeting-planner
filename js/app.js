$(function() {
    //We instantiate our model
    var model = new Model();
    
    //And create the needed controllers and views
    //var exampleView = new ExampleView($("#exampleView"),model);
    //var exampleViewController = new ExampleViewController(exampleView,model);
    var homeView = new HomeView($('#home-page-content'), model);
    var homeController = new HomeController(homeView, model);
});