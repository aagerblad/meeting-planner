var ParkedListController = function(view, model){
	$('#parkedList').sortable({
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