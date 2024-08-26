// home.js

import { fetchData } from './api.js';
import { DATA_JSON_PATH, RECIPES_IMAGES_PATH } from '../constants.js';
import { initializeFilters } from './handleFilters.js';
import { filterRecipesByName } from './handleRecipesSearch.js';

/** @type {Array} */
export let recipesFilteredByName = [];

/**
 * Fetches recipes data from the API
 * @returns {Promise<Array>} The recipes data
 * @throws {Error} If there's an error fetching the data
 */
async function fetchRecipesData() {
    try {
        const { recipes } = await fetchData(DATA_JSON_PATH);
        return recipes;
    } catch (error) {
        console.error('Error fetching recipes data:', error);
        throw error;
    }
}

/**
 * Creates an HTML element
 * @param {string} type - The type of element to create
 * @param {string} [className] - The class name for the element
 * @param {string} [content] - The text content for the element
 * @returns {HTMLElement} The created element
 */
function createElement(type, className, content) {
    const element = document.createElement(type);
    if (className) element.className = className;
    if (content) element.textContent = content;
    return element;
}

/**
 * Creates an ingredients list
 * @param {Array} ingredients - The ingredients array
 * @returns {HTMLUListElement} The created unordered list
 */
function createIngredientsList(ingredients) {
    const list = createElement('ul', 'ingredients-list');
    
    ingredients.forEach(ingredient => {
        const item = createElement('li', 'ingredient-item');
        const title = createElement('div', 'ingredient-title', ingredient.ingredient);
        const quantity = createElement('div', 'ingredient-quantity', `${ingredient.quantity || ''} ${ingredient.unit || ''}`.trim());
        
        item.appendChild(title);
        item.appendChild(quantity);
        list.appendChild(item);
    });
    
    return list;
}

/**
 * Creates a recipe card
 * @param {Object} recipe - The recipe object
 * @returns {HTMLElement} The created recipe card
 */
function createRecipeCard(recipe) {
    const card = createElement('figure', 'recipe-card');
    const imageContainer = createElement('div', 'image-container');
    const image = createElement('img', 'recipe-image');
    image.src = `${RECIPES_IMAGES_PATH}${recipe.image}`;
    image.alt = recipe.name;
    imageContainer.appendChild(image);
    
    const timeBadge = createElement('span', 'recipe-time-badge', `${recipe.time}min`);
    imageContainer.appendChild(timeBadge);
    
    card.appendChild(imageContainer);

    const content = createElement('div', 'recipe-card-content');
    const title = createElement('h3', 'recipe-title', recipe.name);
    const descriptionTitle = createElement('h4', null, 'RECETTE');
    const description = createElement('p', 'recipe-description', recipe.description);
    const ingredientsTitle = createElement('h4', 'recipe-nested-title', 'INGREDIENTS');
    const ingredientsDiv = createElement('div');
    const applianceTitle = createElement('h4', 'recipe-nested-title', 'APPAREILS');
    const appliance = createElement('p', 'recipe-content-text', recipe.appliance);
    const ustensilsTitle = createElement('h4', 'recipe-nested-title', 'USTENSILS');
    const ustensils = createElement('p', 'recipe-content-text', recipe.ustensils.join(', '));

    ingredientsDiv.appendChild(ingredientsTitle);
    ingredientsDiv.appendChild(createIngredientsList(recipe.ingredients));
    content.append(title, descriptionTitle, description, ingredientsTitle, ingredientsDiv, applianceTitle, appliance, ustensilsTitle, ustensils);
    card.appendChild(content);

    return card;
}

/**
 * Renders the recipes grid
 * @param {Array} recipes - The recipes array to render
 */
export function renderRecipesGrid(recipes) {
    const grid = document.querySelector('.recipes-grid');
    grid.innerHTML = '';
    recipes.forEach(recipe => grid.appendChild(createRecipeCard(recipe)));
    document.querySelector(".recipes-counter").textContent = `${recipes.length} recettes`;
}

/**
 * Toggles the clear icon visibility
 * @param {HTMLElement} clearIcon - The clear icon element
 * @param {boolean} show - Whether to show or hide the icon
 */
function toggleClearIcon(clearIcon, show) {
    clearIcon.style.display = show ? 'inline' : 'none';
}

/**
 * Clears all tags from the page
 */
function clearTags() {
    document.querySelectorAll('.tag-wrapper').forEach(element => element.remove());
}

/**
 * Regenerates the page content and clears tags
 * @param {Array} recipes - The recipes array
 * @param {boolean} showClearIcon - Whether to show the clear icon
 * @param {HTMLElement} clearIcon - The clear icon element
 */
function regeneratePageAndClearTags(recipes, showClearIcon, clearIcon) {
    hideNoRecipesFoundMessage();
    renderRecipesGrid(recipes);
    initializeFilters(recipes);
    clearTags();
    toggleClearIcon(clearIcon, showClearIcon);
}

/**
 * Handles input changes in the search field
 * @param {string} inputText - The input text
 * @param {HTMLElement} clearIcon - The clear icon element
 * @param {Array} recipes - The full recipes array
 */
function handleInputChange(inputText, clearIcon, recipes) {
    const trimmedInput = inputText.trimStart();
    const showClearIcon = trimmedInput.length > 0;
    
    recipesFilteredByName = trimmedInput.length >= 3 ? filterRecipesByName(recipes, trimmedInput) : recipes;
    
    if (recipesFilteredByName.length === 0 && trimmedInput.length >= 3) {
        showNoRecipesFoundMessage(trimmedInput);
    } else {
        regeneratePageAndClearTags(recipesFilteredByName, showClearIcon, clearIcon);
    }
}

/**
 * Shows a message when no recipes are found
 * @param {string} searchTerm - The search term that yielded no results
 */
function showNoRecipesFoundMessage(searchTerm) {
    const grid = document.querySelector('.recipes-grid');
    const message = document.querySelector('.no-recipes-message');
    const searchTermSpan = document.querySelector('.search-term');
    
    grid.innerHTML = ''; // Clear existing recipes
    searchTermSpan.textContent = searchTerm;
    message.style.display = 'block';
    document.querySelector(".recipes-counter").textContent = "0 recettes";
}

/**
 * Hides the no recipes found message
 */
export function hideNoRecipesFoundMessage() {
    const message = document.querySelector('.no-recipes-message');
    if (message) {
        message.style.display = 'none';
    }
}

/**
 * Handles clearing the search input
 * @param {HTMLInputElement} searchInput - The search input element
 * @param {HTMLElement} clearIcon - The clear icon element
 * @param {Array} recipes - The full recipes array
 */
function handleClearIcon(searchInput, clearIcon, recipes) {
    searchInput.value = '';
    recipesFilteredByName = recipes;
    regeneratePageAndClearTags(recipes, false, clearIcon);
}

/**
 * Initializes the application
 */
async function initializeApp() {
    try {
        const recipes = await fetchRecipesData();
        recipesFilteredByName = recipes;

        regeneratePageAndClearTags(recipes, false, document.querySelector('.clear-icon'));

        const mainSearchInput = document.getElementById('mainSearchInput');
        const clearIcon = document.querySelector('.clear-icon');

        mainSearchInput.addEventListener('input', () => handleInputChange(mainSearchInput.value, clearIcon, recipes));
        clearIcon.addEventListener('click', () => handleClearIcon(mainSearchInput, clearIcon, recipes));

    } catch (error) {
        console.error('Initialization failed:', error);
    }
}

document.addEventListener('DOMContentLoaded', initializeApp);