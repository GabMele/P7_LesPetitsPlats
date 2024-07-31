// handleRecipesSearch.js

export function filterRecipesByTags(allRecipes, selectedTags) {
    const matchingRecipes = [];
    const tagCategories = Object.keys(selectedTags);

    for (const recipe of allRecipes) {
        let recipeMatchesAllTags = true;

        for (const category of tagCategories) {
            const tagValues = selectedTags[category];

            for (const tagValue of tagValues) {
                if (!doesRecipeMatchTag(recipe, category, tagValue.toLowerCase())) {
                    recipeMatchesAllTags = false;
                    break;
                }
            }

            if (!recipeMatchesAllTags) break;

        }

        if (recipeMatchesAllTags) {
            matchingRecipes.push(recipe);
        }
    }

    return matchingRecipes;
}


function doesRecipeMatchTag(recipe, tagCategory, tagValue) {
    if (tagCategory === 'appliance') {
        return recipe[tagCategory].toLowerCase() === tagValue;
    }

    let categoryItems = recipe[tagCategory];

    for (const item of categoryItems) {
        let itemToCheck = tagCategory === 'ingredients' ? item.ingredient : item;
        if (itemToCheck.toLowerCase() === tagValue) {
            return true;
        }
    }

    return false;
}



function containsSearchTerm(text, searchTerm) {
    return text.toLowerCase().includes(searchTerm.toLowerCase());
}

export function filterRecipesByName(allRecipes, searchTerm) {
    let matchingRecipes = [];

    for (const recipe of allRecipes) {

        // Check if recipeName or recipeDescription matches
        if (containsSearchTerm(recipe.name, searchTerm) || 
            containsSearchTerm(recipe.description, searchTerm)) {
            matchingRecipes.push(recipe);
            continue; // Move to next recipe
        }

        // Check if any ingredient matches
        let recipeMatch = false;

        for (const ingredient of recipe.ingredients) {
            if (containsSearchTerm(ingredient.ingredient, searchTerm)) {
                recipeMatch = true;
                break;
            }
        }

        if (recipeMatch) {
            matchingRecipes.push(recipe);
        }
    }

    return matchingRecipes;
}












// export function filterRecipesByName(allRecipes, searchTerm) {
//     let matchingRecipes = [];
//     let lowerCaseSearchTerm = searchTerm.toLowerCase();

//     for (let i = 0; i < allRecipes.length; i++) {
//         let recipe = allRecipes[i];
//         let recipeName = recipe.name.toLowerCase();
//         let recipeDescription = recipe.description.toLowerCase();
//         let recipeIngredients = recipe.ingredients;

//         let recipeMatch = false;

//         // Check name
//         if (recipeName.includes(lowerCaseSearchTerm)) {
//             recipeMatch = true;
//         }
        
//         // Check description
//         if (!recipeMatch && recipeDescription.includes(lowerCaseSearchTerm)) {
//             recipeMatch = true;
//         }
        
//         // Check ingredients
//         if (!recipeMatch) {
//             for (let j = 0; j < recipeIngredients.length; j++) {
//                 if (recipeIngredients[j].toLowerCase().includes(lowerCaseSearchTerm)) {
//                     recipeMatch = true;
//                     break;
//                 }
//             }
//         }

//         if (recipeMatch) {
//             matchingRecipes.push(recipe);
//         }
//     }

//     return matchingRecipes;
// }



// export function filterRecipesByName(allRecipes, searchTerm) {
   
//     let matchingRecipes = [];

//     for (let i = 0; i < allRecipes.length; i++) {
//         let recipeName = allRecipes[i].name.toLowerCase();
//         let recipeDescription = allRecipes[i].description.toLowerCase();
//         let recipeIngredients = [];
//         for (let j = 0; j < allRecipes[i].ingredients.length; j++) {
//             recipeIngredients.push(allRecipes[i].ingredients[j].ingredient.toLowerCase());
//         }

//        //console.log("recipeIngredients:", recipeIngredients);

//         if (recipeName.includes(searchTerm.toLowerCase()) || 
//             recipeDescription.includes(searchTerm.toLowerCase()) ||
        
//             ) {
//             matchingRecipes.push(allRecipes[i]);
//         }
//     }

//     return matchingRecipes;
// }