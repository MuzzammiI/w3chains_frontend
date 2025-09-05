const BASE_URL = 'http://localhost:5000/api/news';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour
// import { fetchNews,fetchNewsById,searchNews } from "../../../server/controllers/newsController/newsController";

// Clean up old cache entries
const cleanOldCache = () => {
  const now = new Date().getTime();
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i);
    if (key && key.includes('_timestamp')) {
      const timestamp = parseInt(localStorage.getItem(key) || '0');
      if (now - timestamp > CACHE_DURATION) {
        const baseKey = key.replace('_timestamp', '');
        localStorage.removeItem(baseKey);
        localStorage.removeItem(`${baseKey}_etag`);
        localStorage.removeItem(key);
      }
    }
  }
};

// Generic fetch function for news
export const fetchNews = async (chain, page = 1, limit = 10) => {
  try {
    const CACHE_KEY = `news_${chain}_${page}_${limit}`;
    cleanOldCache();

    const cachedData = localStorage.getItem(CACHE_KEY);
    const cachedEtag = localStorage.getItem(`${CACHE_KEY}_etag`);
    const cacheTimestamp = localStorage.getItem(`${CACHE_KEY}_timestamp`);
    const now = new Date().getTime();

    if (cachedData && cacheTimestamp && now - parseInt(cacheTimestamp) < CACHE_DURATION) {
      try {
        return JSON.parse(cachedData);
      } catch (e) {
        console.warn(`Invalid cached data for ${CACHE_KEY}:`, e);
        localStorage.removeItem(CACHE_KEY);
        localStorage.removeItem(`${CACHE_KEY}_etag`);
        localStorage.removeItem(`${CACHE_KEY}_timestamp`);
      }
    }

    const headers = cachedEtag ? { 'If-None-Match': cachedEtag } : {};
    const response = await fetch(`${BASE_URL}/${chain}?page=${page}&limit=${limit}`, { headers });

    if (response.status === 304) {
      try {
        return JSON.parse(cachedData);
      } catch (e) {
        console.warn(`Invalid cached data for ${CACHE_KEY} on 304 response:`, e);
      }
    }

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.errors?.[0]?.msg || result.error || `Failed to fetch ${chain} news`);
    }

    localStorage.setItem(CACHE_KEY, JSON.stringify(result));
    localStorage.setItem(`${CACHE_KEY}_etag`, response.headers.get('ETag') || '');
    localStorage.setItem(`${CACHE_KEY}_timestamp`, now.toString());

    return result;
  } catch (error) {
    console.error(`Error fetching ${chain} news:`, error);
    return { success: false, data: [], pagination: {}, message: error.message };
  }
};

// Generic fetch by ID
export const fetchNewsById = async (chain, id) => {
  try {
    const CACHE_KEY = `news_${chain}_${id}`;
    cleanOldCache();

    const cachedData = localStorage.getItem(CACHE_KEY);
    const cachedEtag = localStorage.getItem(`${CACHE_KEY}_etag`);
    const cacheTimestamp = localStorage.getItem(`${CACHE_KEY}_timestamp`);
    const now = new Date().getTime();

    if (cachedData && cacheTimestamp && now - parseInt(cacheTimestamp) < CACHE_DURATION) {
      try {
        const data = JSON.parse(cachedData);
        return { success: true, data, pagination: {} };
      } catch (e) {
        console.warn(`Invalid cached data for ${CACHE_KEY}:`, e);
        localStorage.removeItem(CACHE_KEY);
        localStorage.removeItem(`${CACHE_KEY}_etag`);
        localStorage.removeItem(`${CACHE_KEY}_timestamp`);
      }
    }

    const headers = cachedEtag ? { 'If-None-Match': cachedEtag } : {};
    const response = await fetch(`${BASE_URL}/${chain}/${id}`, { headers });

    if (response.status === 304) {
      try {
        const data = JSON.parse(cachedData);
        return { success: true, data, pagination: {} };
      } catch (e) {
        console.warn(`Invalid cached data for ${CACHE_KEY} on 304 response:`, e);
      }
    }

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || `Failed to fetch ${chain} news item`);
    }

    localStorage.setItem(CACHE_KEY, JSON.stringify(result.data));
    localStorage.setItem(`${CACHE_KEY}_etag`, response.headers.get('ETag') || '');
    localStorage.setItem(`${CACHE_KEY}_timestamp`, now.toString());

    return { success: true, data: result.data, pagination: {} };
  } catch (error) {
    console.error(`Failed to fetch ${chain} news by id:`, error);
    return { success: false, data: null, pagination: {}, message: error.message };
  }
};

