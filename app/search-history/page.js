"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchHistory from '../components/SearchHistory';
import PageTransition from '../components/PageTransition';

export default function SearchHistoryPage() {
  return (
    <>
      <Navbar />
      <PageTransition>
        <div className="min-h-screen bg-primary pt-28 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-6">
              <Link href="/cars" className="text-accent hover:text-accent/80 flex items-center mb-4">
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back to Car Search
              </Link>
              <h1 className="text-2xl font-bold text-white">Your Search History</h1>
              <p className="text-gray-400 mt-1">View and manage your recent car searches</p>
            </div>
            
            {/* Search History Component */}
            <SearchHistory className="mb-6" />
            
            {/* Privacy Info */}
            <div className="bg-secondary rounded-lg p-6 text-sm text-gray-400">
              <h2 className="text-white font-medium mb-2">About Your Search History</h2>
              <p className="mb-4">
                Your search history is stored locally on your device and is not shared with anyone unless 
                you've enabled data sharing in your privacy settings.
              </p>
              <div className="flex justify-between items-center">
                <Link href="/settings/privacy" className="text-accent hover:text-accent/80">
                  Manage Privacy Settings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
      <Footer />
    </>
  );
} 