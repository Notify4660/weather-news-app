import axios from 'axios';
import type { WeatherData, ForecastData } from './types';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_WEATHER_API_URL;

//Create an axios instance with settings
const weatherClient = axios.create({
    baseURL: BASE_URL,
    timeout: 10000, // 10 seconds
    headers: {
        'Accept': 'application/json'
    },
});

//Adding an interceptor for logging
weatherClient.interceptors.request.use(
    (config) => {
        console.log('Request:', config.url, config.params);
        return config;
    },
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

weatherClient.interceptors.response.use(
    (response) => {
        console.log('Response:', response.status);
        return response;
    },
    (error) => {
        console.log('Response Error:', error.message);
        return Promise.reject(error)
    }
)

//Weather API service
export const weatherApi = {
    //Get current weather by city name
    getCurrentWeather: async (city: string): Promise<WeatherData> => {
        const response = await weatherClient.get(`${BASE_URL}/weather`, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric',
            },
        });
        // const dataWeather = 
        return response.data
    },

    //Get 5-day forecast
    getForecast: async (city: string): Promise<ForecastData> => {
        const response = await weatherClient.get(`${BASE_URL}/forecast`, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric'
            },
        });
        return response.data
    },
};