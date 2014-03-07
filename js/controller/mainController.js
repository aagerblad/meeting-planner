var MainController = function(view, model){
	view.addDayButton.click(addDay);

	function addDay() {
		model.addDay();
	}
}