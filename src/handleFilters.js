// handleFilters.js

import { filterRecipesByTags } from './handleRecipesSearch.js';
import { renderRecipesGrid }from './home.js';
import { recipesFilteredByName } from './home.js';



console.log("START dropdowm SETUp handleFilters.js");
const dropdowns = Array.from(document.querySelectorAll('.filters .dropdown')).map(dropdown => dropdown.id);
dropdowns.forEach(dropdown => addListenersOnDropdownsToDisplayDropdownList(dropdown));
console.log("END dropdowm SETUp handleFilters.js");



export function initializeFilters(recipes) {
    const dropdowns = Array.from(document.querySelectorAll('.filters .dropdown'))
                           .map(dropdown => dropdown.id);
    const filters = initializeFilterSets(dropdowns);
    populateFilters(recipes, filters);
    initializeDropdowns(dropdowns, filters, recipes);
    removeSelectedTagsFromDropdowns(dropdowns);
    console.log("initialized Dropdowns DONE : ", dropdowns);
}

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


function initializeFilterSets(dropdowns) {
    const filters = {};
    dropdowns.forEach(id => filters[id] = new Set());
    return filters;
}


// this function manage also the case where an ingredient is 
// written with different cases : as "chocolat" and "Chocolat" :
// in this case, only the firtst occurence will be added keeping
// the original case.
// To achieve this, we will use a Set object

function populateFilters(recipes, filters) {
    const addToFilterSet = (filterKey, item, set) => {
        const lowercaseItem = item.toLowerCase();
        if (!set.has(lowercaseItem)) {
            filters[filterKey].add(item);
            set.add(lowercaseItem);
        }
    };

    const uniqueIngredients = new Set();
    const uniqueAppliances = new Set();
    const uniqueUstensils = new Set();

    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            addToFilterSet('ingredients-filter', ingredient.ingredient, uniqueIngredients);
        });

        addToFilterSet('appliance-filter', recipe.appliance, uniqueAppliances);

        recipe.ustensils.forEach(ustensil => {
            addToFilterSet('ustensils-filter', ustensil, uniqueUstensils);
        });
    });
}







function initializeDropdowns(dropdowns, filters, recipes) {
    dropdowns.forEach(id => {
        const dropdown = document.getElementById(id);
        const searchInput = dropdown.querySelector('.searchInput');
        const itemsList = dropdown.querySelector('.itemsList');
        itemsList.innerHTML = '';

        populateDropdownItems(itemsList, filters[id]);
        //addListenersOnDropdownsToDisplayDropdownList(dropdown, searchInput);
        addListenersOnInputAndDisplayItemsThatMatchInput(searchInput, itemsList);
        addListenersOnDropdownItemsAndLaunchHandling(itemsList, dropdown, recipes);
    });
}

function populateDropdownItems(itemsList, filterSet) {
    filterSet.forEach(item => {
        // const li = document.createElement('li');
        // li.classList.add('dropdown-item');
        // li.textContent = item;
        // itemsList.appendChild(li);

        addItemToList(item, itemsList);

    });
}



function addListenersOnDropdownsToDisplayDropdownList(dropdownId) {
    console.log("DROPDONN 104 : ", dropdownId);
    var dropdown = document.getElementById(dropdownId);
    console.log('DROPDONN 106 : ', dropdown);
    const dropdownButton = dropdown.querySelector('.dropdown-button');
    const dropdownContent = dropdown.querySelector('.dropdown-content');
    const searchInput = dropdown.querySelector('.searchInput');

    dropdownButton.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent event from bubbling upwards

        console.log("Dropdown ADDEVENTLISTENER click: ", dropdown.id);
        // Open this dropdown
        dropdownContent.style.display = 'block';



        searchInput.focus();

    });

    hideDropdownContentOnInputBlur(dropdown);
}



function hideDropdownContentOnInputBlur(dropdown) {
    const searchInput = dropdown.querySelector('.searchInput');
    //const dropdownContent = dropdown.querySelector('.dropdown-content');

    searchInput.addEventListener('blur', function() {
        setTimeout(() => {

            //dropdownContent.style.display = 'none';
            hideDropdownContent(dropdown);
            //toggleDropdownContent(dropdown);


            console.log("Dropdown closed: ", dropdown.id);
        }, 200); // delay to allow click event on dropdown items
    });
}



function addListenersOnInputAndDisplayItemsThatMatchInput(searchInput, itemsList) {
    searchInput.addEventListener('input', function() {
        const filter = searchInput.value.toLowerCase();
        const items = itemsList.getElementsByClassName('dropdown-item');
        Array.from(items).forEach(item => {
            const itemText = item.textContent
            item.style.display = itemText.toLowerCase().includes(filter) ? '' : 'none';
        });
    });
}




function addListenersOnDropdownItemsAndLaunchHandling(itemsList, dropdown, recipes) {
    // const items = Array.from(itemsList.children)
    // .map(item => item.textContent.trim());
    ;

    itemsList.addEventListener('click', (e) => {

        // console.log("addListenersOnDropdownItemsAndLaunchHandling : e.target ", e.target)
        // console.log(`addListenersOnDropdownItemsAndLaunchHandling : e.target.matches('.dropdown-item') ${e.target.matches('.dropdown-item')}`);

        // console.log("addListenersOnDropdownItemsAndLaunchHandling : ", e.target, e.target.matches('.dropdown-item'));

        if (e.target && e.target.matches('.dropdown-item')) {
            handleItemClick(e.target, itemsList, dropdown, recipes);
        }
        
    });

}



