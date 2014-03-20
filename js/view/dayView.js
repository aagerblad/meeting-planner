// A view containing the days.
var DayView = function(container, model){

	this.dayList = $('.day-list');
	model.addObserver(this);
	this.daysContainer = container.find('#days_container');
	fillDays();
	
	this.addDayButton = $('#add_day_btn');



	// Draws the days according to the day model
	function fillDays() {
		var days = model.days;
		$('#days_container').children().remove();

		for (var i = 0; i <= days.length - 1; i++) {
			
			var day = days[i];
			var dayItem = $('<div></div>');
			/*dayItem.addClass('col-md-3');*/
			dayItem.addClass('fill');
			dayItem.addClass('panel');
			dayItem.addClass('DocumentItem');


			var row = $('<div></div>');
			row.addClass('row');

			var info = $('<div></div>');
			info.addClass('col-md-8');

			// Add day number to day
			var dayNumber = $('<h3></h3>');
			dayNumber.html("Day " + (i +1));
			info.append(dayNumber);


			// Add table with day info, as well as an input box where start time of day can be modified
			var table = $('<table></table>');
			table.addClass('custom-table');
			var startTime = $('<tr></tr>');
			startTime.html("<th>Start time: </th>");
			var timeTD = $('<td></td>');
			var inputTime = $('<input class="custom-time-input" type="text" maxlength="5"></input>');
			inputTime.attr('id','T' + i);
			inputTime.val(model.days[i].getStart());
			timeTD.append(inputTime);
			startTime.append(timeTD);
			table.append(startTime);
			var endTime = $('<tr></tr>');
			endTime.html("<th>End time: </th><td> "+day.getEnd()+"</td>");
			table.append(endTime);
			var totalTime = $('<tr></tr>');
			totalTime.html("<th>Length of day: </th><td> "+day.getTotalLength()+" min</td>");
			table.append(totalTime);
			info.append(table);

			row.append(info);

			// Add diagram displaying percentage of different categories in day
			var diagram = $('<div></div>');
			diagram.addClass("col-md-4");
			diagram.css({'height':'150px'})
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

			// List wrapper for activities
			var listHolder = $('<div></div>');
			listHolder.addClass('panel');
			listHolder.addClass('list-droppable');
			listHolder.addClass('list-fill');
			listHolder.addClass('top-buffer');

			// List of activities
			var list = $('<ul></ul>');
			list.addClass('day-list');
			list.addClass('list-group');
			list.attr('id', 'D'+i);


			// Add all list activities to list
			var dayItems = day._activities;
			var totalMin = 0;
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

				if (j != 0) {
					totalMin += item.getLength();
				}

				var time = $('<section></section>');
				time.css('float', 'right');
				time.html(day.addToStart(totalMin));

				listItem.html(item.getName());
				listItem.append(time);
				list.append(listItem);
			};

			listHolder.append(list);
			dayItem.append(listHolder);

			// Add delete button for days
			var deleteDayBtn = $('<button><div class="glyphicon glyphicon-minus"></div> Delete</button>');
			deleteDayBtn.addClass('delete-a-day-btn');
			deleteDayBtn.addClass('btn');
			deleteDayBtn.addClass('btn-danger');
			deleteDayBtn.addClass('large');
			deleteDayBtn.attr('title',i);
			

			dayItem.append(deleteDayBtn);



			$('#days_container').append(dayItem);

		};
	}

	// Update method to be run on update.
	this.update = function(arg) {
		if(arg == "day_added") {
			fillDays();
		}
		if(arg == "activity_added") {

		}
	}

}