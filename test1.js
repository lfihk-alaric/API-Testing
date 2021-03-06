console.log('JavaScript connected');

function getRecipes(){
	var inputVal = document.getElementById('ingredientsInput').value;
	var upToIngredients = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=';
	var maxNumMissing = document.getElementById('maxNumMissing').value;

	var afterIngredients = '&number=200&mashape-key=0gbpW6Rs1ymshDLw1GaH2g0W8JOjp1x5kCQjsnPQ3FoiRkIu0D'

	var frigo = new XMLHttpRequest();
	frigo.open("GET", upToIngredients + inputVal + afterIngredients, false);
	frigo.send();

	var recipes = JSON.parse(frigo.response);

	function createHTML() {
		
		var recipeDiv = [];
		var title = [];
		var ingredientsMissing = [];
		var nameSpan = [];
		var ingredientsMissingSpan = [];
		var img = [];

		recipeContainer = document.createElement("div");
		recipeContainer.setAttribute("id", "recipeContainer");

		for (var i = 0; i < recipes.length; i++) {
			//Create a new div in each loop with an id of recipeDiv0, recipeDiv1... so you get a div for each recipe
			recipeDiv[i] = document.createElement("div");
			recipeDiv[i].setAttribute("id", "recipeDiv" + i);

			
			//Create span with id of nameSpan0, nameSpan1... to contain name of dish; and create and append the actual name of dish to said span
			nameSpan[i] = document.createElement("span");
			nameSpan[i].setAttribute("id", "nameSpan" + i);
			title[i] = document.createTextNode(recipes[i].title);
			nameSpan[i].appendChild(title[i]);



			//Create img tag with id of img0, im1... to contain image;
			img[i] = document.createElement("img");
			img[i].setAttribute("id", "img" + i);
			img[i].setAttribute("src", recipes[i].image);

			
			//Create span with id of ingredientsMissingSpan0, ingredientsMissingSpan1... to contain number of missing ingredients; and create and append textNode containing the actual number of missing ingredients to said span
			ingredientsMissingSpan[i] = document.createElement("span");
			ingredientsMissingSpan[i].setAttribute("id", "ingredientsMissingSpan" + i);
			ingredientsMissing[i] = document.createTextNode("Number of missing ingredients: " + recipes[i].missedIngredientCount);
			ingredientsMissingSpan[i].appendChild(ingredientsMissing[i]);


			if (maxNumMissing <= recipes[i].missedIngredientCount) {
				//Append title and number of missing ingredients spans to main div separated by a linebreak
				recipeDiv[i].appendChild(nameSpan[i]);
				recipeDiv[i].appendChild(img[i]);
				recipeDiv[i].appendChild(ingredientsMissingSpan[i])

				recipeContainer.appendChild(recipeDiv[i]);
			} else {

			}
		}

		document.body.appendChild(recipeContainer);

		console.log(recipes.length)

	}

	createHTML();

}

console.log("JavaScript finished loading");




