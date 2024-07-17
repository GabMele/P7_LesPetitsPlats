// home.js

import { fetchData } from './api.js';
import { DATA_JSON_PATH, RECIPES_IMAGES_PATH } from '../constants.js';
import { initializeFilters } from './handleFilters.js';
import { filterRecipesByName } from './handleRecipesSearch.js';

async function fetchRecipesData() {
    try {
        const { recipes } = await fetchData(DATA_JSON_PATH);
        return recipes;
    } catch (error) {
        console.error('Error fetching recipes data:', error);
        throw error;
    }
}

export function renderRecipesGrid(recipes) {
    const grid = document.querySelector('.recipes-grid');
    grid.innerHTML = '';
    recipes.forEach(recipe => grid.appendChild(createRecipeCard(recipe)));
}

// Generic function to create an HTML element
function createElement(type, className, content) {
    const element = document.createElement(type);
    if (className) element.className = className;
    if (content) element.textContent = content;
    return element;
}


function createRecipeCard(recipe) {
    const card = createElement('figure', 'recipe-card');

    const image = createElement('img', 'recipe-image', null);
    image.src = RECIPES_IMAGES_PATH + recipe.image;
    image.alt = recipe.name;
    card.appendChild(image);

    const content = createElement('div', 'recipe-content');

    const title = createElement('h2', 'recipe-title', recipe.name);
    content.appendChild(title);

    const info = createElement('p', 'recipe-info', `Servings: ${recipe.servings} | Time: ${recipe.time} mins`);
    content.appendChild(info);

    const description = createElement('p', 'recipe-description', recipe.description);
    content.appendChild(description);

    const ingredientsDiv = createElement('div', 'recipe-ingredients');
    const ingredientsTitle = createElement('h3', null, 'Ingredients:');
    ingredientsDiv.appendChild(ingredientsTitle);
    ingredientsDiv.appendChild(createIngredientsList(recipe.ingredients));
    content.appendChild(ingredientsDiv);

    const appliance = createElement('p', 'recipe-appliance', `Appliance: ${recipe.appliance}`);
    content.appendChild(appliance);

    const ustensils = createElement('p', 'recipe-ustensils', `Ustensils: ${recipe.ustensils.join(', ')}`);
    content.appendChild(ustensils);

    card.appendChild(content);

    return card;
}


function createIngredientsList(ingredients) {
    const list = document.createElement('ul');
    ingredients.forEach(ingredient => {
        const item = document.createElement('li');
        item.textContent = `
            ${ingredient.quantity || ''} 
            ${ingredient.unit || ''} 
            ${ingredient.ingredient}`;
        list.appendChild(item);
    });
    return list;
}


function toggleClearIcon(icon, condition) {
    icon.style.display = condition ? 'inline' : 'none';
}


// function handleInputChange(inputText, icon, recipes) {
//     const applyFilter = inputText.length >= 3;
//     const filteredRecipes = applyFilter ? filterRecipesByNameAndTags(recipes, inputText) : recipes;
//     renderRecipesGrid(filteredRecipes);
//     initializeFilters(filteredRecipes);
//     toggleClearIcon(icon, inputText.trim() !== '');
// }


// function handleInputChange(inputText, icon, recipes) {
//     if (inputText.length >= 3) {
//         const filteredRecipes = filterRecipesByName(recipes, inputText);

//         console.log('Recipes:', recipes);
//         console.log('Filtered recipes:', filteredRecipes);

//         renderRecipesGrid(filteredRecipes);
//         initializeFilters(filteredRecipes);
//         toggleClearIcon(icon, inputText.trim() !== ''); 
//     }
// }



// function handleInputChange(inputText, icon, recipes) {
//     let filteredRecipes;

//     // Early return for empty input
//     if (inputText.length === 0) {
//         filteredRecipes = recipes;
//         toggleClearIcon(icon, false); // Hide icon when input is empty
//     } else if (inputText.length >= 3) {
//         filteredRecipes = filterRecipesByName(recipes, inputText);
//     }

//     // Common operations after filtering
//     //if (filteredRecipes) {
//         console.log('Recipes:', recipes);
//         console.log('Filtered recipes:', filteredRecipes);

//         renderRecipesGrid(filteredRecipes);
//         initializeFilters(filteredRecipes);
//         toggleClearIcon(icon, inputText.trim() !== ''); // Show icon if input is not just whitespace
//     //}
// }


function handleInputChange(inputText, icon, recipes) {
    const trimmedInput = inputText.trim();
    const shouldShowClearIcon = trimmedInput.length > 0;

    toggleClearIcon(icon, shouldShowClearIcon); // Toggle icon visibility based on input presence != 0

    let filteredRecipes = trimmedInput.length >= 3 ? filterRecipesByName(recipes, trimmedInput) : recipes;

    // Render and initialize with the filtered recipes
    renderRecipesGrid(filteredRecipes);
    initializeFilters(filteredRecipes);
}






// Function to handle clear icon click
function handleClearIcon(searchInput, clearIcon, recipes) {
    searchInput.value = ''; // Clear the search input
    toggleClearIcon(clearIcon, false); // Assuming this toggles visibility of the clear icon
    renderRecipesGrid(recipes); // Re-render recipes grid after clearing search
    initializeFilters(recipes); // Re-initialize filters to reflect the cleared search
}


async function initializeApp() {
    try {
        const recipes = await fetchRecipesData(); // Fetching recipes data

        renderRecipesGrid(recipes); // Initial rendering of recipes grid
        initializeFilters(recipes); // Initial setup of filters

        const mainSearchInput = document.getElementById('mainSearchInput'); // Getting search input element
        const clearIcon = document.querySelector('.clear-icon'); // Getting clear icon element

        // mainSearchInput.addEventListener('input', () => handleInputChange(mainSearchInput.value, clearIcon, recipes));

        mainSearchInput.addEventListener('input', () => {
            handleInputChange(mainSearchInput.value, clearIcon, recipes)
        });


        clearIcon.addEventListener('click', () => handleClearIcon(mainSearchInput, clearIcon, recipes));

    } catch (error) {
        console.error('Initialization failed:', error);
    }
}

// Initialize the app when the document is ready
document.addEventListener('DOMContentLoaded', initializeApp);


