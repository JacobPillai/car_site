/**
 * Search History Utility Functions
 * 
 * This file contains utility functions for managing search history.
 * It provides methods to add, retrieve, clear, and manage user search history
 * while respecting privacy settings.
 */

// Constants
const SEARCH_HISTORY_KEY = 'carhub_search_history';
const PRIVACY_SETTINGS_KEY = 'carhub_privacy_settings';
const MAX_SEARCH_HISTORY_ITEMS = 20;

/**
 * Check if search history should be saved based on user privacy settings
 * @returns {boolean} - True if search history should be saved
 */
export const shouldSaveSearchHistory = () => {
  try {
    if (typeof window === 'undefined') return false;
    
    const privacySettings = localStorage.getItem(PRIVACY_SETTINGS_KEY);
    if (!privacySettings) return true; // Default to true if no settings found
    
    const settings = JSON.parse(privacySettings);
    return settings.searchHistory !== false; // Default to true if not explicitly set to false
  } catch (error) {
    console.error('Error checking search history settings:', error);
    return false;
  }
};

/**
 * Add a search query to history
 * @param {Object} searchData - The search data to save
 * @param {string} searchData.query - The search query text
 * @param {Object} searchData.filters - The filters applied (optional)
 * @param {string} searchData.category - The category searched (optional)
 */
export const addToSearchHistory = (searchData) => {
  try {
    if (typeof window === 'undefined') return;
    if (!shouldSaveSearchHistory()) return;
    
    // Validate input
    if (!searchData || !searchData.query) return;
    
    // Get existing history
    const existingHistory = getSearchHistory();
    
    // Create new search entry
    const newSearchEntry = {
      ...searchData,
      timestamp: new Date().toISOString(),
      id: Date.now().toString()
    };
    
    // Remove duplicates (same query and filters)
    const filteredHistory = existingHistory.filter(item => {
      if (item.query !== searchData.query) return true;
      
      // Check if filters are the same
      if (item.filters && searchData.filters) {
        const itemFilterKeys = Object.keys(item.filters);
        const newFilterKeys = Object.keys(searchData.filters);
        
        if (itemFilterKeys.length !== newFilterKeys.length) return true;
        
        for (const key of itemFilterKeys) {
          if (item.filters[key] !== searchData.filters[key]) return true;
        }
        
        return false; // Exact duplicate
      }
      
      return true;
    });
    
    // Add new entry and limit the size
    const newHistory = [newSearchEntry, ...filteredHistory].slice(0, MAX_SEARCH_HISTORY_ITEMS);
    
    // Save to localStorage
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
    
    return newHistory;
  } catch (error) {
    console.error('Error adding to search history:', error);
    return [];
  }
};

/**
 * Get the user's search history
 * @returns {Array} - Array of search history items
 */
export const getSearchHistory = () => {
  try {
    if (typeof window === 'undefined') return [];
    
    const history = localStorage.getItem(SEARCH_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error getting search history:', error);
    return [];
  }
};

/**
 * Clear all search history
 * @returns {boolean} - True if successfully cleared
 */
export const clearSearchHistory = () => {
  try {
    if (typeof window === 'undefined') return false;
    
    localStorage.removeItem(SEARCH_HISTORY_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing search history:', error);
    return false;
  }
};

/**
 * Remove a specific search item from history
 * @param {string} searchId - The ID of the search to remove
 * @returns {Array} - The updated search history
 */
export const removeSearchItem = (searchId) => {
  try {
    if (typeof window === 'undefined') return [];
    
    const history = getSearchHistory();
    const updatedHistory = history.filter(item => item.id !== searchId);
    
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updatedHistory));
    return updatedHistory;
  } catch (error) {
    console.error('Error removing search item:', error);
    return [];
  }
};

/**
 * Format a search history item for display
 * @param {Object} searchItem - The search item to format
 * @returns {string} - Formatted search string
 */
export const formatSearchForDisplay = (searchItem) => {
  if (!searchItem) return '';
  
  let displayText = searchItem.query || '';
  
  // Add category if available
  if (searchItem.category) {
    displayText = `${searchItem.category}: ${displayText}`;
  }
  
  // Add key filters if available
  if (searchItem.filters) {
    const filterStrings = [];
    
    if (searchItem.filters.minPrice && searchItem.filters.maxPrice) {
      filterStrings.push(`$${searchItem.filters.minPrice}-$${searchItem.filters.maxPrice}`);
    } else if (searchItem.filters.minPrice) {
      filterStrings.push(`>$${searchItem.filters.minPrice}`);
    } else if (searchItem.filters.maxPrice) {
      filterStrings.push(`<$${searchItem.filters.maxPrice}`);
    }
    
    if (searchItem.filters.make) {
      filterStrings.push(searchItem.filters.make);
    }
    
    if (searchItem.filters.model) {
      filterStrings.push(searchItem.filters.model);
    }
    
    if (searchItem.filters.year) {
      filterStrings.push(searchItem.filters.year);
    }
    
    if (filterStrings.length > 0) {
      displayText += ` (${filterStrings.join(', ')})`;
    }
  }
  
  return displayText;
};

/**
 * Get a search URL from a search history item
 * @param {Object} searchItem - The search item
 * @returns {string} - URL for the search
 */
export const getSearchUrl = (searchItem) => {
  if (!searchItem) return '/cars';
  
  const baseUrl = '/cars';
  const params = new URLSearchParams();
  
  if (searchItem.query) {
    params.append('q', searchItem.query);
  }
  
  if (searchItem.filters) {
    Object.entries(searchItem.filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
  }
  
  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}; 