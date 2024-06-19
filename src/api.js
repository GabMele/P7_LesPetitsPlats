/**
 * Fetches data from a given URL (in this project, "url" is actually a local path) and returns it as JSON.
 *
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<Object>} A promise that resolves with the fetched data as a JavaScript object.
 * @throws Will throw an error if the fetch request fails.
 */
export async function fetchData(url) {

    console.log(url);
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (err) {
        throw new Error(`Failed to fetch data: ${err.message}`);
    }
}