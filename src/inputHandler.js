// inputHandler.js

// Function to toggle the visibility of the clear icon
function toggleClearIcon(inputField, clearIcon) {
    if (inputField.value.trim() !== "") {
        clearIcon.style.display = 'inline';
    } else {
        clearIcon.style.display = 'none';
    }
}

// Function to set up input field and clear icon
function setupClearableInput(inputField, clearIcon) {
    inputField.addEventListener('input', () => toggleClearIcon(inputField, clearIcon));
    clearIcon.addEventListener('click', () => {
        inputField.value = '';
        toggleClearIcon(inputField, clearIcon);
    });

    // Initialize the clear icon visibility on page load
    toggleClearIcon(inputField, clearIcon);
}

// Function to initialize all input fields
export default function initializeClearableInputs() {
    // Select all input fields and their corresponding clear icons
    const inputWrappers = document.querySelectorAll('.input-wrapper');
    inputWrappers.forEach(wrapper => {
        const inputField = wrapper.querySelector('.hero-input');
        const clearIcon = wrapper.querySelector('.clear-icon');
        setupClearableInput(inputField, clearIcon);
    });
}
