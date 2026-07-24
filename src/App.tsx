import React, {useEffect} from 'react';
import { weatherApi } from './api/weatherApi';
import { newsApi } from './api/newsApi';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import SearchBar from './components/SearchBar/SearchBar';
import WeatherCard from './components/WeatherCard/WeatherCard'
import NewsList from './components/NewsList/NewsList';
import TemperatureChart from './components/TemperatureChart/TemperatureChart';
import ThemeToggle from './components/ThemeToggle/ThemeToggle'
import {saveCity, loadCity} from './utils/localStorage';
import {ChartNetwork} from 'lucide-react';

interface WeatherData {
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
};

interface NewsData {
  articles: Array<{
  title: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  }>
};

interface ForecastData {
    list: Array<{
        dt: number,
        main:{ temp: number };
    }>;
    city: {
        name: string,
        timezone: number
    };
}

function App() {
  const [weatherData, setWeatherData] = React.useState<WeatherData | null>(null);
  const [weatherForecast, setWeatherForecast] = React.useState<ForecastData | null>(null);
  const [newsData, setNewsData] = React.useState<NewsData | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState({message:'', code:0, details:''});
  
  //Retrieve data from localStorage and perform the load once.
  useEffect(() => {
    const savedCity = loadCity();
    if (savedCity) {
        handleSearch(savedCity);
    }
  }, []);

  const handleSearch = async(city:string) => {
     setLoading(true);
     setError({message:'', code:0, details:''});

    try{
      //Parallel request to both API's
      const [weather, weatherForecast, news] = await Promise.all([
        weatherApi.getCurrentWeather(city),
        weatherApi.getForecast(city),
        newsApi.getNewsByCity(city)
      ]);

      //Saving the retrieved weather and news data
      setWeatherData(weather);
      setWeatherForecast(weatherForecast);
      setNewsData(news); 

      //Saving city to LocalStorage
      saveCity(city);

      console.log('Weather:', weather);
      console.log('WeatherForecast:', weatherForecast);
      console.log('News:', news);

    }catch(error: any){
      setError(error);
      console.error('Error loading data:', error);
    }finally{
      setLoading(false);
    }
  }
  
  return (
    <div className='dark:bg-gray-900 bg-gray-100 min-h-screen p-4'>
      <header className='grid grid-cols-10'>
        <div className='col-span-8 lg:col-span-9'>
          <SearchBar onSearch={handleSearch}/>
        </div>
        <div className='col-span-2 lg:col-span-1 my-2'>
          <ThemeToggle/>
        </div>
      </header>
      {loading && <div>Loading...</div>}
      {error && <ErrorMessage message={error.message} code={error.code} details={error.details} />}
      
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 mt-5">
        {weatherData && (
          <div className="lg:col-span-6">
            <WeatherCard weatherData={weatherData} />
          </div>
        )}
        {weatherForecast && (
          <div className="lg:col-span-4 h-full bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-white/50 
              dark:bg-gray-800 dark:border-gray-700 dark:shadow-white-md">
            <div className="flex items-center gap-2">
              <ChartNetwork className="w-6 h-6 text-orange-300 dark:text-blue-600"/>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-lg font-semibold text-slate-800 dark:text-gray-50">Forecast 5-day</h3>
            </div>
            <div className="w-full h-[180px] sm:h-[200px] lg:h-[250px]">
              <TemperatureChart {...weatherForecast} />
            </div>
          </div>
        )}
      </div>
      {newsData && (
        <div className="mt-4">
          <NewsList newsData={newsData} />
        </div>
      )}
    </div>
  );
};

export default App;