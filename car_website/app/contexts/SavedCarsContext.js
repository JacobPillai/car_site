"use client";

import { createContext, useContext } from 'react';
import useSavedCars from '../hooks/useSavedCars';

// Create context
const SavedCarsContext = createContext(null);

/**
 * Provider component for saved cars functionality
 */
export function SavedCarsProvider({ children }) {
  const savedCarsData = useSavedCars();
  
  return (
    <SavedCarsContext.Provider value={savedCarsData}>
      {children}
    </SavedCarsContext.Provider>
  );
}

/**
 * Hook to use the saved cars context
 */
export function useSavedCarsContext() {
  const context = useContext(SavedCarsContext);
  
  if (!context) {
    throw new Error('useSavedCarsContext must be used within a SavedCarsProvider');
  }
  
  return context;
} 