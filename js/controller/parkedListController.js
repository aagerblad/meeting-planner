var ParkedListController = function(view, model){

    setParkedListClickListeners();
    // Sets listeners for drag and drop on the list which contains parked activities
	view.parkedList.sortable({
			helper: function(e, ui) {
        		var helper = ui.clone();
        		helper.css({'width': '194px'});
        		return helper;
    		},
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
    // Exception to MVC.
    // Dynamic listeners set on listitems for edit click
    function setParkedListClickListeners(){
        $('#parkedList').children().click(function() {
            var activity = model.allActivities[$( this).attr('id')];
            var type = $('#types');
            type.val(activity.getTypeId());
            $('#time').val(activity.getLength());
            $('#title').val(activity.getName());
            $('#desc').val(activity.getDescription());
            $('#newActivityModal').modal('show');
            $('#newActivityModal').attr("title", $( this).attr('id'));
            $('#modalLabel').html('Edit Activity');
            $('#deleteBtn').show();
            $('#deleteBtn').val('Delete');
            $('#deleteBtn').prop('disabled', false);
        });
    }

    model.addObserver(this);

    this.update = function(arg) {
        if(arg == "activities_changed") {
            setParkedListClickListeners();
        }
    }
}