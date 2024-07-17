// handleRecipesSearch.js


export function filterRecipesByName(recipes, searchTerm) {
    searchTerm = searchTerm.replace(/^\s+/, '').toLowerCase();

    //console.log("filterRecipesByName searchTerm : ", searchTerm);

    let filteredRecipes = [];
    for (let i = 0; i < recipes.length; i++) {
        //let found = false;
        // console.log('LOOP START ---------------- i : ', i);
        // console.log(recipes[i].name, searchTerm);

        let match = true;
        for (let j = 0; j < searchTerm.length && match; j++) {
            if (recipes[i].name[j].toLowerCase() !== searchTerm[j].toLowerCase()) {
                match = false;
                break;
            }
        }

        if (match) {
            // console.log("found", recipes[i].name,"=",searchTerm);
            filteredRecipes.push(recipes[i]);
        }
    }
    return filteredRecipes;
}
    





// export function filterRecipesByTags(recipes, tags) {
//     let filteredRecipes = [];
//     for (let i = 0; i < recipes.length; i++) {
//         let match = true;
//         for (let key in tags) {
//             if (!match) break; // Exit early if no longer matching
//             switch (key) {
//                 case 'ingredients':
//                 case 'ustensils':
//                     for (let j = 0; j < recipes[i].ingredients.length; j++) {
//                         let found = false;
//                         for (let k = 0; k < tags[key].length &&!found; k++) {
//                             if (recipes[i].ingredients[j].ingredient.toLowerCase() === tags[key][k].toLowerCase()) {
//                                 found = true;
//                                 break;
//                             }
//                         }
//                         if (!found) {
//                             match = false;
//                             break;
//                         }
//                     }
//                     break;
//                 case 'appliance':

//                     let found = false;
//                     for (let j = 0; j < recipes[i][key].length &&!found; j++) {
//                         if (recipes[i][key][j] === tags[key]) {
//                             found = true;
//                             break;
//                         }
//                     }
//                     if (!found) {
//                         match = false;
//                         break;
//                     }
//                     break;
//                 default:
//                     console.error("Invalid tag category:", key); // Handle unexpected categories
//             }
//         }
//         if (match) {
//             filteredRecipes.push(recipes[i]);
//         }
//     }
//     return filteredRecipes;
// }



export function filterRecipesByTags(recipes, tags) {
    let filteredRecipes = [];

    console.log("tags : ", tags);

    for (let i = 0; i < recipes.length; i++) {
        let match = true;

        console.log('LOOP START -------------> i : ', i);
        console.log(recipes[i].name);

        for (let key in tags) {

            // console.log("key : ", key);
            // console.log("tags[key] : ", tags[key]);
            // console.log("recipes[i].key : ", recipes[i][key]);

            console.log("LOOP key ----> ", key);

            if (!match) break; // Exit early if no longer matching
            switch (key) {
                case 'ingredients':

                    for (let j = 0; j < tags[key].length; j++) {

                        // console.log("-- tags[key][j] : ", tags[key][j]);

                        let found = false;
                        for (let k = 0; k < recipes[i].ingredients.length && !found; k++) {

                            // console.log("recipes[i].ingredients[k].ingredient : ", recipes[i].ingredients[k].ingredient);

                            if (tags[key][j].toLowerCase() === recipes[i].ingredients[k].ingredient.toLowerCase()) {
                                found = true;

                                console.log("-- -- Ingredient FOUND ! ", found);

                                break;
                            }
                        }
                        if (!found) {
                            match = false;
                            break;
                        }

                        console.log("-- match : ", match);
                    }
                    break;
                case 'ustensils':
                    for (let j = 0; j < tags[key].length; j++) {

                        console.log("tags[key][j] : ", tags[key][j]);

                        let found = false;
                        for (let k = 0; k < recipes[i].ustensils.length && !found; k++) {

                            console.log("recipes[i].ingredients[k].ingredient : ", recipes[i].ustensils[k]);

                            if (tags[key][j].toLowerCase() === recipes[i].ustensils[k].toLowerCase()) {
                                found = true;

                                console.log("FOUND !!!! ", found);

                                break;
                            }
                        }
                        if (!found) {
                            match = false;
                            break;
                        }

                        console.log("match : ", match);
                    }
                    break;

                case 'appliance':

                    let found = false;
                        
                    if (recipes[i].appliance === tags[key][0]) {
                        found = true;
                        break;
                    }

                    if (!found) {
                        match = false;
                        break;
                    }
                    break;
                default:
                    console.error("Invalid tag category:", key); // Handle unexpected categories
            }
        }
        if (match) {
            filteredRecipes.push(recipes[i]);
            console.log("PUSH ", recipes[i].name);
        }
    }
    return filteredRecipes;
}