"use client";

import { motion } from "framer-motion";
import RevealOnScroll from "./RevealOnScroll";

export default function Filter({ filters, onFilterChange }) {
  const filterVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <RevealOnScroll direction="left">
      <motion.div 
        className="bg-secondary p-4 rounded-lg"
        variants={filterVariants}
        initial="hidden"
        animate="visible"
      >
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
        
        {/* Price Range */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Price Range
          </label>
          <div className="flex gap-2">
            <motion.input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => onFilterChange("minPrice", e.target.value)}
              className="w-full px-3 py-2 rounded bg-primary border border-gray-700 text-white"
              whileFocus={{ scale: 1.02 }}
            />
            <motion.input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => onFilterChange("maxPrice", e.target.value)}
              className="w-full px-3 py-2 rounded bg-primary border border-gray-700 text-white"
              whileFocus={{ scale: 1.02 }}
            />
          </div>
        </div>

        {/* Year Range */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Year Range
          </label>
          <div className="flex gap-2">
            <motion.input
              type="number"
              placeholder="Min"
              value={filters.minYear}
              onChange={(e) => onFilterChange("minYear", e.target.value)}
              className="w-full px-3 py-2 rounded bg-primary border border-gray-700 text-white"
              whileFocus={{ scale: 1.02 }}
            />
            <motion.input
              type="number"
              placeholder="Max"
              value={filters.maxYear}
              onChange={(e) => onFilterChange("maxYear", e.target.value)}
              className="w-full px-3 py-2 rounded bg-primary border border-gray-700 text-white"
              whileFocus={{ scale: 1.02 }}
            />
          </div>
        </div>

        {/* Transmission */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Transmission
          </label>
          <motion.select
            value={filters.transmission}
            onChange={(e) => onFilterChange("transmission", e.target.value)}
            className="w-full px-3 py-2 rounded bg-primary border border-gray-700 text-white"
            whileFocus={{ scale: 1.02 }}
          >
            <option value="">All</option>
            <option value="automatic">Automatic</option>
            <option value="manual">Manual</option>
            <option value="cvt">CVT</option>
          </motion.select>
        </div>

        {/* Fuel Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Fuel Type
          </label>
          <motion.select
            value={filters.fuel}
            onChange={(e) => onFilterChange("fuel", e.target.value)}
            className="w-full px-3 py-2 rounded bg-primary border border-gray-700 text-white"
            whileFocus={{ scale: 1.02 }}
          >
            <option value="">All</option>
            <option value="petrol">Petrol</option>
            <option value="diesel">Diesel</option>
            <option value="electric">Electric</option>
            <option value="hybrid">Hybrid</option>
          </motion.select>
        </div>

        {/* Reset Filters */}
        <motion.button
          onClick={() => onFilterChange("reset")}
          className="w-full py-2 px-4 bg-accent text-white rounded hover:bg-accent/90 transition-colors duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Reset Filters
        </motion.button>
      </motion.div>
    </RevealOnScroll>
  );
} 