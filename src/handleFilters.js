// handleFilters.js

import { filterRecipesByTags } from './handleRecipesSearch.js';
import { renderRecipesGrid }from './home.js';
import { currentFilteredRecipes } from './home.js';


export function initializeFilters(currentFilteredRecipes) {
    //const dropdowns = ['ingredients-filter', 'appliance-filter', 'ustensils-filter'];

    const dropdowns = Array.from(document.querySelectorAll('.filters .dropdown')).map(dropdown => dropdown.id);

    const filters = initializeFilterSets(dropdowns);

    populateFilters(currentFilteredRecipes, filters);

    initializeDropdowns(dropdowns, filters, currentFilteredRecipes);

    console.log("initialized Dropdowns DONE : ", dropdowns);

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
        const lowerItem = item.toLowerCase();
        if (!set.has(lowerItem)) {
            filters[filterKey].add(item);
            set.add(lowerItem);
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


        // console.log("dropdown : ", dropdown);
        // console.log("itemsList : ", itemsList);
        // console.log("searchInput : ", searchInput);
        // console.log("filters[id] : ", filters[id]);
        // console.log("------------------");

        populateDropdownItems(itemsList, filters[id]);
        setupDropdownToggle(dropdown, searchInput);
        setupSearchFilter(searchInput, itemsList);
        setupDropdownItemSelection(itemsList, dropdown, recipes);
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

function setupDropdownToggle(dropdown, searchInput) {
    const dropdownButton = dropdown.querySelector('.dropdown-button');
    dropdownButton.addEventListener('click', function() {
        const dropdownContent = this.nextElementSibling;
        // dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';

        dropdownContent.style.display = 'block';

        searchInput.focus();
    });
    hideDropdownOnBlur(dropdown, searchInput);
}



function hideDropdownOnBlur(dropdown, searchInput) {
    //console.log('----Setting up blur effect on : ', dropdown);
    // console.log("---dropdown:", dropdown);
    // console.log("---searchInput:", searchInput.value);

    searchInput.addEventListener('blur', function() {


        // console.log('*****************************');
        // console.log('******* Blur event triggered ******');
        // console.log("**** dropdown:", dropdown);
        // console.log("**** searchInput:", searchInput.value);
        // console.log(dropdown);
        setTimeout(() => {
            dropdown.querySelector('.dropdown-content').style.display = 'none';
        }, 200); // delay to allow click event on dropdown items
    });
}



function setupSearchFilter(searchInput, itemsList) {
    searchInput.addEventListener('input', function() {
        const filter = searchInput.value.toLowerCase();
        const items = itemsList.getElementsByClassName('dropdown-item');
        Array.from(items).forEach(item => {
            const itemText = item.textContent || item.innerText;
            item.style.display = itemText.toLowerCase().includes(filter) ? '' : 'none';
        });
    });
}




function setupDropdownItemSelection(itemsList, dropdown, recipes) {
    // const items = Array.from(itemsList.children)
    // .map(item => item.textContent.trim());
    ;

    itemsList.addEventListener('click', (e) => {

        // console.log("setupDropdownItemSelection : e.target ", e.target)
        // console.log(`setupDropdownItemSelection : e.target.matches('.dropdown-item') ${e.target.matches('.dropdown-item')}`);

        // console.log("setupDropdownItemSelection : ", e.target, e.target.matches('.dropdown-item'));

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
    console.log("recipes:", recipes);

    if (!existingTags.includes(selectedItem)) {
        addTag(selectedItem, selectedTagsDiv, itemsList, recipes);
        hideDropdownContent(dropdown);

        const allExistingTags = getAllExistingTags();
        console.log("allExistingTags:", allExistingTags);

        console.log("BEFORE CALL filterRecipesByTags");
        console.log("------ allExistingTags:", allExistingTags);

        const filteredRecipes = filterRecipesByTags(currentFilteredRecipes, allExistingTags);

        console.log("filteredRecipes:", filteredRecipes);

        updateUI(filteredRecipes);
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

function updateUI(filteredRecipes) {
    renderRecipesGrid(filteredRecipes);
    initializeFilters(filteredRecipes);
}




function createTag(item, itemsList, recipes) {
    const newTagWrapper = document.createElement('div');
    newTagWrapper.classList.add('tag-wrapper');

    const newTagContent = document.createElement('span');
    newTagContent.textContent = item;
    newTagContent.classList.add('tag-content');

    const closeButton = createCloseButton(newTagWrapper, itemsList, recipes);

    newTagWrapper.appendChild(newTagContent);
    newTagWrapper.appendChild(closeButton);
    removeItemFromList(item, itemsList)

    return newTagWrapper;
}

function createCloseButton(tagWrapper, itemsList, recipes) {
    const closeButton = document.createElement('span');
    closeButton.textContent = '✕';
    closeButton.classList.add('remove-tag');

    closeButton.addEventListener('click', () => {
        const itemToAdd = tagWrapper.querySelector('.tag-content').textContent.trim();
        tagWrapper.remove();
        addItemToList(itemToAdd, itemsList);

        const allExistingTags = getAllExistingTags();
        const filteredRecipes = filterRecipesByTags(currentFilteredRecipes, allExistingTags);
        updateUI(filteredRecipes);
    });

    return closeButton;
}

function removeItemFromList(itemToRemove, itemsList) {
    const listItemToRemove = Array.from(itemsList.children).find(child => 
        child.textContent.trim() === itemToRemove
    );

    // console.log("itemsList:", itemsList);
    // console.log("itemsList.children:", itemsList.children);
    // console.log("itemToRemove:", itemToRemove);
    // console.log("listItemToRemove:", listItemToRemove);

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


