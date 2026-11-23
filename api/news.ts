import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const q = (req.query.q as string) || 'Moscow';
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ message: 'NEWS_API_KEY is not configured' });
  }

  try {
    const response = await fetch(
      `https://newsapi.org{encodeURIComponent(q)}&apiKey=${apiKey}&pageSize=10&language=en&sortBy=publishedAt`
    );
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch news' });
  }
}