// handleFilters.js
function extractUniqueValuesFromRecipes(array) {
    const ingredients = [];
    const appliances = [];
    const utensils = [];
    
    recipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        if (!ingredients.includes(ingredient.ingredient)) {
          ingredients.push(ingredient.ingredient);
        }
      });
    
      if (!appliances.includes(recipe.appliance)) {
        appliances.push(recipe.appliance);
      }
    
      recipe.ustensils.forEach(utensil => {
        if (!utensils.includes(utensil)) {
          utensils.push(utensil);
        }
      });
    });
    
    console.log({ ingredients, appliances, utensils });
}


export function populateDropdowns(recipes) {
    
    extractUniqueValuesFromRecipes(recipes);
    



    const ingredientDropdown = document.getElementById('ingredient-dropdown');
    const applianceDropdown = document.getElementById('appliance-dropdown');
    const utensilDropdown = document.getElementById('utensil-dropdown');
  
    // Populate dropdowns with extracted unique values
    // Assuming ingredients, appliances, and utensils are globally available variables
    // Populate ingredients dropdown
    ingredients.forEach(ingredient => {
      const li = document.createElement('li');
      li.textContent = ingredient;
      li.onclick = () => selectIngredient(ingredient);
      ingredientDropdown.appendChild(li);
    });
  
    // Populate appliances dropdown
    appliances.forEach(appliance => {
      const li = document.createElement('li');
      li.textContent = appliance;
      li.onclick = () => selectAppliance(appliance);
      applianceDropdown.appendChild(li);
    });
  
    // Populate utensils dropdown
    utensils.forEach(utensil => {
      const li = document.createElement('li');
      li.textContent = utensil;
      li.onclick = () => selectUtensil(utensil);
      utensilDropdown.appendChild(li);
    });
  
    // Function to handle selection in dropdowns
    function selectItem(itemName) {
      console.log(`Selected: ${itemName}`);
      // Implement logic to handle the selected item
    }
  
    // Function to handle input change in search fields
    function handleInputChange(event) {
      const searchField = event.target;
      const dropdownContent = searchField.nextElementSibling;
      const searchTerm = searchField.value.toLowerCase();
  
      // Hide all options initially
      dropdownContent.style.display = 'none';
  
      // Filter and show matching options
      const filteredOptions = Array.from(dropdownContent.children).filter(option => option.textContent.toLowerCase().includes(searchTerm));
  
      // Update the dropdown content with filtered options
      dropdownContent.innerHTML = '';
      filteredOptions.forEach(filteredOption => dropdownContent.appendChild(filteredOption));
  
      // Show the dropdown if there are matching options
      if (filteredOptions.length > 0) {
        dropdownContent.style.display = 'block';
      }
    }
  
    // Attach input change event listener to search fields
    document.getElementById('ingredient-search').addEventListener('input', handleInputChange);
    document.getElementById('appliance-search').addEventListener('input', handleInputChange);
    document.getElementById('utensil-search').addEventListener('input', handleInputChange);
  };