// handleFilters.js

export function initializeFilters(recipes) {
    const dropdowns = ['ingredient-filter', 'appliance-filter', 'utensil-filter'];
    const filters = initializeFilterSets(dropdowns);

    console.log('Filters:', filters);
    console.log('Recipes:', recipes);

    populateFilters(recipes, filters);

    console.log('Filters:', filters);
    console.log('Recipes:', recipes);

    initializeDropdowns(dropdowns, filters);
}

function initializeFilterSets(dropdowns) {
    const filters = {};
    dropdowns.forEach(id => filters[id] = new Set());
    return filters;
}

function populateFilters(recipes, filters) {
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => filters['ingredient-filter'].add(ingredient.ingredient));
        filters['appliance-filter'].add(recipe.appliance);
        recipe.ustensils.forEach(ustensil => filters['utensil-filter'].add(ustensil));
    });
}

function initializeDropdowns(dropdowns, filters) {
    dropdowns.forEach(id => {
        const dropdown = document.getElementById(id);
        const searchInput = dropdown.querySelector('.searchInput');
        const itemsList = dropdown.querySelector('.itemsList');
        itemsList.innerHTML = '';


        console.log("dropdown : ", dropdown);
        console.log("itemsList : ", itemsList);
        console.log("searchInput : ", searchInput);
        console.log("filters[id] : ", filters[id]);
        console.log("------------------");

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

    // searchInput.addEventListener('blur', function() {
    //     setTimeout(() => {
    //         dropdown.querySelector('.dropdown-content').style.display = 'none';
    //     }, 200); // delay to allow click event on dropdown items
    // });

    hideDropdownOnBlur(dropdown, searchInput);
}



function hideDropdownOnBlur(dropdown, searchInput) {
    // console.log('Setting up blur effect');
    // console.log(dropdown);
    searchInput.addEventListener('blur', function() {
        // console.log('Blur event triggered');
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

function setupDropdownItemSelection(itemsList, dropdown) {
    itemsList.addEventListener('click', function(e) {
        if (e.target && e.target.matches('.dropdown-item')) {
            const selectedItem = e.target.textContent;
            dropdown.querySelector('.filter-chosen span').textContent = selectedItem;
            dropdown.querySelector('.filter-chosen').style.display = 'block';
            dropdown.querySelector('.dropdown-content').style.display = 'none';
        }
    });
}
