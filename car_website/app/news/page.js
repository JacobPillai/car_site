"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";

// Sample news data
const newsArticles = [
  {
    id: 1,
    title: "CarHub Launches Advanced Search Features",
    excerpt: "Find your perfect car faster with our new AI-powered search and filtering system.",
    date: "April 15, 2024",
    category: "Platform Updates",
    image: "/images/news/search-features.jpg"
  },
  {
    id: 2,
    title: "Electric Vehicle Inventory Expanded",
    excerpt: "We've added thousands of new electric vehicles to our platform as demand continues to grow.",
    date: "March 28, 2024",
    category: "Inventory",
    image: "/images/news/ev-expansion.jpg"
  },
  {
    id: 3,
    title: "New Financing Options Available",
    excerpt: "CarHub partners with leading banks to offer competitive financing rates for vehicle purchases.",
    date: "March 10, 2024",
    category: "Financing",
    image: "/images/news/financing.jpg"
  },
  {
    id: 4,
    title: "Industry Report: SUV Sales Continue to Dominate Market",
    excerpt: "Our latest analysis shows SUVs maintaining their position as the most popular vehicle category.",
    date: "February 22, 2024",
    category: "Market Trends",
    image: "/images/news/suv-trend.jpg"
  },
  {
    id: 5,
    title: "CarHub Mobile App Now Available",
    excerpt: "Search, save, and purchase vehicles on the go with our new mobile application.",
    date: "February 5, 2024",
    category: "Platform Updates",
    image: "/images/news/mobile-app.jpg"
  },
  {
    id: 6,
    title: "Tips for Buying Used Cars in 2024",
    excerpt: "Our experts share essential advice for making smart used car purchasing decisions this year.",
    date: "January 18, 2024",
    category: "Buying Guide",
    image: "/images/news/used-cars.jpg"
  }
];

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const categories = ["All", ...new Set(newsArticles.map(article => article.category))];
  
  const filteredArticles = selectedCategory === "All" 
    ? newsArticles 
    : newsArticles.filter(article => article.category === selectedCategory);

  return (
    <>
      <Navbar />
      <PageTransition>
        <div className="pt-24 pb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">Automotive News & Updates</h1>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Stay informed about the latest developments in the automotive industry and important updates about our platform.
              </p>
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category 
                      ? "bg-accent text-white" 
                      : "bg-secondary text-white hover:bg-accent/20"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map(article => (
                <div key={article.id} className="bg-secondary rounded-lg shadow-lg overflow-hidden">
                  <div className="h-48 bg-gray-700 relative">
                    {/* Image would be here in production */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm text-gray-400">Image: {article.title}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      <span className="text-xs font-medium text-accent bg-accent/10 rounded-full px-2.5 py-0.5">
                        {article.category}
                      </span>
                      <span className="text-xs text-gray-400 ml-2">
                        {article.date}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2 hover:text-accent transition-colors">
                      <Link href={`/news/${article.id}`}>
                        {article.title}
                      </Link>
                    </h2>
                    <p className="text-gray-300 mb-4">
                      {article.excerpt}
                    </p>
                    <Link 
                      href={`/news/${article.id}`}
                      className="text-accent hover:text-accent/80 font-medium flex items-center"
                    >
                      Read more
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Subscribe Section */}
            <div className="bg-secondary rounded-lg shadow-lg p-8 mt-16">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-white mb-4">Stay Updated</h2>
                <p className="text-gray-300 mb-6">
                  Subscribe to our newsletter to receive the latest automotive news, CarHub updates, and exclusive offers.
                </p>
                <form className="flex flex-col sm:flex-row gap-2 justify-center">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="bg-primary border border-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent sm:w-80"
                  />
                  <button 
                    type="submit" 
                    className="bg-accent hover:bg-accent/90 transition-colors text-white font-medium py-2 px-6 rounded-md"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
      <Footer />
    </>
  );
} 