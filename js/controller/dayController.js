var DayController = function(view, model) {
	

	view.addDayButton.click(addDay);
	makeActivitiesSortable();
	makeDaysSortable();

	function addDay() {
		model.addDay();
		makeActivitiesSortable();
		makeDaysSortable();
	}

	function makeDaysSortable() {
		view.daysContainer.sortable({
			revert: true,
			containment: "parent",
			axis: "x",

			start: function(e, ui) {
				ui.item.attr('data-previndex', ui.item.index());
			},

			update: function(event, ui) {
				var newIndex = ui.item.index();
				var oldIndex = parseInt(ui.item.attr('data-previndex'));
				model.moveDay(oldIndex, newIndex);
				makeActivitiesSortable();
				makeDaysSortable();
			}
		})

	}

	function makeActivitiesSortable() {
		model.activityHasMoved;
		$('.day-list').sortable({
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
        		ui.item.attr('data-prevparent', ui.item.parent().attr('id'));
    		},

			/*receive: function(event, ui){*/
				/*var activity = model.allActivities[ui.item.attr("id")];*/
			/*	var itemIndex = ui.item.index();
				var oldIndex = ui.item.attr('data-previndex');
				model.moveActivity(null,oldIndex,0,itemIndex);
			},*/
	
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
						model.moveActivity(oldDay,oldIndex,newDay,newIndex + 1);
					} else {
						model.moveActivity(oldDay,oldIndex,newDay,newIndex);
					};
				} else if (model.activityHasMoved) {
					model.activityHasMoved = false;
					model.moveActivity(oldDay,oldIndex,newDay,newIndex);
				} else {
					model.activityHasMoved = true;
				}
				makeActivitiesSortable();
			}

		})
	}
}