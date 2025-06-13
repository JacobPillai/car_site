"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import OptimizedImage from "../components/OptimizedImage";
import RevealOnScroll from "../components/RevealOnScroll";
import { CalculatorIcon, CreditCardIcon, BanknotesIcon, ArrowPathIcon, ShieldCheckIcon, DocumentTextIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

/**
 * Finance Page Component
 * 
 * Provides car financing information and tools:
 * 1. Loan calculator
 * 2. Financing options
 * 3. Pre-approval application
 * 4. FAQ section
 */
export default function FinancePage() {
  // Loan Calculator State
  const [loanAmount, setLoanAmount] = useState(30000);
  const [downPayment, setDownPayment] = useState(5000);
  const [interestRate, setInterestRate] = useState(5.9);
  const [loanTerm, setLoanTerm] = useState(60);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  
  // Pre-approval Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    employmentStatus: "employed",
    annualIncome: "",
    creditScore: "excellent",
    loanAmount: "",
    downPayment: "",
    purchaseTimeframe: "1-3months"
  });
  
  // Calculate loan details when inputs change
  useEffect(() => {
    calculateLoan();
  }, [loanAmount, downPayment, interestRate, loanTerm]);
  
  function calculateLoan() {
    // Calculate principal amount
    const principal = loanAmount - downPayment;
    
    if (principal <= 0 || interestRate <= 0 || loanTerm <= 0) {
      setMonthlyPayment(0);
      setTotalInterest(0);
      setTotalPayment(0);
      return;
    }
    
    // Convert annual interest rate to monthly rate
    const monthlyRate = interestRate / 100 / 12;
    
    // Calculate monthly payment using formula: P * r * (1+r)^n / ((1+r)^n - 1)
    const monthlyPaymentValue = principal * monthlyRate * Math.pow(1 + monthlyRate, loanTerm) / (Math.pow(1 + monthlyRate, loanTerm) - 1);
    
    // Calculate total amount paid over loan term
    const totalPaymentValue = monthlyPaymentValue * loanTerm;
    
    // Calculate total interest paid
    const totalInterestValue = totalPaymentValue - principal;
    
    setMonthlyPayment(monthlyPaymentValue);
    setTotalInterest(totalInterestValue);
    setTotalPayment(totalPaymentValue);
  }
  
  function handleFormChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }
  
  function handlePreApprovalSubmit(e) {
    e.preventDefault();
    console.log("Pre-approval form submitted:", formData);
    // Here you would typically send this data to your backend
    setFormSubmitted(true);
  }
  
  function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 px-4 bg-gradient-to-r from-secondary to-secondary/70 text-white">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Car Financing Solutions</h1>
            <p className="text-xl text-center mb-8">Find the perfect financing option for your next vehicle purchase</p>
          </RevealOnScroll>
        </div>
      </section>
      
      {/* Loan Calculator Section */}
      <section className="py-16 px-4 bg-primary">
        <div className="max-w-6xl mx-auto">
          <RevealOnScroll>
            <div className="flex items-center justify-center gap-2 mb-8">
              <CalculatorIcon className="h-8 w-8 text-accent" />
              <h2 className="text-3xl font-bold text-center">Loan Calculator</h2>
            </div>
            
            <div className="bg-secondary rounded-xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Calculator Inputs */}
                <div className="p-6 md:p-8">
                  <h3 className="text-xl font-semibold mb-6">Estimate Your Monthly Payments</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-1">
                        <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-300">
                          Vehicle Price: {formatCurrency(loanAmount)}
                        </label>
                      </div>
                      <input
                        type="range"
                        id="loanAmount"
                        min="1000"
                        max="150000"
                        step="1000"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>$1,000</span>
                        <span>$150,000</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <label htmlFor="downPayment" className="block text-sm font-medium text-gray-300">
                          Down Payment: {formatCurrency(downPayment)}
                        </label>
                      </div>
                      <input
                        type="range"
                        id="downPayment"
                        min="0"
                        max={loanAmount * 0.9}
                        step="500"
                        value={downPayment}
                        onChange={(e) => setDownPayment(Number(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>$0</span>
                        <span>{formatCurrency(loanAmount * 0.9)}</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <label htmlFor="interestRate" className="block text-sm font-medium text-gray-300">
                          Interest Rate: {interestRate}%
                        </label>
                      </div>
                      <input
                        type="range"
                        id="interestRate"
                        min="1"
                        max="20"
                        step="0.1"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>1%</span>
                        <span>20%</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <label htmlFor="loanTerm" className="block text-sm font-medium text-gray-300">
                          Loan Term: {loanTerm} months
                        </label>
                      </div>
                      <input
                        type="range"
                        id="loanTerm"
                        min="12"
                        max="84"
                        step="12"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(Number(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>12 mo</span>
                        <span>84 mo</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <button
                        onClick={calculateLoan}
                        className="px-6 py-2 bg-accent hover:bg-accent/80 text-white rounded-md font-medium transition-colors"
                      >
                        Recalculate
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Calculator Results */}
                <div className="bg-gray-800 p-6 md:p-8">
                  <h3 className="text-xl font-semibold mb-6">Loan Summary</h3>
                  
                  <div className="space-y-6">
                    <div className="bg-secondary/50 p-5 rounded-lg">
                      <div className="text-sm text-gray-400 mb-1">Monthly Payment</div>
                      <div className="text-3xl font-bold text-accent">
                        {formatCurrency(monthlyPayment)}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-secondary/50 p-4 rounded-lg">
                        <div className="text-sm text-gray-400 mb-1">Loan Amount</div>
                        <div className="text-xl font-semibold">
                          {formatCurrency(loanAmount - downPayment)}
                        </div>
                      </div>
                      
                      <div className="bg-secondary/50 p-4 rounded-lg">
                        <div className="text-sm text-gray-400 mb-1">Total Interest</div>
                        <div className="text-xl font-semibold">
                          {formatCurrency(totalInterest)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-secondary/50 p-4 rounded-lg">
                      <div className="text-sm text-gray-400 mb-1">Total Cost</div>
                      <div className="text-xl font-semibold">
                        {formatCurrency(totalPayment + downPayment)}
                      </div>
                    </div>
                    
                    <div className="text-center mt-4">
                      <p className="text-sm text-gray-400 italic mb-4">
                        This calculator provides an estimate. Actual rates may vary based on credit score, loan term, and other factors.
                      </p>
                      <a 
                        href="#pre-approval" 
                        className="px-6 py-3 bg-accent hover:bg-accent/80 text-white rounded-md font-medium transition-colors inline-block"
                      >
                        Apply for Pre-Approval
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
      
      {/* Financing Options Section */}
      <section className="py-16 px-4 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="flex items-center justify-center gap-2 mb-12">
              <CreditCardIcon className="h-8 w-8 text-accent" />
              <h2 className="text-3xl font-bold text-center">Financing Options</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Traditional Auto Loan */}
              <div className="bg-gray-800 rounded-xl p-6 shadow-md">
                <div className="h-14 w-14 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                  <BanknotesIcon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Traditional Auto Loan</h3>
                <p className="text-gray-300 mb-4">
                  Fixed monthly payments over a set term, typically 36-72 months. Interest rates from 3.5% to 10% based on credit score.
                </p>
                <ul className="text-gray-300 space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span>Full ownership after loan payoff</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span>No mileage restrictions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span>Flexibility to sell or trade in</span>
                  </li>
                </ul>
                <div className="mt-auto">
                  <a 
                    href="#pre-approval" 
                    className="px-5 py-2 bg-accent hover:bg-accent/80 text-white rounded-md font-medium transition-colors inline-block"
                  >
                    Get Pre-Approved
                  </a>
                </div>
              </div>
              
              {/* Lease Option */}
              <div className="bg-gray-800 rounded-xl p-6 shadow-md">
                <div className="h-14 w-14 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                  <ArrowPathIcon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Lease Option</h3>
                <p className="text-gray-300 mb-4">
                  Lower monthly payments with option to purchase or return at end of term. Typical lease terms are 24-36 months.
                </p>
                <ul className="text-gray-300 space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span>Lower upfront costs</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span>Drive new car every few years</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span>Covered by warranty throughout</span>
                  </li>
                </ul>
                <div className="mt-auto">
                  <a 
                    href="#pre-approval" 
                    className="px-5 py-2 bg-accent hover:bg-accent/80 text-white rounded-md font-medium transition-colors inline-block"
                  >
                    Explore Lease Options
                  </a>
                </div>
              </div>
              
              {/* In-House Financing */}
              <div className="bg-gray-800 rounded-xl p-6 shadow-md">
                <div className="h-14 w-14 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                  <ShieldCheckIcon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">In-House Financing</h3>
                <p className="text-gray-300 mb-4">
                  Alternative financing direct through CarHub for customers with less-than-perfect credit. Flexible terms available.
                </p>
                <ul className="text-gray-300 space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span>No third-party banks involved</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span>Flexible approval requirements</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span>Opportunity to rebuild credit</span>
                  </li>
                </ul>
                <div className="mt-auto">
                  <a 
                    href="#pre-approval" 
                    className="px-5 py-2 bg-accent hover:bg-accent/80 text-white rounded-md font-medium transition-colors inline-block"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
      
      {/* Pre-Approval Application Section */}
      <section id="pre-approval" className="py-16 px-4 bg-primary">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="flex items-center justify-center gap-2 mb-8">
              <DocumentTextIcon className="h-8 w-8 text-accent" />
              <h2 className="text-3xl font-bold text-center">Pre-Approval Application</h2>
            </div>
            
            <p className="text-center text-gray-300 max-w-3xl mx-auto mb-12">
              Get pre-approved in minutes with no impact on your credit score. Our secure process will help you understand your buying power before you shop.
            </p>
            
            <div className="bg-secondary rounded-xl shadow-xl p-6 md:p-8 max-w-4xl mx-auto">
              {formSubmitted ? (
                // Success Message
                <div className="text-center py-16">
                  <CheckCircleIcon className="h-16 w-16 mx-auto text-green-500 mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Your application has been submitted!</h3>
                  <p className="text-gray-300 mb-8 max-w-md mx-auto">
                    Our finance team will review your application and contact you within 24 hours with your pre-approval status and available financing options.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="px-6 py-3 bg-accent hover:bg-accent/80 text-white rounded-md font-medium transition-colors"
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                // Application Form
                <form onSubmit={handlePreApprovalSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="bg-gray-800/50 p-5 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4 text-accent">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleFormChange}
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-1">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleFormChange}
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleFormChange}
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleFormChange}
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Address Information */}
                  <div className="bg-gray-800/50 p-5 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4 text-accent">Address Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-1">
                          Street Address *
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleFormChange}
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleFormChange}
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-gray-300 mb-1">
                            State *
                          </label>
                          <input
                            type="text"
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleFormChange}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-300 mb-1">
                            ZIP Code *
                          </label>
                          <input
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleFormChange}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Financial Information */}
                  <div className="bg-gray-800/50 p-5 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4 text-accent">Financial Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="employmentStatus" className="block text-sm font-medium text-gray-300 mb-1">
                          Employment Status *
                        </label>
                        <select
                          id="employmentStatus"
                          name="employmentStatus"
                          value={formData.employmentStatus}
                          onChange={handleFormChange}
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                          required
                        >
                          <option value="employed">Employed</option>
                          <option value="self-employed">Self-Employed</option>
                          <option value="retired">Retired</option>
                          <option value="student">Student</option>
                          <option value="unemployed">Unemployed</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="annualIncome" className="block text-sm font-medium text-gray-300 mb-1">
                          Annual Income *
                        </label>
                        <input
                          type="number"
                          id="annualIncome"
                          name="annualIncome"
                          value={formData.annualIncome}
                          onChange={handleFormChange}
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                          placeholder="$"
                          min="0"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="creditScore" className="block text-sm font-medium text-gray-300 mb-1">
                          Estimated Credit Score
                        </label>
                        <select
                          id="creditScore"
                          name="creditScore"
                          value={formData.creditScore}
                          onChange={handleFormChange}
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                        >
                          <option value="excellent">Excellent (720+)</option>
                          <option value="good">Good (690-719)</option>
                          <option value="fair">Fair (630-689)</option>
                          <option value="poor">Poor (580-629)</option>
                          <option value="bad">Bad (Below 580)</option>
                          <option value="unknown">Don't Know</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="purchaseTimeframe" className="block text-sm font-medium text-gray-300 mb-1">
                          Purchase Timeframe
                        </label>
                        <select
                          id="purchaseTimeframe"
                          name="purchaseTimeframe"
                          value={formData.purchaseTimeframe}
                          onChange={handleFormChange}
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                        >
                          <option value="immediately">Immediately</option>
                          <option value="1-3months">1-3 months</option>
                          <option value="3-6months">3-6 months</option>
                          <option value="6months+">6+ months</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  {/* Loan Details */}
                  <div className="bg-gray-800/50 p-5 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4 text-accent">Loan Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="formLoanAmount" className="block text-sm font-medium text-gray-300 mb-1">
                          Desired Loan Amount *
                        </label>
                        <input
                          type="number"
                          id="formLoanAmount"
                          name="loanAmount"
                          value={formData.loanAmount}
                          onChange={handleFormChange}
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                          placeholder="$"
                          min="0"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="formDownPayment" className="block text-sm font-medium text-gray-300 mb-1">
                          Down Payment Amount
                        </label>
                        <input
                          type="number"
                          id="formDownPayment"
                          name="downPayment"
                          value={formData.downPayment}
                          onChange={handleFormChange}
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                          placeholder="$"
                          min="0"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <label className="flex items-start">
                        <input
                          type="checkbox"
                          className="mt-1"
                          required
                        />
                        <span className="ml-2 text-sm text-gray-300">
                          I authorize CarHub to obtain my credit information and verify my employment and income for the purpose of determining my eligibility for auto financing. I understand this is a soft credit inquiry that will not affect my credit score.
                        </span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Submit Button */}
                  <div className="flex justify-center mt-6">
                    <button
                      type="submit"
                      className="px-8 py-3 bg-accent hover:bg-accent/80 text-white rounded-md font-medium transition-colors"
                    >
                      Submit Application
                    </button>
                  </div>
                </form>
              )}
            </div>
          </RevealOnScroll>
        </div>
      </section>
      
      {/* FAQs Section */}
      <section className="py-16 px-4 bg-secondary">
        <div className="max-w-4xl mx-auto">
          <RevealOnScroll>
            <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">What credit score do I need for financing?</h3>
                <p className="text-gray-300">
                  While a score of 660 or higher typically qualifies for the best rates, we work with multiple lenders who specialize in various credit profiles. Our in-house financing program can help customers with scores as low as 550.
                </p>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">How much should my down payment be?</h3>
                <p className="text-gray-300">
                  We recommend 10-20% of the vehicle price for optimal loan terms. However, we offer flexible options including zero down payment for qualified buyers. A larger down payment will reduce your monthly payments and total interest paid.
                </p>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">How long does pre-approval take?</h3>
                <p className="text-gray-300">
                  Our digital pre-approval process typically takes just a few minutes to complete. You'll receive a response within 24 hours, though many applications are approved instantly. Pre-approvals are valid for 30 days.
                </p>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Can I refinance my auto loan with CarHub?</h3>
                <p className="text-gray-300">
                  Yes, we offer refinancing options that may help lower your monthly payment or reduce your interest rate. Refinancing is ideal if your credit score has improved since your original loan or if interest rates have dropped significantly.
                </p>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Do you offer financing for private party purchases?</h3>
                <p className="text-gray-300">
                  Yes, we can provide financing for vehicles purchased from private sellers. The process requires additional verification steps and the vehicle must meet certain age and mileage requirements. Contact our finance team for details.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
      
      {/* Partner Banks Section */}
      <section className="py-16 px-4 bg-primary">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <h2 className="text-3xl font-bold mb-8 text-center">Our Financing Partners</h2>
            <p className="text-center text-gray-300 max-w-3xl mx-auto mb-12">
              We work with leading financial institutions to provide you with competitive rates and flexible financing options.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {/* Partner Logos - These would be replaced with actual bank logos */}
              <div className="bg-gray-800 h-20 rounded-lg flex items-center justify-center p-4">
                <div className="text-lg font-bold text-gray-300">Bank of America</div>
              </div>
              <div className="bg-gray-800 h-20 rounded-lg flex items-center justify-center p-4">
                <div className="text-lg font-bold text-gray-300">Chase</div>
              </div>
              <div className="bg-gray-800 h-20 rounded-lg flex items-center justify-center p-4">
                <div className="text-lg font-bold text-gray-300">Capital One</div>
              </div>
              <div className="bg-gray-800 h-20 rounded-lg flex items-center justify-center p-4">
                <div className="text-lg font-bold text-gray-300">Wells Fargo</div>
              </div>
              <div className="bg-gray-800 h-20 rounded-lg flex items-center justify-center p-4">
                <div className="text-lg font-bold text-gray-300">US Bank</div>
              </div>
              <div className="bg-gray-800 h-20 rounded-lg flex items-center justify-center p-4">
                <div className="text-lg font-bold text-gray-300">TD Bank</div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
      
      {/* Mobile App Integration - Coming Soon Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-accent/20 to-secondary">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <span className="px-4 py-1 bg-accent/30 text-accent rounded-full text-sm font-semibold mb-4 inline-block">
                Coming Soon
              </span>
              <h2 className="text-3xl font-bold mb-4">Mobile App Integration</h2>
              <p className="text-gray-300 max-w-3xl mx-auto">
                We're bringing the car financing experience to your smartphone with powerful mobile features
                and integrations with popular auto financing apps.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* CarHub Finance Mobile App */}
              <div className="bg-secondary/80 rounded-xl p-6 shadow-lg">
                <div className="h-14 w-14 bg-accent/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">CarHub Finance App</h3>
                <ul className="text-gray-300 space-y-2">
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span>Real-time application status tracking</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span>Push notifications for approvals</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span>Document scanning for faster processing</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span>Secure document uploads</span>
                  </li>
                </ul>
              </div>
              
              {/* Third-Party App Integration */}
              <div className="bg-secondary/80 rounded-xl p-6 shadow-lg">
                <div className="h-14 w-14 bg-accent/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">Third-Party Integrations</h3>
                <ul className="text-gray-300 space-y-2">
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span>Connect with TrueCar, Edmunds & more</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span>Import pre-approved loan offers</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span>Compare rates across multiple lenders</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span>Quick application submission</span>
                  </li>
                </ul>
              </div>
              
              {/* Mobile-First Features */}
              <div className="bg-secondary/80 rounded-xl p-6 shadow-lg">
                <div className="h-14 w-14 bg-accent/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">Mobile-First Features</h3>
                <ul className="text-gray-300 space-y-2">
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span>QR code scanning for instant info</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span>AR payment visualization</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span>Voice-guided application process</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span>Biometric authentication</span>
                  </li>
                </ul>
              </div>
              
              {/* Digital Wallet & Payment */}
              <div className="bg-secondary/80 rounded-xl p-6 shadow-lg">
                <div className="h-14 w-14 bg-accent/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">Digital Payments</h3>
                <ul className="text-gray-300 space-y-2">
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span>Apple Pay & Google Pay support</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span>Payment scheduling</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span>Financing milestone rewards</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span>Digital document storage</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <button className="px-8 py-3 bg-accent hover:bg-accent/80 text-white rounded-md font-medium transition-colors">
                Join the Waitlist
              </button>
              <p className="text-sm text-gray-400 mt-3">
                Be the first to know when our mobile financing features launch.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>
      
      <Footer />
    </>
  );
} 