var DayController = function(view, model) {
	$('.day-list').sortable({
		helper: "clone",
		appendTo: "body",
		placeholder: "placeholder-list-element",
		forcePlaceholderSize: true,
		connectWith: "ul",
		tolerance: "pointer",
		dropOnEmpty: true,
		distance: 1.0
	})

	
}