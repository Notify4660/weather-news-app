import axios from 'axios';
import type { NewsResponse } from './types';

//News API service
export const newsApi = {
    //Get news by city
    getNewsByCity: async (city: string): Promise<NewsResponse> => {
        const response = await axios.get(`/api/news`, {
            params: { q: city },
        });
        return response.data;
    },
};