export default function filterRecipesByName(recipes, inputText) {
    const normalizedText = inputText.trim().toLowerCase();
    return recipes.filter(recipe => recipe.name.toLowerCase().includes(normalizedText));
}
