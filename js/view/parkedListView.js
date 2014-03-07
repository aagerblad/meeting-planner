var ParkedListView = function(container, model){
	
	model.addObserver(this);
	fillParkedList();

	function fillParkedList(){
		var parkedItems = model.getParkedActivities();
		for (var i = parkedActivities.length - 1; i >= 0; i--) {
			var listItem = $('<li></li>');
			listItem.addClass('list-group-item');
			listItem.HTML(parkedActivities[i]);
		};
	}


	this.update = function(arg){

	}
}