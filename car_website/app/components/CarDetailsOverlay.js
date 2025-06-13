"use client";

import { motion } from "framer-motion";
import { HeartIcon, ShareIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { useSavedCarsContext } from "../contexts/SavedCarsContext";

export default function CarDetailsOverlay({ car }) {
  const { isCarSaved, toggleSavedCar } = useSavedCarsContext();
  const [isSaved, setIsSaved] = useState(false);
  
  // Check if car is saved on component mount and when isCarSaved changes
  useEffect(() => {
    setIsSaved(isCarSaved(car.id));
  }, [car.id, isCarSaved]);

  function handleSaveCar() {
    const newSavedStatus = toggleSavedCar(car);
    setIsSaved(newSavedStatus);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="absolute inset-0 z-20 flex items-center justify-center"
      style={{ willChange: 'opacity' }}
    >
      {/* Vignette background with radial gradient */}
      <div 
        className="absolute inset-0" 
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%)',
          backdropFilter: 'blur(4px)'
        }}
      />
      
      {/* Content container */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative w-[85%] max-w-md mx-auto bg-black/40 backdrop-blur-sm rounded-xl p-4 text-white"
      >
        {/* Car name and price */}
        <div className="text-center mb-4">
          <h3 className="text-2xl font-bold mb-1">{car.name}</h3>
          <p className="text-3xl font-bold text-accent">${car.price.toLocaleString()}</p>
        </div>

        {/* Key specs grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white/10 rounded-lg p-2 text-center">
            <p className="text-sm text-gray-300">Year</p>
            <p className="font-semibold">{car.year}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-2 text-center">
            <p className="text-sm text-gray-300">Mileage</p>
            <p className="font-semibold">{car.mileage.toLocaleString()} km</p>
          </div>
          <div className="bg-white/10 rounded-lg p-2 text-center">
            <p className="text-sm text-gray-300">Transmission</p>
            <p className="font-semibold">{car.transmission}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-2 text-center">
            <p className="text-sm text-gray-300">Fuel</p>
            <p className="font-semibold">{car.fuel}</p>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white/10 rounded-lg p-2 text-center mb-4">
          <p className="text-sm text-gray-300">Location</p>
          <p className="font-semibold">{car.location}</p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <button 
            className="flex-1 bg-accent hover:bg-accent/90 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <PhoneIcon className="w-4 h-4" />
            Contact
          </button>
          <button 
            className="flex-1 bg-white/10 hover:bg-white/20 py-2 rounded-lg transition-colors"
          >
            View Details
          </button>
          <button 
            onClick={handleSaveCar}
            className={`w-12 h-10 ${isSaved ? 'bg-accent' : 'bg-white/10 hover:bg-white/20'} rounded-lg transition-colors flex items-center justify-center`}
            title={isSaved ? "Remove from Saved Cars" : "Save Car"}
          >
            {isSaved ? (
              <HeartSolidIcon className="w-5 h-5 text-white" />
            ) : (
              <HeartIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
} 