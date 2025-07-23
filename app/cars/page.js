"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * AllCarsPage Component
 * 
 * This is a redirect page that automatically forwards users to the main buy page
 * with the "all" condition filter selected.
 * 
 * Purpose:
 * - Maintains backward compatibility with old URL structure
 * - Ensures users land on the correct filtered view
 * - Redirects immediately on page load using Next.js router
 */
export default function AllCarsPage() {
  const router = useRouter();
  
  // Redirect to the main buy page with "all" condition parameter
  useEffect(() => {
    router.replace("/buy?condition=all");
  }, [router]);
  
  // Return null as this component doesn't render any UI
  return null;
} 