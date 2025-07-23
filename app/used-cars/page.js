"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * UsedCarsPage Component
 * 
 * This is a redirect page that automatically forwards users to the main buy page
 * with the "used" condition filter selected.
 * 
 * Purpose:
 * - Maintains backward compatibility with old URL structure
 * - Ensures users land on the correct filtered view showing only used cars
 * - Redirects immediately on page load using Next.js router
 */
export default function UsedCarsPage() {
  const router = useRouter();
  
  // Redirect to the main buy page with "used" condition parameter
  useEffect(() => {
    router.replace("/buy?condition=used");
  }, [router]);
  
  // Return null as this component doesn't render any UI
  return null;
} 