import axios from 'axios';

/**
 * Sport News Service
 * Handles fetching sports news from NewsAPI
 * API Documentation: https://newsapi.org/docs
 */

const API_BASE_URL = 'https://newsapi.org/v2';
const API_KEY = process.env.NEWS_API_KEY || '6f7c85381a5c44deb7e024cd02c60e31';

// Cache configuration
const CACHE_KEY = 'sportNewsCache';
const CACHE_EXPIRY_KEY = 'sportNewsCacheExpiry';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Get cached data if available and not expired
 */
const getCachedData = () => {
  try {
    const cachedData = localStorage.getItem(CACHE_KEY);
    const cacheExpiry = localStorage.getItem(CACHE_EXPIRY_KEY);
    
    if (cachedData && cacheExpiry) {
      const now = new Date().getTime();
      if (now < parseInt(cacheExpiry)) {
        return JSON.parse(cachedData);
      }
    }
  } catch (error) {
    console.error('Error reading cache:', error);
  }
  return null;
};

/**
 * Cache data with expiry timestamp
 */
const setCachedData = (data) => {
  try {
    const expiry = new Date().getTime() + CACHE_DURATION;
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(CACHE_EXPIRY_KEY, expiry.toString());
  } catch (error) {
    console.error('Error setting cache:', error);
  }
};

/**
 * Clear cached data
 */
