import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

/**
 * ThemeToggle - A button component that switches between light and dark themes
 * 
 * @component
 */
const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <button 
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="h-max lg:w-full flex items-center justify-center lg:justify-between gap-2 
            bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-sm border border-white/50 text-slate-700 text-sm
            dark:bg-gray-800 dark:border-gray-700 dark:text-gray-50 dark:shadow-white-sm"
        >
            <span className='hidden lg:inline'>{isDark ? "Dark Theme" : "Light Theme"}</span>
            {isDark ? <Moon size={18}/> : <Sun size={18}/>}
        </button>
    );
};

export default ThemeToggle;