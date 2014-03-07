var ParkedListController = function(view, model){

	view.chooseDishBtn.click(chooseDish);
	view.backBtn.click(back);

	function chooseDish(){
		var id = model.getCurrentDishId();
		model.addDishToMenu(id);
		back();
	}
	function back(){
		view.confirmBtn.removeAttr("disabled");
		window.dishPage.hide();
		window.mainContent.show();
	}
}