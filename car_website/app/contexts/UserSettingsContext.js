"use client";

import { createContext, useContext } from 'react';
import useUserSettings from '../hooks/useUserSettings';

// Create context
const UserSettingsContext = createContext(null);

/**
 * Provider component for user settings functionality
 */
export function UserSettingsProvider({ children }) {
  const userSettingsData = useUserSettings();
  
  return (
    <UserSettingsContext.Provider value={userSettingsData}>
      {children}
    </UserSettingsContext.Provider>
  );
}

/**
 * Hook to use the user settings context
 */
export function useUserSettingsContext() {
  const context = useContext(UserSettingsContext);
  
  if (!context) {
    throw new Error('useUserSettingsContext must be used within a UserSettingsProvider');
  }
  
  return context;
} 