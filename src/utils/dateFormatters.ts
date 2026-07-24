/**
 * Formats current date with weekday, month, day, and 24-hour time
 * @param {Date} date - Date object to format
 * @returns {string} Formatted date string (e.g. "Tue, Jul 7, 14:23")
 */
export const formatCurrentDate = (date: Date) => {
    return date.toLocaleString('en-US', { 
        weekday: 'short',
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
};

/**
 * Formats Unix timestamp to 12-hour time string with AM/PM
 * @param {number} timestamp - Unix timestamp in seconds
 * @returns {string} Formatted time in HH:MM format (e.g. "03:45 PM")
 */
export const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    })
}

/**
 * Converts ISO date string to 24-hour time format
 * @param {string} date - ISO date string from API
 * @returns {string} Formatted time in HH:MM format (e.g. "14:21")
 */
export const convertStringInDateForNews = (date: string) => {
    return new Date(date).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    })
}

/**
 * Formats the date based on the requested city's time zone for time display
 * @param {number} date - Date from API data (UTC)
 * @param {number} timezone - Time zone in seconds
 * @returns {string} Formatted time with timezone (e.g. "Jul 12, 03:00")
 */
export const formatDateForGraphics = (date: number, timezone: number = 0) => {
    return new Date((date + timezone) * 1000).toLocaleString('en-US', { 
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'UTC'
    });
};

/**
 * Takes the publication date and subtracts the current time to determine the post's posting time in string format
 * @param {string | number} date - Publication date (Date string or timestamp)
 * @returns {string} Formats the publication time into a string (e.g. "5 min ago", "2 days ago")
 */
export const timeAgo = (date: string | number): string => {
    const now = new Date();
    const published = new Date(date);
    const diffMs = now.getTime() - published.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if(diffMins < 1) return 'Just now';
    if(diffMins < 60) return `${diffMins} min ago`;
    if(diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`
}