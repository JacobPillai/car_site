"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Redirect Page Component
 * 
 * This page redirects users from the legacy /sell-your-car URL to the new /sell page
 * with the 'sellCar' tab active by default.
 */
export default function SellYourCarRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to the new sell page with the sellCar tab active
    router.replace("/sell");
  }, [router]);
  
  return (
    <div className="h-screen w-full flex items-center justify-center bg-primary">
      <div className="text-center">
        <h2 className="text-xl font-medium mb-2">Redirecting...</h2>
        <p className="text-gray-400">Please wait while we redirect you to our new car selling page.</p>
      </div>
    </div>
  );
} 