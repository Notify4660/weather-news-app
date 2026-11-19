import React,{useState, useEffect, useRef} from "react";
import {convertStringInDateForNews, timeAgo} from '../../utils/dateFormatters'

interface NewsListProps {
    newsData?: {
        articles: Array<{ // Array of news data
        title: string; // News Titile
        url: string; // Link to news source
        urlToImage: string; // Link to news image
        publishedAt: string; // Publiscation date
        }>
    }
};
/**
 * News feed component with pagination
 * 
 * Fetches news articles from the API on mount and displays them as a list.
 * Features a "Show more" button with smooth CSS animation for pagination.
 * 
 * @component
 */
const NewsList: React.FC<NewsListProps> = ({newsData}) =>{
    if(!newsData) return null;
    const [visibleCount, setVisibleCount] = useState(3);
    const isAllLoaded = visibleCount >= newsData.articles.length;
    const lastNewsRef = useRef<HTMLAnchorElement>(null);

    // Reset the counter when news changes
    useEffect(() => {
        setVisibleCount(5);
    }, [newsData]);

    //Smooth scrolling to new news
    useEffect(() => {
        if(lastNewsRef.current) {
            lastNewsRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    },[visibleCount])

    /**
     * Returns a proxied image URL
     * images.weserv.nl proxies external images and sets CORS headers
     * so the browser allows them to load
     * Also resizes to 400x250 to avoid layout shifts
     */
    const getImageUrl = (url: string) => {
        if (!url) return null;
        return `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=400&h=250&fit=cover`;
    };

    return (
        <div>
            {/* Section heading */}
            <h2 className="text-lg font-semibold text-slate-800 uppercase tracking-wider mb-4 px-1 dark:text-gray-50">
                📰 Latest News
            </h2>

            {/* Grid 5 column */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {newsData.articles.slice(0, visibleCount).map((item, index) => {
                    const imageUrl = getImageUrl(item.urlToImage);

                    return(
                        <div 
                        key={index} 
                        className="group bg-white/90 backdrop-blur-sm rounded-t-2xl rounded-b-none overflow-hidden shadow-sm border border-white/50 
                        hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full
                        dark:bg-gray-800 dark:border-gray-800 dark:shadow-white-sm dark:hover:shadow-white-md"
                        >
                            {/* Image */}
                            <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-gray-800">
                                {imageUrl ? 
                                <img 
                                src={imageUrl} 
                                alt={item.title || 'News image'} 
                                loading="lazy"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                            (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                                }}
                                /> : null }
                                {/* Image placeholder, if there is no image */}
                                <div className={`absolute inset-0 flex items-center justify-center text-slate-300 text-4xl dark:text-gray-300 ${imageUrl ? 'hidden' : ''}`}>
                                    📰
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 flex flex-col text-xs lg:text-sm font-medium text-slate-800 line-clamp-3 hover:text-sky-600 transition-colors
                                dark:text-gray-300 dark:hover:text-gray-100 m-2">

                                {/* Title */}
                                <a  
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 font-medium text-slate-800 line-clamp-3 hover:text-sky-600 transition-colors pr-2 pl-2
                                    dark:text-gray-100 dark:hover:text-gray-50"
                                >
                                    {item.title}
                                </a>

                                {/* Dates */}
                                <div className="mt-auto mt-3 pt-2 border-t border-slate-200 text-xs dark:border-gray-700 mt-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-400 pl-2 dark:text-gray-300">
                                            {convertStringInDateForNews(item.publishedAt)}
                                        </span>
                                        <span className="font-medium text-slate-500 pr-2 dark:text-gray-200">
                                            {timeAgo(item.publishedAt)}
                                        </span>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    );
                })}
            </div>

            {/* Button Show more */}
            {!isAllLoaded && 
                <button className="mt-6 w-full py-3 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm 
                text-sm font-medium text-slate-600 hover:bg-white/90 hover:shadow-md transition-all duration-200
                dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300  dark:shadow-white-sm dark:hover:shadow-white-md"
                    onClick={() => setVisibleCount(prev => Math.min(prev + 5, newsData.articles.length))}
                >
                    Show more
                </button>
            }
        </div>
    );
};

export default NewsList;