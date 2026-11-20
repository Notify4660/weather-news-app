export default async function handler(request: Request) {
    // Get parametrs from URL (ex. ?q=Moscow)
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') || 'Moscow';

    const apiKey = process.env.NEWS_API_KEY;

    const response = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&apiKey=${apiKey}&pageSize=10&language=en&sortBy=publishedAt`
    );

    const data = await response.json();

    return new Response(JSON.stringify(data), {
        status: response.status,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*', 
        },
    });
}