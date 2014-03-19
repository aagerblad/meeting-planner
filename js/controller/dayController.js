var DayController = function(view, model) {
	

	view.addDayButton.click(addDay);
	addDeleteClickListeners();
	makeActivitiesSortable();
	makeDaysSortable();
	addTimeListener();

	function setListeners(){
		makeActivitiesSortable();
		makeDaysSortable();
		addDeleteClickListeners();
		setDayListClickListeners
		addTimeListener();
	}

	function addTimeListener() {
		$('.custom-time-input').on('focusout',function() {
			if ($(this).val().match("^([0-1]?[0-9]|2[0-3]):([0-5][0-9])")) {
				var id = $(this).attr('id');
				var dayNumber = parseInt(id.split('T')[1]);
				var time = $(this).val().split(':');
				$(this).attr('placeholder','time[0] + ":" + time[1]');
				model.days[dayNumber].setStart(parseInt(time[0]),parseInt(time[1]));
				setListeners();	
			};


		})
	}

    function setDayListClickListeners(){
        var activities = $('.day-list').children();
        activities.click(function() {
            var day = model.days[parseInt($(this).parent().attr('id').replace('D', ''))];
            var activityId = parseInt($(this).attr('id'))
            var activity = day.getDayActivityById(activityId);
            var type = $('#types'+activity.getTypeId())
            type.val($('#type'+activity.getTypeId()));
            $('#time').val(activity.getLength());
            $('#title').val(activity.getName());
            $('#desc').val(activity.getDescription());
            $('#newActivityModal').modal('show');
            $('#newActivityModal').attr("title", $(this).attr('id'));
            $('#modalLabel').html('Edit Activity');
        });
    }

	function addDay() {
		model.addDay();
		setListeners();
	}

	function deleteDay(day) {
		model.removeDay(parseInt(day.attr('title')));
		setListeners();
	}

	function addDeleteClickListeners() {
		$('.delete-a-day-btn').click(function() {
				deleteDay($(this));
		})
	}

	function makeDaysSortable() {
		view.daysContainer.sortable({
			revert: true,
			helper: "clone",
			appendTo: "parent",

			start: function(e, ui) {
				ui.item.attr('data-previndex', ui.item.index());
			},

			update: function(event, ui) {
				var newIndex = ui.item.index();
				var oldIndex = parseInt(ui.item.attr('data-previndex'));
				model.moveDay(oldIndex, newIndex);
				setListeners();
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
				setListeners();
			}

		})
	}
}