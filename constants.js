/**
 * Determines if the current environment is local (localhost or 127.0.0.1).
 */
const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

/**
 * Base URL path for the application. Uses a different path based on whether 
 * the environment is local or production (GitHub Pages).
 */
const BASE_URL = isLocal? '/' : '/P7_LesPetitsPlats/';


/**
 * Path to the JSON data file containing photographer information.
 * @type {string}
 */
export const DATA_JSON_PATH = `${BASE_URL}data/recipes.json`;


export const RECIPES_IMAGES_PATH = `${BASE_URL}assets/images/`;


/**
 * Logs the version of FishEye to the console.
 */
console.log(`P7 Les Petits Plats - v1.0 :`);
console.log("----------------");
