// handleFilters.js

import { filterRecipesByTags } from './handleRecipesSearch.js';
import { renderRecipesGrid, recipesFilteredByName } from './home.js';

/**
 * Add an item to the list.
 * @param {string} itemToAdd - The item to add.
 * @param {HTMLElement} itemsList - The list of items.
 */
function addItemToList(itemToAdd, itemsList) {
    const li = document.createElement('li');
    li.classList.add('dropdown-item');
    li.textContent = itemToAdd;
    itemsList.appendChild(li);
}

/**
 * Remove an item from the list.
 * @param {string} itemToRemove - The item to remove.
 * @param {HTMLElement} itemsList - The list of items.
 */
function removeItemFromList(itemToRemove, itemsList) {
    const listItemToRemove = Array.from(itemsList.children).find(child => 
        child.textContent.trim() === itemToRemove
    );

    if (listItemToRemove) {
        itemsList.removeChild(listItemToRemove);
    }
}

/**
 * Initialize the filter functionality.
 * @param {Array} recipes - The array of recipes to filter.
 */
export function initializeFilters(recipes) {
    const dropdowns = getAllDropdownIds();
    const filters = createEmptyFilterSetsForDropdowns(dropdowns);
    populateFilterSetsFromRecipes(recipes, filters);
    initializeDropdownsWithItemsAndListeners(dropdowns, filters, recipes);
    removeSelectedTagsFromDropdowns(dropdowns);
}

/**
 * Get all dropdown elements.
 * @returns {Array} An array of dropdown IDs.
 */
function getAllDropdownIds() {
    return Array.from(document.querySelectorAll('.filters .dropdown')).map(dropdown => dropdown.id);
}

/**
 * Initialize filter sets for each dropdown.
 * @param {Array} dropdowns - Array of dropdown IDs.
 * @returns {Object} An object with empty sets for each dropdown.
 */
function createEmptyFilterSetsForDropdowns(dropdowns) {
    const filters = {};
    dropdowns.forEach(id => filters[id] = new Set());
    return filters;
}

/**
 * Populate filters with unique items from recipes.
 * @param {Array} recipes - The array of recipes.
 * @param {Object} filters - The filters object to populate.
 */
function populateFilterSetsFromRecipes(recipes, filters) {
    const uniqueSets = {
        ingredients: new Set(),
        appliances: new Set(),
        ustensils: new Set()
    };

    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            addUniqueItemToFilterSet('ingredients-filter', ingredient.ingredient, uniqueSets.ingredients, filters);
        });
        addUniqueItemToFilterSet('appliance-filter', recipe.appliance, uniqueSets.appliances, filters);
        recipe.ustensils.forEach(ustensil => {
            addUniqueItemToFilterSet('ustensils-filter', ustensil, uniqueSets.ustensils, filters);
        });
    });
}

/**
 * Add an item to a filter set, maintaining uniqueness.
 * @param {string} filterKey - The key of the filter in the filters object.
 * @param {string} item - The item to add.
 * @param {Set} uniqueSet - The set to check for uniqueness.
 * @param {Object} filters - The filters object.
 */
function addUniqueItemToFilterSet(filterKey, item, uniqueSet, filters) {
    const lowercaseItem = item.toLowerCase();
    if (!uniqueSet.has(lowercaseItem)) {
        filters[filterKey].add(item);
        uniqueSet.add(lowercaseItem);
    }
}

/**
 * Remove selected tags from dropdowns.
 * @param {Array} dropdowns - Array of dropdown IDs.
 */
function removeSelectedTagsFromDropdowns(dropdowns) {
    dropdowns.forEach(id => {
        const dropdown = document.getElementById(id);
        const selectedTagsDiv = dropdown.querySelector('.filter-selected');
        const itemsList = dropdown.querySelector('.itemsList');
        
        const selectedTags = Array.from(selectedTagsDiv.querySelectorAll('.tag-content'))
            .map(span => span.textContent.trim());
        
        selectedTags.forEach(tag => {
            removeItemFromList(tag, itemsList);
        });
    });
}

