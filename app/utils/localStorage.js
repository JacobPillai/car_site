/**
 * Utility functions for working with localStorage in Next.js
 * Handles browser-side storage safely with SSR compatibility
 */

// Check if we're running on the client side
const isClient = typeof window !== 'undefined';

/**
 * Safely get an item from localStorage
 * @param {string} key - The key to retrieve
 * @param {any} defaultValue - Default value if key doesn't exist
 * @returns {any} - The stored value or defaultValue
 */
export const getFromStorage = (key, defaultValue = null) => {
  if (!isClient) return defaultValue;
  
  try {
    const item = localStorage.getItem(key);
    // Return parsed item or defaultValue
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error getting item ${key} from localStorage:`, error);
    return defaultValue;
  }
};

/**
 * Safely set an item in localStorage
 * @param {string} key - The key to set
 * @param {any} value - The value to store
 * @returns {boolean} - Success status
 */
export const setToStorage = (key, value) => {
  if (!isClient) return false;
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error setting item ${key} in localStorage:`, error);
    return false;
  }
};

/**
 * Safely remove an item from localStorage
 * @param {string} key - The key to remove
 * @returns {boolean} - Success status
 */
export const removeFromStorage = (key) => {
  if (!isClient) return false;
  
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing item ${key} from localStorage:`, error);
    return false;
  }
};

/**
 * Storage keys used throughout the application
 */
export const STORAGE_KEYS = {
  SAVED_CARS: 'carhub_saved_cars',
  ACCESSIBILITY_SETTINGS: 'carhub_accessibility_settings',
  NOTIFICATION_SETTINGS: 'carhub_notification_settings',
  PRIVACY_SETTINGS: 'carhub_privacy_settings',
  LANGUAGE_SETTINGS: 'carhub_language_settings'
}; 