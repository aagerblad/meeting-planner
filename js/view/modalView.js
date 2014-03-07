var ModalView = function(container, model){

	this.newButton = container.find('#newActivityButton');
	this.acModal = container;
	this.acForm = container.find('#newActivityForm');
	this.acTitle = container.find('#title');
	this.acTime = container.find('#time');
	this.acTypes = container.find('#types');
	this.acDesc = container.find('#desc');
	fillTypes();

	function fillTypes() {
		for (var i = model.activityTypes.length - 1; i >= 0; i--) {
			var option = $('<option></option>');
			var type = model.activityTypes[i];
			option.val(i);
			option.html(type);
			container.find('#types').append(option);
		};
	}

}