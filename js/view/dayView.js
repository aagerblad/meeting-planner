var DayView = function(container, model){
	this.daysContainer = container.find('#days_container');
	fillDays();

	function fillDays() {
		var days = model.days;
		$('#days_container').children().remove();

		for (var i = days.length - 1; i >= 0; i--) {
			
			var day = days[i];
			var dayItem = $('<div></div>');
			dayItem.addClass('col-md-3');
			dayItem.addClass('DocumentItem');
			dayItem.addClass('fill');
			
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
			dayItem.append(row);

			var listHolder = $('<div></div>');
			listHolder.addClass('list-droppable');
			listHolder.addClass('fill');
			listHolder.addClass('top-buffer');
			listHolder.addClass('panel');

			var list = $('<ul></ul>');
			list.addClass('list-group');

			var dayItems = day._activities;
			for (var i = dayItems.length - 1; i >= 0; i--) {
				item = dayItems[i];
				var listItem = $('<li></li>');
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

}