/**
 * Initialize dropdowns with items and event listeners.
 * @param {Array} dropdowns - Array of dropdown IDs.
 * @param {Object} filters - The filters object.
 * @param {Array} recipes - The array of recipes.
 */
function initializeDropdownsWithItemsAndListeners(dropdowns, filters, recipes) {
    dropdowns.forEach(id => {
        const dropdown = document.getElementById(id);
        const searchInput = dropdown.querySelector('.searchInput');
        const itemsList = dropdown.querySelector('.itemsList');
        itemsList.innerHTML = '';

        populateDropdownItems(itemsList, filters[id]);
        addListenersOnDropdownsToDisplayDropdownList(id);
        addListenersOnInputAndDisplayItemsThatMatchInput(searchInput, itemsList);
        addListenersOnDropdownItemsAndLaunchHandling(itemsList, dropdown, recipes);
    });
}

/**
 * Populate a dropdown's item list.
 * @param {HTMLElement} itemsList - The list element to populate.
 * @param {Set} filterSet - The set of items to add to the list.
 */
function populateDropdownItems(itemsList, filterSet) {
    filterSet.forEach(item => addItemToList(item, itemsList));
}

/**
 * Add event listeners to display dropdown list.
 * @param {string} dropdownId - The ID of the dropdown.
 */
function addListenersOnDropdownsToDisplayDropdownList(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    const dropdownButton = dropdown.querySelector('.dropdown-button');
    const dropdownContent = dropdown.querySelector('.dropdown-content');
    const searchInput = dropdown.querySelector('.searchInput');

    dropdownButton.addEventListener('click', (event) => {
        event.stopPropagation();
        dropdownContent.style.display = 'block';
        searchInput.focus();
    });

    hideDropdownContentOnInputBlur(dropdown);
}

/**
 * Hide dropdown content when input loses focus.
 * @param {HTMLElement} dropdown - The dropdown element.
 */
function hideDropdownContentOnInputBlur(dropdown) {
    const searchInput = dropdown.querySelector('.searchInput');
    searchInput.addEventListener('blur', () => {
        setTimeout(() => hideDropdownContent(dropdown), 200);
    });
}

/**
 * Add event listeners to filter dropdown items based on input.
 * @param {HTMLElement} searchInput - The search input element.
 * @param {HTMLElement} itemsList - The list of items to filter.
 */
function addListenersOnInputAndDisplayItemsThatMatchInput(searchInput, itemsList) {
    searchInput.addEventListener('input', () => {
        const filter = searchInput.value.toLowerCase();
        Array.from(itemsList.getElementsByClassName('dropdown-item')).forEach(item => {
            item.style.display = item.textContent.toLowerCase().includes(filter) ? '' : 'none';
        });
    });
}

/**
 * Add event listeners to handle item selection in dropdowns.
 * @param {HTMLElement} itemsList - The list of items.
 * @param {HTMLElement} dropdown - The dropdown element.
 * @param {Array} recipes - The array of recipes.
 */
function addListenersOnDropdownItemsAndLaunchHandling(itemsList, dropdown, recipes) {
    itemsList.addEventListener('click', (e) => {
        if (e.target && e.target.matches('.dropdown-item')) {
            handleSelectedDropdownItem(e.target, itemsList, dropdown, recipes);
        }
    });
}

/**
 * Handle the click event on a dropdown item.
 * @param {HTMLElement} target - The clicked item.
 * @param {HTMLElement} itemsList - The list of items.
 * @param {HTMLElement} dropdown - The dropdown element.
 * @param {Array} recipes - The array of recipes.
 */
function handleSelectedDropdownItem(target, itemsList, dropdown, recipes) {
    const selectedItem = target.textContent.trim();
    const selectedTagsDiv = dropdown.querySelector('.filter-selected');
    const existingTags = Array.from(selectedTagsDiv.querySelectorAll('.tag-content'))
                                .map(span => span.textContent.trim());

    if (!existingTags.includes(selectedItem)) {
        createAndAddTagToTagsArea(selectedItem, selectedTagsDiv, itemsList, recipes);
        hideDropdownContent(dropdown);
        regeneratePageKeepingTagsUntouched();
    }
}

