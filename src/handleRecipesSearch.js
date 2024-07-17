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

        console.log("=========================================");
        console.log("recipes[i].name : ", recipes[i].name);

        for (let key in tags) {

            // console.log("key : ", key);
            // console.log("tags[key] : ", tags[key]);
            // console.log("recipes[i].key : ", recipes[i][key]);


            console.log("-- key : ", key);

            if (!match) break; // Exit early if no longer matching
            switch (key) {
                case 'ingredients':

                    for (let j = 0; j < tags[key].length; j++) {

                        console.log("-- -- tags[key][j] : ", tags[key][j]);

                        let found = false;
                        for (let k = 0; k < recipes[i].ingredients.length && !found; k++) {

                            console.log("-- -- -- recipes[i][key][k].ingredient : ", recipes[i][key][k].ingredient);

                            if (tags[key][j].toLowerCase() === recipes[i][key][k].ingredient.toLowerCase()) {
                                found = true;

                                console.log("-- -- -- " + tags[key][j], " FOUND in ", recipes[i].name, " ! ");

                                break;
                            }
                        }
                        if (!found) {
                            match = false;
                            break;
                        }

                        console.log("-- -- match : ", match);
                    }
                    break;
                case 'ustensils':
                    for (let j = 0; j < tags[key].length; j++) {

                        console.log("-- -- -- tags[key][j] : ", tags[key][j]);

                        let found = false;
                        for (let k = 0; k < recipes[i].ustensils.length && !found; k++) {

                            console.log("-- -- -- recipes[i].[key].[k] : ", recipes[i][key][k] );

                            if (tags[key][j].toLowerCase() === recipes[i][key][k].toLowerCase()) {
                                found = true;

                                console.log("-- -- -- " + tags[key][j] + " FOUND in ", recipes[i].name, " ! ");

                                break;
                            }
                        }
                        if (!found) {
                            match = false;
                            break;
                        }

                        console.log("-- -- match : ", match);
                    }
                    break;

                case 'appliance':

                    let found = false;

                    //console.log("-- -- -- tags[key] : ", tags[key]);
                    console.log("-- -- -- tags[key][0] : ", tags[key][0]);                    

                    console.log("-- -- -- recipes[i].[key] : ", recipes[i][key]);
                    //console.log("-- -- -- recipes[i].[key][0] : ", recipes[i][key][0]);
                        
                    if (recipes[i][key] === tags[key][0]) {
                        found = true;

                        console.log("-- -- -- " + tags[key][0] + " FOUND in ", recipes[i].name, " ! ");
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


// export function filterRecipesByTags(recipes, tags) {
//     let filteredRecipes = [];

//     console.log("tags : ", tags);

//     for (let key in tags) {
//         console.log("-- key : ", key); // Handle unexpected categories

//         for (let i=0; i<tags[key].length; i++) {
//             console.log("-- -- -- tags[key][i] : ", tags[key][i]);

//             for (let j=0; j<recipes.length; j++) {

//                 console.log("-- -- -- -- recipes[j].name : ", recipes[j].name);

//                 switch (key) {
//                     case 'ingredients':
//                         console.log("-- -- -- -- -- recipes[j].ingredients : ", recipes[j].ingredients);

//                         for (let k=0; k<recipes[j][key].length; k++) {
//                             console.log("-- -- -- -- -- recipes[j][key][k] : ", recipes[j][key][k].ingredient);
//                             if (tags[key][i] === recipes[j][key][k].ingredient) {
        
//                                 filteredRecipes.push(recipes[j]);
        
//                                 console.log("-- -- -- -- PUSH : ", recipes[j].name);
        
//                                 break;
//                             }
//                         }

//                         break;

//                     case 'appliance':
//                         console.log("-- -- -- -- -- recipes[j].appliance : ", recipes[j].appliance);
                        
//                         console.log("-- -- -- -- -- recipes[j][key][k] : ", recipes[j][key]);
//                         if (tags[key][i] === recipes[j][key]) {
    
//                             filteredRecipes.push(recipes[j]);
    
//                             console.log("-- -- -- -- PUSH : ", recipes[j].name);
    
//                         }
//                         break;


//                     case 'ustensils':
//                         console.log("-- -- -- -- -- recipes[j].ustensils : ", recipes[j].ustensils);

//                         for (let k=0; k<recipes[j][key].length; k++) {
//                             console.log("-- -- -- -- -- recipes[j][key][k] : ", recipes[j][key][k]);
//                             if (tags[key][i] === recipes[j][key][k]) {
        
//                                 filteredRecipes.push(recipes[j]);
        
//                                 console.log("-- -- -- -- PUSH : ", recipes[j].name);
        
//                                 break;
//                             }
//                         }

//                         break;

//                     default:
//                         console.error("Invalid tag category:", key); // Handle unexpected categories
//                 }

//             }
//         }

//     }
   


//     return filteredRecipes;
// }