function handleItemClick(target, itemsList, dropdown, recipes) {
    const selectedItem = target.textContent.trim();
    const selectedTagsDiv = dropdown.querySelector('.filter-selected');
    const existingTags = Array.from(selectedTagsDiv.querySelectorAll('.tag-content'))
                                .map(span => span.textContent.trim());

    console.log("existingTags in this category:", existingTags);

    if (!existingTags.includes(selectedItem)) {
        addTag(selectedItem, selectedTagsDiv, itemsList, recipes);
        
        hideDropdownContent(dropdown);
        //toggleDropdownContent(dropdown);


        // const allExistingTags = getAllExistingTags();
        // console.log("allExistingTags:", allExistingTags);

        // const filteredRecipesByNameAndTags = filterRecipesByTags(recipesFilteredByName, allExistingTags);

        // console.log("filteredRecipes:", filteredRecipesByNameAndTags);

        regeneratePageKeepingTagsUntouched();
    } else {
        // console.log("Item was already selected:", selectedItem);
    }
}

function addTag(selectedItem, selectedTagsDiv, itemsList, recipes) {
    const newTagWrapper = createTag(selectedItem, itemsList, recipes);
    selectedTagsDiv.appendChild(newTagWrapper);
    selectedTagsDiv.style.display = 'flex';
}

function hideDropdownContent(dropdown) {
    dropdown.querySelector('.dropdown-content').style.display = 'none';
}

// function toggleDropdownContent(dropdown) {
//     const dropdownContent = dropdown.querySelector('.dropdown-content');
//     dropdownContent.style.display = (dropdownContent.style.display === 'block') ? 'none' : 'block';
// }


function getAllExistingTags() {
    const allDropdowns = document.querySelectorAll('.dropdown');
    let allTags = {};

    allDropdowns.forEach(dropdown => {
        const tagsCategory = getTagsCategory(dropdown);
        const selectedTagsDiv = dropdown.querySelector('.filter-selected');
        const existingTags = Array.from(selectedTagsDiv.querySelectorAll('.tag-content'))
                                    .map(span => span.textContent.trim());

        if (existingTags.length > 0) {
            allTags[tagsCategory] = existingTags;
        }
    });

    return allTags;
}

function getTagsCategory(dropdown) {
    return dropdown.id.split('-')[0];
}



function regeneratePageKeepingTagsUntouched() {
    // Retrieve the existing tags
    const existingTags = getAllExistingTags();

    // Check if there are any tags to filter by
    const hasTags = Object.keys(existingTags).length > 0;
    
    // Filter recipes only if there are tags to filter by
    const recipesToRender = hasTags 
        ? filterRecipesByTags(recipesFilteredByName, existingTags)
        : recipesFilteredByName;

    // Render the recipes in the grid
    renderRecipesGrid(recipesToRender);

    // Initialize the filters with the (potentially filtered) recipes
    initializeFilters(recipesToRender);
}



function createTag(item, itemsList, recipes) {
    const newTagWrapper = document.createElement('div');
    newTagWrapper.classList.add('tag-wrapper');

    const newTagContent = document.createElement('span');
    newTagContent.textContent = item;
    newTagContent.classList.add('tag-content');

    const closeButton = createCloseButtonAndHandleTagRemoval(newTagWrapper, itemsList);

    newTagWrapper.appendChild(newTagContent);
    newTagWrapper.appendChild(closeButton);
    //removeItemFromList(item, itemsList)

    return newTagWrapper;
}


function createCloseButtonAndHandleTagRemoval(tagWrapper, itemsList) {
    const closeButton = document.createElement('span');
    closeButton.textContent = '✕';
    closeButton.classList.add('remove-tag');

    closeButton.addEventListener('click', () => {
        const itemToAdd = tagWrapper.querySelector('.tag-content').textContent.trim();
        tagWrapper.remove();
        addItemToList(itemToAdd, itemsList);

        // const allExistingTags = getAllExistingTags();
        // const filteredRecipes = filterRecipesByTags(recipesFilteredByName, allExistingTags);
        regeneratePageKeepingTagsUntouched();
    });

    return closeButton;
}


function removeItemFromList(itemToRemove, itemsList) {
    const listItemToRemove = Array.from(itemsList.children).find(child => 
        child.textContent.trim() === itemToRemove
    );

    console.log("itemsList:", itemsList);
    console.log("itemsList.children:", itemsList.children);
    console.log("itemToRemove:", itemToRemove);
    console.log("listItemToRemove:", listItemToRemove);

    if (listItemToRemove) {
        itemsList.removeChild(listItemToRemove);
    }
}


function addItemToList(itemToAdd, itemsList) {
    const li = document.createElement('li');
    li.classList.add('dropdown-item');
    li.textContent = itemToAdd;
    itemsList.appendChild(li);
}


