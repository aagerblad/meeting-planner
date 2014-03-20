var ModalController = function(view, model){

    // submit data and edit or add activity depending on what action was choosen by the user
    view.acForm.submit(function(e) {
        e.preventDefault();
        if (view.modalLabel.html() == "New Activity"){
            if(addActivity())
                view.acModal.modal('hide');
        } else{
            if(editActivity())
                view.acModal.modal('hide');
        }
    });

    // Initiate listeners
    view.acModal.on('hidden.bs.modal', clearAllFields);
    view.deleteBtn.click(deleteActivity);

    // function for taking data from form and adding activity
    // rejected if any field is invalid
    function addActivity() {
        var time = parseInt(view.acTime.val());
        var limit = 1000;
        if (view.acTitle.val() != "" && view.acTime.val() != "" && time < limit && view.acTypes.val() != "" && view.acDesc.val() != ""){
            model.addActivity(new Activity(view.acTitle.val(), parseInt(view.acTime.val()), view.acTypes.val(), view.acDesc.val(), model.getNextId(), model), null);
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
            if (time >= limit){
                view.acTime.val('');
                view.acTime.attr("placeholder", time +" min is too long! Below 1000 min is ok.");
            }
            if (view.acDesc.val() == ""){
                view.acDesc.attr("placeholder", "You have to set a description!");
            }
            return false;
        }
    }

    // function for taking data from form and editing activity
    // rejected if any field is invalid
    function editActivity() {
        var time = parseInt(view.acTime.val());
        var limit = 1000;
        if (view.acTitle.val() != "" && view.acTime.val() != "" && time < limit && view.acTypes.val() != "" && view.acDesc.val() != ""){
            var activity = model.allActivities[view.acModal.attr("title")];
            activity.setName(view.acTitle.val());
            activity.setLength(parseInt(view.acTime.val()));
            activity.setTypeId(view.acTypes.val());
            activity.setDescription(view.acDesc.val());
            clearAllFields();
            model.notifyObservers('activities_changed');
            return true;
        }
        else{
            if (view.acTitle.val() == ""){
                view.acTitle.attr("placeholder", "You have to set a title!");
            }
            if (view.acTime.val() == ""){
                view.acTime.attr("placeholder", "You have to set a duration!");
            }
            if (time >= limit){
                view.acTime.val('');
                view.acTime.attr("placeholder", time +" min is too long! Below 1000 min is ok.");
            }
            if (view.acDesc.val() == ""){
                view.acDesc.attr("placeholder", "You have to set a description!");
            }
            return false;
        }
    }

    // Clear form for next use
    function clearAllFields(){
        view.acTitle.val("");
        view.acTitle.attr("placeholder", "");
        view.acTime.val("");
        view.acTime.attr("placeholder", "");
        view.acDesc.val("");
        view.acDesc.attr("placeholder", "");
        view.acModal.attr("title", "new");
        view.modalLabel.html('New Activity');
        view.deleteBtn.hide();
    }

    // Delete activity
    function deleteActivity(){
        var activity = model.allActivities[view.acModal.attr("title")];
        model.removeParkedActivityById(activity.getId());
        view.acModal.modal('hide');
    }

	
}