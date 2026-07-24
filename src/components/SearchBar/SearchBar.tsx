import React, {useEffect} from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { Search } from 'lucide-react';

interface SearchBarProps{
    /** Callback function triggered when city is searched */
    onSearch: (city: string) => void; 
}

/**
 * Search bar component with auto-search
 * 
 * Debounces user input to reduce API calls and triggers search automatically.
 * Also supports manual search via Enter key.
 * 
 * @component
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onSearch - Callback invoked with the city name on search
 */
const SearchBar: React.FC<SearchBarProps> = ({onSearch}) => {
    //State for storing the entered city
    const [searchCity, setSearchCity] = React.useState('');
    const debouncedCity = useDebounce(searchCity);

    // Auto-search on debouncedCity change
    useEffect(() => {
        if(debouncedCity.trim()){
            onSearch(debouncedCity);
        }
    },[debouncedCity]);

    return(
        <div className="w-full px-[10%] my-2">
            <div className="relative w-full bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm
                dark:bg-gray-800 dark:border-gray-700 dark:shadow-white-sm">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-600 z-10 dark:text-gray-50">
                    <Search className="w-4 h-4"/>
                </div>
                <input 
                    className="w-full bg-transparent rounded-2xl py-3 pl-11 pr-4 
                    text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:outline-none
                    dark:text-gray-50 dark:placeholder:text-blue-400" 
                    type="text"
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    placeholder="Enter the city name"
                    onKeyDown={(e)=>{
                        if(e.key === 'Enter'){
                            onSearch(searchCity);
                        }
                    }}
                />
                {searchCity && (
                    <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors
                        dark:text-gray-50 dark:hover:text-blue-400"
                        onClick={() => setSearchCity('')}
                        aria-label="Clear search"
                    >
                        ✕
                    </button>
                )}
            </div>
        
        </div>
    );
}

export default SearchBar