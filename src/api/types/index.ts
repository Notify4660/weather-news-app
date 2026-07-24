// Weather types
export interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;  
    temp_max: number;
    humidity: number;
    pressure: number;
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

export interface ForecastData {
  list: Array<{
    dt: number,
    main:{ temp: number };
  }>;
  city: {
    name: string
    timezone: number
  };
}

// News types
export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

export interface NewsResponse {
  articles: NewsArticle[];
  totalResults: number;
}