"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CarCard from "../components/CarCard";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Filter from "../components/Filter";
import ConditionFilter from "../components/ConditionFilter";
import SearchHistory from "../components/SearchHistory";
import { addToSearchHistory } from "../utils/searchHistory";

/**
 * Sample car data with details including condition and hot deal status
 * Each car has:
 * - Basic info (name, price, year)
 * - Technical specs (mileage, transmission, fuel)
 * - Location information
 * - Image path
 * - Condition flag (new/used)
 * - Hot deal indicator for special offers
 */
const sampleCars = [
  // Tesla Models
  {
    id: 1,
    name: "Tesla Model 3",
    price: 45000,
    year: 2023,
    mileage: 15000,
    transmission: "Automatic",
    fuel: "Electric",
    location: "New York, NY",
    image: "/cars/tesla-model-3-white.jpg",
    condition: "new",
    isHotDeal: true,
  },
  {
    id: 2,
    name: "Tesla Model Y",
    price: 52000,
    year: 2023,
    mileage: 12000,
    transmission: "Automatic",
    fuel: "Electric",
    location: "Miami, FL",
    image: "/cars/tesla-model-y.jpg",
    condition: "new",
  },
  {
    id: 3,
    name: "Tesla Model S",
    price: 89000,
    year: 2023,
    mileage: 8000,
    transmission: "Automatic",
    fuel: "Electric",
    location: "San Francisco, CA",
    image: "/cars/tesla-model-s-performance.jpg",
    condition: "new",
    isHotDeal: true,
  },

  // BMW Models
  {
    id: 4,
    name: "BMW M3 Competition",
    price: 75000,
    year: 2023,
    mileage: 5000,
    transmission: "Automatic",
    fuel: "Petrol",
    location: "Los Angeles, CA",
    image: "/cars/bmw-m3-competition-g80-510hp-1.jpeg",
    condition: "new",
  },
  {
    id: 5,
    name: "BMW X5",
    price: 65000,
    year: 2022,
    mileage: 25000,
    transmission: "Automatic",
    fuel: "Hybrid",
    location: "Chicago, IL",
    image: "/cars/bmw-m3.webp",
    condition: "used",
    isHotDeal: true,
  },
  {
    id: 6,
    name: "BMW 5 Series",
    price: 58000,
    year: 2023,
    mileage: 12000,
    transmission: "Automatic",
    fuel: "Petrol",
    location: "Houston, TX",
    image: "/cars/bmw-m3(1).webp",
    condition: "new",
  },

  // Toyota Models
  {
    id: 7,
    name: "Toyota Camry",
    price: 32000,
    year: 2023,
    mileage: 18000,
    transmission: "Automatic",
    fuel: "Hybrid",
    location: "Phoenix, AZ",
    image: "/cars/toyota-camry.jpg",
    condition: "new",
  },
  {
    id: 8,
    name: "Toyota RAV4",
    price: 35000,
    year: 2023,
    mileage: 15000,
    transmission: "Automatic",
    fuel: "Hybrid",
    location: "Seattle, WA",
    image: "/cars/Toyota-RAV4-Hybrid-036.jpg",
    condition: "new",
    isHotDeal: true,
  },
  {
    id: 9,
    name: "Toyota Highlander",
    price: 42000,
    year: 2022,
    mileage: 28000,
    transmission: "Automatic",
    fuel: "Petrol",
    location: "Denver, CO",
    image: "/cars/24-toyota-rav4-magnetic-gray-metallic.png",
    condition: "used",
  },

  // Honda Models
  {
    id: 10,
    name: "Honda Civic",
    price: 28000,
    year: 2023,
    mileage: 12000,
    transmission: "CVT",
    fuel: "Petrol",
    location: "Atlanta, GA",
    image: "/cars/honda-civic-type-r.jpg",
    condition: "new",
  },
  {
    id: 11,
    name: "Honda CR-V",
    price: 34000,
    year: 2023,
    mileage: 16000,
    transmission: "CVT",
    fuel: "Hybrid",
    location: "Boston, MA",
    image: "/cars/2023-Honda-CR-V-e-HEV-RS-6.webp",
    condition: "used",
    isHotDeal: true,
  },
  {
    id: 12,
    name: "Honda Accord",
    price: 31000,
    year: 2020,
    mileage: 45000,
    transmission: "CVT",
    fuel: "Hybrid",
    location: "Portland, OR",
    image: "/cars/honda-accord-facelift-china-03.avif",
    condition: "used",
  }
];

