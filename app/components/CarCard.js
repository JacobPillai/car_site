"use client";

import Link from "next/link";
import OptimizedImage from "./OptimizedImage";
import RevealOnScroll from "./RevealOnScroll";
import CarDetailsOverlay from "./CarDetailsOverlay";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";

export default function CarCard({ car, index = 0 }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleHoverStart = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleHoverEnd = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <RevealOnScroll delay={index * 0.1}>
      <motion.div 
        className="bg-secondary rounded-lg overflow-hidden shadow-lg transition-all duration-300 relative group"
        whileHover={{ 
          scale: 1.05,
          zIndex: 10
        }}
        whileTap={{ scale: 0.98 }}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        style={{ willChange: 'transform' }}
      >
        {/* Image container with gradient overlay */}
        <div className="relative h-48">
          <OptimizedImage
            src={car.image}
            alt={car.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Card content */}
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2 transition-colors duration-300 group-hover:text-accent">
            {car.name}
          </h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-accent font-bold">${car.price.toLocaleString()}</span>
            <span className="text-gray-400">{car.year}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-400 mb-4">
            <div>
              <span className="font-medium">Mileage:</span> {car.mileage.toLocaleString()} km
            </div>
            <div>
              <span className="font-medium">Transmission:</span> {car.transmission}
            </div>
            <div>
              <span className="font-medium">Fuel:</span> {car.fuel}
            </div>
            <div>
              <span className="font-medium">Location:</span> {car.location}
            </div>
          </div>
          <Link
            href={`/cars/${car.id}`}
            className="block w-full text-center bg-accent text-white py-2 rounded-lg hover:bg-accent/90 transition-all duration-300"
            prefetch={false}
          >
            View Details
          </Link>
        </div>

        {/* Hover Overlay */}
        <AnimatePresence mode="wait">
          {isHovered && (
            <div className="absolute inset-0">
              <CarDetailsOverlay car={car} />
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </RevealOnScroll>
  );
} 