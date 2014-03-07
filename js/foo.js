$(document).ready(function(){
	$('li').draggable({
		revert: "invalid"	
	})

	$('li').mousedown(function(){
		$(this).css('z-index',100);
	})
})