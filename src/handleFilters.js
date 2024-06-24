// handleFilters.js

export function initializeFilters(recipes) {
    const dropdowns = ['ingredient-filter', 'appliance-filter', 'utensil-filter'];
    const filters = initializeFilterSets(dropdowns);

    // console.log('Filters:', filters);
    // console.log('Recipes:', recipes);

    populateFilters(recipes, filters);


    console.log('Populate by these Recipes:', recipes);
    console.log('Populate these Filters:', filters);

    initializeDropdowns(dropdowns, filters);
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
    const uniqueIngredients = new Set();
    const uniqueAppliances = new Set();
    const uniqueUtensils = new Set();

    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            const ingredientName = ingredient.ingredient;
            const lowerIngredientName = ingredientName.toLowerCase();
            if (!uniqueIngredients.has(lowerIngredientName)) {
                filters['ingredient-filter'].add(ingredientName); // Add to set in filters object
                uniqueIngredients.add(lowerIngredientName);
            }
        });

        const applianceName = recipe.appliance;
        const lowerApplianceName = applianceName.toLowerCase();
        if (!uniqueAppliances.has(lowerApplianceName)) {
            filters['appliance-filter'].add(applianceName); // Add to set in filters object
            uniqueAppliances.add(lowerApplianceName);
        }

        recipe.ustensils.forEach(ustensil => {
            const ustensilName = ustensil;
            const lowerUstensilName = ustensilName.toLowerCase();
            if (!uniqueUtensils.has(lowerUstensilName)) {
                filters['utensil-filter'].add(ustensilName); // Add to set in filters object
                uniqueUtensils.add(lowerUstensilName);
            }
        });
    });
}


function initializeDropdowns(dropdowns, filters) {
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
        setupDropdownItemSelection(itemsList, dropdown);
    });
}

function populateDropdownItems(itemsList, filterSet) {
    filterSet.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('dropdown-item');
        li.textContent = item;
        itemsList.appendChild(li);
    });
}

function setupDropdownToggle(dropdown, searchInput) {
    const dropdownButton = dropdown.querySelector('.dropdown-button');
    dropdownButton.addEventListener('click', function() {
        const dropdownContent = this.nextElementSibling;
        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
        searchInput.focus();
    });
    hideDropdownOnBlur(dropdown, searchInput);
}



function hideDropdownOnBlur(dropdown, searchInput) {
    console.log('Setting up blur effect');
    console.log("dropdown:", dropdown);
    console.log("searchInput:", searchInput);

    searchInput.addEventListener('blur', function() {

        console.log('Blur event triggered');
        console.log("dropdown:", dropdown);
        console.log("searchInput:", searchInput);
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


// function setupDropdownItemSelection(itemsList, dropdown) {
//     // console.log('Setting up item selection');
//     // console.log("itemsList:", itemsList);
//     // console.log("dropdown:", dropdown);

//     itemsList.addEventListener('click', function(e) {
//         console.log("e.target:", e.target);
//         if (e.target && e.target.matches('.dropdown-item')) {
//             const selectedItem = e.target.textContent;

//             const selectedFilters = dropdown.querySelector('.filter-selected');
//             const existingItems = new Set(Array.from(selectedFilters.querySelectorAll('span'))
//                 .map(span => span.textContent));

//             if (!existingItems.has(selectedItem)) {
//                 const newTagWrapper = document.createElement('span');
//                 newTagWrapper.textContent = selectedItem;

//                 selectedFilters.appendChild(newTagWrapper);
//                 selectedFilters.style.display = 'flex';
//                 dropdown.querySelector('.dropdown-content').style.display = 'none';
//             } else {
//                 //console.log("Item already selected:", selectedItem);
//             }
//         }
//     });
// }



function setupDropdownItemSelection(itemsList, dropdown) {
    itemsList.addEventListener('click', function(e) {
        if (e.target && e.target.matches('.dropdown-item')) {
            const selectedItem = e.target.textContent.trim();

            const selectedFilters = dropdown.querySelector('.filter-selected');
            const existingItems = new Set(Array.from(selectedFilters.querySelectorAll('.tag-content'))
                .map(span => span.textContent.trim()));

            if (!existingItems.has(selectedItem)) {
                const newTagWrapper = createTag(selectedItem);

                selectedFilters.appendChild(newTagWrapper);
                selectedFilters.style.display = 'flex';
                dropdown.querySelector('.dropdown-content').style.display = 'none';
            } else {
                console.log("Item already selected:", selectedItem);
            }
        }
    });
}



function createTag(item) {
    const newTagWrapper = document.createElement('div');
    newTagWrapper.classList.add('tag-wrapper');
    const newTagContent = document.createElement('span');
    newTagContent.textContent = item;
    newTagContent.classList.add('tag-content');

    const closeButton = document.createElement('span');
    closeButton.textContent = '✕';
    closeButton.classList.add('remove-tag');
    closeButton.addEventListener('click', function() {
        newTagWrapper.remove();
    });

    newTagWrapper.appendChild(newTagContent);
    newTagWrapper.appendChild(closeButton);

    return newTagWrapper;
}