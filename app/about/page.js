"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";

export default function About() {
  return (
    <>
      <Navbar />
      <PageTransition>
        <div className="pt-24 pb-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center text-white mb-12">About CarHub</h1>
            
            <div className="bg-secondary rounded-lg shadow-lg p-8 mb-12">
              <h2 className="text-2xl font-semibold text-accent mb-6">Our Mission</h2>
              <p className="text-white text-lg mb-4">
                At CarHub, we're committed to revolutionizing how people buy, sell, and discover vehicles online. We provide a transparent, efficient platform that connects car buyers with sellers, making automobile transactions simpler and more secure than ever before.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-secondary rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-accent mb-4">Extensive Selection</h3>
                <p className="text-white">
                  Access thousands of vehicles from private sellers and trusted dealers all in one place, with comprehensive filtering tools to find your perfect match.
                </p>
              </div>
              
              <div className="bg-secondary rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-accent mb-4">Transparent Process</h3>
                <p className="text-white">
                  We provide detailed vehicle histories, fair price indicators, and verified seller profiles to ensure you make informed decisions with confidence.
                </p>
              </div>
              
              <div className="bg-secondary rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-accent mb-4">Seamless Experience</h3>
                <p className="text-white">
                  From search to purchase, our platform streamlines every step with secure payment processing, scheduling test drives, and financing options all built in.
                </p>
              </div>
            </div>
            
            <div className="bg-secondary rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-accent mb-6">Why Choose CarHub?</h2>
              <div className="space-y-4">
                <p className="text-white text-lg">
                  <span className="text-accent font-medium">✓</span> Save time and money with our advanced matching algorithms that connect you with the right vehicles faster
                </p>
                <p className="text-white text-lg">
                  <span className="text-accent font-medium">✓</span> Eliminate hassle with our streamlined buying and selling process
                </p>
                <p className="text-white text-lg">
                  <span className="text-accent font-medium">✓</span> Get peace of mind with our verification systems and secure transaction platform
                </p>
                <p className="text-white text-lg">
                  <span className="text-accent font-medium">✓</span> Access exclusive deals and financing options not available elsewhere
                </p>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
      <Footer />
    </>
  );
} 