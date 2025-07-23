"use client";

import { motion } from "framer-motion";

/**
 * ConditionFilter Component
 * 
 * Renders a tab-based filter for car conditions (All, New, Used, Hot Deals).
 * Features:
 * - Visual selection indicator for active condition
 * - Responsive grid layout (2 columns on mobile, 4 on larger screens)
 * - Smooth animations using Framer Motion
 * 
 * @param {Object} props - Component props
 * @param {string} props.selectedCondition - Currently selected condition ID
 * @param {Function} props.onConditionChange - Callback when condition is changed
 */
export default function ConditionFilter({ selectedCondition, onConditionChange }) {
  // Available condition options
  const conditions = [
    { id: "all", label: "All Cars" },
    { id: "new", label: "New Cars" },
    { id: "used", label: "Used Cars" },
    { id: "hot-deals", label: "Hot Deals" },
  ];

  return (
    <div className="bg-secondary rounded-lg shadow-md overflow-hidden">
      <div className="grid grid-cols-2 sm:grid-cols-4">
        {conditions.map((condition) => (
          <motion.button
            key={condition.id}
            className={`py-3 px-4 text-center transition-colors ${
              selectedCondition === condition.id
                ? "bg-accent text-white"  // Highlight active condition
                : "text-gray-300 hover:bg-gray-700"  // Normal state with hover effect
            }`}
            onClick={() => onConditionChange(condition.id)}
            whileHover={{ scale: 1.05 }}  // Subtle grow effect on hover
            whileTap={{ scale: 0.95 }}    // Subtle shrink effect on click
          >
            {condition.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
} 