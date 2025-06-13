"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PageTransition from "../../components/PageTransition";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    
    // Here you would typically handle authentication
    // For now, we'll just validate the form fields
    if (!email) {
      setError("Email is required");
      return;
    }
    
    if (!password) {
      setError("Password is required");
      return;
    }
    
    // Mock login success - in a real app, this would be an API call
    console.log("Logging in with:", { email, password, rememberMe });
    setError("");
    // Redirect would happen here after successful login
  }

  return (
    <>
      <Navbar />
      <PageTransition>
        <div className="pt-24 pb-16">
          <div className="max-w-md mx-auto bg-secondary rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-8">
              <h2 className="text-2xl font-bold text-center text-white mb-8">Sign In</h2>
              
              {error && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded text-red-300 text-sm">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-white text-sm font-medium mb-2">Email Address</label>
                  <input 
                    type="email" 
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-primary border border-gray-700 text-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="password" className="block text-white text-sm font-medium">Password</label>
                    <Link href="/auth/forgot-password" className="text-sm text-accent hover:text-accent/80">
                      Forgot password?
                    </Link>
                  </div>
                  <input 
                    type="password" 
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-primary border border-gray-700 text-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="••••••••"
                  />
                </div>
                
                <div className="flex items-center mb-6">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="h-4 w-4 text-accent focus:ring-accent border-gray-700 rounded bg-primary"
                  />
                  <label htmlFor="remember" className="ml-2 block text-white text-sm">
                    Remember me
                  </label>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90 transition-colors text-white font-semibold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
                >
                  Sign In
                </button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-white text-sm">
                  Don't have an account?{" "}
                  <Link href="/auth/register" className="text-accent hover:text-accent/80 font-medium">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
      <Footer />
    </>
  );
} 