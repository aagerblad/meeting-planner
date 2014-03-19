var ParkedListController = function(view, model){
    view.parkedList.children().click(function() {
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