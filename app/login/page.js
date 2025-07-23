"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace("/auth/login");
  }, [router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-accent">Redirecting to login page...</p>
    </div>
  );
} 