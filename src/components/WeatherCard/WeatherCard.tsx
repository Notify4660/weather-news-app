import React, {useState, useEffect} from "react";
import {formatTemperature, formatWindSpeed} from "../../utils/weatherHelpers";
import {formatCurrentDate, formatTime} from '../../utils/dateFormatters';

interface weatherDataProps {
    /** Weather data object from API */
    weatherData?: {   
        name: string;
        main: {
            temp: number;
            feels_like: number;
            temp_min: number;
            temp_max: number;
            pressure: number;
            humidity: number;
        };
        weather: Array<{
            main: string;
            description: string;
            icon: string;
        }>;
        wind: {
            speed: number;
            deg: number;
        };
        sys: {
            country: string;
            sunrise: number;
            sunset: number;
        };
        dt: number;
    }
}

/**
 * Weather information card
 * 
 * Displays current weather data including temperature, wind speed,
 * humidity, pressure, and sunrise/sunset times.
 * Features a live-updating clock showing current local time.
 * 
 * @component
 */
const WeatherCard: React.FC<weatherDataProps> = ({weatherData}) => {
    if(!weatherData) return null;
    const [currentTime, setCurrentTime] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval)
    }, []);

    
    const getWeatherIcon = (condition: string) => {
        const cond = condition.toLowerCase();
        if (cond.includes('clear') || cond.includes('sun')) return '☀️';
        if (cond.includes('cloud')) return '☁️';
        if (cond.includes('rain') || cond.includes('drizzle')) return '🌧️';
        if (cond.includes('thunder') || cond.includes('storm')) return '⛈️';
        if (cond.includes('snow')) return '❄️';
        if (cond.includes('mist') || cond.includes('fog')) return '🌫️';
        return '🌤️';
    };

    return (
        <div className='w-full h-full backdrop-blur-sm rounded-2xl p-6 shadow-lg  flex flex-col border border-white/50 bg-white/90
            dark:border-gray-700  dark:bg-gray-800 dark:shadow-white-md'>
            {/* Top row: City + Date */}
            <div className='flex-shrink-0 flex items-center justify-between'>
                <h2 className='text-base text-sm lg:text-lg font-semibold text-slate-800
                    dark:text-gray-50'>
                    {weatherData.name}
                </h2>
                <span className='text-xs lg:text-sm text-slate-400 font-light dark:text-gray-50'>
                    {formatCurrentDate(currentTime)}
                </span>
            </div>
            {/* Main temperature + icon */}
            <div className='flex-1 flex items-center justify-between py-4'>
                <div className='flex items-baseline'>
                    <span className='text-2xl lg:text-7xl lg:font-light text-slate-800 tracking-tight dark:text-gray-50'>
                        Temperature: {formatTemperature(weatherData.main.temp)}
                    </span>
                    <span className='text-1xl lg:text-4xl lg:font-light text-slate-400 ml-1 dark:text-gray-50'>°C</span>
                </div>
                <div className='w-8 h-8 lg:w-20 lg:h-20 rounded-full flex items-center justify-center bg-gradient-to-br from-amber-100 to-amber-200/50 
                    dark:from-gray-700 dark:to-gray-600 shadow-sm dark:shadow-white-sm'>
                    <span className="text-2xl lg:text-5xl leading-none -mt-2">
                        {getWeatherIcon(weatherData.weather[0].main)}
                    </span>
                </div>
            </div>

            {/* RealFeel + weather description */}
            <div className='flex-shrink-0 flex items-center gap-3 text-xs lg:text-base mt-1'>
                <span className='text-slate-700 text-sm lg:text-lg dark:text-gray-300'>
                   RealFeel: <span className='text-xs lg:text-base  font-medium text-slate-700 dark:text-gray-300'>
                        {formatTemperature(weatherData.main.feels_like)} °C
                    </span>
                </span>
                <span className='text-slate-300 dark:text-gray-300'>•</span>
                <span className='text-slate-600 capitalize dark:text-gray-300'>
                    {weatherData.weather[0].description || weatherData.weather[0].main}
                </span>
            </div>

             {/* Details: 4-column grid */}   
            <div className="flex-shrink-0 grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-gray-500">

                {/* Wind */}
                <div className="flex items-center gap-2">
                    <span className="text-slate-400 dark:text-gray-300 text-xs lg:text-sm">💨</span>
                    <div>
                        <p className="text-slate-400 uppercase tracking-wider dark:text-gray-300 text-[8px] lg:text-[10px]">Wind</p>
                        <p className="font-light text-slate-700 dark:text-gray-50 text-[10px] lg:text-sm">
                            {formatWindSpeed(weatherData.wind.speed)}
                        </p>
                    </div>
                </div>
            
                {/* Pressure */}
                <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-xs lg:text-sm">📊</span>
                    <div>
                        <p className="text-slate-400 uppercase tracking-wider dark:text-gray-300 text-[8px] lg:text-[10px]">Pressure</p>
                        <p className="font-light text-slate-700 dark:text-gray-50 text-[10px] lg:text-sm">
                            {weatherData.main.pressure} mb
                        </p>
                    </div>
                </div>

                {/* Humidity */}
                <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-xs lg:text-sm">💧</span>
                    <div>
                        <p className="text-slate-400 uppercase tracking-wider dark:text-gray-300 text-[8px] lg:text-[10px]">Humidity</p>
                        <p className="font-light text-slate-700 dark:text-gray-50 text-[10px] lg:text-sm">
                            {weatherData.main.humidity}%
                        </p>
                    </div>
                </div>
                   
                {/* Восход/Закат */}
                <div className="flex items-center gap-2">
                    <div className="flex flex-col text-xs lg:text-sm">
                        <span className="text-amber-400">🌅</span>
                        <span className="text-orange-400">🌇</span>
                    </div>
                    <div>
                        <p className="text-slate-400 uppercase tracking-wider dark:text-gray-300 text-[8px] lg:text-sm">Sun</p>
                        <p className="font-light text-slate-700 dark:text-gray-50 text-[10px] lg:text-sm">
                            {formatTime(weatherData.sys.sunrise)} / {formatTime(weatherData.sys.sunset)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default WeatherCard;