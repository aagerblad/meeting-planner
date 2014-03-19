var ModalController = function(view, model){

    //view.acForm.submit(addActivity);
    view.acForm.submit(function(e) {
        e.preventDefault();
        if(addActivity())
            view.acModal.modal('hide');
    });

    view.acModal.on('hidden.bs.modal', clearAllFields);

    function addActivity() {
        if (view.acTitle.val() != "" && view.acTime.val() != "" && view.acTypes.val() != "" && view.acDesc.val() != ""){
            model.addActivity(new Activity(view.acTitle.val(), view.acTime.val(), view.acTypes.val(), view.acDesc.val(), model.getNextId(), model), null);
            clearAllFields();
            return true;
        }
        else{
            if (view.acTitle.val() == ""){
                view.acTitle.attr("placeholder", "You have to set a title!");
            }
            if (view.acTime.val() == ""){
                view.acTime.attr("placeholder", "You have to set a duration!");
            }
            if (view.acDesc.val() == ""){
                view.acDesc.attr("placeholder", "You have to set a description!");
            }
            return false;
        }
    }
    function clearAllFields(){
        view.acTitle.val("");
        view.acTitle.attr("placeholder", "");
        view.acTime.val("");
        view.acTime.attr("placeholder", "");
        view.acDesc.val("");
        view.acDesc.attr("placeholder", "");
    }

	
}