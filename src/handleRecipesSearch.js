/**
 * Filters recipes based on selected tags from different categories.
 *
 * @param {Array<Object>} allRecipes - List of all available recipes.
 * @param {Object} selectedTags - Object with tag categories as keys (e.g., 'appliance', 'ingredients') 
 * and arrays of selected tag values.
 * @returns {Array<Object>} - List of recipes that match all selected tags.
 */
export function filterRecipesByTags(allRecipes, selectedTags) {
    const tagCategories = Object.keys(selectedTags);

    return allRecipes.filter(recipe =>
        tagCategories.every(category =>
            selectedTags[category].every(tagValue =>
                isRecipeMatchingTag(recipe, category, tagValue.toLowerCase())
            )
        )
    );
}

/**
 * Checks if a recipe matches a tag in a specific category.
 *
 * @param {Object} recipe - The recipe to check.
 * @param {string} tagCategory - The category of the tag (e.g., 'appliance', 'ingredients').
 * @param {string} tagValue - The value of the tag to check.
 * @returns {boolean} - True if the recipe matches the tag, otherwise false.
 */
function isRecipeMatchingTag(recipe, tagCategory, tagValue) {
    if (tagCategory === 'appliance') {
        return recipe[tagCategory].toLowerCase() === tagValue;
    }

    return recipe[tagCategory].some(item => {
        const itemToCheck = tagCategory === 'ingredients' ? item.ingredient : item;
        return itemToCheck.toLowerCase() === tagValue;
    });
}

/**
 * Checks if a text contains the search term, case-insensitively.
 *
 * @param {string} text - The text to check.
 * @param {string} searchTerm - The search term to find within the text.
 * @returns {boolean} - True if the text contains the search term, otherwise false.
 */
const containsSearchTerm = (text, searchTerm) =>
    text.toLowerCase().includes(searchTerm.toLowerCase());

/**
 * Filters recipes based on a search term that matches the recipe's name, description, or ingredients.
 *
 * @param {Array<Object>} allRecipes - List of all available recipes.
 * @param {string} searchTerm - The search term to filter recipes by name, description, or ingredients.
 * @returns {Array<Object>} - List of recipes that match the search term.
 */
export function filterRecipesByName(allRecipes, searchTerm) {
    return allRecipes.filter(recipe =>
        containsSearchTerm(recipe.name, searchTerm) ||
        containsSearchTerm(recipe.description, searchTerm) ||
        recipe.ingredients.some(({ ingredient }) =>
            containsSearchTerm(ingredient, searchTerm)
        )
    );
}

