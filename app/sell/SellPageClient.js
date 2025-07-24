"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import OptimizedImage from "../components/OptimizedImage";
import RevealOnScroll from "../components/RevealOnScroll";
import { ArrowRightIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import emailjs from "@emailjs/browser";

export default function SellPageClient() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  
  // Set initial tab based on URL parameter
  const [activeTab, setActiveTab] = useState("sellCar");
  
  useEffect(() => {
    // Initialize EmailJS with the public key
    emailjs.init("gJ-E18JRSDyKcCUpy");
    
    // If tab parameter is "dealer", set the active tab to "becomeDealer"
    if (tabParam === "dealer") {
      setActiveTab("becomeDealer");
    }
  }, [tabParam]);
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  // Car selling form state
  const [carForm, setCarForm] = useState({
    make: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    condition: "used",
    transmission: "automatic",
    fuel: "petrol",
    description: "",
    images: [],
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    location: ""
  });
  
  // Dealer application form state
  const [dealerForm, setDealerForm] = useState({
    businessName: "",
    businessType: "individual",
    yearEstablished: "",
    monthlyVolume: "",
    businessAddress: "",
    websiteUrl: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    comments: ""
  });
  
  function handleCarFormChange(e) {
    const { name, value, files } = e.target;
    
    if (name === "images" && files) {
      setCarForm({
        ...carForm,
        images: files
      });
    } else {
      setCarForm({
        ...carForm,
        [name]: value
      });
    }
  }
  
  function handleDealerFormChange(e) {
    const { name, value } = e.target;
    setDealerForm({
      ...dealerForm,
      [name]: value
    });
  }
  
  async function handleCarFormSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    
    try {
      console.log("Car form submitted:", carForm);
      
      // Format car details for email
      const carDetails = `
        Make: ${carForm.make}
        Model: ${carForm.model}
        Year: ${carForm.year}
        Price: ${carForm.price}
        Mileage: ${carForm.mileage}
        Condition: ${carForm.condition}
        Transmission: ${carForm.transmission}
        Fuel Type: ${carForm.fuel}
        Description: ${carForm.description}
        Location: ${carForm.location}
      `;
      
      // Send email using EmailJS
      await emailjs.send(
        "default_service", // Service ID from EmailJS dashboard
        "sell_car_form", // Template ID from EmailJS dashboard
        {
          from_name: carForm.contactName,
          reply_to: carForm.contactEmail,
          phone: carForm.contactPhone,
          car_details: carDetails,
          to_email: "jacobjayenpillai@gmail.com"
        },
        "gJ-E18JRSDyKcCUpy" // Public key
      );
      
      setFormSubmitted(true);
    } catch (error) {
      console.error("Error submitting car form:", error);
      setErrorMessage("Failed to submit form. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }
  
  async function handleDealerFormSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    
    try {
      console.log("Dealer form submitted:", dealerForm);
      
      // Format dealer details for email
      const dealerDetails = `
        Business Name: ${dealerForm.businessName}
        Business Type: ${dealerForm.businessType}
        Year Established: ${dealerForm.yearEstablished}
        Monthly Volume: ${dealerForm.monthlyVolume}
        Business Address: ${dealerForm.businessAddress}
        Website URL: ${dealerForm.websiteUrl}
        Comments: ${dealerForm.comments}
      `;
      
      // Send email using EmailJS
      await emailjs.send(
        "default_service", // Service ID from EmailJS dashboard
        "dealer_signup_form", // Template ID from EmailJS dashboard
        {
          from_name: dealerForm.contactName,
          reply_to: dealerForm.contactEmail,
          phone: dealerForm.contactPhone,
          dealer_details: dealerDetails,
          to_email: "jacobjayenpillai@gmail.com"
        },
        "gJ-E18JRSDyKcCUpy" // Public key
      );
      
      setFormSubmitted(true);
    } catch (error) {
      console.error("Error submitting dealer form:", error);
      setErrorMessage("Failed to submit form. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function resetForm() {
    setFormSubmitted(false);
    setErrorMessage("");
    if (activeTab === "sellCar") {
      setCarForm({
        make: "",
        model: "",
        year: "",
        price: "",
        mileage: "",
        condition: "used",
        transmission: "automatic",
        fuel: "petrol",
        description: "",
        images: [],
        contactName: "",
        contactEmail: "",
        contactPhone: "",
        location: ""
      });
    } else {
      setDealerForm({
        businessName: "",
        businessType: "individual",
        yearEstablished: "",
        monthlyVolume: "",
        businessAddress: "",
        websiteUrl: "",
        contactName: "",
        contactEmail: "",
        contactPhone: "",
        comments: ""
      });
    }
  }

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 px-4 bg-gradient-to-r from-secondary to-secondary/70 text-white">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Sell With CarHub</h1>
            <p className="text-xl text-center mb-8">The fastest way to sell your car or become a dealer partner</p>
          </RevealOnScroll>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-12 px-4 bg-primary">
        <div className="max-w-7xl mx-auto">
          {/* Tabs Navigation */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                className={`px-6 py-3 text-sm font-medium rounded-l-lg ${
                  activeTab === "sellCar"
                    ? "bg-accent text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
                onClick={() => setActiveTab("sellCar")}
              >
                Sell Your Car
              </button>
              <button
                type="button"
                className={`px-6 py-3 text-sm font-medium rounded-r-lg ${
                  activeTab === "becomeDealer"
                    ? "bg-accent text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
                onClick={() => setActiveTab("becomeDealer")}
              >
                Become a Dealer
              </button>
            </div>
          </div>
          
          {/* Content Area */}
          <div className="bg-secondary rounded-xl shadow-xl p-6 md:p-8">
            {formSubmitted ? (
              // Success Message
              <div className="text-center py-16">
                <CheckCircleIcon className="h-16 w-16 mx-auto text-green-500 mb-4" />
                <h2 className="text-2xl font-bold mb-4">
                  {activeTab === "sellCar" 
                    ? "Your car listing has been submitted!" 
                    : "Your dealer application has been received!"}
                </h2>
                <p className="text-gray-300 mb-8 max-w-md mx-auto">
                  {activeTab === "sellCar"
                    ? "We'll review your listing and it will be live on our platform shortly. Our team might contact you for additional details."
                    : "We'll review your application and get back to you within 2-3 business days to discuss the next steps."}
                </p>
                <button
                  onClick={resetForm}
                  className="px-6 py-3 bg-accent hover:bg-accent/80 text-white rounded-md font-medium transition-colors"
                >
                  Submit Another
                </button>
              </div>
            ) : (
              // Forms
              <>
                {/* Error Message */}
                {errorMessage && (
                  <div className="bg-red-500/20 border border-red-500 text-white p-4 rounded-md mb-6">
                    <p>{errorMessage}</p>
                  </div>
                )}
                
                {/* Sell Your Car Form */}
                {activeTab === "sellCar" && (
                  <RevealOnScroll>
                    <h2 className="text-2xl font-bold mb-6">List Your Car For Sale</h2>
                    <p className="text-gray-300 mb-8">
                      Fill out the form below to list your car on CarHub. The more details you provide, the faster your car will sell.
                    </p>
                    
                    <form onSubmit={handleCarFormSubmit} className="space-y-6">
                      {/* Car Details Section */}
                      <div className="bg-gray-800/50 p-5 rounded-lg">
                        <h3 className="text-lg font-semibold mb-4 text-accent">Car Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="make" className="block text-sm font-medium text-gray-300 mb-1">
                              Make *
                            </label>
                            <input
                              type="text"
                              id="make"
                              name="make"
                              value={carForm.make}
                              onChange={handleCarFormChange}
                              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="model" className="block text-sm font-medium text-gray-300 mb-1">
                              Model *
                            </label>
                            <input
                              type="text"
                              id="model"
                              name="model"
                              value={carForm.model}
                              onChange={handleCarFormChange}
                              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="year" className="block text-sm font-medium text-gray-300 mb-1">
                              Year *
                            </label>
                            <input
                              type="number"
                              id="year"
                              name="year"
                              min="1900"
                              max="2099"
                              value={carForm.year}
                              onChange={handleCarFormChange}
                              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">
                              Price ($) *
                            </label>
                            <input
                              type="number"
                              id="price"
                              name="price"
                              min="0"
                              value={carForm.price}
                              onChange={handleCarFormChange}
                              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="mileage" className="block text-sm font-medium text-gray-300 mb-1">
                              Mileage *
                            </label>
                            <input
                              type="number"
                              id="mileage"
                              name="mileage"
                              min="0"
                              value={carForm.mileage}
                              onChange={handleCarFormChange}
                              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="condition" className="block text-sm font-medium text-gray-300 mb-1">
                              Condition
                            </label>
                            <select
                              id="condition"
                              name="condition"
                              value={carForm.condition}
                              onChange={handleCarFormChange}
                              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                            >
                              <option value="new">New</option>
                              <option value="used">Used</option>
                              <option value="certified">Certified Pre-Owned</option>
                            </select>
                          </div>
                          <div>
                            <label htmlFor="transmission" className="block text-sm font-medium text-gray-300 mb-1">
                              Transmission
                            </label>
                            <select
                              id="transmission"
                              name="transmission"
                              value={carForm.transmission}
                              onChange={handleCarFormChange}
                              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                            >
                              <option value="automatic">Automatic</option>
                              <option value="manual">Manual</option>
                              <option value="cvt">CVT</option>
                              <option value="semi-automatic">Semi-Automatic</option>
                            </select>
                          </div>
                          <div>
                            <label htmlFor="fuel" className="block text-sm font-medium text-gray-300 mb-1">
                              Fuel Type
                            </label>
                            <select
                              id="fuel"
                              name="fuel"
                              value={carForm.fuel}
                              onChange={handleCarFormChange}
                              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                            >
                              <option value="petrol">Petrol</option>
                              <option value="diesel">Diesel</option>
                              <option value="electric">Electric</option>
                              <option value="hybrid">Hybrid</option>
                              <option value="plug-in-hybrid">Plug-in Hybrid</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Description Section */}
                      <div className="bg-gray-800/50 p-5 rounded-lg">
                        <h3 className="text-lg font-semibold mb-4 text-accent">Description & Images</h3>
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                              Description *
                            </label>
                            <textarea
                              id="description"
                              name="description"
                              rows="4"
                              value={carForm.description}
                              onChange={handleCarFormChange}
                              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                              placeholder="Describe your car's features, condition, and any other important details"
                              required
                            ></textarea>
                          </div>
                          <div>
                            <label htmlFor="images" className="block text-sm font-medium text-gray-300 mb-1">
                              Upload Images *
                            </label>
                            <input
                              type="file"
                              id="images"
                              name="images"
                              onChange={handleCarFormChange}
                              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                              accept="image/*"
                              multiple
                              required
                            />
                            <p className="text-xs text-gray-400 mt-1">
                              Upload up to 10 high-quality images (max 5MB each). The first image will be used as the main image.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Contact Information Section */}
                      <div className="bg-gray-800/50 p-5 rounded-lg">
                        <h3 className="text-lg font-semibold mb-4 text-accent">Contact Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="contactName" className="block text-sm font-medium text-gray-300 mb-1">
                              Name *
                            </label>
                            <input
                              type="text"
                              id="contactName"
                              name="contactName"
                              value={carForm.contactName}
                              onChange={handleCarFormChange}
                              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-300 mb-1">
                              Email *
                            </label>
                            <input
                              type="email"
                              id="contactEmail"
                              name="contactEmail"
                              value={carForm.contactEmail}
                              onChange={handleCarFormChange}
                              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-300 mb-1">
                              Phone *
                            </label>
                            <input
                              type="tel"
                              id="contactPhone"
                              name="contactPhone"
                              value={carForm.contactPhone}
                              onChange={handleCarFormChange}
                              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">
                              Location *
                            </label>
                            <input
                              type="text"
                              id="location"
                              name="location"
                              value={carForm.location}
                              onChange={handleCarFormChange}
                              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                              placeholder="City, State"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="flex justify-center mt-6">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`px-8 py-3 bg-accent hover:bg-accent/80 text-white rounded-md font-medium transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                          {isSubmitting ? 'Submitting...' : 'Post Your Car'}
                        </button>
                      </div>
                    </form>
                  </RevealOnScroll>
                )}

                {/* Become a Dealer Form */}
                {activeTab === "becomeDealer" && (
                  <RevealOnScroll>
                    <h2 className="text-2xl font-bold mb-6">Become a CarHub Dealer</h2>
                    <p className="text-gray-300 mb-8">
                      Join our network of trusted dealers and expand your business. Fill out the application form below to get started.
                    </p>
                    
                    <form onSubmit={handleDealerFormSubmit} className="space-y-6">
                      {/* Business Information Section */}
                      <div className="bg-gray-800/50 p-5 rounded-lg">
                        <h3 className="text-lg font-semibold mb-4 text-accent">Business Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="businessName" className="block text-sm font-medium text-gray-300 mb-1">
                              Business/Dealer Name *
                            </label>
                            <input
                              type="text"
                              id="businessName"
                              name="businessName"
                              value={dealerForm.businessName}
                              onChange={handleDealerFormChange}
                              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="businessType" className="block text-sm font-medium text-gray-300 mb-1">
                              Business Type
                            </label>
                            <select
                              id="businessType"
                              name="businessType"
                              value={dealerForm.businessType}
                              onChange={handleDealerFormChange}
                              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                            >
                              <option value="individual">Individual Dealer</option>
                              <option value="dealership">Dealership</option>
                              <option value="broker">Car Broker</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                          <div>
                            <label htmlFor="yearEstablished" className="block text-sm font-medium text-gray-300 mb-1">
                              Year Established
                            </label>
                            <input
                              type="number"
                              id="yearEstablished"
                              name="yearEstablished"
                              min="1900"
                              max="2099"
                              value={dealerForm.yearEstablished}
                              onChange={handleDealerFormChange}
                              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                            />
                          </div>
                          <div>
                            <label htmlFor="monthlyVolume" className="block text-sm font-medium text-gray-300 mb-1">
                              Average Monthly Sales Volume
                            </label>
                            <select
                              id="monthlyVolume"
                              name="monthlyVolume"
                              value={dealerForm.monthlyVolume}
                              onChange={handleDealerFormChange}
                              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                            >
                              <option value="">Select...</option>
                              <option value="1-5">1-5 cars</option>
                              <option value="6-15">6-15 cars</option>
                              <option value="16-30">16-30 cars</option>
                              <option value="31-50">31-50 cars</option>
                              <option value="50+">50+ cars</option>
                            </select>
                          </div>
                          <div className="md:col-span-2">
                            <label htmlFor="businessAddress" className="block text-sm font-medium text-gray-300 mb-1">
                              Business Address *
                            </label>
                            <input
                              type="text"
                              id="businessAddress"
                              name="businessAddress"
                              value={dealerForm.businessAddress}
                              onChange={handleDealerFormChange}
                              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                              required
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label htmlFor="websiteUrl" className="block text-sm font-medium text-gray-300 mb-1">
                              Website URL
                            </label>
                            <input
                              type="url"
                              id="websiteUrl"
                              name="websiteUrl"
                              value={dealerForm.websiteUrl}
                              onChange={handleDealerFormChange}
                              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                              placeholder="https://example.com"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Contact Information Section */}
                      <div className="bg-gray-800/50 p-5 rounded-lg">
                        <h3 className="text-lg font-semibold mb-4 text-accent">Contact Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="contactName" className="block text-sm font-medium text-gray-300 mb-1">
                              Contact Person *
                            </label>
                            <input
                              type="text"
                              id="contactName"
                              name="contactName"
                              value={dealerForm.contactName}
                              onChange={handleDealerFormChange}
                              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-300 mb-1">
                              Email *
                            </label>
                            <input
                              type="email"
                              id="contactEmail"
                              name="contactEmail"
                              value={dealerForm.contactEmail}
                              onChange={handleDealerFormChange}
                              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                              required
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-300 mb-1">
                              Phone *
                            </label>
                            <input
                              type="tel"
                              id="contactPhone"
                              name="contactPhone"
                              value={dealerForm.contactPhone}
                              onChange={handleDealerFormChange}
                              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Additional Information Section */}
                      <div className="bg-gray-800/50 p-5 rounded-lg">
                        <h3 className="text-lg font-semibold mb-4 text-accent">Additional Information</h3>
                        <div>
                          <label htmlFor="comments" className="block text-sm font-medium text-gray-300 mb-1">
                            Tell us about your business and why you'd like to join CarHub
                          </label>
                          <textarea
                            id="comments"
                            name="comments"
                            rows="4"
                            value={dealerForm.comments}
                            onChange={handleDealerFormChange}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                            placeholder="Share your experience in the automotive industry and your goals for partnering with CarHub"
                          ></textarea>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="flex justify-center mt-6">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`px-8 py-3 bg-accent hover:bg-accent/80 text-white rounded-md font-medium transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                          {isSubmitting ? 'Submitting...' : 'Submit Application'}
                        </button>
                      </div>
                    </form>
                  </RevealOnScroll>
                )}
              </>
            )}
          </div>
        </div>
      </section>
      
      {/* Why Sell With Us Section */}
      <section className="py-16 px-4 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <h2 className="text-3xl font-bold mb-12 text-center">Why Sell With CarHub?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-gray-800 rounded-xl p-6 shadow-md">
                <div className="h-14 w-14 bg-accent/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl text-accent">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">Reach More Buyers</h3>
                <p className="text-gray-300 text-center">
                  Our platform connects you with thousands of potential buyers actively looking for vehicles like yours.
                </p>
              </div>
              
              {/* Card 2 */}
              <div className="bg-gray-800 rounded-xl p-6 shadow-md">
                <div className="h-14 w-14 bg-accent/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl text-accent">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">Safe & Secure</h3>
                <p className="text-gray-300 text-center">
                  We verify all buyers and provide secure communication channels to protect your personal information.
                </p>
              </div>
              
              {/* Card 3 */}
              <div className="bg-gray-800 rounded-xl p-6 shadow-md">
                <div className="h-14 w-14 bg-accent/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl text-accent">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">Dealer Support</h3>
                <p className="text-gray-300 text-center">
                  Our dealer partners can help facilitate transactions, handle paperwork, and provide additional services.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
      
      {/* Dealer Benefits Section */}
      {activeTab === "becomeDealer" && (
        <section className="py-16 px-4 bg-primary">
          <div className="max-w-7xl mx-auto">
            <RevealOnScroll>
              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="md:w-1/2">
                  <h2 className="text-3xl font-bold mb-6">Benefits of Being a CarHub Dealer</h2>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-accent mr-2 flex-shrink-0 mt-0.5" />
                      <span>Access to our growing network of car buyers and sellers</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-accent mr-2 flex-shrink-0 mt-0.5" />
                      <span>Premium listing positions on our marketplace</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-accent mr-2 flex-shrink-0 mt-0.5" />
                      <span>Dedicated dealer dashboard with advanced analytics</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-accent mr-2 flex-shrink-0 mt-0.5" />
                      <span>Marketing support to expand your customer base</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-accent mr-2 flex-shrink-0 mt-0.5" />
                      <span>Regular lead generation for your inventory</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-accent mr-2 flex-shrink-0 mt-0.5" />
                      <span>Commission-based earnings from facilitating private seller transactions</span>
                    </li>
                  </ul>
                </div>
                <div className="md:w-1/2">
                  <div className="relative rounded-xl overflow-hidden shadow-xl h-80">
                    <OptimizedImage
                      src="/cars/bmw-m3-interior.png"
                      alt="Car dealer showroom"
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">Join Our Dealer Network</h3>
                        <p className="text-sm text-gray-200">
                          Whether you're an established dealership or an individual looking to break into the automotive sales industry, 
                          we have partnership options for you.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>
      )}
      
      {/* FAQs Section */}
      <section className="py-16 px-4 bg-secondary">
        <div className="max-w-4xl mx-auto">
          <RevealOnScroll>
            <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">How much does it cost to list my car?</h3>
                <p className="text-gray-300">
                  Basic listings are completely free. Premium listings with enhanced visibility start at $29.99 for a 30-day listing period.
                </p>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">How long does the dealer application process take?</h3>
                <p className="text-gray-300">
                  After submitting your application, our team will review it within 2-3 business days. If approved, you'll receive an onboarding package with all the information needed to get started.
                </p>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Can I edit my listing after it's posted?</h3>
                <p className="text-gray-300">
                  Yes, you can edit or update your listing at any time through your account dashboard. You can also remove your listing if your car sells through other channels.
                </p>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">What are the requirements to become a dealer?</h3>
                <p className="text-gray-300">
                  Requirements vary by location, but typically include a business license, dealer license (if applicable in your region), proof of insurance, and a good standing in the automotive industry.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
      
      <Footer />
    </>
  );
} 