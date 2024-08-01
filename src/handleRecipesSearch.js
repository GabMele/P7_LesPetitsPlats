// handleRecipesSearch.js

export function filterRecipesByTags(allRecipes, selectedTags) {
    const tagCategories = Object.keys(selectedTags);

    return allRecipes.filter(recipe => 
        tagCategories.every(category => 
            selectedTags[category].every(tagValue => 
                doesRecipeMatchTag(recipe, category, tagValue.toLowerCase())
            )
        )
    );
}

function doesRecipeMatchTag(recipe, tagCategory, tagValue) {
    if (tagCategory === 'appliance') {
        return recipe[tagCategory].toLowerCase() === tagValue;
    }

    return recipe[tagCategory].some(item => {
        const itemToCheck = tagCategory === 'ingredients' ? item.ingredient : item;
        return itemToCheck.toLowerCase() === tagValue;
    });
}



const containsSearchTerm = (text, searchTerm) =>
    text.toLowerCase().includes(searchTerm.toLowerCase());
  
  const ingredientMatches = (ingredients, searchTerm) =>
    ingredients.some(({ ingredient }) => containsSearchTerm(ingredient, searchTerm));



export function filterRecipesByName(allRecipes, searchTerm) {
    return allRecipes.filter(recipe => 
        containsSearchTerm(recipe.name, searchTerm) ||
        containsSearchTerm(recipe.description, searchTerm) ||
        recipe.ingredients.some(ingredient => 
            containsSearchTerm(ingredient.ingredient, searchTerm)
        )
    );
}

