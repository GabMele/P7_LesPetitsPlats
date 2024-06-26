// handleFilters.js

export function initializeFilters(recipes) {
    const dropdowns = ['ingredient-filter', 'appliance-filter', 'utensil-filter'];
    const filters = initializeFilterSets(dropdowns);

    // console.log('Filters:', filters);
    // console.log('Recipes:', recipes);


    populateFilters(recipes, filters);

    console.log("initialized Filters : ", filters);
    // console.log('Populate by these Recipes:', recipes);
    // console.log('Populate these Filters:', filters);

    initializeDropdowns(dropdowns, filters);

    console.log("initialized Dropdowns : ", dropdowns);

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
    console.log('--------Setting up blur effect');
    console.log("---dropdown:", dropdown);
    console.log("---searchInput:", searchInput.value);

    searchInput.addEventListener('blur', function() {


        console.log('*****************************');
        console.log('******* Blur event triggered ******');
        console.log("**** dropdown:", dropdown);
        console.log("**** searchInput:", searchInput.value);
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

//             const selectedFiltersDiv = dropdown.querySelector('.filter-selected');
//             const existingItems = new Set(Array.from(selectedFiltersDiv.querySelectorAll('span'))
//                 .map(span => span.textContent));

//             if (!existingItems.has(selectedItem)) {
//                 const newTagWrapper = document.createElement('span');
//                 newTagWrapper.textContent = selectedItem;

//                 selectedFiltersDiv.appendChild(newTagWrapper);
//                 selectedFiltersDiv.style.display = 'flex';
//                 dropdown.querySelector('.dropdown-content').style.display = 'none';
//             } else {
//                 //console.log("Item already selected:", selectedItem);
//             }
//         }
//     });
// }



// function setupDropdownItemSelection(itemsList, dropdown) {
//     let items = Array.from(itemsList.children);
//     itemsList.addEventListener('click', function(e) {
//         if (e.target && e.target.matches('.dropdown-item')) {
//             const selectedItem = e.target.textContent.trim();
//             const selectedIndex = items.indexOf(e.target);

//             const selectedFiltersDiv = dropdown.querySelector('.filter-selected');
//             const existingItems = new Set(Array.from(selectedFiltersDiv.querySelectorAll('.tag-content'))
//                 .map(span => span.textContent.trim()));

//             if (!existingItems.has(selectedItem)) {
//                 const newTagWrapper = createTag(selectedItem, selectedIndex, itemsList, dropdown);

//                 selectedFiltersDiv.appendChild(newTagWrapper);
//                 selectedFiltersDiv.style.display = 'flex';
//                 dropdown.querySelector('.dropdown-content').style.display = 'none';
//             } else {
//                 console.log("Item already selected:", selectedItem);
//             }
//         }
//     });
// }




// function createTag(item, index, dropdown) {

//     console.log("createTag : ", item, index);

//     const newTagWrapper = document.createElement('div');
//     newTagWrapper.classList.add('tag-wrapper');
//     const newTagContent = document.createElement('span');
//     newTagContent.textContent = item;
//     newTagContent.classList.add('tag-content');

//     const closeButton = document.createElement('span');
//     closeButton.textContent = '✕';
//     closeButton.classList.add('remove-tag');
//     closeButton.addEventListener('click', function() {
//         // Remove the tag wrapper from the selectedFiltersDiv
//         newTagWrapper.remove();

//         console.log("dropdown :", dropdown);
//         console.log("dropdown.children :", dropdown.children);
//         console.log("itemsList :", itemsList);
//         console.log("itemsList.children :", itemsList.children);
//         console.log("index :", index);
//         const itemToRemove = itemsList.querySelector(`.dropdown-item:nth-child(${index + 1})`);

//         console.log("itemToRemove :", itemToRemove);

//         if (itemToRemove) {
//             itemsList.removeChild(itemToRemove);
//         }
//     });

//     newTagWrapper.appendChild(newTagContent);
//     newTagWrapper.appendChild(closeButton);

//     return newTagWrapper;
// }


function setupDropdownItemSelection(itemsList, dropdown) {
    // const items = Array.from(itemsList.children)
    // .map(item => item.textContent.trim());
    ;

    itemsList.addEventListener('click', (e) => {
        if (e.target && e.target.matches('.dropdown-item')) {
            handleItemClick(e.target, itemsList, dropdown);
        }
    });

}

function handleItemClick(target, itemsList, dropdown) {

    console.log("handleItemClick TARGET : ", target)
    //console.log("handleItemClick ITEMS : ", items)
    console.log("handleItemClick itemsList : ", itemsList)
    console.log("handleItemClick dropdown : ", dropdown)



    const selectedItem = target.textContent.trim();
    //const selectedIndex = items.indexOf(target);
    const selectedFiltersDiv = dropdown.querySelector('.filter-selected');
    const existingTags = new Set(Array.from(selectedFiltersDiv.querySelectorAll('.tag-content'))
                                .map(span => span.textContent.trim()));


        console.log("handleItemClick ------------")
        console.log("selectedItem :", selectedItem)
        //console.log("selectedIndex :", selectedIndex)
        console.log("selectedFiltersDiv :", selectedFiltersDiv)
        console.log("existingTags :", existingTags)


    if (!existingTags.has(selectedItem)) {


        console.log("ITEM NOT EXISTING => CREATE TAG ------------")
        console.log("selectedItem :", selectedItem)
        //console.log("selectedIndex :", selectedIndex)
        console.log("selectedFiltersDiv :", selectedFiltersDiv)
        console.log("existingTags :", existingTags)


        const newTagWrapper = createTag(selectedItem, itemsList);

        selectedFiltersDiv.appendChild(newTagWrapper);
        selectedFiltersDiv.style.display = 'flex';
        dropdown.querySelector('.dropdown-content').style.display = 'none';
    } else {
        console.log("Item already selected:", selectedItem);
    }
}

function createTag(item, itemsList) {
    const newTagWrapper = document.createElement('div');
    newTagWrapper.classList.add('tag-wrapper');

    const newTagContent = document.createElement('span');
    newTagContent.textContent = item;
    newTagContent.classList.add('tag-content');

    const closeButton = createCloseButton(newTagWrapper, itemsList);

    newTagWrapper.appendChild(newTagContent);
    newTagWrapper.appendChild(closeButton);
    removeItemFromList(item, itemsList)

    return newTagWrapper;
}

function createCloseButton(tagWrapper, itemsList) {
    const closeButton = document.createElement('span');
    closeButton.textContent = '✕';
    closeButton.classList.add('remove-tag');

    closeButton.addEventListener('click', () => {
        console.log("----- closeButton ---- ");
        console.log("tagWrapper:", tagWrapper);
        console.log("itemsList:", itemsList);

        const itemToAdd = tagWrapper.querySelector('.tag-content').textContent.trim();

        console.log("itemToAdd:", itemToAdd);
        
        // Remove the tagWrapper element from the DOM
        tagWrapper.remove();

        // Remove the corresponding item from the list
        addItemToList(itemToAdd, itemsList);
    });

    return closeButton;
}

function removeItemFromList(itemToRemove, itemsList) {
    const listItem = Array.from(itemsList.children).find(child => 
        child.textContent.trim() === itemToRemove
    );

    console.log("itemsList:", itemsList);
    console.log("itemsList.children:", itemsList.children);
    console.log("itemToRemove:", itemToRemove);
    console.log("listItem:", listItem);

    if (listItem) {
        itemsList.removeChild(listItem);
    }
}



function addItemToList(itemToAdd, itemsList) {
    const li = document.createElement('li');
    li.classList.add('dropdown-item');
    li.textContent = itemToAdd;
    itemsList.appendChild(li);
}









// function createTag(item) {
//     const newTagWrapper = document.createElement('div');
//     newTagWrapper.classList.add('tag-wrapper');
//     const newTagContent = document.createElement('span');
//     newTagContent.textContent = item;
//     newTagContent.classList.add('tag-content');

//     const closeButton = document.createElement('span');
//     closeButton.textContent = '✕';
//     closeButton.classList.add('remove-tag');
//     closeButton.addEventListener('click', function() {
//         newTagWrapper.remove();
//     });

//     newTagWrapper.appendChild(newTagContent);
//     newTagWrapper.appendChild(closeButton);

//     return newTagWrapper;
// }