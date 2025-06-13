"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PageTransition from "../../components/PageTransition";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function EditProfilePage() {
  const router = useRouter();
  
  // Mock user data - in a real app, this would come from an API or context
  const [formData, setFormData] = useState({
    name: "Jacob Jayen Pillai",
    username: "jacob_j",
    email: "j2038073@student.newinti.edu.my",
    phone: "016-612 8291",
    location: "Kuala Lumpur, Malaysia",
    bio: "Car enthusiast with a passion for classic models and modern performance vehicles. Looking to buy and sell quality cars at fair prices.",
    interests: "Classic Cars, Sports Cars, Electric Vehicles, Car Restoration, Auto Shows"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', content: '' });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would be an API call to update the user profile
      console.log("Profile updated:", formData);
      
      setMessage({
        type: 'success',
        content: 'Profile updated successfully!'
      });
      
      // Navigate back to profile page after successful update
      setTimeout(() => {
        router.push('/profile');
      }, 1500);
      
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({
        type: 'error',
        content: 'Failed to update profile. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <PageTransition>
        <div className="min-h-screen bg-primary py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <Link 
                href="/profile" 
                className="inline-flex items-center text-accent hover:text-accent/80"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back to Profile
              </Link>
            </div>
            
            <div className="bg-secondary rounded-lg shadow-lg p-8">
              <h1 className="text-2xl font-bold text-white mb-6">Edit Profile</h1>
              
              {message.content && (
                <div className={`mb-6 p-3 rounded ${
                  message.type === 'success' ? 'bg-green-500/20 border border-green-500 text-green-300' : 
                  'bg-red-500/20 border border-red-500 text-red-300'
                }`}>
                  {message.content}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-primary border border-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                        Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full bg-primary border border-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-primary border border-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-primary border border-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full bg-primary border border-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-1">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={4}
                      className="w-full bg-primary border border-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="interests" className="block text-sm font-medium text-gray-300 mb-1">
                      Interests (comma separated)
                    </label>
                    <textarea
                      id="interests"
                      name="interests"
                      value={formData.interests}
                      onChange={handleChange}
                      rows={2}
                      className="w-full bg-primary border border-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Enter your interests separated by commas (e.g., "Classic Cars, Sports Cars")
                    </p>
                  </div>
                  
                  <div className="flex justify-end pt-4">
                    <Link 
                      href="/profile"
                      className="px-4 py-2 border border-gray-600 text-gray-300 rounded-md mr-4 hover:bg-gray-700"
                    >
                      Cancel
                    </Link>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </PageTransition>
      <Footer />
    </>
  );
} 