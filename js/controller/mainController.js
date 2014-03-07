var MainController = function(view, model){
	$('#add-a-day-btn').click(function(){
		$('#row-of-days').append("<div class='col-md-3 DocumentItem fill'><div class='row'><div class='col-md-8'>Start time<br>End time: 10:00<br>Total length: 175 min</div><div class='col-md-4'>Start time</div></div><div class='list-droppable list-fill top-buffer panel'><ul class='list-group'><li class='used-activity-element list-group-item list-group-item-success'>hej</li><li class='used-activity-element list-group-item list-group-item-info'>Hej</li><li class='used-activity-element list-group-item list-group-item-warning'>Hej</li><li class='used-activity-element list-group-item list-group-item-danger'>Hej</li></ul></div></div>");
	})
}