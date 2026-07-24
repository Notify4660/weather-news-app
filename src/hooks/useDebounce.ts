import {useEffect, useState} from "react"

/**
 * Debounces a value with specified delay
 * 
 * Useful for search inputs, filters, and API calls that shouldn't
 * fire on every keystroke.
 * 
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds (default: 500ms)
 * @returns Debounced value
 */
export const useDebounce = (value: string, delay: number = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    },[value, delay]);

    return debouncedValue;
};