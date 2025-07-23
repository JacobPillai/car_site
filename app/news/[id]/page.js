"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// Sample news data (same as in the news page)
const newsArticles = [
  {
    id: 1,
    title: "CarHub Launches Advanced Search Features",
    excerpt: "Find your perfect car faster with our new AI-powered search and filtering system.",
    date: "April 15, 2024",
    category: "Platform Updates",
    image: "/images/news/search-features.jpg",
    content: `
      <p>CarHub is excited to announce the launch of our new advanced search features, designed to help users find their ideal vehicle faster and with greater precision than ever before.</p>
      
      <p>Our AI-powered search system now incorporates machine learning algorithms that understand user preferences and behavior, creating a more personalized car shopping experience. The new search capabilities include:</p>
      
      <ul>
        <li>Enhanced filtering options that allow for more specific vehicle criteria</li>
        <li>Predictive search that anticipates what users are looking for</li>
        <li>Visual search functionality allowing users to find similar cars based on appearance</li>
        <li>Price trend analysis to help users determine the best time to buy</li>
      </ul>
      
      <p>"We've invested heavily in making our search technology as intuitive and powerful as possible," says Jane Smith, CarHub's Chief Technology Officer. "Our goal is to reduce the time it takes for customers to find their perfect vehicle by at least 40%."</p>
      
      <p>The platform update also includes improvements to the user interface, making navigation more intuitive and responsive across all devices.</p>
      
      <p>These new features are available immediately to all CarHub users. Simply log in to your account or create a new one to experience the enhanced search capabilities.</p>
    `
  },
  {
    id: 2,
    title: "Electric Vehicle Inventory Expanded",
    excerpt: "We've added thousands of new electric vehicles to our platform as demand continues to grow.",
    date: "March 28, 2024",
    category: "Inventory",
    image: "/images/news/ev-expansion.jpg",
    content: `
      <p>In response to growing consumer demand for electric vehicles, CarHub has significantly expanded its EV inventory, adding over 5,000 new electric vehicles to our platform this month alone.</p>
      
      <p>This expansion includes vehicles from all major EV manufacturers, including Tesla, Rivian, Lucid, Ford, Volkswagen, and more. The new inventory spans various price points, making electric vehicles more accessible to a wider range of buyers.</p>
      
      <p>"We're seeing unprecedented interest in electric vehicles," explains Michael Johnson, Director of Inventory at CarHub. "By expanding our EV selection, we're ensuring that our platform remains the go-to destination for environmentally conscious car shoppers."</p>
      
      <p>The expanded inventory includes:</p>
      
      <ul>
        <li>Luxury electric sedans and SUVs</li>
        <li>Mid-range family-friendly electric vehicles</li>
        <li>More affordable entry-level EVs</li>
        <li>Commercial electric vehicles and vans</li>
      </ul>
      
      <p>To support this growing segment, CarHub has also enhanced its EV-specific search filters and information resources. Shoppers can now filter by electric range, charging time, and availability of federal or state incentives.</p>
      
      <p>Additionally, we've developed comprehensive guides to help first-time EV buyers understand the unique aspects of electric vehicle ownership, from home charging setup to battery maintenance.</p>
    `
  },
  // Additional articles would be included here with similar structure
  {
    id: 3,
    title: "New Financing Options Available",
    excerpt: "CarHub partners with leading banks to offer competitive financing rates for vehicle purchases.",
    date: "March 10, 2024",
    category: "Financing",
    image: "/images/news/financing.jpg",
    content: `<p>Sample content for article 3</p>`
  },
  {
    id: 4,
    title: "Industry Report: SUV Sales Continue to Dominate Market",
    excerpt: "Our latest analysis shows SUVs maintaining their position as the most popular vehicle category.",
    date: "February 22, 2024",
    category: "Market Trends",
    image: "/images/news/suv-trend.jpg",
    content: `<p>Sample content for article 4</p>`
  },
  {
    id: 5,
    title: "CarHub Mobile App Now Available",
    excerpt: "Search, save, and purchase vehicles on the go with our new mobile application.",
    date: "February 5, 2024",
    category: "Platform Updates",
    image: "/images/news/mobile-app.jpg",
    content: `<p>Sample content for article 5</p>`
  },
  {
    id: 6,
    title: "Tips for Buying Used Cars in 2024",
    excerpt: "Our experts share essential advice for making smart used car purchasing decisions this year.",
    date: "January 18, 2024",
    category: "Buying Guide",
    image: "/images/news/used-cars.jpg",
    content: `<p>Sample content for article 6</p>`
  }
];

// This function is required for static site generation with dynamic routes
export function generateStaticParams() {
  return newsArticles.map((article) => ({
    id: article.id.toString(),
  }));
}

export default function NewsArticle() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState(null);
  
  useEffect(() => {
    if (params.id) {
      const foundArticle = newsArticles.find(a => a.id === parseInt(params.id));
      if (foundArticle) {
        setArticle(foundArticle);
      } else {
        router.push('/news');
      }
    }
  }, [params.id, router]);
  
  if (!article) {
    return (
      <>
        <Navbar />
        <div className="pt-24 pb-16 min-h-screen">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-white">Loading article...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/news" className="text-accent hover:text-accent/80 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Back to News
            </Link>
          </div>
          
          <div className="bg-secondary rounded-lg shadow-lg overflow-hidden">
            <div className="h-64 bg-gray-700 relative">
              {/* Image would be here in production */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm text-gray-400">Featured Image: {article.title}</span>
              </div>
            </div>
            
            <div className="p-8">
              <div className="flex items-center mb-4">
                <span className="text-sm font-medium text-accent bg-accent/10 rounded-full px-3 py-1">
                  {article.category}
                </span>
                <span className="text-sm text-gray-400 ml-3">
                  {article.date}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-white mb-6">{article.title}</h1>
              
              <div 
                className="text-gray-300 prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>
          </div>
          
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">Related Articles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {newsArticles
                .filter(a => a.id !== article.id && a.category === article.category)
                .slice(0, 2)
                .map(relatedArticle => (
                  <div key={relatedArticle.id} className="bg-secondary rounded-lg shadow-lg overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center mb-2">
                        <span className="text-xs font-medium text-accent bg-accent/10 rounded-full px-2.5 py-0.5">
                          {relatedArticle.category}
                        </span>
                        <span className="text-xs text-gray-400 ml-2">
                          {relatedArticle.date}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-white mb-2 hover:text-accent transition-colors">
                        <Link href={`/news/${relatedArticle.id}`}>
                          {relatedArticle.title}
                        </Link>
                      </h2>
                      <p className="text-gray-300 mb-4">
                        {relatedArticle.excerpt}
                      </p>
                      <Link 
                        href={`/news/${relatedArticle.id}`}
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
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
} 