export default function BuyPageClient() {
  // Get condition parameter from URL if available
  const searchParams = useSearchParams();
  const conditionParam = searchParams.get("condition");
  
  // State for managing filters and search
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    minYear: "",
    maxYear: "",
    transmission: "",
    fuel: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCondition, setSelectedCondition] = useState(conditionParam || "all");
  const [filteredCars, setFilteredCars] = useState(sampleCars);

  // Update selected condition when URL parameter changes
  useEffect(() => {
    if (conditionParam) {
      setSelectedCondition(conditionParam);
    }
  }, [conditionParam]);

  /**
   * Filter cars based on all selected criteria
   * This effect runs whenever any filter option or search query changes
   */
  useEffect(() => {
    let filtered = [...sampleCars];

    // Filter by car condition (new, used) or hot deals
    if (selectedCondition !== "all") {
      if (selectedCondition === "hot-deals") {
        filtered = filtered.filter(car => car.isHotDeal);
      } else {
        filtered = filtered.filter(car => car.condition === selectedCondition);
      }
    }

    // Apply price range filter if specified
    if (filters.minPrice !== "") {
      filtered = filtered.filter(car => car.price >= parseInt(filters.minPrice));
    }
    if (filters.maxPrice !== "") {
      filtered = filtered.filter(car => car.price <= parseInt(filters.maxPrice));
    }

    // Apply year range filter if specified
    if (filters.minYear !== "") {
      filtered = filtered.filter(car => car.year >= parseInt(filters.minYear));
    }
    if (filters.maxYear !== "") {
      filtered = filtered.filter(car => car.year <= parseInt(filters.maxYear));
    }

    // Filter by transmission type if specified
    if (filters.transmission !== "") {
      filtered = filtered.filter(car => 
        car.transmission.toLowerCase() === filters.transmission.toLowerCase()
      );
    }

    // Filter by fuel type if specified
    if (filters.fuel !== "") {
      filtered = filtered.filter(car => 
        car.fuel.toLowerCase() === filters.fuel.toLowerCase()
      );
    }

    // Apply search query to filter by name, location, fuel, or transmission
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(car => 
        car.name.toLowerCase().includes(query) ||
        car.location.toLowerCase().includes(query) ||
        car.fuel.toLowerCase().includes(query) ||
        car.transmission.toLowerCase().includes(query)
      );
    }

    // Update the filtered cars state
    setFilteredCars(filtered);
  }, [filters, searchQuery, selectedCondition]);

  /**
   * Handle changes to filter values
   * @param {string} filterType - The type of filter to update
   * @param {any} value - The new value for the filter
   */
  const handleFilterChange = (filterType, value) => {
    if (filterType === "reset") {
      // Reset all filters to default values
      setFilters({
        minPrice: "",
        maxPrice: "",
        minYear: "",
        maxYear: "",
        transmission: "",
        fuel: "",
      });
      setSearchQuery("");
    } else {
      // Update the specific filter
      setFilters(prev => ({
        ...prev,
        [filterType]: value
      }));
    }
  };

  /**
   * Handle change of car condition filter
   * @param {string} condition - The condition to filter by (all, new, used, hot-deals)
   */
  const handleConditionChange = (condition) => {
    setSelectedCondition(condition);
  };

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      
      {/* Page Header with title and search functionality */}
      <div className="pt-24 pb-8 px-4 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Find Your Perfect Car</h1>
        <p className="text-gray-400">Browse our selection of quality vehicles</p>
        
        {/* Search Bar for keyword-based filtering */}
        <div className="mt-6 relative">
          <input
            type="text"
            placeholder="Search by make, model, or keyword..."
            className="w-full py-3 px-4 pr-12 rounded-lg bg-secondary text-white border border-gray-700 focus:border-accent focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && searchQuery.trim() !== "") {
                // Save search to history
                addToSearchHistory({
                  query: searchQuery,
                  filters: {
                    condition: selectedCondition !== "all" ? selectedCondition : null,
                    minPrice: filters.minPrice || null,
                    maxPrice: filters.maxPrice || null,
                    transmission: filters.transmission || null,
                    fuel: filters.fuel || null,
                    minYear: filters.minYear || null,
                    maxYear: filters.maxYear || null
                  }
                });
              }
            }}
          />
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" />
        </div>
      </div>
      
      {/* Condition Filter Tabs (All, New, Used, Hot Deals) */}
      <div className="pb-8 px-4 max-w-7xl mx-auto">
        <ConditionFilter 
          selectedCondition={selectedCondition} 
          onConditionChange={handleConditionChange} 
        />
      </div>
      
      {/* Main Content Area - Sidebar and Car Listings */}
      <div className="px-4 pb-16 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar - Advanced Filtering Options */}
        <div className="lg:col-span-1">
          <Filter filters={filters} onFilterChange={handleFilterChange} />
          
          {/* Recent Searches */}
          <div className="mt-6">
            <SearchHistory 
              limit={5} 
              onSelectSearch={(searchItem) => {
                // Apply the search query
                setSearchQuery(searchItem.query || "");
                
                // Apply the filters if they exist
                if (searchItem.filters) {
                  // Update condition filter
                  if (searchItem.filters.condition) {
                    setSelectedCondition(searchItem.filters.condition);
                  }
                  
                  // Update other filters
                  setFilters(prev => ({
                    ...prev,
                    minPrice: searchItem.filters.minPrice || "",
                    maxPrice: searchItem.filters.maxPrice || "",
                    transmission: searchItem.filters.transmission || "",
                    fuel: searchItem.filters.fuel || "",
                    minYear: searchItem.filters.minYear || "",
                    maxYear: searchItem.filters.maxYear || ""
                  }));
                }
              }}
            />
          </div>
        </div>
        
        {/* Right Area - Car Cards or Empty State */}
        <div className="lg:col-span-3">
          {filteredCars.length > 0 ? (
            // Display grid of car cards when results exist
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCars.map((car, index) => (
                <CarCard key={car.id} car={car} index={index} />
              ))}
            </div>
          ) : (
            // Display empty state when no cars match filters
            <div className="bg-secondary rounded-lg p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">No cars found</h3>
              <p className="text-gray-400 mb-4">Try adjusting your filters or search query</p>
              <button
                onClick={() => handleFilterChange("reset")}
                className="bg-accent text-white py-2 px-4 rounded-lg hover:bg-accent/90 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 