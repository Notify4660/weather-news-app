
/**
 * Saves city to localStorage
 * @param {string} city - City name to save
 */
export const saveCity = (city: string): void => {
    localStorage.setItem('lastCity', city);
}

/**
 * Loads city from localStorage
 * @return {string|null} Last saved city or null if not found
 */
export const loadCity = (): string | null => {
    return localStorage.getItem('lastCity');
}