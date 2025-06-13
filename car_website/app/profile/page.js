"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";
import { 
  PencilIcon, 
  CameraIcon, 
  EyeIcon, 
  ClockIcon, 
  TagIcon, 
  StarIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  UserCircleIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";

export default function ProfilePage() {
  // Mock user data - in a real app, this would come from an API or context
  const [userData, setUserData] = useState({
    name: "Jacob Jayen Pillai",
    username: "jacob_j",
    email: "j2038073@student.newinti.edu.my",
    phone: "016-612 8291",
    location: "Kuala Lumpur, Malaysia",
    bio: "Car enthusiast with a passion for classic models and modern performance vehicles. Looking to buy and sell quality cars at fair prices.",
    profileType: "Private Seller",
    interests: ["Classic Cars", "Sports Cars", "Electric Vehicles", "Car Restoration", "Auto Shows"],
    profileImage: "/images/profile-placeholder.svg",
    coverImage: "/images/cover-placeholder.svg",
    stats: {
      listingsActive: 2,
      listingsExpired: 1,
      savedCars: 5,
      totalViews: 128,
      ctr: "3.2%"
    },
    listings: [
      {
        id: "CAR12345",
        title: "2020 Honda Civic Type R",
        price: 125000,
        plateNumber: "WXC 5678",
        package: "Premium",
        expiryDate: "2025-05-15",
        views: 78,
        image: "/cars/honda-civic-type-r.jpg"
      },
      {
        id: "CAR67890",
        title: "2018 BMW M3 Competition",
        price: 180000,
        plateNumber: "VTR 1234",
        package: "Advanced",
        expiryDate: "2025-04-30",
        views: 50,
        image: "/cars/bmw-m3-competition-g80-510hp-1.jpeg"
      }
    ]
  });

  // Refs for file inputs
  const profilePhotoInputRef = useRef(null);
  const coverPhotoInputRef = useRef(null);

  // Handle profile photo change
  const handleProfilePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserData(prev => ({
          ...prev,
          profileImage: event.target.result
        }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Handle cover photo change
  const handleCoverPhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserData(prev => ({
          ...prev,
          coverImage: event.target.result
        }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <>
      <Navbar />
      <PageTransition>
        <div className="min-h-screen bg-primary">
          {/* Cover Photo Section */}
          <div className="relative h-64 md:h-80 lg:h-96 w-full bg-gray-800">
            <div className="absolute inset-0 overflow-hidden">
              {userData.coverImage ? (
                <Image 
                  src={userData.coverImage} 
                  alt="Cover photo"
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-accent/30 to-accent/10" />
              )}
            </div>
            
            {/* Cover photo edit button */}
            <button 
              onClick={() => coverPhotoInputRef.current.click()}
              className="absolute right-4 bottom-4 bg-secondary/80 hover:bg-secondary text-white p-2 rounded-full"
            >
              <CameraIcon className="h-5 w-5" />
            </button>
            <input 
              type="file" 
              ref={coverPhotoInputRef} 
              onChange={handleCoverPhotoChange} 
              className="hidden" 
              accept="image/*"
            />
          </div>

          {/* Profile Header Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
              {/* Profile Photo */}
              <div className="relative">
                <div className="h-40 w-40 rounded-full border-4 border-primary overflow-hidden bg-secondary">
                  {userData.profileImage ? (
                    <Image 
                      src={userData.profileImage} 
                      alt={userData.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <UserCircleIcon className="h-full w-full text-gray-400" />
                  )}
                </div>
                <button 
                  onClick={() => profilePhotoInputRef.current.click()}
                  className="absolute bottom-2 right-2 bg-accent hover:bg-accent/90 text-white p-2 rounded-full"
                >
                  <CameraIcon className="h-5 w-5" />
                </button>
                <input 
                  type="file" 
                  ref={profilePhotoInputRef} 
                  onChange={handleProfilePhotoChange} 
                  className="hidden" 
                  accept="image/*"
                />
              </div>

              {/* Name and Basic Info */}
              <div className="flex-grow pt-4 md:pb-6">
                <h1 className="text-3xl font-bold text-white">{userData.name}</h1>
                <div className="flex items-center mt-1 text-gray-300">
                  <span className="bg-accent/20 text-accent px-2 py-1 rounded-full text-xs font-medium">
                    {userData.profileType}
                  </span>
                  <span className="mx-2">•</span>
                  <span className="text-sm">@{userData.username}</span>
                </div>
                <div className="flex items-center mt-2 text-gray-300 text-sm">
                  <MapPinIcon className="h-4 w-4 mr-1" />
                  <span>{userData.location}</span>
                </div>
              </div>

              {/* Edit Profile Button */}
              <div className="md:mb-6">
                <Link href="/profile/edit" className="inline-flex items-center px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-md">
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Bio and Personal Info */}
              <div className="lg:col-span-1">
                <div className="bg-secondary rounded-lg shadow-lg p-6 mb-6">
                  <h2 className="text-xl font-semibold text-white mb-4">About</h2>
                  <p className="text-gray-300">{userData.bio}</p>
                  
                  <div className="mt-6 pt-6 border-t border-gray-700">
                    <h3 className="text-lg font-medium text-white mb-3">Contact Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-300">
                        <EnvelopeIcon className="h-5 w-5 mr-3 text-accent" />
                        <span>{userData.email}</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <PhoneIcon className="h-5 w-5 mr-3 text-accent" />
                        <span>{userData.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">Interests</h2>
                  <div className="flex flex-wrap gap-2">
                    {userData.interests.map((interest, index) => (
                      <span 
                        key={index}
                        className="bg-primary px-3 py-1 rounded-full text-sm text-gray-300"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Stats and Listings */}
              <div className="lg:col-span-2">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-secondary rounded-lg shadow p-4 text-center">
                    <div className="text-2xl font-bold text-accent">{userData.stats.listingsActive}</div>
                    <div className="text-sm text-gray-400">Active Listings</div>
                  </div>
                  <div className="bg-secondary rounded-lg shadow p-4 text-center">
                    <div className="text-2xl font-bold text-accent">{userData.stats.savedCars}</div>
                    <div className="text-sm text-gray-400">Saved Cars</div>
                  </div>
                  <div className="bg-secondary rounded-lg shadow p-4 text-center">
                    <div className="text-2xl font-bold text-accent">{userData.stats.totalViews}</div>
                    <div className="text-sm text-gray-400">Total Views</div>
                  </div>
                  <div className="bg-secondary rounded-lg shadow p-4 text-center">
                    <div className="text-2xl font-bold text-accent">{userData.stats.ctr}</div>
                    <div className="text-sm text-gray-400">CTR</div>
                  </div>
                </div>

                {/* Active Listings */}
                <div className="bg-secondary rounded-lg shadow-lg p-6 mb-6">
                  <h2 className="text-xl font-semibold text-white mb-4">Your Active Listings</h2>
                  
                  {userData.listings.length > 0 ? (
                    <div className="space-y-4">
                      {userData.listings.map((listing) => (
                        <div key={listing.id} className="flex flex-col md:flex-row bg-primary rounded-lg overflow-hidden">
                          {/* Car Image */}
                          <div className="md:w-1/3 h-48 relative">
                            <Image 
                              src={listing.image} 
                              alt={listing.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          
                          {/* Listing Details */}
                          <div className="p-4 md:w-2/3">
                            <div className="flex justify-between">
                              <h3 className="text-lg font-medium text-white">{listing.title}</h3>
                              <span className="text-accent font-semibold">RM {listing.price.toLocaleString()}</span>
                            </div>
                            
                            <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-gray-300">
                              <div className="flex items-center">
                                <TagIcon className="h-4 w-4 mr-1 text-gray-400" />
                                ID: {listing.id}
                              </div>
                              <div className="flex items-center">
                                <StarIcon className="h-4 w-4 mr-1 text-gray-400" />
                                Package: {listing.package}
                              </div>
                              <div className="flex items-center">
                                <ClockIcon className="h-4 w-4 mr-1 text-gray-400" />
                                Expires: {new Date(listing.expiryDate).toLocaleDateString()}
                              </div>
                              <div className="flex items-center">
                                <EyeIcon className="h-4 w-4 mr-1 text-gray-400" />
                                Views: {listing.views}
                              </div>
                            </div>
                            
                            <div className="mt-3 flex items-center text-sm">
                              <ShieldCheckIcon className="h-4 w-4 mr-1 text-accent" />
                              <span className="text-gray-300">Plate: {listing.plateNumber}</span>
                            </div>
                            
                            <div className="mt-4 flex space-x-3">
                              <Link href={`/car/${listing.id}`} className="px-3 py-1 bg-accent hover:bg-accent/90 text-white rounded-md text-sm">
                                View Listing
                              </Link>
                              <button className="px-3 py-1 bg-primary border border-accent text-accent hover:bg-accent/10 rounded-md text-sm">
                                Edit Listing
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      <p>You don't have any active listings.</p>
                      <Link href="/sell-your-car" className="mt-2 inline-block text-accent hover:text-accent/80">
                        Sell your car now
                      </Link>
                    </div>
                  )}
                </div>
                
                {/* Saved Cars */}
                <div className="bg-secondary rounded-lg shadow-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-white">Saved Cars</h2>
                    <Link href="/saved-cars" className="text-accent hover:text-accent/80 text-sm">
                      View All
                    </Link>
                  </div>
                  
                  <div className="text-center py-8 text-gray-400">
                    <p>View all your saved cars in one place.</p>
                    <Link href="/saved-cars" className="mt-2 inline-block text-accent hover:text-accent/80">
                      Go to saved cars
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
      <Footer />
    </>
  );
} 