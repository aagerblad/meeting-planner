var HomeView = function(container, model){
	
	model.addObserver(this);
	this.selected_dish_description = container.find("#selected_dish_description");
	this.dishName = container.find('#dishName');
	this.ingredients = container.find('#ingredients');
	this.dishPic = container.find('#dishPic');
	this.chooseDishBtn = container.find('#chooseDishBtn');
	this.backBtn = container.find('#backBtn');
	this.ingredientsHeader = container.find("#ingredientsHeader");
	this.confirmBtn = $("#confirm-button");

	function fillDescription(){	
		var id = model.getCurrentDishId();
		this.dishName.innerHTML = model.getDish(id).name;
		this.selected_dish_description.innerHTML = model.getDish(id).description;
		this.dishPic.src = "images/"+model.getDish(id).image;

		var ingredientString = "";
		var allIngredients = model.getDish(id).ingredients;
		for (var i = 0; i < allIngredients.length; i++) {
			var ingr = allIngredients[i];
			ingredientString += ingr.quantity*model.getNumberOfGuests() +" "+ingr.unit+" "+ingr.name;
			ingredientString += "<br>";
		};
		this.ingredients.innerHTML = ingredientString;
		this.ingredientsHeader.innerHTML = "Ingredients for: " + model.getNumberOfGuests() + " people";
	}

	this.update = function(arg){
		fillDescription();
	}
}