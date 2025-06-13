"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * NewCarsPage Component
 * 
 * This is a redirect page that automatically forwards users to the main buy page
 * with the "new" condition filter selected.
 * 
 * Purpose:
 * - Maintains backward compatibility with old URL structure
 * - Ensures users land on the correct filtered view showing only new cars
 * - Redirects immediately on page load using Next.js router
 */
export default function NewCarsPage() {
  const router = useRouter();
  
  // Redirect to the main buy page with "new" condition parameter
  useEffect(() => {
    router.replace("/buy?condition=new");
  }, [router]);
  
  // Return null as this component doesn't render any UI
  return null;
} 