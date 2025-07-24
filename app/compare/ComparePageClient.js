"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";
import { 
  XMarkIcon,
  ArrowLeftIcon,
  PlusCircleIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";

// Sample car data - in a real app, this would come from an API
const sampleCars = [
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
    specs: {
      engine: "Dual Motor",
      power: "283 kW",
      acceleration: "3.1 sec (0-60 mph)",
      topSpeed: "162 mph",
      range: "358 miles",
      seatingCapacity: 5,
      cargoSpace: "23 cu ft"
    }
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
    specs: {
      engine: "Dual Motor",
      power: "300 kW",
      acceleration: "3.5 sec (0-60 mph)",
      topSpeed: "155 mph",
      range: "330 miles",
      seatingCapacity: 5,
      cargoSpace: "76 cu ft"
    }
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
    specs: {
      engine: "Tri Motor",
      power: "760 kW",
      acceleration: "1.99 sec (0-60 mph)",
      topSpeed: "200 mph",
      range: "396 miles",
      seatingCapacity: 5,
      cargoSpace: "28 cu ft"
    }
  },
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
    specs: {
      engine: "3.0L Twin-Turbo Inline-6",
      power: "503 hp",
      acceleration: "3.8 sec (0-60 mph)",
      topSpeed: "180 mph",
      fuelEconomy: "16 city / 23 hwy",
      seatingCapacity: 5,
      cargoSpace: "13 cu ft"
    }
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
    specs: {
      engine: "3.0L Turbo Inline-6 + Electric Motor",
      power: "389 hp",
      acceleration: "5.3 sec (0-60 mph)",
      topSpeed: "130 mph",
      fuelEconomy: "21 city / 25 hwy",
      seatingCapacity: 5,
      cargoSpace: "33.9 cu ft"
    }
  }
];

