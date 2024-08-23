/**
 * Checks if the current environment is local (i.e., the hostname is 'localhost' or '127.0.0.1').
 * @constant {boolean}
 */
const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

/**
 * Base URL path for the application. The path changes based on whether the environment is local or production.
 * For local environments, it is set to '/'. For production environments (e.g., GitHub Pages), 
 * it uses a specific subdirectory.
 * @constant {string}
 */
const BASE_URL = isLocal ? '/' : '/P7_LesPetitsPlats/';

/**
 * Path to the JSON data file containing recipe information. The path is constructed based on the environment.
 * @constant {string}
 */
export const DATA_JSON_PATH = `${BASE_URL}data/recipes.json`;

/**
 * Path to the folder containing recipe images. The path is relative to the environment (local or production).
 * @constant {string}
 */
export const RECIPES_IMAGES_PATH = `${BASE_URL}assets/images/`;

/**
 * Logs the version information of the 'P7 Les Petits Plats' application to the console.
 * @function
 * @example
 */
console.log(`P7 Les Petits Plats - by Gabriele Melendugno`);
console.log("-------------------");
