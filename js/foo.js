$(document).ready(function(){
	/*setDraggable();*/

	/*$('.list-droppable').droppable({
		drop: function( event, ui ) {
			var childrens = this.children[0];
			$("<li></li>").text( ui.draggable.text()).addClass(ui.draggable.attr("class")).appendTo(childrens);
			setDraggable();
			ui.draggable.remove();
		}
	});*/

	/*$('ul').droppable({
		drop: function( event, ui ) {
			$("<li></li>").text( ui.draggable.text()).addClass(ui.draggable.attr("class")).appendTo(this);
			setDraggable();
			ui.draggable.remove();
		}
	})*/
	$('ul').sortable({
		helper: "clone",
		appendTo: "body",
		placeholder: "placeholder-list-element",
		forcePlaceholderSize: true,
		connectWith: "ul",
		tolerance: "pointer",
		dropOnEmpty: true,
		distance: 1.0
	})

	$('#row-of-days').sortable({
		revert: true
	})

})

/*function setDraggable() {
	$('li').draggable({
		helper: "clone",
		revert: "invalid",
		appendTo: "body",
		start: function(e, ui){ //hide original when showing clone
			$(this).hide();             
			$(ui.helper).addClass('col-md-2')

		},
        stop: function(){ //show original when hiding clone
        	$(this).show();
        },
        zIndex: 1000
    });
}*/

