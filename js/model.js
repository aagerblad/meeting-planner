// JavaScript Document

// This is an activity constructor
// When you want to create a new activity you just call
// var act = new Activity("some activity",20,1,"Some description);
function Activity(name,length,typeid,description, id, tempModel, dayId){
	var _name = name;
	var _length = length;
	var _typeid = typeid;
	var _description = description;
	var _id = id;
	var model = tempModel;
    var _dayId = dayId;       // null when created, listed in parked activities list

	tempModel.allActivities[_id] = this;

    this.getDayId = function() {
        return _dayId;
    }

    this.setDayId = function(dayId) {
        _dayId = dayId;
    }

    //get the global id of the activity
	this.getId = function() {
		return _id;
	}

	// sets the name of the activity
	this.setName = function(name) {
		_name = name;
		model.notifyObservers();
	}

	// get the name of the activity
	this.getName = function(name) {
		return _name;
	}
	
	// sets the length of the activity
	this.setLength = function(length) {
		_length = length;
		model.notifyObservers();
	}

	// get the name of the activity
	this.getLength = function() {
		return _length;
	}
	
	// sets the typeid of the activity
	this.setTypeId = function(typeid) {
		_typeid = typeid;
		model.notifyObservers();
	}

	// get the type id of the activity
	this.getTypeId = function() {
		return _typeid;
	}
	
	// sets the description of the activity
	this.setDescription = function(description) {
		_description = description;
		model.notifyObservers();
	}

	// get the description of the activity
	this.getDescription = function() {
		return _description;
	}
	
	// This method returns the string representation of the
	// activity type.
	this.getType = function () {
		return model.activityTypes[_typeid];
	};
}

// This is a day consturctor. You can use it to create days, 
// but there is also a specific function in the Model that adds
// days to the model, so you don't need call this yourself.
function Day(startH,startM, tempModel) {
	this._start = startH * 60 + startM;
	this._activities = [];
	var model = tempModel

	// sets the start time to new value
	this.setStart = function(startH,startM) {
		this._start = startH * 60 + startM;
		model.notifyObservers("days_changed");
	}

	// returns the total length of the acitivities in 
	// a day in minutes
	this.getTotalLength = function () {
		var totalLength = 0;
		$.each(this._activities,function(index,activity){
			totalLength += activity.getLength();
		});
		return totalLength;
	};

    // returns a day based on the global id of the activity
    this.getDayActivityById = function(id){
        for (var i = this._activities.length - 1; i >= 0; i--) {
            var tempId = this._activities[i].getId();
            if (tempId == id){
                return this._activities[i];
            }
        };
        return null;
    }

    // returns percentage of the given activitytype for that day
	this.getPercentage = function (type) {
		var time = {};
		time['Presentation'] = 0;
		time['Group Work'] = 0;
		time['Discussion'] = 0;
		time['Break'] = 0;
		for (var i = this._activities.length - 1; i >= 0; i--) {
				time[this._activities[i].getType()] = time[this._activities[i].getType()] + this._activities[i].getLength();
			};
        totalTime = (time['Presentation'] + time['Group Work'] + time['Discussion'] + time['Break']);
		if (type == "Presentation"){
			return (time['Presentation']/totalTime)*100;
		}
		if (type == "Group Work"){
			return (time['Group Work']/totalTime)*100;
		}
		if (type == "Discussion"){
			return (time['Discussion']/totalTime)*100;
		}
		if (type == "Break"){
			return (time['Break']/totalTime)*100;
		}
	}
	// returns the string representation Hours:Minutes of 
	// the end time of the day
	this.getEnd = function() {
		var end = this._start + this.getTotalLength();
		var hour = Math.floor(end/60);
		var min = end % 60;
		if (min < 10){
			min = "0" + min;
		}
		if (hour < 10){
			hour = "0" + hour;
		}
		return hour + ":" + min;
	};
	
	// returns the string representation Hours:Minutes of 
	// the start time of the day
	this.getStart = function() {
		var hour = Math.floor(this._start/60);
		var min = this._start % 60;
		if (min < 10){
			min = "0" + min;
		}
		if (hour < 10){
			hour = "0" + hour;
		}
		return hour + ":" + min;
	};

	this.addToStart = function(time) {
		var hour = Math.floor((this._start + time)/60);
		var min = (this._start + time) % 60;
		if (min < 10){
			min = "0" + min;
		}
		if (hour < 10){
			hour = "0" + hour;
		}
		return hour + ":" + min;
	};
    this.getEndTime = function() {
        var length = this._start
        for (var i = 0; i < this._activities.length; i++){
            length += this._activities[i].getLength();
        }
        return length;
    };
	
	// adds an activity to specific position
	// if the position is not provided then it will add it to the 
	// end of the list
	this._addActivity = function(activity,position){
		if(position != null){
			this._activities.splice(position,0,activity);
		} else {
			this._activities.push(activity);
		}
	};
	
	// removes an activity from specific position
	// this method will be called when needed from the model
	// don't call it directly
	this._removeActivity = function(position) {
		return this._activities.splice(position,1)[0];
	};
	
	// moves activity inside one day
	// this method will be called when needed from the model
	// don't call it directly
	this._moveActivity = function(oldposition,newposition) {
		if(newposition > oldposition) {
			newposition--;
		}
		var activity = this._removeActivity(oldposition);
		this._addActivity(activity, newposition);
	};
}


