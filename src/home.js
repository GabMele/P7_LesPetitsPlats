// home.js

import { fetchData } from './api.js';
import { DATA_JSON_PATH } from '../constants.js';
import { RECIPES_IMAGES_PATH } from '../constants.js';
import initializeClearableInputs from './inputHandler.js';
import { initializeFilters } from './handleFilters.js';
import filterRecipesByName from './handleRecipesSearch.js';


/**
 * Fetches recipes data from the specified path defined in constants.js.
 * Throws an Error if there's an issue retrieving the data.
 * @returns {Promise<Array>} A promise that resolves with the fetched recipes data.
 * @throws {Error} An error object if there's an issue fetching the data.
 */
async function fetchRecipesData() {
    try {
        const { recipes } = await fetchData(DATA_JSON_PATH);
        //console.log('Fetched recipes:', recipes);
        return recipes;
    } catch (error) {
        console.error('Error fetching recipes data:', error);
        throw error;
    }
}




/**
 * Renders recipes onto the DOM.
 * @param {Array} recipes The array of recipe objects.
 */
function renderRecipesGrid(recipes) {
    const grid = document.querySelector('.recipes-grid');

    //console.log('Recipes grid:', grid);
    //console.log("Rendering recipes...");

    //console.log(recipes);

    grid.innerHTML = '';

    recipes.forEach(recipe => {
       // console.log('Rendering recipe:', recipe.name);

        const card = createRecipeCard(recipe);


        //console.log('Recipe card created:', card);

        grid.appendChild(card);
    });
}



/**
 * Creates a recipe card element.
 * @param {Object} recipe The recipe object.
 * @returns {HTMLElement} The recipe card element.
 */
function createRecipeCard(recipe) {
    const card = document.createElement('figure');
    card.className = 'recipe-card';

    const image = document.createElement('img');
    image.src = RECIPES_IMAGES_PATH + recipe.image;
    image.alt = recipe.name;
    image.className = 'recipe-image';

    const content = document.createElement('div');
    content.className = 'recipe-content';

    const title = document.createElement('h2');
    title.className = 'recipe-title';
    title.textContent = recipe.name;

    const info = document.createElement('p');
    info.className = 'recipe-info';
    info.textContent = `Servings: ${recipe.servings} | Time: ${recipe.time} mins`;

    const description = document.createElement('p');
    description.className = 'recipe-description';
    description.textContent = recipe.description;

    const ingredients = createIngredientsList(recipe.ingredients);

    content.appendChild(title);
    content.appendChild(info);
    content.appendChild(description);
    content.appendChild(ingredients);

    card.appendChild(image);
    card.appendChild(content);

    return card;
}



/**
 * Creates an ingredients list element.
 * @param {Array} ingredients The ingredients array.
 * @returns {HTMLElement} The ingredients list element.
 */
function createIngredientsList(ingredients) {
    const ingredientsDiv = document.createElement('div');
    ingredientsDiv.className = 'recipe-ingredients';

    const ingredientsTitle = document.createElement('h3');
    ingredientsTitle.textContent = 'Ingredients:';

    const ingredientsList = document.createElement('ul');
    ingredients.forEach(ingredient => {
        const listItem = document.createElement('li');
        listItem.textContent = `
            ${ingredient.quantity ? ingredient.quantity : ''}
            ${ingredient.unit ? ingredient.unit : ''} 
            ${ingredient.ingredient}`;
        ingredientsList.appendChild(listItem);
    });

    ingredientsDiv.appendChild(ingredientsTitle);
    ingredientsDiv.appendChild(ingredientsList);

    return ingredientsDiv;
}




async function initializeApp() {
    try {
        const recipes = await fetchRecipesData();
        initializeClearableInputs();
        renderRecipesGrid(recipes);
        initializeFilters(recipes);

        const searchInput = document.getElementById('mainSearchInput');
        searchInput.addEventListener('input', () => {
            const inputText = searchInput.value;
            console.log(`Input text: ${inputText}`);
            console.log(recipes);
            const filteredRecipes = filterRecipesByName(recipes, inputText);
            console.log(filteredRecipes);
            renderRecipesGrid(filteredRecipes);
        });

    } catch (error) {
        console.error('Initialization failed:', error);
    }
}

// Start the application
initializeApp();