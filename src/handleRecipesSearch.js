/**
 * Version with NATIVE functions
 * 
 * Filters a list of recipes based on selected tags.
 * @param {Object[]} allRecipes - The list of all recipe objects.
 * @param {Object} selectedTags - An object where keys are tag categories and values are arrays of selected tags.
 * @returns {Object[]} The filtered list of recipes that match all selected tags.
 */
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

/**
 * Determines if a recipe matches a specific tag category and value.
 * @param {Object} recipe - The recipe object to check.
 * @param {string} tagCategory - The category of the tag (e.g., 'appliance', 'ingredients').
 * @param {string} tagValue - The value of the tag to match.
 * @returns {boolean} True if the recipe matches the tag value for the given category, otherwise false.
 */
function doesRecipeMatchTag(recipe, tagCategory, tagValue) {
    if (tagCategory === 'appliance') {
        return recipe[tagCategory].toLowerCase() === tagValue;
    }

    const categoryItems = recipe[tagCategory];

    for (const item of categoryItems) {
        const itemToCheck = tagCategory === 'ingredients' ? item.ingredient : item;
        if (itemToCheck.toLowerCase() === tagValue) {
            return true;
        }
    }

    return false;
}

/**
 * Checks if a text contains a search term, case-insensitive.
 * @param {string} text - The text to search within.
 * @param {string} searchTerm - The term to search for.
 * @returns {boolean} True if the search term is found within the text, otherwise false.
 */
function containsSearchTerm(text, searchTerm) {
    return text.toLowerCase().includes(searchTerm.toLowerCase());
}

/**
 * Filters a list of recipes based on a search term in the name, description, or ingredients.
 * @param {Object[]} allRecipes - The list of all recipe objects.
 * @param {string} searchTerm - The search term to filter recipes by.
 * @returns {Object[]} The filtered list of recipes that match the search term in name, description, or ingredients.
 */
export function filterRecipesByName(allRecipes, searchTerm) {
    const matchingRecipes = [];

    for (const recipe of allRecipes) {
        // Check if recipe name or description matches the search term
        if (containsSearchTerm(recipe.name, searchTerm) || 
            containsSearchTerm(recipe.description, searchTerm)) {
            matchingRecipes.push(recipe);
            continue; // Move to next recipe
        }

        // Check if any ingredient matches the search term
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