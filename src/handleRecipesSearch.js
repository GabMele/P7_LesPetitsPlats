// handleRecipesSearch.js

export function filterRecipesByTags(allRecipes, selectedTags) {
    let matchingRecipes = [];

    for (let i = 0; i < allRecipes.length; i++) {
        let currentRecipe = allRecipes[i];
        let recipeMatchesAllTags = true;

        for (let tagCategory in selectedTags) {
            if (!recipeMatchesAllTags) break;

            for (let j = 0; j < selectedTags[tagCategory].length; j++) {
                let currentTagValue = selectedTags[tagCategory][j].toLowerCase();
                
                if (!doesRecipeMatchTag(currentRecipe, tagCategory, currentTagValue)) {
                    recipeMatchesAllTags = false;
                    break;
                }
            }
        }

        if (recipeMatchesAllTags) {
            matchingRecipes.push(currentRecipe);
        }
    }

    return matchingRecipes;
}

function doesRecipeMatchTag(recipe, tagCategory, tagValue) {
    if (tagCategory === 'appliance') {
        return recipe[tagCategory].toLowerCase() === tagValue;
    }

    let categoryItems = recipe[tagCategory];
    for (let k = 0; k < categoryItems.length; k++) {
        let itemToCheck = tagCategory === 'ingredients' ? categoryItems[k].ingredient : categoryItems[k];
        if (itemToCheck.toLowerCase() === tagValue) {
            return true;
        }
    }
    return false;
}






export function filterRecipesByName(allRecipes, searchTerm) {
   
    let matchingRecipes = [];

    for (let i = 0; i < allRecipes.length; i++) {
        let recipeName = allRecipes[i].name.toLowerCase();
        if (doesNameStartWith(recipeName, searchTerm)) {
            matchingRecipes.push(allRecipes[i]);
        }
    }

    return matchingRecipes;
}

function doesNameStartWith(fullString, prefix) {
    if (prefix.length > fullString.length) {
        return false;
    }
    for (let i = 0; i < prefix.length; i++) {
        if (fullString[i] !== prefix[i]) {
            return false;
        }
    }
    return true;
}