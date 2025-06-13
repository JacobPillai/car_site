"use client";

import React from 'react';
import { PhoneIcon } from "@heroicons/react/24/outline";

const ContactInfo = () => {
  const phoneNumber = '0166128291'; // Your contact number
  
  // Format phone number for display (Malaysian format)
  const formatPhoneForDisplay = (phone) => {
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2 $3');
  };

  // Handle click analytics or tracking (optional)
  const handleCallClick = () => {
    // Add analytics tracking here if needed
    console.log('Call button clicked');
    // Example: gtag('event', 'click_to_call', { phone_number: phoneNumber });
  };

  return (
    <div className="contact-info">
      <h2 className="text-2xl font-bold text-primary mb-4">Need more information?</h2>
      
      {/* Text Link Version */}
      <p className="call-text mb-4">
        Call us directly:{' '}
        <a 
          href={`tel:${phoneNumber}`}
          onClick={handleCallClick}
          className="text-accent hover:text-accent-light transition-colors"
          aria-label={`Call ${formatPhoneForDisplay(phoneNumber)}`}
        >
          {formatPhoneForDisplay(phoneNumber)}
        </a>
      </p>

      {/* Button Version with Icon */}
      <button 
        onClick={handleCallClick}
        className="call-button mb-4 bg-transparent border-none p-0 cursor-pointer block"
        aria-label={`Call ${formatPhoneForDisplay(phoneNumber)}`}
      >
        <a 
          href={`tel:${phoneNumber}`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-md transition-colors duration-200"
        >
          <PhoneIcon className="w-5 h-5" aria-hidden="true" />
          Call Now
        </a>
      </button>

      {/* Alternative Button */}
      <a 
        href={`tel:${phoneNumber}`}
        onClick={handleCallClick}
        className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/80 text-white rounded-md transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
        role="button"
        aria-label={`Call ${formatPhoneForDisplay(phoneNumber)}`}
      >
        <PhoneIcon className="w-5 h-5" aria-hidden="true" />
        {formatPhoneForDisplay(phoneNumber)}
      </a>
    </div>
  );
};

export default ContactInfo; 