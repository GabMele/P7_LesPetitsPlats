// home.js

import { fetchData } from './api.js';
import { DATA_JSON_PATH, RECIPES_IMAGES_PATH } from '../constants.js';
import { initializeFilters } from './handleFilters.js';
import { filterRecipesByName } from './handleRecipesSearch.js';

export let currentFilteredRecipes = [];

export function setCurrentFilteredRecipes(recipes) {
    currentFilteredRecipes = recipes;
}


async function fetchRecipesData() {
    try {
        const { recipes } = await fetchData(DATA_JSON_PATH);
        return recipes;
    } catch (error) {
        console.error('Error fetching recipes data:', error);
        throw error;
    }
}

function createElement(type, className, content) {
    const element = document.createElement(type);
    if (className) element.className = className;
    if (content) element.textContent = content;
    return element;
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

function createRecipeCard(recipe) {
    const card = createElement('figure', 'recipe-card');

    const image = createElement('img', 'recipe-image');
    image.src = `${RECIPES_IMAGES_PATH}${recipe.image}`;
    image.alt = recipe.name;
    card.appendChild(image);

    const content = createElement('div', 'recipe-content');
    const title = createElement('h2', 'recipe-title', recipe.name);
    const info = createElement('p', 'recipe-info', `Servings: ${recipe.servings} | Time: ${recipe.time} mins`);
    const description = createElement('p', 'recipe-description', recipe.description);
    const ingredientsDiv = createElement('div', 'recipe-ingredients');
    const ingredientsTitle = createElement('h3', null, 'Ingredients:');
    const appliance = createElement('p', 'recipe-appliance', `Appliance: ${recipe.appliance}`);
    const ustensils = createElement('p', 'recipe-ustensils', `Ustensils: ${recipe.ustensils.join(', ')}`);

    ingredientsDiv.appendChild(ingredientsTitle);
    ingredientsDiv.appendChild(createIngredientsList(recipe.ingredients));
    content.appendChild(title);
    content.appendChild(info);
    content.appendChild(description);
    content.appendChild(ingredientsDiv);
    content.appendChild(appliance);
    content.appendChild(ustensils);
    card.appendChild(content);

    return card;
}

export function renderRecipesGrid(recipes) {
    const grid = document.querySelector('.recipes-grid');
    grid.innerHTML = '';
    recipes.forEach(recipe => grid.appendChild(createRecipeCard(recipe)));
    document.querySelector(".recipes-counter").textContent = recipes.length + " recettes";
}

function toggleClearIcon(clearIcon, condition) {
    clearIcon.style.display = condition ? 'inline' : 'none';
}


function clearTags() {
    document.querySelectorAll('.tag-wrapper').forEach(function(element) {
        element.remove();
    });
}


function regeneratePageAndClearTags(recipes, shouldShowClearIcon, clearIcon) {
    renderRecipesGrid(recipes);
    initializeFilters(recipes);
    clearTags();
    toggleClearIcon(clearIcon, shouldShowClearIcon);
}


function handleInputChange(inputText, clearIcon, recipes) {
    // Trim start of the input text
    const trimmedInput = inputText.trimStart();
    
    // Filter out non-letter characters
    const letterOnlyInput = trimmedInput.replace(/[^a-zA-Z]/g, '');
    
    // Determine whether to show the clear icon
    const shouldShowClearIcon = letterOnlyInput.length > 0;
    
    // Filter recipes based on the letter-only input
    const currentFilteredRecipes = letterOnlyInput.length >= 3 ? filterRecipesByName(recipes, letterOnlyInput) : recipes;
    
    // Update the recipes display
    regeneratePageAndClearTags(currentFilteredRecipes, shouldShowClearIcon, clearIcon);
}




function handleClearIcon(searchInput, clearIcon, recipes) {
    searchInput.value = '';
    regeneratePageAndClearTags(recipes, false, clearIcon);
}



async function initializeApp() {
    try {
        const recipes = await fetchRecipesData();

        currentFilteredRecipes = recipes;

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


