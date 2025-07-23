"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * HotDealsPage Component
 * 
 * This is a redirect page that automatically forwards users to the main buy page
 * with the "hot-deals" condition filter selected.
 * 
 * Purpose:
 * - Maintains backward compatibility with old URL structure
 * - Ensures users land on the correct filtered view showing only special offers
 * - Redirects immediately on page load using Next.js router
 */
export default function HotDealsPage() {
  const router = useRouter();
  
  // Redirect to the main buy page with "hot-deals" condition parameter
  useEffect(() => {
    router.replace("/buy?condition=hot-deals");
  }, [router]);
  
  // Return null as this component doesn't render any UI
  return null;
} 