export default function ComparePageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Parse car IDs from URL query parameters
  const initialCarIds = searchParams ? 
    searchParams.get('cars')?.split(',').map(id => parseInt(id, 10)).filter(id => !isNaN(id)) : 
    [];

  const [selectedCars, setSelectedCars] = useState([]);
  const [availableCars, setAvailableCars] = useState([]);
  const [showCarSelector, setShowCarSelector] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Initialize selected cars based on URL parameters
  useEffect(() => {
    if (initialCarIds && initialCarIds.length > 0) {
      const carsToCompare = sampleCars.filter(car => initialCarIds.includes(car.id));
      setSelectedCars(carsToCompare);
      
      // Set available cars that aren't already selected
      setAvailableCars(sampleCars.filter(car => !initialCarIds.includes(car.id)));
    } else {
      setAvailableCars(sampleCars);
    }
  }, []);

  // Filter available cars based on search term
  const filteredCars = availableCars.filter(car => 
    car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.fuel.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.year.toString().includes(searchTerm)
  );

  // Add a car to comparison
  const addCarToCompare = (car) => {
    setSelectedCars([...selectedCars, car]);
    setAvailableCars(availableCars.filter(c => c.id !== car.id));
    setShowCarSelector(false);
  };

  // Remove a car from comparison
  const removeCarFromCompare = (carId) => {
    const carToRemove = selectedCars.find(car => car.id === carId);
    if (carToRemove) {
      setSelectedCars(selectedCars.filter(car => car.id !== carId));
      setAvailableCars([...availableCars, carToRemove]);
    }
  };

  // Update URL when selected cars change
  useEffect(() => {
    if (selectedCars.length > 0) {
      const carIds = selectedCars.map(car => car.id).join(',');
      router.push(`/compare?cars=${carIds}`, { scroll: false });
    } else {
      router.push('/compare', { scroll: false });
    }
  }, [selectedCars, router]);

  // Define comparison categories and specs to display
  const comparisonCategories = [
    { 
      name: "Basic Information",
      specs: ["year", "price", "mileage", "transmission", "fuel", "location"]
    },
    { 
      name: "Performance",
      specs: ["specs.engine", "specs.power", "specs.acceleration", "specs.topSpeed"]
    },
    { 
      name: "Features",
      specs: ["specs.range", "specs.fuelEconomy", "specs.seatingCapacity", "specs.cargoSpace"]
    }
  ];

  // Helper function to get nested property value
  const getPropertyValue = (obj, path) => {
    return path.split('.').reduce((prev, curr) => 
      prev && prev[curr] !== undefined ? prev[curr] : "N/A", obj
    );
  };

  // Format property for display
  const formatProperty = (property, value) => {
    if (property === "price") return `$${value.toLocaleString()}`;
    if (property === "mileage") return `${value.toLocaleString()} miles`;
    return value;
  };

  // Get property label for display
  const getPropertyLabel = (property) => {
    const labels = {
      "year": "Year",
      "price": "Price",
      "mileage": "Mileage",
      "transmission": "Transmission",
      "fuel": "Fuel Type",
      "location": "Location",
      "specs.engine": "Engine",
      "specs.power": "Power",
      "specs.acceleration": "0-60 mph",
      "specs.topSpeed": "Top Speed",
      "specs.range": "Range",
      "specs.fuelEconomy": "Fuel Economy",
      "specs.seatingCapacity": "Seats",
      "specs.cargoSpace": "Cargo Space"
    };
    return labels[property] || property;
  };

  return (
    <>
      <Navbar />
      <PageTransition>
        <div className="min-h-screen bg-primary pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-8">
              <Link 
                href="/cars" 
                className="text-accent hover:text-accent/80 flex items-center"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back to Car Listings
              </Link>
              <h1 className="text-2xl font-bold text-white ml-4">Car Comparison</h1>
            </div>

            {/* Car Comparison Table */}
            <div className="bg-secondary rounded-lg shadow-lg overflow-hidden mb-8">
              {selectedCars.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    {/* Header Row with Car Images and Names */}
                    <thead>
                      <tr>
                        <th className="py-3 px-4 bg-secondary/80 text-left text-sm font-medium text-gray-300 w-1/4">
                          Comparison
                        </th>
                        {selectedCars.map(car => (
                          <th key={car.id} className="py-3 px-4 bg-secondary/80 text-center">
                            <div className="flex flex-col items-center">
                              <div className="relative h-32 w-full mb-2">
                                <Image 
                                  src={car.image} 
                                  alt={car.name} 
                                  fill
                                  className="object-cover rounded-md"
                                />
                                <button 
                                  onClick={() => removeCarFromCompare(car.id)}
                                  className="absolute top-2 right-2 bg-secondary/80 hover:bg-secondary text-white p-1 rounded-full"
                                >
                                  <XMarkIcon className="h-5 w-5" />
                                </button>
                              </div>
                              <h3 className="text-white font-medium">{car.name}</h3>
                              <p className="text-accent text-sm">${car.price.toLocaleString()}</p>
                            </div>
                          </th>
                        ))}
                        {selectedCars.length < 3 && (
                          <th className="py-3 px-4 bg-secondary/80 text-center">
                            <button 
                              onClick={() => setShowCarSelector(true)}
                              className="flex flex-col items-center justify-center h-32 w-full border-2 border-dashed border-gray-600 rounded-md hover:border-accent/60 transition-colors"
                            >
                              <PlusCircleIcon className="h-10 w-10 text-gray-400" />
                              <span className="text-gray-400 mt-2">Add Car</span>
                            </button>
                          </th>
                        )}
                      </tr>
                    </thead>

                    {/* Table Body with Comparison Data */}
                    <tbody className="divide-y divide-gray-700">
                      {comparisonCategories.map((category, categoryIndex) => (
                        <React.Fragment key={categoryIndex}>
                          <tr className="bg-primary/40">
                            <td colSpan={selectedCars.length + 2} className="py-2 px-4 font-medium text-white">
                              {category.name}
                            </td>
                          </tr>
                          {category.specs.map((spec, specIndex) => (
                            <tr key={`${categoryIndex}-${specIndex}`} className={specIndex % 2 === 0 ? "bg-secondary/40" : "bg-secondary/20"}>
                              <td className="py-3 px-4 text-sm font-medium text-gray-300">
                                {getPropertyLabel(spec)}
                              </td>
                              {selectedCars.map(car => (
                                <td key={car.id} className="py-3 px-4 text-center text-white">
                                  {formatProperty(spec, getPropertyValue(car, spec))}
                                </td>
                              ))}
                              {selectedCars.length < 3 && <td className="py-3 px-4"></td>}
                            </tr>
                          ))}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-16 text-center">
                  <p className="text-gray-400 mb-4">No cars selected for comparison</p>
                  <button 
                    onClick={() => setShowCarSelector(true)}
                    className="inline-flex items-center px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90"
                  >
                    <PlusCircleIcon className="h-5 w-5 mr-2" />
                    Add Cars to Compare
                  </button>
                </div>
              )}
            </div>
            
            {/* Share and Print Buttons */}
            {selectedCars.length > 0 && (
              <div className="flex justify-end mb-8 space-x-4">
                <button 
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary/80"
                >
                  Print Comparison
                </button>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Comparison URL copied to clipboard!");
                  }}
                  className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90"
                >
                  Share Comparison
                </button>
              </div>
            )}
            
            {/* Recommended Cars Section */}
            <div className="bg-secondary rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Popular Comparisons</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link 
                  href="/compare?cars=1,2" 
                  className="flex items-center p-4 bg-primary rounded-lg hover:bg-primary/80"
                >
                  <div className="flex-1">
                    <h3 className="text-white font-medium">Tesla Model 3 vs Model Y</h3>
                    <p className="text-gray-400 text-sm">Compare Tesla's most popular models</p>
                  </div>
                  <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                </Link>
                <Link 
                  href="/compare?cars=1,4" 
                  className="flex items-center p-4 bg-primary rounded-lg hover:bg-primary/80"
                >
                  <div className="flex-1">
                    <h3 className="text-white font-medium">Tesla Model 3 vs BMW M3</h3>
                    <p className="text-gray-400 text-sm">Electric vs Petrol Performance</p>
                  </div>
                  <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                </Link>
                <Link 
                  href="/compare?cars=3,5" 
                  className="flex items-center p-4 bg-primary rounded-lg hover:bg-primary/80"
                >
                  <div className="flex-1">
                    <h3 className="text-white font-medium">Tesla Model S vs BMW X5</h3>
                    <p className="text-gray-400 text-sm">Luxury Electric vs Hybrid SUV</p>
                  </div>
                  <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                </Link>
              </div>
            </div>
          </div>

          {/* Car Selector Modal */}
          {showCarSelector && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
              <div className="bg-secondary rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                  <h2 className="text-xl font-bold text-white">Select a Car to Compare</h2>
                  <button 
                    onClick={() => setShowCarSelector(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="p-4 border-b border-gray-700">
                  <input
                    type="text"
                    placeholder="Search cars by name, year, or fuel type..."
                    className="w-full bg-primary border border-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="overflow-y-auto max-h-[60vh] p-2">
                  {filteredCars.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
                      {filteredCars.map(car => (
                        <div 
                          key={car.id} 
                          className="flex bg-primary rounded-lg overflow-hidden hover:bg-primary/80 cursor-pointer"
                          onClick={() => addCarToCompare(car)}
                        >
                          <div className="w-1/3 relative h-24">
                            <Image 
                              src={car.image} 
                              alt={car.name} 
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="w-2/3 p-3">
                            <h3 className="text-white font-medium line-clamp-1">{car.name}</h3>
                            <p className="text-accent text-sm">${car.price.toLocaleString()}</p>
                            <div className="flex items-center text-xs text-gray-400 mt-1">
                              <span>{car.year}</span>
                              <span className="mx-1">•</span>
                              <span>{car.fuel}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center text-gray-400">
                      No cars found matching your search criteria
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </PageTransition>
      <Footer />
    </>
  );
} 