var ParkedListView = function(container, model){
	
	this.parkedList = $('#parkedList');
	model.addObserver(this);
	fillParkedList();

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

			var time = $('<section></section>');
			time.css('float', 'right');
			time.html(item.getLength() + ' min');

			listItem.html(item.getName());
			listItem.append(time);
			container.append(listItem);
		};

		// MVC exception
		$('#parkedList').children().click(function() {
        var activity = model.allActivities[$( this).attr('id')];
        var type = $('#types'+activity.getTypeId())
        type.val($('#type'+activity.getTypeId()));
        $('#time').val(activity.getLength());
        $('#title').val(activity.getName());
        $('#desc').val(activity.getDescription());
        $('#newActivityModal').modal('show');
        $('#newActivityModal').attr("title", $( this).attr('id'));
        $('#modalLabel').html('Edit Activity')
    });
	}


	this.update = function(arg){
		if(arg=="activity_added") {
			fillParkedList();
		}
		
	}
}