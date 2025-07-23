"use client"; // This is a client-side component

import { useState } from "react"; // This is a react component that allows us to use state in our component
import Link from "next/link"; // This is a next.js component that allows us to use links in our component
import Navbar from "./components/Navbar"; // This is a navbar component that allows us to use the navbar in our component
import CarCard from "./components/CarCard"; // This is a car card component that allows us to use the car card in our component
import Filter from "./components/Filter"; // This is a filter component that allows us to use the filter in our component
import { MagnifyingGlassIcon, MapPinIcon, SparklesIcon, StarIcon, HeartIcon, ArrowRightIcon } from "@heroicons/react/24/outline"; // This is a heroicons component that allows us to use the heroicons in our component
import { ArrowRightIcon as ArrowRightSolid } from "@heroicons/react/24/solid"; // This is a heroicons component that allows us to use the heroicons in our component
import OptimizedImage from "./components/OptimizedImage"; // This is an optimized image component that allows us to use optimized images in our component
import RevealOnScroll from "./components/RevealOnScroll"; // This is a reveal on scroll component that allows us to use the reveal on scroll in our component
import Footer from "./components/Footer"; // This is a footer component that allows us to use the footer in our component

// Sample car data (same as before)
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
    isHotDeal: true,
  },
  // ... rest of the car data with isHotDeal property added where appropriate
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
    isHotDeal: true,
  },
  {
    id: 12,
    name: "Honda Accord",
    price: 31000,
    year: 2023,
    mileage: 14000,
    transmission: "CVT",
    fuel: "Hybrid",
    location: "Portland, OR",
    image: "/cars/honda-accord-facelift-china-03.avif",
  }
];

// Vehicle types with images
const vehicleTypes = [
  { name: "Sedan", count: 1240, image: "/cars/tesla-model-3-white.jpg" },
  { name: "SUV", count: 850, image: "/cars/Toyota-RAV4-Hybrid-036.jpg" },
  { name: "Hatchback", count: 430, image: "/cars/honda-civic-type-r.jpg" },
  { name: "Convertible", count: 120, image: "/cars/bmw-m3-competition-g80-510hp-1.jpeg" },
  { name: "Truck", count: 380, image: "/cars/tesla-model-s-performance.jpg" },
  { name: "Van", count: 210, image: "/cars/honda-accord-facelift-china-03.avif" },
];

// Popular brands
const popularBrands = [
  { name: "Tesla", count: 320, logo: "/cars/tesla-model-3-white.jpg" },
  { name: "BMW", count: 410, logo: "/cars/bmw-m3-competition-g80-510hp-1.jpeg" },
  { name: "Toyota", count: 720, logo: "/cars/Toyota-RAV4-Hybrid-036.jpg" },
  { name: "Honda", count: 680, logo: "/cars/honda-accord-facelift-china-03.avif" },
  { name: "Ford", count: 420, logo: "/cars/toyota-camry.jpg" },
  { name: "Mercedes", count: 310, logo: "/cars/bmw-m3.webp" },
];

