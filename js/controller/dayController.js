var DayController = function(view, model) {



	view.addDayButton.click(addDay);
	setListeners();

	// Add all listeners
	function setListeners(){
		makeActivitiesSortable();
		makeDaysSortable();
		addDeleteClickListeners();
		setDayListClickListeners();
		addTimeListener();
        addBreaksClickListeners();
	}

	// Add listeners for start time input fields of days
	function addTimeListener() {
		$('.custom-time-input').on('focusout',function() {
			if ($(this).val().match("^([0-1]?[0-9]|2[0-3]):([0-5][0-9])")) {
				var id = $(this).attr('id');
				var dayNumber = parseInt(id.split('T')[1]);
				var time = $(this).val().substring(0,5).split(':');
				model.days[dayNumber].setStart(parseInt(time[0]),parseInt(time[1]));
			} else {
				var id = $(this).attr('id');
				$('#'+id).val('XX:XX');
			};


		})
	}

	// Set listeners of activites in order to make them modifiable in days
    function setDayListClickListeners(){
        var activities = $('.day-list').children();
        activities.click(function() {
            var day = model.days[parseInt($(this).parent().attr('id').replace('D', ''))];
            var activityId = parseInt($(this).attr('id'))
            var activity = day.getDayActivityById(activityId);
            var type = $('#types');
            type.val(activity.getTypeId());
            $('#time').val(activity.getLength());
            $('#title').val(activity.getName());
            $('#desc').val(activity.getDescription());
            $('#newActivityModal').modal('show');
            $('#newActivityModal').attr("title", $(this).attr('id'));
            $('#modalLabel').html('Edit Activity');
            $('#deleteBtn').show();
            $('#deleteBtn').val('Park to delete');
            $('#deleteBtn').prop('disabled', true);
        });
    }

	function addDay() {
		model.addDay();
	}

	function deleteDay(day) {
		model.removeDay(parseInt(day.attr('title')));
	}

	// Add listener do delete buttons of days
	function addDeleteClickListeners() {
		$('.delete-a-day-btn').click(function() {
				deleteDay($(this));
		})
	}
    // Add listeners for add break function.
    // Adds the breaks needed in a day.
    function addBreaksClickListeners() {
        $('.add-breaks-btn').click(function() {
            var dayId = parseInt($(this).attr('title'));
            var day = model.days[dayId];

            var limit = (24*60) - day.getEndTime();

            var length =  day.getTotalLength();



            var breakPercentage =(parseFloat(day.getPercentage('Break')))/100;
            var oldBreakLength = breakPercentage * length;
            length *= (1-breakPercentage);
            length /= 3;
            length -= oldBreakLength;

            length++;


            if (limit < length) {
                length = limit-1;
            }

            while (length > 1){
                if(length > 15) {
                    model.addActivity(new Activity("Break",15,3,"This is a break", model.getNextId(), model, dayId),dayId);
                    length -= 15;
                }
                else{
                    model.addActivity(new Activity("Break",parseInt(length),3,"This is a break", model.getNextId(), model, dayId),dayId);
                    length = 0;
                }
            }
        })
    }

	// Add listener in order to make days sortable
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
			}
		})

	}


	// Add listener in order to make activities in days sortable
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

	
			update: function(event, ui){
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
			}

		})

	}

    model.addObserver(this);

    this.update = function(arg) {
        if(arg == "days_changed") {
            setListeners();
        }
        if(arg == "activities_changed") {
            setListeners();
        }
    }
}