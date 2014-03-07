var ModalController = function(view, model){

	view.newButton.click(addActivity);

	function addActivity() {
		model.addActivity(new Activity(view.acTitle.val(), view.acTime.val(), view.acTypes.val(), view.acDesc.val()), null);
	}

	
}