// Generic search function
export const searchNews = async (chain, keyword, page = 1, limit = 10) => {
  try {
    const CACHE_KEY = `search_${chain}_${keyword}_${page}_${limit}`;
    cleanOldCache();

    const cachedData = localStorage.getItem(CACHE_KEY);
    const cachedEtag = localStorage.getItem(`${CACHE_KEY}_etag`);
    const cacheTimestamp = localStorage.getItem(`${CACHE_KEY}_timestamp`);
    const now = new Date().getTime();

    if (cachedData && cacheTimestamp && now - parseInt(cacheTimestamp) < CACHE_DURATION) {
      try {
        return JSON.parse(cachedData);
      } catch (e) {
        console.warn(`Invalid cached data for ${CACHE_KEY}:`, e);
        localStorage.removeItem(CACHE_KEY);
        localStorage.removeItem(`${CACHE_KEY}_etag`);
        localStorage.removeItem(`${CACHE_KEY}_timestamp`);
      }
    }

    const headers = cachedEtag ? { 'If-None-Match': cachedEtag } : {};
    const response = await fetch(
      `${BASE_URL}/${chain}/search?keyword=${encodeURIComponent(keyword)}&page=${page}&limit=${limit}`,
      { headers }
    );

    if (response.status === 304) {
      try {
        return JSON.parse(cachedData);
      } catch (e) {
        console.warn(`Invalid cached data for ${CACHE_KEY} on 304 response:`, e);
      }
    }

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.errors?.[0]?.msg || result.error || `Failed to search ${chain} news`);
    }

    localStorage.setItem(CACHE_KEY, JSON.stringify(result));
    localStorage.setItem(`${CACHE_KEY}_etag`, response.headers.get('ETag') || '');
    localStorage.setItem(`${CACHE_KEY}_timestamp`, now.toString());

    return result;
  } catch (error) {
    console.error(`Failed to search ${chain} news:`, error);
    return { success: false, data: [], pagination: {}, message: error.message };
  }
};

// Chain-specific functions
export const getBitcoinNews = async (page = 1, limit = 10) => fetchNews('bitcoin', page, limit);
export const getBitcoinNewsById = async (id) => fetchNewsById('bitcoin', id);
export const searchBitcoinNews = async (keyword, page = 1, limit = 10) => searchNews('bitcoin', keyword, page, limit);

export const getEthereumNews = async (page = 1, limit = 10) => fetchNews('ethereum', page, limit);
export const getEthereumNewsById = async (id) => fetchNewsById('ethereum', id);
export const searchEthereumNews = async (keyword, page = 1, limit = 10) => searchNews('ethereum', keyword, page, limit);

export const getAltcoinNews = async (page = 1, limit = 10) => fetchNews('altcoin', page, limit);
export const getAltcoinNewsById = async (id) => fetchNewsById('altcoin', id);
export const searchAltcoinNews = async (keyword, page = 1, limit = 10) => searchNews('altcoin', keyword, page, limit);

export const getFeedsNews = async (page = 1, limit = 10) => fetchNews('feeds', page, limit);
export const getFeedsNewsById = async (id) => fetchNewsById('feeds', id);
export const searchFeedsNews = async (keyword, page = 1, limit = 10) => searchNews('feeds', keyword, page, limit);

