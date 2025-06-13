"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CarCard from "../components/CarCard";
import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import RevealOnScroll from "../components/RevealOnScroll";
import { useSavedCarsContext } from "../contexts/SavedCarsContext";

/**
 * SavedCars Page Component
 * 
 * Displays cars that have been favorited by the user.
 * Features:
 * - List view of saved cars
 * - Option to remove cars from saved list
 * - Empty state when no cars are saved
 */
export default function SavedCarsPage() {
  const { savedCars, isLoading, removeSavedCar, sortSavedCars } = useSavedCarsContext();
  const [sortOption, setSortOption] = useState("recentlySaved");
  
  // Apply sorting when sort option changes
  useEffect(() => {
    sortSavedCars(sortOption);
  }, [sortOption, sortSavedCars]);
  
  // Handle sort change
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="pt-28 pb-16 px-4 bg-primary min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-pulse bg-secondary rounded-full h-12 w-12 mb-4 mx-auto"></div>
            <p className="text-xl">Loading saved cars...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 px-4 bg-gradient-to-r from-secondary to-secondary/70 text-white">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="flex items-center justify-center gap-2 mb-2">
              <HeartSolidIcon className="h-8 w-8 text-accent" />
              <h1 className="text-4xl md:text-5xl font-bold text-center">Saved Cars</h1>
            </div>
            <p className="text-xl text-center mb-8">Your favorited vehicles all in one place</p>
          </RevealOnScroll>
        </div>
      </section>
      
      {/* Saved Cars List Section */}
      <section className="py-16 px-4 bg-primary">
        <div className="max-w-7xl mx-auto">
          {savedCars.length > 0 ? (
            <>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">
                  You have {savedCars.length} saved {savedCars.length === 1 ? 'car' : 'cars'}
                </h2>
                <div className="flex gap-2">
                  <select 
                    className="bg-secondary text-white py-2 px-4 rounded-md border border-gray-700"
                    value={sortOption}
                    onChange={handleSortChange}
                  >
                    <option value="recentlySaved">Sort: Recently Saved</option>
                    <option value="priceHighToLow">Sort: Price High to Low</option>
                    <option value="priceLowToHigh">Sort: Price Low to High</option>
                    <option value="newest">Sort: Newest First</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedCars.map((car, index) => (
                  <div key={car.id} className="relative group">
                    <CarCard car={car} index={index} />
                    
                    {/* Remove button overlay */}
                    <button 
                      onClick={() => removeSavedCar(car.id)}
                      className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-30"
                      title="Remove from saved cars"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                    
                    {/* Saved date badge */}
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-30">
                      Saved on {new Date(car.savedDate).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            // Empty state
            <div className="text-center py-16 bg-secondary rounded-xl max-w-2xl mx-auto">
              <div className="flex justify-center mb-4">
                <HeartIcon className="h-16 w-16 text-gray-500" />
              </div>
              <h2 className="text-2xl font-bold mb-2">No saved cars yet</h2>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                Start browsing our inventory and click the heart icon to save your favorite cars.
              </p>
              <Link
                href="/buy"
                className="inline-block px-6 py-3 bg-accent hover:bg-accent/90 text-white rounded-md font-medium transition-colors"
              >
                Browse Cars
              </Link>
            </div>
          )}
        </div>
      </section>
      
      {/* Price Drops Section */}
      {savedCars.length > 0 && (
        <section className="py-16 px-4 bg-secondary">
          <div className="max-w-7xl mx-auto">
            <RevealOnScroll>
              <h2 className="text-3xl font-bold mb-8 text-center">Price Drop Alerts</h2>
              
              <div className="bg-primary/50 rounded-xl p-6 max-w-2xl mx-auto text-center">
                <p className="text-gray-300 mb-4">
                  Get notified when the price drops on any of your saved cars.
                </p>
                <div className="flex max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-1 px-4 py-3 bg-gray-800 rounded-l-lg border border-gray-700 text-white"
                  />
                  <button className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-r-lg transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>
      )}
      
      <Footer />
    </>
  );
} 