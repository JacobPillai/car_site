"use client";

import { useState, useEffect, useCallback } from 'react';
import { getFromStorage, setToStorage, STORAGE_KEYS } from '../utils/localStorage';

/**
 * Default settings values
 */
const defaultSettings = {
  accessibility: {
    highContrast: false,
    largerText: false,
    reducedMotion: false,
    screenReader: false,
    prefersDarkTheme: false,
  },
  notifications: {
    priceDrops: true,
    newListings: true,
    savedCarUpdates: true,
    marketUpdates: false,
    promotions: false,
  },
  privacy: {
    shareActivity: false,
    locationTracking: true,
    dataCollection: true,
    cookiePreferences: "essential",
  },
  language: {
    language: "en",
    distanceUnit: "miles",
  }
};

/**
 * Detect system preferences
 * @returns {Object} System preferences
 */
function detectSystemPreferences() {
  if (typeof window === 'undefined') {
    return {
      prefersDarkTheme: false,
      prefersReducedMotion: false,
    };
  }

  const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return {
    prefersDarkTheme,
    prefersReducedMotion,
  };
}

/**
 * Custom hook for managing user settings with localStorage persistence
 * @returns {Object} settings state and methods
 */
export default function useUserSettings() {
  // Initialize state for each settings category
  const [accessibilitySettings, setAccessibilitySettings] = useState(defaultSettings.accessibility);
  const [notificationSettings, setNotificationSettings] = useState(defaultSettings.notifications);
  const [privacySettings, setPrivacySettings] = useState(defaultSettings.privacy);
  const [languageSettings, setLanguageSettings] = useState(defaultSettings.language);
  const [isLoading, setIsLoading] = useState(true);
  const [settingsApplied, setSettingsApplied] = useState({
    accessibility: false,
    notifications: false,
    privacy: false,
    language: false
  });

  // Load settings from localStorage on component mount
  useEffect(() => {
    const loadSettings = () => {
      // Get system preferences to use as fallback
      const { prefersDarkTheme, prefersReducedMotion } = detectSystemPreferences();
      
      // Load settings from localStorage, or use defaults with system preferences
      const savedAccessibilitySettings = getFromStorage(
        STORAGE_KEYS.ACCESSIBILITY_SETTINGS, 
        {
          ...defaultSettings.accessibility,
          prefersDarkTheme,
          reducedMotion: prefersReducedMotion
        }
      );
      
      setAccessibilitySettings(savedAccessibilitySettings);
      setNotificationSettings(
        getFromStorage(STORAGE_KEYS.NOTIFICATION_SETTINGS, defaultSettings.notifications)
      );
      setPrivacySettings(
        getFromStorage(STORAGE_KEYS.PRIVACY_SETTINGS, defaultSettings.privacy)
      );
      setLanguageSettings(
        getFromStorage(STORAGE_KEYS.LANGUAGE_SETTINGS, defaultSettings.language)
      );
      setIsLoading(false);
    };
    
    loadSettings();
    
    // Set up listeners for system preference changes
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const reducedMotionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleDarkModeChange = (e) => {
      setAccessibilitySettings(prev => ({
        ...prev,
        prefersDarkTheme: e.matches
      }));
    };
    
    const handleReducedMotionChange = (e) => {
      setAccessibilitySettings(prev => ({
        ...prev,
        reducedMotion: e.matches
      }));
    };
    
    // Add event listeners
    darkModeMediaQuery.addEventListener('change', handleDarkModeChange);
    reducedMotionMediaQuery.addEventListener('change', handleReducedMotionChange);
    
    // Cleanup
    return () => {
      darkModeMediaQuery.removeEventListener('change', handleDarkModeChange);
      reducedMotionMediaQuery.removeEventListener('change', handleReducedMotionChange);
    };
  }, []);

  // Save all settings to localStorage whenever they change (combined for better performance)
  useEffect(() => {
    if (isLoading) return;
    
    // Save all settings at once
    const saveSuccess = {
      accessibility: setToStorage(STORAGE_KEYS.ACCESSIBILITY_SETTINGS, accessibilitySettings),
      notifications: setToStorage(STORAGE_KEYS.NOTIFICATION_SETTINGS, notificationSettings),
      privacy: setToStorage(STORAGE_KEYS.PRIVACY_SETTINGS, privacySettings),
      language: setToStorage(STORAGE_KEYS.LANGUAGE_SETTINGS, languageSettings)
    };
    
    // Update which settings were successfully applied
    setSettingsApplied(saveSuccess);
    
  }, [accessibilitySettings, notificationSettings, privacySettings, languageSettings, isLoading]);

  /**
   * Update a specific accessibility setting
   * @param {string} setting - The setting to update
   * @param {any} value - The new value
   */
  const updateAccessibilitySetting = useCallback((setting, value) => {
    setAccessibilitySettings(prev => ({
      ...prev,
      [setting]: value !== undefined ? value : !prev[setting]
    }));
  }, []);

  /**
   * Update a specific notification setting
   * @param {string} setting - The setting to update
   * @param {any} value - The new value
   */
  const updateNotificationSetting = useCallback((setting, value) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: value !== undefined ? value : !prev[setting]
    }));
  }, []);

  /**
   * Update a specific privacy setting
   * @param {string} setting - The setting to update
   * @param {any} value - The new value
   */
  const updatePrivacySetting = useCallback((setting, value) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: value !== undefined ? value : !prev[setting]
    }));
  }, []);

  /**
   * Update a specific language setting
   * @param {string} setting - The setting to update
   * @param {any} value - The new value
   */
  const updateLanguageSetting = useCallback((setting, value) => {
    setLanguageSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  }, []);

  /**
   * Reset all settings to defaults
   */
  const resetAllSettings = useCallback(() => {
    // Get current system preferences
    const { prefersDarkTheme, prefersReducedMotion } = detectSystemPreferences();
    
    // Reset with system preferences
    setAccessibilitySettings({
      ...defaultSettings.accessibility,
      prefersDarkTheme,
      reducedMotion: prefersReducedMotion
    });
    setNotificationSettings(defaultSettings.notifications);
    setPrivacySettings(defaultSettings.privacy);
    setLanguageSettings(defaultSettings.language);
  }, []);

  // Apply accessibility settings to the document
  useEffect(() => {
    if (isLoading) return;
    
    // Apply high contrast mode
    if (accessibilitySettings.highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    
    // Apply larger text
    if (accessibilitySettings.largerText) {
      document.documentElement.classList.add('larger-text');
    } else {
      document.documentElement.classList.remove('larger-text');
    }
    
    // Apply reduced motion
    if (accessibilitySettings.reducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
    
    // Apply dark theme
    if (accessibilitySettings.prefersDarkTheme) {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
  }, [accessibilitySettings, isLoading]);

  return {
    accessibilitySettings,
    notificationSettings,
    privacySettings,
    languageSettings,
    isLoading,
    settingsApplied,
    updateAccessibilitySetting,
    updateNotificationSetting,
    updatePrivacySetting,
    updateLanguageSetting,
    resetAllSettings
  };
} 