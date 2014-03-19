var ParkedListController = function(view, model){
    

	view.parkedList.sortable({
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
				var newDay;
				var id = ui.item.parent().attr('id');
				if (id == "parkedList" || typeof id == 'undefined') {
					newDay = null;
				} else {
					var foo = ui.item.parent().attr('id').split('D')[1];
					newDay = parseInt(foo);	
				}
				var oldIndex = parseInt(ui.item.attr('data-previndex'));
				var bar = ui.item.attr('data-prevparent');
				if (bar == null) {
					var oldDay = null;
				} else {
					var oldDay = parseInt(bar.split('D')[1]);
				};

				if (oldDay == newDay) {
					model.moveParkedActivity(oldIndex, newIndex);
				} else if (model.activityHasMoved) {
					model.activityHasMoved = false;
					model.moveActivity(oldDay,oldIndex,newDay,newIndex);
				} else {
					model.activityHasMoved = true;
				}
			}
		})
}