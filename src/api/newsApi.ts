import axios from 'axios';
import type { NewsResponse } from './types';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = import.meta.env.VITE_NEWS_API_URL;

//News API service

export const newsApi = {
    //Get news by city
    getNewsByCity: async (city: string): Promise<NewsResponse> => {
        const response = await axios.get(`${BASE_URL}/everything`, {
            params: {
                q: city,
                apiKey: API_KEY,
                pageSize: 10,
                language: 'en',
                sortBy: 'publishedAt',
            },
        });
        return response.data;
    },
};