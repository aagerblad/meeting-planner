var ModalView = function(container, model){

	this.newButton = container.find('#newActivityButton');
	this.acModal = container;
	this.acForm = container.find('#newActivityForm');
	this.acTitle = container.find('#title');
	this.acTime = container.find('#time');
	this.acTypes = container.find('#types');
	this.acDesc = container.find('#desc');
    this.modalLabel = container.find('#modalLabel');
    this.deleteBtn = container.find('#deleteBtn');
    this.deleteBtn.hide();
    this.acModal.attr("title", "new");
	fillTypes();

	function fillTypes() {
		for (var i = model.activityTypes.length - 1; i >= 0; i--) {
			var option = $('<option></option>');
			var type = model.activityTypes[i];
			option.val(i);
			option.html(type);
            option.attr('id', 'type' + i);
			container.find('#types').append(option);
		};
	}

}