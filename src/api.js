/**
 * Fetches data from a given URL (in this project, "url" is actually a local path) and returns it as JSON.
 *
 * @param {string} url - The local path or URL to fetch data from.
 * @returns {Promise<Object>} A promise that resolves to the fetched data as a JavaScript object.
 * @throws {Error} Will throw an error if the fetch request fails.
 */
export async function fetchData(url) {
    try {
        const response = await fetch(url);
        
        // If the response is not OK (status code is outside 200–299), throw an error
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        
        const data = await response.json();
        return data;
    } catch (err) {
        throw new Error(`Failed to fetch data: ${err.message}`);
    }
}