export default function Home() {
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    minYear: "",
    maxYear: "",
    transmission: "",
    fuel: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");

  const handleFilterChange = (filterType, value) => {
    if (filterType === "reset") {
      setFilters({
        minPrice: "",
        maxPrice: "",
        minYear: "",
        maxYear: "",
        transmission: "",
        fuel: "",
      });
    } else {
      setFilters((prev) => ({
        ...prev,
        [filterType]: value,
      }));
    }
  };

  // Filter cars based on the current filters and tab
  const filteredCars = sampleCars.filter((car) => {
    // Handle tab filtering
    if (selectedTab === "hotDeals" && !car.isHotDeal) return false;

    // Handle search query
    if (searchQuery && !car.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;

    // Handle other filters
    if (filters.minPrice && car.price < Number(filters.minPrice)) return false;
    if (filters.maxPrice && car.price > Number(filters.maxPrice)) return false;
    if (filters.minYear && car.year < Number(filters.minYear)) return false;
    if (filters.maxYear && car.year > Number(filters.maxYear)) return false;
    if (filters.transmission && car.transmission.toLowerCase() !== filters.transmission.toLowerCase()) return false;
    if (filters.fuel && car.fuel.toLowerCase() !== filters.fuel.toLowerCase()) return false;
    return true;
  });

  const hotDeals = sampleCars.filter(car => car.isHotDeal).slice(0, 4);

  return (
    <>
      <Navbar />
      
      {/* Hero Search Section */}
      <section className="pt-28 pb-20 px-4 bg-gradient-to-r from-secondary to-secondary/70 text-white">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Find Your Perfect Car</h1>
            <p className="text-xl text-center mb-10 text-white">Browse through thousands of cars for sale</p>
          </RevealOnScroll>

          {/* Search Box */}
          <RevealOnScroll delay={0.1}>
            <div className="bg-white rounded-xl shadow-2xl p-6 max-w-4xl mx-auto">
              {/* Tabs */}
              <div className="flex mb-6 border-b border-gray-200">
                <button 
                  className={`pb-3 px-4 font-medium ${selectedTab === 'all' ? 'text-accent border-b-2 border-accent' : 'text-gray-700'}`}
                  onClick={() => setSelectedTab('all')}
                >
                  All Cars
                </button>
                <button 
                  className={`pb-3 px-4 font-medium ${selectedTab === 'new' ? 'text-accent border-b-2 border-accent' : 'text-gray-700'}`}
                  onClick={() => setSelectedTab('new')}
                >
                  New Cars
                </button>
                <button 
                  className={`pb-3 px-4 font-medium ${selectedTab === 'used' ? 'text-accent border-b-2 border-accent' : 'text-gray-700'}`}
                  onClick={() => setSelectedTab('used')}
                >
                  Used Cars
                </button>
                <button 
                  className={`pb-3 px-4 font-medium ${selectedTab === 'hotDeals' ? 'text-accent border-b-2 border-accent' : 'text-gray-700'}`}
                  onClick={() => setSelectedTab('hotDeals')}
                >
                  Hot Deals
                </button>
              </div>

              {/* Search Input */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-600" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search for make, model, or keyword"
                    className="pl-10 pr-4 py-3 w-full bg-gray-100 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none text-gray-800"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button className="px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors flex items-center justify-center">
                  Search
                </button>
              </div>

              {/* Additional search options */}
              <div className="mt-4 flex flex-wrap gap-2 text-sm text-gray-700">
                <span className="font-medium">Popular:</span>
                <button className="hover:text-accent">Tesla</button>
                <button className="hover:text-accent">BMW</button>
                <button className="hover:text-accent">Toyota</button>
                <button className="hover:text-accent">Electric</button>
                <button className="hover:text-accent">SUV</button>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Hot Deals Section */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Hot Deals</h2>
                <p className="text-gray-500">Special offers you don't want to miss</p>
              </div>
              <Link href="/hot-deals" className="text-accent flex items-center hover:underline">
                View all <ArrowRightSolid className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hotDeals.map((car, index) => (
              <RevealOnScroll key={car.id} delay={index * 0.1}>
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <div className="relative h-48">
                    <OptimizedImage
                      src={car.image}
                      alt={car.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      HOT DEAL
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{car.name}</h3>
                    <p className="text-accent font-bold text-xl">${car.price.toLocaleString()}</p>
                    <div className="mt-2 text-sm text-gray-500">
                      <div className="flex items-center justify-between mb-1">
                        <span>{car.year}</span>
                        <span>{car.mileage.toLocaleString()} km</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>{car.transmission}</span>
                        <span>{car.fuel}</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Link
                        href={`/cars/${car.id}`}
                        className="w-full block text-center py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Browse by Category</h2>
              <p className="text-gray-500">Find the perfect vehicle type for your needs</p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {vehicleTypes.map((type, index) => (
              <RevealOnScroll key={type.name} delay={index * 0.1}>
                <Link href={`/category/${type.name.toLowerCase()}`} className="group">
                  <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                    <div className="relative h-32">
                      <OptimizedImage 
                        src={type.image} 
                        alt={type.name}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    </div>
                    <div className="p-3 text-center">
                      <h3 className="font-medium text-gray-800">{type.name}</h3>
                      <p className="text-sm text-gray-500">{type.count} cars</p>
                    </div>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Brands */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Popular Brands</h2>
              <p className="text-gray-500">Browse cars from top manufacturers</p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {popularBrands.map((brand, index) => (
              <RevealOnScroll key={brand.name} delay={index * 0.1}>
                <Link href={`/brand/${brand.name.toLowerCase()}`}>
                  <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 text-center">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden">
                      <OptimizedImage 
                        src={brand.logo} 
                        alt={brand.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <h3 className="font-medium text-gray-800">{brand.name}</h3>
                    <p className="text-sm text-gray-500">{brand.count} cars</p>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Listings Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Featured Listings</h2>
                <p className="text-gray-500">Handpicked cars for you</p>
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100">
                  New
                </button>
                <button className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90">
                  Used
                </button>
              </div>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.slice(0, 6).map((car, index) => (
              <RevealOnScroll key={car.id} delay={index * 0.1}>
                <CarCard car={car} index={index} />
              </RevealOnScroll>
            ))}
          </div>
          
          <RevealOnScroll delay={0.3}>
            <div className="mt-10 text-center">
              <Link 
                href="/cars" 
                className="inline-flex items-center justify-center px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors"
              >
                View All Cars <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-gradient-to-r from-secondary to-secondary/70 text-white">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold mb-2">Why Choose CarHub</h2>
              <p className="text-gray-300">We make finding your dream car simple and stress-free</p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <RevealOnScroll delay={0.1}>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="bg-accent/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <SparklesIcon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
                <p className="text-gray-300">Thousands of vehicles to choose from, all in one place</p>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.2}>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="bg-accent/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <StarIcon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
                <p className="text-gray-300">Detailed vehicle history and transparent listings</p>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.3}>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="bg-accent/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <HeartIcon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Customer First</h3>
                <p className="text-gray-300">Dedicated support to help you find your perfect car</p>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.4}>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="bg-accent/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <MapPinIcon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Nationwide Coverage</h3>
                <p className="text-gray-300">Find cars near you with our location-based search</p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <RevealOnScroll>
          <div className="max-w-4xl mx-auto bg-accent rounded-2xl overflow-hidden shadow-xl">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to sell your car?</h2>
                <p className="text-white/80 mb-6">List your car on CarHub and reach thousands of potential buyers today.</p>
                <Link 
                  href="/sell-your-car" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-accent font-semibold rounded-lg hover:bg-gray-100 transition-colors max-w-xs"
                >
                  Sell Your Car <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
              </div>
              <div className="md:w-1/2 h-64 md:h-auto relative">
                <OptimizedImage
                  src="/cars/tesla-model-s-performance.jpg"
                  alt="Sell your car"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
} 