var DayView = function(container, model){
	model.addObserver(this);
	this.daysContainer = container.find('#days_container');
	fillDays();
	makeActivitiesSortable();
	makeDaysSortable();

	function fillDays() {
		var days = model.days;
		$('#days_container').children().remove();

		for (var i = 0; i <= days.length - 1; i++) {
			
			var day = days[i];
			var dayItem = $('<div></div>');
			dayItem.addClass('col-md-3');
			dayItem.addClass('DocumentItem');
			dayItem.addClass('fill');
			dayItem.addClass('panel');
			
			var row = $('<div></div>');
			row.addClass('row');

			var info = $('<div></div>');
			info.addClass('col-md-8');

			var startTime = $('<p></p>');
			startTime.html("Start time: "+day.getStart());
			info.append(startTime);
			var endTime = $('<p></p>');
			endTime.html("End time: "+day.getEnd());
			info.append(endTime);
			var totalTime = $('<p></p>');
			totalTime.html("Length of day: "+day.getTotalLength()+" min");
			info.append(totalTime);

			row.append(info);

			var diagram = $('<div></div>');
			diagram.addClass("col-md-4");
			diagram.css({'height':'90px'})
			diagram.attr('id', 'P'+ i);

			var presentation = $('<div></div>');
			presentation.attr('id', 'PPR'+ i);
			var heightString = day.getPercentage('Presentation') + '%';
			presentation.css({'background':'#8A9B0F', 'height':heightString, 'width':'100%'});
			var discussion = $('<div></div>');
			discussion.attr('id', 'PDI'+ i);
			heightString = day.getPercentage('Discussion') + '%';
			discussion.css({'background':'#BD1550', 'height':heightString, 'width':'100%'});
			var group_work = $('<div></div>');
			group_work.attr('id', 'PGR'+ i);
			heightString = day.getPercentage('Group Work') + '%';
			group_work.css({'background':'#490A3D', 'height':heightString, 'width':'100%'});
			var pause = $('<div></div>');
			pause.attr('id', 'PPA'+ i);
			heightString = day.getPercentage('Break') + '%';
			pause.css({'background':'#E97F02', 'height':heightString, 'width':'100%'});
			diagram.append(presentation);
			diagram.append(discussion);
			diagram.append(group_work);
			diagram.append(pause);

			row.append(diagram);
			dayItem.append(row);

			var listHolder = $('<div></div>');
			listHolder.addClass('panel');
			listHolder.addClass('list-droppable');
			listHolder.addClass('list-fill');
			listHolder.addClass('top-buffer');

			var list = $('<ul></ul>');
			list.addClass('day-list');
			list.addClass('list-group');
			list.attr('id', 'D'+i);

			var dayItems = day._activities;
			for (var j = 0; j <= dayItems.length - 1; j++) {
				item = dayItems[j];
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
				list.append(listItem);
			};

			listHolder.append(list);
			dayItem.append(listHolder);
			$('#days_container').append(dayItem);

		};
	}

	function makeActivitiesSortable() {
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
				} else {
					model.moveActivity(oldDay,oldIndex,newDay,newIndex);
					model.activityHasMoved = true;
				}
			}

		})
	}

	function makeDaysSortable() {
		$('#days_container').sortable({
			revert: true,
			containment: "parent"
		})

	}

	function updateProgressBar() {
		var days = model.days;
		var pause;
		var presentation;
		var group_work;
		var discussion;
		for (var i = 0; i < days.length; i++) {
			var day = $('#P' + i);
		};

	}

	this.update = function(arg) {
		if(arg = "day_added") {
			fillDays();
			makeDaysSortable();
			makeActivitiesSortable();
		}
		if(arg == "activity_added") {

		}
	}

}