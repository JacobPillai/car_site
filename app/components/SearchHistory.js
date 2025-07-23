"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ClockIcon, 
  XMarkIcon, 
  TrashIcon, 
  MagnifyingGlassIcon 
} from '@heroicons/react/24/outline';
import { 
  getSearchHistory, 
  clearSearchHistory, 
  removeSearchItem, 
  formatSearchForDisplay, 
  getSearchUrl,
  shouldSaveSearchHistory
} from '../utils/searchHistory';

export default function SearchHistory({ className = '', limit, onSelectSearch }) {
  const [searchHistory, setSearchHistory] = useState([]);
  const [isPrivacyEnabled, setIsPrivacyEnabled] = useState(true);
  
  // Load search history on component mount
  useEffect(() => {
    setIsPrivacyEnabled(shouldSaveSearchHistory());
    setSearchHistory(getSearchHistory());
    
    // Listen for storage events to update history if changed in another tab
    const handleStorageChange = (e) => {
      if (e.key === 'carhub_search_history') {
        setSearchHistory(e.newValue ? JSON.parse(e.newValue) : []);
      } else if (e.key === 'carhub_privacy_settings') {
        setIsPrivacyEnabled(shouldSaveSearchHistory());
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  // Handle removing a single search item
  const handleRemoveItem = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    const updatedHistory = removeSearchItem(id);
    setSearchHistory(updatedHistory);
  };
  
  // Handle clearing all search history
  const handleClearAll = (e) => {
    e.preventDefault();
    clearSearchHistory();
    setSearchHistory([]);
  };
  
  // Handle selecting a search from history
  const handleSelectSearch = (searchItem) => {
    if (onSelectSearch) {
      onSelectSearch(searchItem);
    }
  };
  
  // Limit the number of items displayed if specified
  const displayedHistory = limit ? searchHistory.slice(0, limit) : searchHistory;
  
  // If search history is disabled in privacy settings
  if (!isPrivacyEnabled) {
    return (
      <div className={`bg-secondary rounded-lg p-4 ${className}`}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-medium flex items-center">
            <ClockIcon className="h-4 w-4 mr-2 text-gray-400" />
            Search History
          </h3>
        </div>
        <div className="text-gray-400 text-sm py-2">
          <p>Search history is disabled in your privacy settings.</p>
          <Link href="/settings/privacy" className="text-accent hover:text-accent/80 text-xs mt-1 inline-block">
            Update privacy settings
          </Link>
        </div>
      </div>
    );
  }
  
  // If search history is empty
  if (displayedHistory.length === 0) {
    return (
      <div className={`bg-secondary rounded-lg p-4 ${className}`}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-medium flex items-center">
            <ClockIcon className="h-4 w-4 mr-2 text-gray-400" />
            Search History
          </h3>
        </div>
        <div className="text-gray-400 text-sm py-2">
          <p>No recent searches</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`bg-secondary rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-medium flex items-center">
          <ClockIcon className="h-4 w-4 mr-2 text-gray-400" />
          Recent Searches
        </h3>
        <button 
          onClick={handleClearAll}
          className="text-xs text-gray-400 hover:text-accent flex items-center"
        >
          <TrashIcon className="h-3 w-3 mr-1" />
          Clear All
        </button>
      </div>
      
      <ul className="divide-y divide-gray-700">
        {displayedHistory.map(search => (
          <li key={search.id} className="py-2">
            {onSelectSearch ? (
              <button
                onClick={() => handleSelectSearch(search)}
                className="w-full text-left flex items-center justify-between group"
              >
                <div className="flex items-start flex-1 min-w-0">
                  <MagnifyingGlassIcon className="h-4 w-4 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-white text-sm truncate">
                    {formatSearchForDisplay(search)}
                  </span>
                </div>
                <button
                  onClick={(e) => handleRemoveItem(e, search.id)}
                  className="ml-2 text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </button>
            ) : (
              <Link
                href={getSearchUrl(search)}
                className="flex items-center justify-between group"
              >
                <div className="flex items-start flex-1 min-w-0">
                  <MagnifyingGlassIcon className="h-4 w-4 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-white text-sm truncate">
                    {formatSearchForDisplay(search)}
                  </span>
                </div>
                <button
                  onClick={(e) => handleRemoveItem(e, search.id)}
                  className="ml-2 text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </Link>
            )}
          </li>
        ))}
      </ul>
      
      {limit && searchHistory.length > limit && (
        <div className="text-center mt-2">
          <Link 
            href="/search-history" 
            className="text-xs text-accent hover:text-accent/80"
          >
            View all searches
          </Link>
        </div>
      )}
    </div>
  );
} 