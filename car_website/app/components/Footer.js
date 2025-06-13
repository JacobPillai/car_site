"use client";

import Link from "next/link";
import { PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

export default function Footer() {
  return (
    <footer className="bg-secondary text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* First Column */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Buy & Sell</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/cars" className="hover:text-accent transition-colors">
                  Cars For Sale
                </Link>
              </li>
              <li>
                <Link href="/new-cars" className="hover:text-accent transition-colors">
                  New Car Deals
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-accent transition-colors">
                  News & Reviews
                </Link>
              </li>
              <li>
                <Link href="/sell-your-car" className="hover:text-accent transition-colors">
                  Sell Your Car
                </Link>
              </li>
              <li>
                <Link href="/trusted-dealers" className="hover:text-accent transition-colors">
                  Trusted Dealerships
                </Link>
              </li>
            </ul>
          </div>

          {/* Second Column */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Product & Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/for-dealers" className="hover:text-accent transition-colors">
                  Dealership Solutions
                </Link>
              </li>
              <li>
                <Link href="/leads" className="hover:text-accent transition-colors">
                  Lead Marketplace
                </Link>
              </li>
              <li>
                <Link href="/car-price-data" className="hover:text-accent transition-colors">
                  Car Price Data
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-accent transition-colors">
                  Our Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Third Column */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">About Us</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-accent transition-colors">
                  About CarHub
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-accent transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="hover:text-accent transition-colors">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Fourth Column */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex items-center mb-3">
              <PhoneIcon className="h-5 w-5 mr-2 text-accent" />
              <a href="tel:0166128291" className="hover:text-accent transition-colors">016-612 8291</a>
            </div>
            <div className="flex items-center mb-5">
              <EnvelopeIcon className="h-5 w-5 mr-2 text-accent" />
              <a href="mailto:jacobjayenpillai@gmail.com" className="hover:text-accent transition-colors">jacobjayenpillai@gmail.com</a>
            </div>
            
            <h4 className="text-white font-medium mb-3">Follow us:</h4>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="bg-white/10 hover:bg-accent/80 p-2 rounded-full transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="https://twitter.com" className="bg-white/10 hover:bg-accent/80 p-2 rounded-full transition-colors" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="https://instagram.com" className="bg-white/10 hover:bg-accent/80 p-2 rounded-full transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="https://www.youtube.com/@jacobpillai" className="bg-white/10 hover:bg-accent/80 p-2 rounded-full transition-colors" aria-label="YouTube">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            
            <div className="mt-6">
              <h4 className="text-white font-medium mb-3">Download App:</h4>
              <div className="flex flex-col space-y-2">
                <Link href="/app-store" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors flex items-center">
                  <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.0368 14.8912C16.6223 15.1845 16.224 15.4943 15.8423 15.8208C15.1848 16.4001 14.6133 16.6897 14.0388 16.6897C13.4644 16.6897 12.7548 16.4048 12.0453 16.1199C11.3358 15.8351 10.6262 15.5502 10.0527 15.5502C9.47923 15.5502 8.77071 15.8351 8.06116 16.1199C7.35162 16.4048 6.64208 16.6897 6.06759 16.6897C5.49516 16.6897 4.92066 16.4001 4.26319 15.8208C3.88148 15.4943 3.48322 15.1845 3.06872 14.8912C1.86646 14.0405 0.810393 12.5573 0.810393 10.3414C0.810393 8.12752 1.86646 6.28928 3.35882 5.42857C4.5991 4.73435 6.06759 4.69936 7.35162 5.42857C8.14576 5.88834 8.7662 6.28928 9.48885 6.28928C10.2115 6.28928 10.934 5.88834 11.7281 5.42857C13.0121 4.69936 14.4806 4.73435 15.7209 5.42857C17.2133 6.28928 18.2693 8.12752 18.2693 10.3414C18.2693 12.5573 17.2133 14.0405 16.0091 14.8912" />
                    <path d="M11.9694 4.68831C12.3286 3.10105 13.0381 1.44888 14.1893 0.0356445C12.9841 0.489414 11.8939 1.30012 11.0628 2.36095C10.2317 3.42178 9.66824 4.76751 9.63023 6.18245C10.2607 6.21646 10.8901 6.07718 11.4663 5.77749C12.0424 5.47781 12.5503 5.02679 12.9461 4.46811" />
                  </svg>
                  App Store
                </Link>
                <Link href="/play-store" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors flex items-center">
                  <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.3764 20.5011C3.22189 20.6519 3.02798 20.7567 2.81526 20.8042C2.60253 20.8517 2.38032 20.8401 2.17421 20.7705C1.9681 20.7009 1.78639 20.5758 1.64922 20.4086C1.51206 20.2415 1.42516 20.0387 1.3997 19.825V4.17056C1.42516 3.95683 1.51206 3.75408 1.64922 3.58694C1.78639 3.4198 1.9681 3.29471 2.17421 3.22511C2.38032 3.15551 2.60253 3.14384 2.81526 3.19133C3.02798 3.23883 3.22189 3.34362 3.3764 3.49444L13.1044 11.8211C13.219 11.9335 13.3099 12.0697 13.3704 12.2201C13.4308 12.3705 13.4597 12.5318 13.4552 12.6941C13.4552 12.8522 13.4255 13.0085 13.3681 13.1548C13.3107 13.3011 13.2268 13.4341 13.1209 13.5467L3.3764 20.5011Z" />
                    <path d="M13.1213 13.548L16.1949 11.0944L13.1213 8.64087L18.0913 5.26555C18.3296 5.10461 18.6087 5.01798 18.8948 5.0155C19.1809 5.01302 19.4617 5.09479 19.7033 5.25141C19.9449 5.40803 20.1378 5.63325 20.2609 5.90079C20.3839 6.16833 20.4316 6.4677 20.3979 6.76332V18.2339C20.4314 18.5294 20.3837 18.8287 20.2607 19.0962C20.1377 19.3637 19.9449 19.5888 19.7034 19.7455C19.4619 19.9021 19.1813 19.9839 18.8953 19.9816C18.6093 19.9792 18.3302 19.8927 18.0918 19.7319L13.1213 16.3569L13.1213 13.548Z" />
                    <path d="M3.3764 3.49556L13.1044 11.8222C13.219 11.9347 13.3099 12.0708 13.3704 12.2212C13.4308 12.3717 13.4597 12.533 13.4552 12.6952C13.4552 12.8533 13.4255 13.0097 13.3681 13.156C13.3107 13.3022 13.2268 13.4352 13.1209 13.5479L3.3764 20.5023V3.49556Z" />
                  </svg>
                  Google Play
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              <Link href="/terms" className="text-gray-400 hover:text-gray-300">
                Terms of Use
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-gray-300">
                Privacy Policy
              </Link>
              <Link href="/careers" className="text-gray-400 hover:text-gray-300">
                Careers
              </Link>
            </div>
            <div className="mt-4 md:mt-0 md:order-1">
              <p className="text-gray-400">&copy; {new Date().getFullYear()} CarHub. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 