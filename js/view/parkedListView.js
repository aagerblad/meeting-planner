var ParkedListView = function(container, model){
	
	model.addObserver(this);
	fillParkedList();
	makeParkedListSortable();

	function fillParkedList(){
		var parkedItems = model.parkedActivities;
		container.children().remove();

		for (var i = 0; i <= parkedItems.length - 1; i++) {
			item = parkedItems[i];
			var listItem = $('<li></li>');
			listItem.attr('id', item.getId());
			listItem.addClass('list-group-item');

			if(item.getTypeId() == 0)
				listItem.addClass('list-group-item-success');
			else if(item.getTypeId() == 1)
				listItem.addClass('list-group-item-danger');
			else if(item.getTypeId() == 2)
				listItem.addClass('list-group-item-info');
			else 
				listItem.addClass('list-group-item-warning');

			listItem.html(item.getName());
			container.append(listItem);
		};
	}

	function makeParkedListSortable() {
		$('#parkedList').sortable({
			helper: "clone",
			appendTo: "body",
			placeholder: "placeholder-list-element",
			forcePlaceholderSize: true,
			connectWith: "ul",
			tolerance: "pointer",
			dropOnEmpty: true,
			distance: 1.0,
			start: function(e, ui) {
        		// creates a temporary attribute on the element with the old index
        		ui.item.attr('data-previndex', ui.item.index());
        		ui.item.attr('data-prevparent', null);
    		},
    		update: function(event, ui){
				/*var activity = model.allActivities[ui.item.attr("id")];*/
				var newIndex = ui.item.index();
				var foo = ui.item.parent().attr('id').split('D')[1];
				var newDay = parseInt(foo);
				if (isNaN(newDay)) {
					newDay = null;
				};
				var oldIndex = parseInt(ui.item.attr('data-previndex'));
				var bar = ui.item.attr('data-prevparent');
				if (bar == null) {
					var oldDay = null;
				} else {
					var oldDay = parseInt(bar.split('D')[1]);
				};

				if (oldDay == newDay) {
					if (oldIndex < newIndex) {
						model.moveActivity(oldDay,oldIndex,newDay,newIndex);
					} else {
						model.moveActivity(oldDay,oldIndex,newDay,newIndex);
					};
				} else if (model.activityHasMoved) {
					model.activityHasMoved = false;
				} else {
					model.moveActivity(oldDay,oldIndex,newDay,newIndex);
					model.activityHasMoved = true;
				}
			}
		})
	}


	this.update = function(arg){
		if(arg=="activity_added") {
			fillParkedList();
			makeParkedListSortable();
		}
		
	}
}