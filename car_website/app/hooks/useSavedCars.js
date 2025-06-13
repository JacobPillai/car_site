"use client";

import { useState, useEffect, useCallback } from 'react';
import { getFromStorage, setToStorage, STORAGE_KEYS } from '../utils/localStorage';

/**
 * Custom hook for managing saved cars with localStorage persistence
 * @returns {Object} savedCars state and methods
 */
export default function useSavedCars() {
  // Initialize state with empty array
  const [savedCars, setSavedCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved cars from localStorage on component mount
  useEffect(() => {
    const loadSavedCars = () => {
      const storedCars = getFromStorage(STORAGE_KEYS.SAVED_CARS, []);
      setSavedCars(storedCars);
      setIsLoading(false);
    };
    
    loadSavedCars();
  }, []);

  // Save to localStorage whenever savedCars changes
  useEffect(() => {
    // Skip initial render when isLoading is true
    if (isLoading) return;
    
    setToStorage(STORAGE_KEYS.SAVED_CARS, savedCars);
  }, [savedCars, isLoading]);

  /**
   * Check if a car is saved
   * @param {number} carId - The car ID to check
   * @returns {boolean} - Whether the car is saved
   */
  const isCarSaved = useCallback((carId) => {
    return savedCars.some(car => car.id === carId);
  }, [savedCars]);

  /**
   * Toggle a car's saved status
   * @param {Object} car - The car to toggle
   * @returns {boolean} - New saved status
   */
  const toggleSavedCar = useCallback((car) => {
    let newSavedStatus;
    
    setSavedCars(prevSavedCars => {
      // Check if car is already saved
      const isAlreadySaved = prevSavedCars.some(savedCar => savedCar.id === car.id);
      
      if (isAlreadySaved) {
        // Remove car if already saved
        newSavedStatus = false;
        return prevSavedCars.filter(savedCar => savedCar.id !== car.id);
      } else {
        // Add car if not saved
        newSavedStatus = true;
        const currentDate = new Date().toISOString().split('T')[0];
        return [...prevSavedCars, { ...car, savedDate: currentDate }];
      }
    });
    
    return newSavedStatus;
  }, []);

  /**
   * Remove a car from saved cars
   * @param {number} carId - The car ID to remove
   */
  const removeSavedCar = useCallback((carId) => {
    setSavedCars(prevSavedCars => 
      prevSavedCars.filter(car => car.id !== carId)
    );
  }, []);

  /**
   * Sort saved cars by different criteria
   * @param {string} sortBy - Sorting criteria
   */
  const sortSavedCars = useCallback((sortBy) => {
    setSavedCars(prevSavedCars => {
      const carsCopy = [...prevSavedCars];
      
      switch (sortBy) {
        case 'recentlySaved':
          return carsCopy.sort((a, b) => new Date(b.savedDate) - new Date(a.savedDate));
        case 'priceHighToLow':
          return carsCopy.sort((a, b) => b.price - a.price);
        case 'priceLowToHigh':
          return carsCopy.sort((a, b) => a.price - b.price);
        case 'newest':
          return carsCopy.sort((a, b) => b.year - a.year);
        default:
          return carsCopy;
      }
    });
  }, []);

  return {
    savedCars,
    isLoading,
    isCarSaved,
    toggleSavedCar,
    removeSavedCar,
    sortSavedCars
  };
} 