// this is our main module that contians days and praked activites
function Model(){

	// Super ugly code here. TODO make it not superugly
	this.activityHasMoved = true;

	this.activityId = 0;
	this.allActivities = [];
	this.days = [];
	this.parkedActivities = [];
	this.activityTypes = ["Presentation","Group Work","Discussion","Break"];
	
	// adds a new day. if startH and startM (start hours and minutes)
	// are not provided it will set the default start of the day to 08:00
	this.getNextId = function () {
		var oldActivityId = this.activityId 
		this.activityId++;
		return oldActivityId;
	}
	this.getParkedActivites = function () {
		return this.parkedActivities;
	};

	this.addDay = function (startH,startM) {
		var day;
		if(startH){
			day = new Day(startH,startM, this);
		} else {
			day = new Day(8,0, this);
		}
		this.days.push(day);
		this.notifyObservers("days_changed");
		return day;
	};


	this.removeDay = function (position) {
		this.days.splice(position,1);
		this.notifyObservers('days_changed');
	}

	this.moveDay = function (oldposition, newposition) {
		var day = this.days.splice(oldposition,1)[0];
		this.days.splice(newposition,0,day);
		this.notifyObservers('days_changed');
	}
	
	// add an activity to model
	this.addActivity = function (activity,day,position) {
		if(day != null) {
			this.days[day]._addActivity(activity,position);
		} else {
			this.parkedActivities.push(activity);
		}
		this.notifyObservers("activities_changed");
	}
	
	// add an activity to parked activities
	this.addParkedActivity = function(activity){
		this.parkedActivities.push(activity);
		this.notifyObservers();
	};

	this.addParkedActivityAtPosition = function(activity, position) {
		this.parkedActivities.splice(position,0,activity);
		this.notifyObservers('activities_changed');
	};
	
	// remove an activity on provided position from parked activites 
	this.removeParkedActivity = function(position) {
		act = this.parkedActivities.splice(position,1)[0];
		this.notifyObservers();
		return act;
	};
    this.removeParkedActivityById = function(id) {
        var act;
        for (var i = 0; i < this.parkedActivities.length; i++){
            if (this.parkedActivities[i].getId() == id){
                act = this.parkedActivities.splice(i, 1)[0];
            }
        }
        this.notifyObservers("activities_changed");
        return act;
    };
	
	// moves activity between the days, or day and parked activities.
	// to park activity you need to set the new day to null
	// to move a parked activity to let's say day 0 you set oldday to null
	// and new day to 0
	this.moveActivity = function(oldday, oldposition, newday, newposition) {

        // move activity within a day
		if(oldday !== null && oldday == newday) {
			this.days[oldday]._moveActivity(oldposition,newposition);

        // move activity within parked activities list
		}else if(oldday == null && newday == null) {
			var activity = this.removeParkedActivity(oldposition);
			this.addParkedActivity(activity,newposition);

        // move activity from parked activities to a day
		}else if(oldday == null) {
            var activity = this.parkedActivities[oldposition];

            var targetDayLimit = 24*60 - this.days[newday].getEndTime();
            if (activity.getLength() > targetDayLimit) {
                toastr.error("This activity is too long to fit in this day.", "Error")
            } else {
                this.removeParkedActivity(oldposition);
                this.days[newday]._addActivity(activity,newposition);
            }

        // move activity from day to parked activities list
		}else if(newday == null) {
			var activity = this.days[oldday]._removeActivity(oldposition);
			this.addParkedActivity(activity);

        // move activity between days
		} else {
            var activity = this.days[oldday]._activities[oldposition];

            var targetDayLimit = 24*60 - this.days[newday].getEndTime();
            if (activity.getLength() > targetDayLimit) {
                toastr.error("This activity is too long to fit in this day.", "Error")
            } else {
                this.days[oldday]._removeActivity(oldposition);
                this.days[newday]._addActivity(activity,newposition);
            }

			//this.days[newday]._addActivity(activity,newposition);
        }
        activity.setDayId(newday);
        this.notifyObservers("days_changed");
		this.notifyObservers("activities_changed");
	};

	this.moveParkedActivity = function(oldposition, newposition) {
		var activity = this.removeParkedActivity(oldposition);
		this.addParkedActivityAtPosition(activity,newposition);
		this.notifyObservers("activities_changed");
	}

	//*** OBSERVABLE PATTERN ***
	var listeners = [];
	
	this.notifyObservers = function (args) {
	    for (var i = 0; i < listeners.length; i++){
	        listeners[i].update(args);
	    }
	};
	
	this.addObserver = function (listener) {
	    listeners.push(listener);
	};
	//*** END OBSERVABLE PATTERN ***
}

// this is the instance of our main model
// this is what you should use in your application
// you can use this method to create some test data and test your implementation
function createTestData(model){
	model.addDay();
	model.addActivity(new Activity("Introduction",10,0,"Intro", model.getNextId(), model, null),null);
	model.addActivity(new Activity("Presenting Idea",30,0,"Speech", model.getNextId(), model, 0),0);
	model.addActivity(new Activity("Working in groups",35,1,"Working with friends", model.getNextId(), model, 0),0);
	model.addActivity(new Activity("Idea Discussion",15,2,"Debate", model.getNextId(), model, null),null);
	model.addActivity(new Activity("Coffee break",20,3,"Coffee and cinnamon buns!", model.getNextId(), model, null),null);
}