export const getBlockchainNews = async (page = 1, limit = 10) => fetchNews('blockchain', page, limit);
export const getBlockchainNewsById = async (id) => fetchNewsById('blockchain', id);
export const searchBlockchainNews = async (keyword, page = 1, limit = 10) => searchNews('blockchain', keyword, page, limit);

// Existing functions
export const getAllNews = async (page = 1, limit = 10) => {
  try {
    const CACHE_KEY = `all_news_${page}_${limit}`;
    cleanOldCache();

    const cachedData = localStorage.getItem(CACHE_KEY);
    const cachedEtag = localStorage.getItem(`${CACHE_KEY}_etag`);
    const cacheTimestamp = localStorage.getItem(`${CACHE_KEY}_timestamp`);
    const now = new Date().getTime();

    if (cachedData && cacheTimestamp && now - parseInt(cacheTimestamp) < CACHE_DURATION) {
      try {
        return JSON.parse(cachedData);
      } catch (e) {
        console.warn(`Invalid cached data for ${CACHE_KEY}:`, e);
        localStorage.removeItem(CACHE_KEY);
        localStorage.removeItem(`${CACHE_KEY}_etag`);
        localStorage.removeItem(`${CACHE_KEY}_timestamp`);
      }
    }

    const headers = cachedEtag ? { 'If-None-Match': cachedEtag } : {};
    const response = await fetch(`${BASE_URL}/all?page=${page}&limit=${limit}`, { headers });

    if (response.status === 304) {
      try {
        return JSON.parse(cachedData);
      } catch (e) {
        console.warn(`Invalid cached data for ${CACHE_KEY} on 304 response:`, e);
      }
    }

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.errors?.[0]?.msg || result.error || 'Failed to fetch all news');
    }

    localStorage.setItem(CACHE_KEY, JSON.stringify(result));
    localStorage.setItem(`${CACHE_KEY}_etag`, response.headers.get('ETag') || '');
    localStorage.setItem(`${CACHE_KEY}_timestamp`, now.toString());

    return result;
  } catch (error) {
    console.error('Error fetching all news:', error);
    return { success: false, data: [], pagination: {}, message: error.message };
  }
};

export const getTodayNews = async () => {
  try {
    const CACHE_KEY = 'today_news';
    cleanOldCache();

    const cachedData = localStorage.getItem(CACHE_KEY);
    const cachedEtag = localStorage.getItem(`${CACHE_KEY}_etag`);
    const cacheTimestamp = localStorage.getItem(`${CACHE_KEY}_timestamp`);
    const now = new Date().getTime();

    if (cachedData && cacheTimestamp && now - parseInt(cacheTimestamp) < CACHE_DURATION) {
      try {
        return JSON.parse(cachedData);
      } catch (e) {
        console.warn(`Invalid cached data for ${CACHE_KEY}:`, e);
        localStorage.removeItem(CACHE_KEY);
        localStorage.removeItem(`${CACHE_KEY}_etag`);
        localStorage.removeItem(`${CACHE_KEY}_timestamp`);
      }
    }

    const headers = cachedEtag ? { 'If-None-Match': cachedEtag } : {};
    const response = await fetch(`${BASE_URL}/todaynews`, { headers });

    if (response.status === 304) {
      try {
        return JSON.parse(cachedData);
      } catch (e) {
        console.warn(`Invalid cached data for ${CACHE_KEY} on 304 response:`, e);
      }
    }

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch today\'s news');
    }

    localStorage.setItem(CACHE_KEY, JSON.stringify(result));
    localStorage.setItem(`${CACHE_KEY}_etag`, response.headers.get('ETag') || '');
    localStorage.setItem(`${CACHE_KEY}_timestamp`, now.toString());

    return result;
  } catch (error) {
    console.error('Failed to fetch today\'s news:', error);
    return { success: false, data: [], pagination: {}, message: error.message };
  }
};