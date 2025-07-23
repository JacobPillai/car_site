"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RevealOnScroll from "../components/RevealOnScroll";
import { useUserSettingsContext } from "../contexts/UserSettingsContext";
import { 
  AdjustmentsHorizontalIcon, 
  BellIcon, 
  ShieldCheckIcon, 
  EyeIcon, 
  GlobeAltIcon, 
  UserCircleIcon,
  CheckIcon
} from "@heroicons/react/24/outline";

/**
 * Settings Page Component
 * 
 * Allows users to configure their preferences:
 * - Accessibility settings
 * - Notification preferences
 * - Privacy and security
 * - Language and location
 * - Account settings
 */
export default function SettingsPage() {
  // Get settings from context
  const {
    accessibilitySettings,
    notificationSettings,
    privacySettings,
    languageSettings,
    isLoading,
    updateAccessibilitySetting,
    updateNotificationSetting,
    updatePrivacySetting,
    updateLanguageSetting,
    resetAllSettings,
    settingsApplied
  } = useUserSettingsContext();

  // State for active tab
  const [activeTab, setActiveTab] = useState("all");

  // Handle setting change for any setting group
  function handleSettingChange(settingGroup, setting) {
    switch (settingGroup) {
      case "accessibility":
        updateAccessibilitySetting(setting);
        break;
      case "notifications":
        updateNotificationSetting(setting);
        break;
      case "privacy":
        updatePrivacySetting(setting);
        break;
      default:
        break;
    }
  }

  // Handle select changes
  function handleSelectChange(settingGroup, setting, value) {
    switch (settingGroup) {
      case "privacy":
        updatePrivacySetting(setting, value);
        break;
      case "language":
        updateLanguageSetting(setting, value);
        break;
      default:
        break;
    }
  }

  function renderSettingToggle(groupName, setting, label, description, isActive) {
    return (
      <div className="flex items-start justify-between py-4 border-b border-gray-700">
        <div className="flex-1">
          <div className="flex items-center">
            <div className="mr-2 text-lg font-medium">{label}</div>
            {isActive && (
              <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded">
                Active
              </span>
            )}
          </div>
          <p className="text-sm text-gray-400 mt-1">{description}</p>
        </div>
        <div className="ml-4">
          <button
            onClick={() => handleSettingChange(groupName, setting)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
              isActive ? "bg-accent" : "bg-gray-700"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isActive ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="pt-28 pb-16 px-4 bg-primary min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-pulse bg-secondary rounded-full h-12 w-12 mb-4 mx-auto"></div>
            <p className="text-xl">Loading settings...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 px-4 bg-gradient-to-r from-secondary to-secondary/70 text-white">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="flex items-center justify-center gap-2 mb-2">
              <AdjustmentsHorizontalIcon className="h-8 w-8 text-accent" />
              <h1 className="text-4xl md:text-5xl font-bold text-center">Settings</h1>
            </div>
            <p className="text-xl text-center mb-8">Customize your CarHub experience</p>
          </RevealOnScroll>
        </div>
      </section>
      
      {/* Settings Section */}
      <section className="py-16 px-4 bg-primary">
        <div className="max-w-4xl mx-auto">
          {/* Navigation Tabs */}
          <div className="flex flex-wrap mb-8 border-b border-gray-700">
            <button 
              className={`px-4 py-2 font-medium ${activeTab === 'all' ? 'text-accent border-b-2 border-accent' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('all')}
            >
              All Settings
            </button>
            <button 
              className={`px-4 py-2 font-medium ${activeTab === 'accessibility' ? 'text-accent border-b-2 border-accent' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('accessibility')}
            >
              Accessibility
            </button>
            <button 
              className={`px-4 py-2 font-medium ${activeTab === 'notifications' ? 'text-accent border-b-2 border-accent' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('notifications')}
            >
              Notifications
            </button>
            <button 
              className={`px-4 py-2 font-medium ${activeTab === 'privacy' ? 'text-accent border-b-2 border-accent' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('privacy')}
            >
              Privacy
            </button>
            <button 
              className={`px-4 py-2 font-medium ${activeTab === 'account' ? 'text-accent border-b-2 border-accent' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('account')}
            >
              Account
            </button>
          </div>
          
          {/* Accessibility Settings */}
          {(activeTab === 'all' || activeTab === 'accessibility') && (
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <EyeIcon className="h-6 w-6 text-accent" />
                <h2 className="text-2xl font-bold">Accessibility</h2>
              </div>
              
              <div className="bg-secondary rounded-lg p-6">
                {renderSettingToggle(
                  "accessibility",
                  "highContrast",
                  "High Contrast Mode",
                  "Increases contrast between elements for better visibility",
                  accessibilitySettings.highContrast
                )}
                
                {renderSettingToggle(
                  "accessibility",
                  "largerText",
                  "Larger Text",
                  "Makes all text on the site larger for easier reading",
                  accessibilitySettings.largerText
                )}
                
                {renderSettingToggle(
                  "accessibility",
                  "reducedMotion",
                  "Reduced Motion",
                  "Reduces animations and transitions for less visual distraction",
                  accessibilitySettings.reducedMotion
                )}
                
                {renderSettingToggle(
                  "accessibility",
                  "screenReader",
                  "Screen Reader Optimized",
                  "Optimizes the site for screen readers and assistive technologies",
                  accessibilitySettings.screenReader
                )}
                
                {renderSettingToggle(
                  "accessibility",
                  "prefersDarkTheme",
                  "Dark Theme",
                  "Use dark color scheme throughout the site",
                  accessibilitySettings.prefersDarkTheme
                )}

                <div className="mt-4 pt-4 border-t border-gray-700">
                  <button 
                    onClick={() => {
                      // Detect system preferences
                      const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
                      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                      
                      // Update settings to match system
                      updateAccessibilitySetting('prefersDarkTheme', darkMode);
                      updateAccessibilitySetting('reducedMotion', reducedMotion);
                    }}
                    className="px-4 py-2 bg-accent/20 text-accent hover:bg-accent/30 rounded transition-colors"
                  >
                    Use System Preferences
                  </button>
                  
                  {settingsApplied?.accessibility === false && (
                    <div className="mt-2 text-red-400 text-sm">
                      <span>⚠️ Settings could not be saved. Check browser storage permissions.</span>
                    </div>
                  )}
                  
                  {settingsApplied?.accessibility === true && (
                    <div className="mt-2 text-green-400 text-sm flex items-center">
                      <CheckIcon className="h-4 w-4 mr-1" />
                      <span>Settings saved successfully</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Notification Preferences */}
          {(activeTab === 'all' || activeTab === 'notifications') && (
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <BellIcon className="h-6 w-6 text-accent" />
                <h2 className="text-2xl font-bold">Notifications</h2>
              </div>
              
              <div className="bg-secondary rounded-lg p-6">
                {renderSettingToggle(
                  "notifications",
                  "priceDrops",
                  "Price Drop Alerts",
                  "Get notified when prices drop on your saved cars",
                  notificationSettings.priceDrops
                )}
                
                {renderSettingToggle(
                  "notifications",
                  "newListings",
                  "New Listing Alerts",
                  "Get notified when new cars matching your search criteria are listed",
                  notificationSettings.newListings
                )}
                
                {renderSettingToggle(
                  "notifications",
                  "savedCarUpdates",
                  "Saved Car Updates",
                  "Get updates about status changes to your saved cars",
                  notificationSettings.savedCarUpdates
                )}
                
                {renderSettingToggle(
                  "notifications",
                  "marketUpdates",
                  "Market Updates",
                  "Receive periodic updates about the car market in your area",
                  notificationSettings.marketUpdates
                )}
                
                {renderSettingToggle(
                  "notifications",
                  "promotions",
                  "Promotions and Offers",
                  "Receive special offers and promotions from CarHub",
                  notificationSettings.promotions
                )}
              </div>
            </div>
          )}
          
          {/* Reset Settings Button */}
          <div className="mt-8 text-center">
            <button 
              onClick={resetAllSettings}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium transition-colors"
            >
              Reset All Settings
            </button>
            <p className="mt-2 text-sm text-gray-400">
              This will reset all settings to their default values
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
} 