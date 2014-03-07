var ModalController = function(view, model){

	//view.acForm.submit(addActivity);
	view.acForm.submit(function(e) {
    e.preventDefault();
    addActivity();
    view.acModal.modal('hide');
});

	function addActivity() {
		model.addActivity(new Activity(view.acTitle.val(), view.acTime.val(), view.acTypes.val(), view.acDesc.val(), model.getNextId(), model), null);
	}

	
}