/**
 * Add a tag to the selected tags area.
 * @param {string} selectedItem - The item to add as a tag.
 * @param {HTMLElement} selectedTagsDiv - The div to add the tag to.
 * @param {HTMLElement} itemsList - The list of items.
 * @param {Array} recipes - The array of recipes.
 */
function createAndAddTagToTagsArea(selectedItem, selectedTagsDiv, itemsList) {
    const newTagWrapper = createTagElement(selectedItem, itemsList);
    selectedTagsDiv.appendChild(newTagWrapper);
    selectedTagsDiv.style.display = 'flex';
}

/**
 * Hide the dropdown content.
 * @param {HTMLElement} dropdown - The dropdown element.
 */
function hideDropdownContent(dropdown) {
    dropdown.querySelector('.dropdown-content').style.display = 'none';
}

/**
 * Get all existing tags from all dropdowns.
 * @returns {Object} An object with tag categories as keys and arrays of tags as values.
 */
function getAllExistingTags() {
    const allDropdowns = document.querySelectorAll('.dropdown');
    let allTags = {};

    allDropdowns.forEach(dropdown => {
        const tagsCategory = extractTagCategoryFromDropdownId(dropdown);
        const selectedTagsDiv = dropdown.querySelector('.filter-selected');
        const existingTags = Array.from(selectedTagsDiv.querySelectorAll('.tag-content'))
                                    .map(span => span.textContent.trim());

        if (existingTags.length > 0) {
            allTags[tagsCategory] = existingTags;
        }
    });

    return allTags;
}

/**
 * Get the category of tags for a dropdown.
 * @param {HTMLElement} dropdown - The dropdown element.
 * @returns {string} The category of the tags.
 */
function extractTagCategoryFromDropdownId(dropdown) {
    return dropdown.id.split('-')[0];
}

/**
 * Regenerate the page content while keeping selected tags.
 */
function regeneratePageKeepingTagsUntouched() {
    const existingTags = getAllExistingTags();
    const hasTags = Object.keys(existingTags).length > 0;
    
    const recipesToRender = hasTags 
        ? filterRecipesByTags(recipesFilteredByName, existingTags)
        : recipesFilteredByName;

    renderRecipesGrid(recipesToRender);
    initializeFilters(recipesToRender);
}

/**
 * Create a new tag element.
 * @param {string} item - The item to create a tag for.
 * @param {HTMLElement} itemsList - The list of items.
 * @param {Array} recipes - The array of recipes.
 * @returns {HTMLElement} The created tag wrapper element.
 */
function createTagElement(item, itemsList) {
    const newTagWrapper = document.createElement('div');
    newTagWrapper.classList.add('tag-wrapper');

    const newTagContent = document.createElement('span');
    newTagContent.textContent = item;
    newTagContent.classList.add('tag-content');

    const closeButton = createCloseButtonAndHandleTagRemoval(newTagWrapper, itemsList);

    newTagWrapper.appendChild(newTagContent);
    newTagWrapper.appendChild(closeButton);

    return newTagWrapper;
}

/**
 * Create a close button for a tag and handle its removal.
 * @param {HTMLElement} tagWrapper - The tag wrapper element.
 * @param {HTMLElement} itemsList - The list of items.
 * @returns {HTMLElement} The created close button element.
 */
function createCloseButtonAndHandleTagRemoval(tagWrapper, itemsList) {
    const closeButton = document.createElement('span');
    closeButton.textContent = '✕';
    closeButton.classList.add('remove-tag');

    closeButton.addEventListener('click', () => {
        const itemToAdd = tagWrapper.querySelector('.tag-content').textContent.trim();
        tagWrapper.remove();
        addItemToList(itemToAdd, itemsList);
        regeneratePageKeepingTagsUntouched();
    });

    return closeButton;
}