export const clearCache = () => {
  try {
    localStorage.removeItem(CACHE_KEY);
    localStorage.removeItem(CACHE_EXPIRY_KEY);
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};

/**
 * Transform API response to internal data structure
 */
const transformArticle = (article, index) => {
  return {
    id: index,
    title: article.title || 'No Title',
    author: article.author || 'Unknown Author',
    description: article.description || article.content || 'No description available',
    url: article.url || '#',
    urlToImage: article.urlToImage || 'https://via.placeholder.com/400x200?text=Sports+News',
    publishedAt: article.publishedAt || new Date().toISOString(),
    source: article.source?.name || 'Unknown Source',
    category: 'Sports'
  };
};

/**
 * Fetch sports news from NewsAPI
 * @param {Object} options - Query options
 * @param {string} options.category - Sport category filter
 * @param {number} options.pageSize - Number of articles per page
 * @param {number} options.page - Page number
 * @param {string} options.searchQuery - Search query
 * @returns {Promise<Object>} Response with articles and metadata
 */
export const fetchSportNews = async (options = {}) => {
  const {
    category = 'all',
    pageSize = 20,
    page = 1,
    searchQuery = ''
  } = options;

  // Check cache first (only for first page without search)
  if (page === 1 && !searchQuery && category === 'all') {
    const cachedData = getCachedData();
    if (cachedData) {
      console.log('Returning cached sport news data');
      return cachedData;
    }
  }

  try {
    // Build query parameters
    const params = {
      apiKey: API_KEY,
      pageSize: pageSize,
      page: page,
      language: 'en'
    };

    let endpoint = `${API_BASE_URL}/top-headlines`;
    
    // If search query is provided, use everything endpoint
    if (searchQuery) {
      endpoint = `${API_BASE_URL}/everything`;
      params.q = `${searchQuery} sports`;
      params.sortBy = 'publishedAt';
    } else {
      // Use top-headlines with sports category
      params.category = 'sports';
      params.country = 'us';
    }

    console.log('Fetching sport news from API:', endpoint, params);

    const response = await axios.get(endpoint, { params });

    if (response.data.status === 'ok') {
      const transformedArticles = response.data.articles.map(transformArticle);
      
      const result = {
        articles: transformedArticles,
        totalResults: response.data.totalResults || transformedArticles.length,
        page: page,
        pageSize: pageSize
      };

      // Cache the result (only for first page without search)
      if (page === 1 && !searchQuery && category === 'all') {
        setCachedData(result);
      }

      return result;
    } else {
      throw new Error(response.data.message || 'Failed to fetch sports news');
    }
  } catch (error) {
    console.error('Error fetching sport news:', error);
    
    // Return fallback mocked data in case of error
    return getFallbackData();
  }
};

/**
 * Fallback mocked data (used when API fails)
 */
const getFallbackData = () => {
  const mockedArticles = [
    {
      id: 1,
      title: "Champions League Final: Manchester City Triumphs Over Inter Milan",
      author: "John Smith",
      description: "Manchester City secured their first Champions League title with a 1-0 victory over Inter Milan in a thrilling final at Istanbul's Atatürk Olympic Stadium.",
      url: "https://example.com/champions-league-final",
      urlToImage: "https://via.placeholder.com/400x200?text=Champions+League",
      publishedAt: new Date().toISOString(),
      source: "Sports Daily",
      category: "Football"
    },
    {
      id: 2,
      title: "NBA Finals: Denver Nuggets Win First Championship",
      author: "Sarah Johnson",
      description: "The Denver Nuggets claimed their first NBA championship in franchise history, defeating the Miami Heat in Game 5 of the Finals with a dominant performance.",
      url: "https://example.com/nba-finals",
      urlToImage: "https://via.placeholder.com/400x200?text=NBA+Finals",
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      source: "Basketball Weekly",
      category: "Basketball"
    },
    {
      id: 3,
      title: "Wimbledon: Alcaraz Defeats Djokovic in Epic Five-Set Final",
      author: "Michael Brown",
      description: "Carlos Alcaraz ended Novak Djokovic's reign at Wimbledon with a stunning five-set victory in what many are calling one of the greatest finals in tennis history.",
      url: "https://example.com/wimbledon-final",
      urlToImage: "https://via.placeholder.com/400x200?text=Wimbledon",
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      source: "Tennis Today",
      category: "Tennis"
    },
    {
      id: 4,
      title: "Formula 1: Verstappen Extends Championship Lead with Monaco Victory",
      author: "Emma Wilson",
      description: "Red Bull's Max Verstappen dominated the Monaco Grand Prix, extending his lead in the Formula 1 World Championship with his seventh win of the season.",
      url: "https://example.com/monaco-gp",
      urlToImage: "https://via.placeholder.com/400x200?text=Formula+1",
      publishedAt: new Date(Date.now() - 10800000).toISOString(),
      source: "F1 Racing",
      category: "Formula 1"
    },
    {
      id: 5,
      title: "Rugby World Cup: New Zealand Defeats South Africa in Thriller",
      author: "David Taylor",
      description: "The All Blacks secured a dramatic victory over the Springboks in a Rugby World Cup classic, winning 29-28 with a last-minute penalty kick.",
      url: "https://example.com/rugby-world-cup",
      urlToImage: "https://via.placeholder.com/400x200?text=Rugby",
      publishedAt: new Date(Date.now() - 14400000).toISOString(),
      source: "Rugby News",
      category: "Rugby"
    },
    {
      id: 6,
      title: "Olympics 2024: USA Leads Medal Count After Week One",
      author: "Lisa Anderson",
      description: "Team USA is leading the medal count at the Paris 2024 Olympics after the first week of competition, with impressive performances across multiple sports.",
      url: "https://example.com/olympics-2024",
      urlToImage: "https://via.placeholder.com/400x200?text=Olympics",
      publishedAt: new Date(Date.now() - 18000000).toISOString(),
      source: "Olympic Channel",
      category: "Olympics"
    },
    {
      id: 7,
      title: "Cricket: India Clinches Series Win Against Australia",
      author: "Raj Patel",
      description: "India secured a comprehensive series victory over Australia with a commanding performance in the fourth Test at Ahmedabad's Narendra Modi Stadium.",
      url: "https://example.com/cricket-series",
      urlToImage: "https://via.placeholder.com/400x200?text=Cricket",
      publishedAt: new Date(Date.now() - 21600000).toISOString(),
      source: "Cricket World",
      category: "Cricket"
    },
    {
      id: 8,
      title: "NFL: Super Bowl LVIII Preview - Chiefs vs 49ers",
      author: "Tom Harris",
      description: "The Kansas City Chiefs and San Francisco 49ers are set to face off in Super Bowl LVIII in what promises to be an epic showdown between two powerhouse teams.",
      url: "https://example.com/super-bowl",
      urlToImage: "https://via.placeholder.com/400x200?text=NFL",
      publishedAt: new Date(Date.now() - 25200000).toISOString(),
      source: "NFL Network",
      category: "American Football"
    },
    {
      id: 9,
      title: "The Masters: Scheffler Claims Green Jacket with Record Score",
      author: "James Martin",
      description: "Scottie Scheffler dominated the Masters Tournament at Augusta National, winning his second Green Jacket with a record-breaking final round performance.",
      url: "https://example.com/masters-golf",
      urlToImage: "https://via.placeholder.com/400x200?text=Golf",
      publishedAt: new Date(Date.now() - 28800000).toISOString(),
      source: "Golf Digest",
      category: "Golf"
    },
    {
      id: 10,
      title: "Boxing: Fury vs Usyk Heavyweight Unification Bout Announced",
      author: "Chris Roberts",
      description: "The long-awaited heavyweight unification bout between Tyson Fury and Oleksandr Usyk has been officially confirmed for December in Saudi Arabia.",
      url: "https://example.com/fury-usyk",
      urlToImage: "https://via.placeholder.com/400x200?text=Boxing",
      publishedAt: new Date(Date.now() - 32400000).toISOString(),
      source: "Boxing News",
      category: "Boxing"
    }
  ];

  console.log('Using fallback mocked data');
  return {
    articles: mockedArticles,
    totalResults: mockedArticles.length,
    page: 1,
    pageSize: mockedArticles.length
  };
};

export default {
  fetchSportNews,
  clearCache
};