/**
 * Formats temperature as a whole number
 * @param {number} temp - Temperature in Celsius
 * @returns {number} Rounded temperature as string
 */
export const formatTemperature = (temp: number): number => {
    return Math.round(temp);
};

/**
 * Formats wind speed in km/h
 * @param {number} ms - Wind speed in m/s
 * @returns {string} Formatted speed with km/h unit
 */
export const formatWindSpeed = (ms: number): string => {
    return `${Math.round(ms * 3.6)} km/h`;
};