import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const q = (req.query.q as string) || 'Moscow';
  const apiKey = process.env.NEWS_API_KEY?.trim();

  if (!apiKey) {
    return res.status(500).json({ message: 'NEWS_API_KEY is not configured' });
  }

  try {
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q,
        pageSize: 10,
        language: 'en',
        sortBy: 'publishedAt',
      },
      headers: {
        'X-Api-Key': apiKey,
        'User-Agent': 'Mozilla/5.0 (compatible; WeatherNewsApp/1.0)',
      },
      timeout: 10000,
    });
    return res.status(200).json(response.data);
   } catch (error: any) {
    return res.status(error.response?.status || 500).json({
      message: 'Failed to fetch news',
      error: error.response?.data || error.message,
      code: error.code,
    });
  }
}