"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ShieldCheckIcon, 
  LockClosedIcon, 
  MapPinIcon, 
  MicrophoneIcon,
  CameraIcon,
  ClockIcon,
  UserIcon,
  CheckIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import { ShieldCheckIcon as ShieldCheckIconSolid } from "@heroicons/react/24/solid";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PageTransition from "../../components/PageTransition";

export default function PrivacySettingsPage() {
  // State for tracking privacy settings
  const [settings, setSettings] = useState({
    locationTracking: true,
    dataSharing: true,
    searchHistory: true,
    browseTelemetry: true,
    microphone: false,
    camera: false
  });
  
  // State for notification when settings are saved
  const [showSaveNotification, setShowSaveNotification] = useState(false);
  
  // Load settings from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSettings = localStorage.getItem('carhub_privacy_settings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    }
  }, []);
  
  // Handle toggle change for a setting
  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };
  
  // Save settings to localStorage
  const saveSettings = () => {
    localStorage.setItem('carhub_privacy_settings', JSON.stringify(settings));
    setShowSaveNotification(true);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      setShowSaveNotification(false);
    }, 3000);
  };
  
  // Reset all settings to defaults
  const resetToDefaults = () => {
    const defaultSettings = {
      locationTracking: true,
      dataSharing: true,
      searchHistory: true,
      browseTelemetry: true,
      microphone: false,
      camera: false
    };
    
    setSettings(defaultSettings);
    localStorage.setItem('carhub_privacy_settings', JSON.stringify(defaultSettings));
    setShowSaveNotification(true);
    
    setTimeout(() => {
      setShowSaveNotification(false);
    }, 3000);
  };
  
  // Delete all saved data
  const deleteAllData = () => {
    // In a real app, this would call an API to delete user data
    alert("In a production environment, this would delete all your saved data from our servers.");
    
    // For demo purposes, just clear localStorage
    localStorage.removeItem('carhub_saved_cars');
    localStorage.removeItem('carhub_search_history');
    localStorage.removeItem('carhub_browsing_history');
    
    // Keep privacy settings
    setShowSaveNotification(true);
    setTimeout(() => {
      setShowSaveNotification(false);
    }, 3000);
  };

  return (
    <>
      <Navbar />
      <PageTransition>
        <div className="min-h-screen bg-primary pt-28 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-white">Privacy Settings</h1>
                <p className="text-gray-400 mt-1">Control how your data is used and collected</p>
              </div>
              <ShieldCheckIconSolid className="h-12 w-12 text-accent" />
            </div>
            
            {/* Privacy Introduction */}
            <div className="bg-secondary rounded-lg p-6 mb-8">
              <h2 className="text-lg font-medium text-white mb-2">Your Privacy Matters</h2>
              <p className="text-gray-400 mb-4">
                Recent research by Mozilla Foundation has identified cars as one of the worst product categories for privacy.
                At CarHub, we take your privacy seriously and give you control over your data.
              </p>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center text-white">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span>You control what data is collected</span>
                </div>
                <div className="flex items-center text-white">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span>You can delete your data at any time</span>
                </div>
                <div className="flex items-center text-white">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span>We never sell your personal information to third parties</span>
                </div>
              </div>
            </div>
            
            {/* Settings Sections */}
            <div className="space-y-6">
              {/* Location Data Section */}
              <div className="bg-secondary rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-700 flex items-center">
                  <MapPinIcon className="h-6 w-6 text-accent mr-3" />
                  <h2 className="text-lg font-medium text-white">Location Data</h2>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-white font-medium">Location Tracking</h3>
                      <p className="text-gray-400 text-sm mt-1">
                        Allow us to use your location to show relevant cars and dealers near you
                      </p>
                    </div>
                    <button 
                      onClick={() => handleToggle('locationTracking')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                        settings.locationTracking ? 'bg-accent' : 'bg-gray-600'
                      }`}
                    >
                      <span 
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.locationTracking ? 'translate-x-6' : 'translate-x-1'
                        }`} 
                      />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 italic">
                    Even with this setting off, we still need to collect approximate location data for legal compliance purposes.
                  </p>
                </div>
              </div>
              
              {/* Data Sharing Section */}
              <div className="bg-secondary rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-700 flex items-center">
                  <ShieldCheckIcon className="h-6 w-6 text-accent mr-3" />
                  <h2 className="text-lg font-medium text-white">Data Sharing</h2>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-white font-medium">Share Data with Dealers</h3>
                      <p className="text-gray-400 text-sm mt-1">
                        Allow dealers to see your browsing history and saved cars to provide better offers
                      </p>
                    </div>
                    <button 
                      onClick={() => handleToggle('dataSharing')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                        settings.dataSharing ? 'bg-accent' : 'bg-gray-600'
                      }`}
                    >
                      <span 
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.dataSharing ? 'translate-x-6' : 'translate-x-1'
                        }`} 
                      />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Browsing History Section */}
              <div className="bg-secondary rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-700 flex items-center">
                  <ClockIcon className="h-6 w-6 text-accent mr-3" />
                  <h2 className="text-lg font-medium text-white">Browsing History & Telemetry</h2>
                </div>
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Save Search History</h3>
                      <p className="text-gray-400 text-sm mt-1">
                        Store your search queries to provide better recommendations
                      </p>
                    </div>
                    <button 
                      onClick={() => handleToggle('searchHistory')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                        settings.searchHistory ? 'bg-accent' : 'bg-gray-600'
                      }`}
                    >
                      <span 
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.searchHistory ? 'translate-x-6' : 'translate-x-1'
                        }`} 
                      />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Anonymous Usage Data</h3>
                      <p className="text-gray-400 text-sm mt-1">
                        Allow us to collect anonymous usage data to improve our services
                      </p>
                    </div>
                    <button 
                      onClick={() => handleToggle('browseTelemetry')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                        settings.browseTelemetry ? 'bg-accent' : 'bg-gray-600'
                      }`}
                    >
                      <span 
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.browseTelemetry ? 'translate-x-6' : 'translate-x-1'
                        }`} 
                      />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Device Permissions Section */}
              <div className="bg-secondary rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-700 flex items-center">
                  <LockClosedIcon className="h-6 w-6 text-accent mr-3" />
                  <h2 className="text-lg font-medium text-white">Device Permissions</h2>
                </div>
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Microphone Access</h3>
                      <p className="text-gray-400 text-sm mt-1">
                        Allow microphone access for voice search and commands
                      </p>
                    </div>
                    <button 
                      onClick={() => handleToggle('microphone')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                        settings.microphone ? 'bg-accent' : 'bg-gray-600'
                      }`}
                    >
                      <span 
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.microphone ? 'translate-x-6' : 'translate-x-1'
                        }`} 
                      />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Camera Access</h3>
                      <p className="text-gray-400 text-sm mt-1">
                        Allow camera access for scanning documents and vehicle identification
                      </p>
                    </div>
                    <button 
                      onClick={() => handleToggle('camera')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                        settings.camera ? 'bg-accent' : 'bg-gray-600'
                      }`}
                    >
                      <span 
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.camera ? 'translate-x-6' : 'translate-x-1'
                        }`} 
                      />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Data Management Section */}
              <div className="bg-secondary rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-700 flex items-center">
                  <UserIcon className="h-6 w-6 text-accent mr-3" />
                  <h2 className="text-lg font-medium text-white">Your Data</h2>
                </div>
                <div className="p-6">
                  <p className="text-gray-400 mb-4">
                    You can request a copy of all data we have about you, or delete all your data from our system.
                  </p>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                    <button 
                      onClick={() => alert("In a production environment, we would compile and email you all your data.")}
                      className="px-4 py-2 bg-secondary border border-accent text-accent rounded-md hover:bg-accent/10"
                    >
                      Download My Data
                    </button>
                    <button 
                      onClick={deleteAllData}
                      className="px-4 py-2 bg-red-800/30 border border-red-600/50 text-red-500 rounded-md hover:bg-red-800/50"
                    >
                      Delete All My Data
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="mt-8 flex justify-between">
              <button 
                onClick={resetToDefaults}
                className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary/80"
              >
                Reset to Defaults
              </button>
              <button 
                onClick={saveSettings}
                className="px-6 py-2 bg-accent text-white rounded-md hover:bg-accent/90"
              >
                Save Settings
              </button>
            </div>
            
            {/* Information Links */}
            <div className="mt-8 text-center">
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-400">
                <Link href="/privacy-policy" className="hover:text-accent">
                  Privacy Policy
                </Link>
                <Link href="/terms-of-service" className="hover:text-accent">
                  Terms of Service
                </Link>
                <Link href="/cookie-policy" className="hover:text-accent">
                  Cookie Policy
                </Link>
              </div>
            </div>
            
            {/* Save Notification */}
            {showSaveNotification && (
              <div className="fixed bottom-4 right-4 bg-accent text-white px-4 py-2 rounded-md shadow-lg flex items-center">
                <CheckIcon className="h-5 w-5 mr-2" />
                Settings saved successfully
              </div>
            )}
          </div>
        </div>
      </PageTransition>
      <Footer />
    </>
  );
} 