"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    
    // Reset messages
    setError("");
    setSuccessMessage("");
    
    if (!email) {
      setError("Email is required");
      return;
    }
    
    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    // Mock password reset request - in a real app, this would be an API call
    console.log("Sending password reset to:", email);
    setSuccessMessage(`Password reset instructions sent to ${email}`);
    setIsSubmitted(true);
  }

  return (
    <>
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="max-w-md mx-auto bg-secondary rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-2xl font-bold text-center text-white mb-4">Reset Your Password</h2>
            <p className="text-center text-gray-400 mb-8">
              Enter your email address and we'll send you instructions to reset your password.
            </p>
            
            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded text-red-300 text-sm">
                {error}
              </div>
            )}
            
            {successMessage && (
              <div className="mb-4 p-3 bg-green-500/20 border border-green-500 rounded text-green-300 text-sm">
                {successMessage}
              </div>
            )}
            
            {!isSubmitted ? (
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
                
                <button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90 transition-colors text-white font-semibold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
                >
                  Send Reset Instructions
                </button>
              </form>
            ) : (
              <div className="text-center">
                <button
                  onClick={() => {
                    setEmail("");
                    setIsSubmitted(false);
                    setSuccessMessage("");
                  }}
                  className="text-accent hover:text-accent/80 font-medium"
                >
                  Try another email
                </button>
              </div>
            )}
            
            <div className="mt-6 text-center">
              <p className="text-white text-sm">
                Remember your password?{" "}
                <Link href="/auth/login" className="text-accent hover:text-accent/80 font-medium">
                  Back to login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
} 