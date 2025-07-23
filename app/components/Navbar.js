"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  Bars3Icon, 
  XMarkIcon, 
  HeartIcon, 
  UserIcon, 
  PhoneIcon,
  ShoppingCartIcon,
  ChevronDownIcon,
  AdjustmentsHorizontalIcon
} from "@heroicons/react/24/outline";
import NotificationCenter from "./NotificationCenter";

/**
 * Navbar Component
 * 
 * Main navigation bar for the entire application with responsive design.
 * Features:
 * - Collapsible mobile menu
 * - Dropdown menus for main categories (Buy, Sell)
 * - User account dropdown menu
 * - Support contact information
 */
export default function Navbar() {
  // State for mobile menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // State for user dropdown menu toggle
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <nav className="bg-secondary/90 backdrop-blur-sm fixed w-full z-50 shadow-md">
      {/* Top Bar with customer support and authentication links */}
      <div className="bg-secondary py-1 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4 text-white">
            <div className="flex items-center">
              <PhoneIcon className="h-3 w-3 mr-1" />
              <span>Customer Support: </span>
              <a href="tel:0166128291" className="hover:text-accent transition-colors ml-1">016-612 8291</a>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-white">
            <Link href="/auth/login" className="hover:text-accent transition-colors">Sign In</Link>
            <span>|</span>
            <Link href="/auth/register" className="hover:text-accent transition-colors">Register</Link>
            <span>|</span>
            <Link href="/sell-your-car" className="text-accent hover:text-accent/80 transition-colors">Sell Your Car</Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Site Name */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-accent">
              CarHub
            </Link>
          </div>

          {/* Desktop Navigation Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link href="/" className="text-white hover:text-accent px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              
              {/* Buy Dropdown Menu */}
              <div className="relative group">
                <button className="text-white hover:text-accent px-3 py-2 rounded-md text-sm font-medium flex items-center">
                  Buy <ChevronDownIcon className="h-4 w-4 ml-1" />
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-secondary rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-1">
                    {/* Links to different car condition filters */}
                    <Link href="/buy?condition=all" className="block px-4 py-2 text-sm text-white hover:bg-accent/10 hover:text-accent">
                      All Cars
                    </Link>
                    <Link href="/buy?condition=new" className="block px-4 py-2 text-sm text-white hover:bg-accent/10 hover:text-accent">
                      New Cars
                    </Link>
                    <Link href="/buy?condition=used" className="block px-4 py-2 text-sm text-white hover:bg-accent/10 hover:text-accent">
                      Used Cars
                    </Link>
                    <Link href="/buy?condition=hot-deals" className="block px-4 py-2 text-sm text-white hover:bg-accent/10 hover:text-accent">
                      Hot Deals
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Sell Dropdown Menu */}
              <div className="relative group">
                <button className="text-white hover:text-accent px-3 py-2 rounded-md text-sm font-medium flex items-center">
                  Sell <ChevronDownIcon className="h-4 w-4 ml-1" />
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-secondary rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-1">
                    <Link href="/sell-your-car" className="block px-4 py-2 text-sm text-white hover:bg-accent/10 hover:text-accent">
                      Sell Your Car
                    </Link>
                    <Link href="/dealer-signup" className="block px-4 py-2 text-sm text-white hover:bg-accent/10 hover:text-accent">
                      Become a Dealer
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Other Navigation Links */}
              <Link href="/finance" className="text-white hover:text-accent px-3 py-2 rounded-md text-sm font-medium">
                Finance
              </Link>
              
              <Link href="/news" className="text-white hover:text-accent px-3 py-2 rounded-md text-sm font-medium">
                News
              </Link>
              
              <Link href="/about" className="text-white hover:text-accent px-3 py-2 rounded-md text-sm font-medium">
                About
              </Link>
            </div>
          </div>

          {/* User Action Icons (Notifications, Favorites, Account) */}
          <div className="hidden md:flex items-center space-x-4">
            <NotificationCenter />
            
            <Link href="/saved-cars" className="text-white hover:text-accent">
              <HeartIcon className="h-6 w-6" />
            </Link>
            
            {/* User Account Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="text-white hover:text-accent"
              >
                <UserIcon className="h-6 w-6" />
              </button>
              
              {/* User Menu Dropdown Content */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-secondary rounded-md shadow-lg z-50">
                  <div className="py-1">
                    <Link href="/profile" className="block px-4 py-2 text-sm text-white hover:bg-accent/10 hover:text-accent">
                      My Profile
                    </Link>
                    <Link href="/saved-cars" className="block px-4 py-2 text-sm text-white hover:bg-accent/10 hover:text-accent">
                      Saved Cars
                    </Link>
                    <Link href="/my-listings" className="block px-4 py-2 text-sm text-white hover:bg-accent/10 hover:text-accent">
                      My Listings
                    </Link>
                    <Link href="/settings" className="block px-4 py-2 text-sm text-white hover:bg-accent/10 hover:text-accent">
                      Settings
                    </Link>
                    <div className="border-t border-gray-700 mt-1 pt-1">
                      <Link href="/logout" className="block px-4 py-2 text-sm text-white hover:bg-accent/10 hover:text-accent">
                        Sign Out
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-accent hover:bg-gray-700 focus:outline-none"
            >
              {isMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (shown when isMenuOpen is true) */}
      {isMenuOpen && (
        <div className="md:hidden bg-secondary border-t border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="text-white hover:text-accent block px-3 py-2 rounded-md text-base font-medium">
              Home
            </Link>
            <div className="border-t border-gray-700 my-1"></div>
            <p className="px-3 pt-2 text-xs font-semibold text-white uppercase">Buy</p>
            <Link href="/buy?condition=all" className="text-white hover:text-accent block px-3 py-2 rounded-md text-base font-medium pl-6">
              All Cars
            </Link>
            <Link href="/buy?condition=new" className="text-white hover:text-accent block px-3 py-2 rounded-md text-base font-medium pl-6">
              New Cars
            </Link>
            <Link href="/buy?condition=used" className="text-white hover:text-accent block px-3 py-2 rounded-md text-base font-medium pl-6">
              Used Cars
            </Link>
            <Link href="/buy?condition=hot-deals" className="text-white hover:text-accent block px-3 py-2 rounded-md text-base font-medium pl-6">
              Hot Deals
            </Link>
            <div className="border-t border-gray-700 my-1"></div>
            <p className="px-3 pt-2 text-xs font-semibold text-white uppercase">Sell</p>
            <Link href="/sell-your-car" className="text-white hover:text-accent block px-3 py-2 rounded-md text-base font-medium pl-6">
              Sell Your Car
            </Link>
            <Link href="/dealer-signup" className="text-white hover:text-accent block px-3 py-2 rounded-md text-base font-medium pl-6">
              Become a Dealer
            </Link>
            <div className="border-t border-gray-700 my-1"></div>
            <Link href="/finance" className="text-white hover:text-accent block px-3 py-2 rounded-md text-base font-medium">
              Finance
            </Link>
            <Link href="/news" className="text-white hover:text-accent block px-3 py-2 rounded-md text-base font-medium">
              News
            </Link>
            <Link href="/about" className="text-white hover:text-accent block px-3 py-2 rounded-md text-base font-medium">
              About
            </Link>
            <div className="border-t border-gray-700 my-1"></div>
            <div className="text-white block px-3 py-2 rounded-md text-base font-medium">
              <div className="flex items-center">
                <div className="mr-2">
                  <NotificationCenter />
                </div>
                <span>Notifications</span>
              </div>
            </div>
            
            <Link href="/saved-cars" className="text-white hover:text-accent block px-3 py-2 rounded-md text-base font-medium">
              <div className="flex items-center">
                <HeartIcon className="h-5 w-5 mr-2" />
                Saved Cars
              </div>
            </Link>
            <Link href="/settings" className="text-white hover:text-accent block px-3 py-2 rounded-md text-base font-medium">
              <div className="flex items-center">
                <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
                Settings
              </div>
            </Link>
            <div className="border-t border-gray-700 my-1"></div>
            <Link href="/auth/login" className="text-accent hover:text-accent/80 block px-3 py-2 rounded-md text-base font-medium">
              Sign In / Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
} 