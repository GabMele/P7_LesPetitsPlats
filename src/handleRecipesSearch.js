// export default function filterRecipesByName(recipes, inputText) {
//     const normalizedText = inputText.trim().toLowerCase();
//     return recipes.filter(recipe => recipe.name.toLowerCase().includes(normalizedText));
// }


// export default function filterRecipesByName(recipes, inputText) {
//     const normalizedText = inputText.trim().toLowerCase();
    
//     return recipes.filter(({ name }) => 
//         name.toLowerCase().includes(normalizedText)
//     );
// }



// NOT GOOD 
// SEARCH FOR SUBSTRING IN ALL RECIPE NAME 
// I NEED ONLY FROM STARTING

// export default function filterRecipesByName(recipes, inputText) {
//     const normalizedText = inputText.trim().toLowerCase();
//     const filteredRecipes = [];

//     for (let i = 0; i < recipes.length; i++) {
//         const recipeName = recipes[i].name.toLowerCase();

//         console.log("recipeName : ", recipeName);

//         let matchFound = false;
//         for (let j = 0; j <= recipeName.length - normalizedText.length; j++) {
//             const substring = recipeName.substring(j, j + normalizedText.length);

//             console.log("substring : ", substring);

//             if (substring === normalizedText) {

//                 console.log("matchFound : ", matchFound);

//                 matchFound = true;
//                 break;
//             }
//         }
//         if (matchFound) {
//             filteredRecipes.push(recipes[i]);
//         }
//     }

//     return filteredRecipes;
// }





export default function filterRecipesByName(recipes, inputText) {
    const normalizedText = inputText.replace(/^\s+/, '').toLowerCase();
    const filteredRecipes = [];

    for (let i = 0; i < recipes.length; i++) {
        const recipeName = recipes[i].name.toLowerCase();
        // console.log("recipeName : ", recipeName);
        let matchFound = true;
        for (let j = 0; j < normalizedText.length; j++) {
            // console.log("j : ", j);
            // console.log("recipeName[j] : ", recipeName[j]);
            // console.log("normalizedText[j] : ", normalizedText[j]);

            if (recipeName[j] !== normalizedText[j]) {
                matchFound = false;
                break;
            }
        }
        if (matchFound) {
            filteredRecipes.push(recipes[i]);
        }
    }

    return filteredRecipes;
}
