# Car Website

A modern car listing website built with Next.js and Tailwind CSS.

## Features

- Responsive design
- Car search functionality
- Advanced filtering options
- Beautiful UI with dark theme
- Mobile-friendly navigation
- User authentication system
- About page with company information
- News section with automotive updates
- Comprehensive car browsing with condition filtering (All, New, Used, Hot Deals)
- URL parameter support for direct filtering access
- Saved cars functionality to favorite potential purchases
- Comprehensive settings page with accessibility options
- Click-to-call functionality for direct phone contact

## Implementation Status

The following features have UI components but require additional implementation for full functionality:

### Partially Implemented Features

1. **Sell Your Car Form** (`/sell`)
   - UI and form fields implemented
   - Form captures user data and sends via EmailJS
   - Form validation and submission handling complete
   - Loading and error states implemented
   - Image upload feature needs server-side storage

2. **Dealer Signup Form** (`/dealer-signup` and `/sell?tab=dealer`)
   - UI and form implemented with tabs interface
   - Form captures dealer information and sends via EmailJS
   - Form validation and submission handling complete
   - Loading and error states implemented

3. **Authentication System** (`/auth/login`, `/auth/register`)
   - Login and registration UI implemented
   - Forms capture user credentials but lack backend authentication
   - Password reset flow needs API integration

4. **Saved Cars Functionality** (`/saved-cars`)
   - UI for displaying saved cars implemented
   - Save/unsave buttons in car listings with localStorage persistence
   - Sorting functionality for saved cars (Recently Saved, Price, Year)
   - Context-based state management for app-wide access

5. **Settings Options** (`/settings`)
   - UI toggles and preference controls implemented
   - Settings are persisted between sessions using localStorage
   - Real-time application of accessibility settings (contrast, text size, motion)
   - Context-based state management for app-wide access
   - System preference detection for dark mode and reduced motion
   - Success status feedback when settings are applied
   - Visual theme switching with CSS variables

6. **Finance Calculator** (`/finance`)
   - Interactive loan calculator UI functions for calculations
   - Pre-approval application captures but doesn't process data
   - Missing backend integration for application submission

7. **Filter Preferences**
   - Basic filtering works for session
   - Saving preferences for future sessions not implemented
   - User-specific filter memory requires authentication integration

8. **Contact Form**
   - Form UI implemented with EmailJS integration
   - Basic email functionality added (see app/README.md)
   - Additional form validation and error handling needed

9. **Price Drop Alerts**
   - UI subscription options implemented
   - No backend service for monitoring or sending alerts

10. **News Subscription**
    - Newsletter subscription form UI implemented
    - Requires integration with email marketing service

## Implementation Notes

### Buy Page with Filtering System

We implemented a complete car browsing system with the following components:

1. **Main Buy Page** (`/buy`)
   - Condition-based filtering (All Cars, New Cars, Used Cars, Hot Deals)
   - Advanced filter sidebar (price range, year range, transmission, fuel type)
   - Search functionality for finding specific cars
   - Responsive grid layout for car listings
   - Empty state handling when no cars match filters

2. **Condition Filter Component**
   - Tab-based UI for selecting car conditions
   - Visual indicators for active selection
   - Smooth animations using Framer Motion
   - Responsive layout (2 columns on mobile, 4 on larger screens)

3. **URL Integration**
   - Support for condition parameters in URL (`/buy?condition=new`)
   - Backward compatibility with legacy URLs using redirect pages

#### Implementation Approach

- **Centralized Filtering Logic**: All filter operations are managed in the buy page component
- **Real-time Filtering**: Cars are filtered instantly as users select criteria
- **URL Synchronization**: URL parameters are used to set initial filter state
- **Code Documentation**: Comprehensive JSDoc comments explain component functionality

#### Implementation Challenges

**Challenge 1: Multiple Filtering Criteria**
- **Problem**: Needed to combine multiple filter types (condition, price, year, etc.) while maintaining good performance.
- **Solution**: Implemented a cascading filter approach in a useEffect hook that applies each filter in sequence.

**Challenge 2: URL Parameter Integration**
- **Problem**: Needed to support direct access to filtered views via URL parameters.
- **Solution**: Used Next.js's useSearchParams hook to read the condition parameter and set the initial state.

**Challenge 3: Backward Compatibility**
- **Problem**: Existing URLs like `/cars`, `/new-cars`, etc. needed to keep working.
- **Solution**: Created redirect pages that forward users to the new buy page with appropriate condition parameters.

### Authentication System

We implemented a complete authentication system with the following components:

1. **Sign-in page** (`/auth/login`)
   - Email and password fields
   - "Remember me" option
   - "Forgot password" link
   - Form validation

2. **Sign-up page** (`/auth/register`)
   - User details collection (first/last name, email)
   - Password with confirmation
   - Terms and conditions consent
   - Form validation

3. **Password Recovery** (`/auth/forgot-password`)
   - Email-based password reset flow
   - Success state feedback

#### Implementation Challenges

**Challenge 1: Route Path Issues**
- **Problem**: 404 errors when accessing `/login` and `/register` paths. The Navbar linked to `/login` and `/register`, but pages were implemented at `/auth/login` and `/auth/register`.
- **Solution**: Updated Navbar links to point to the correct `/auth/...` paths. Also implemented redirect pages at root paths (`/login` → `/auth/login`).

**Challenge 2: Multiple Redirect Methods**
- **Problem**: Needed a reliable way to handle redirection for users who might bookmark or directly access the wrong URL.
- **Solution**: Implemented both client-side (`useRouter`) and server-side (Next.js API route handlers) redirects for maximum compatibility.

### About Page

Created a comprehensive about page that explains CarHub's value proposition:

- Mission statement section
- Key benefits presented in card format (Extensive Selection, Transparent Process, Seamless Experience)
- Bulleted value proposition list 
- Consistent styling with the rest of the application

### News Section

Implemented a dynamic news system with the following features:

1. **News Landing Page** (`/news`)
   - News article cards with category filtering
   - Category-based filtering system
   - Newsletter subscription form

2. **Article Detail Pages** (`/news/[id]`)
   - Dynamic routing based on article ID
   - Rich content display
   - Related articles section
   - Back to news navigation

#### Implementation Challenges

**Challenge 1: Dynamic Routing**
- **Problem**: 404 errors when trying to access individual news articles.
- **Solution**: Implemented proper dynamic routing using Next.js's `[id]` folder convention and the `useParams` hook.

**Challenge 2: Data Management**
- **Problem**: Efficiently sharing news data between list and detail views.
- **Solution**: Created a centralized data array that's imported into both components to ensure consistency.

### Finance Page

Created a comprehensive financing section with interactive tools and detailed information:

1. **Loan Calculator** 
   - Interactive sliders for loan amount, down payment, interest rate, and term
   - Real-time calculation of monthly payments
   - Total interest and payment summaries
   - Mobile-responsive design

2. **Financing Options**
   - Traditional auto loan details
   - Lease options with benefits
   - In-house financing for customers with less-than-perfect credit
   - Key features and benefits of each option

3. **Pre-Approval Application**
   - Multi-section form for personal, address, and financial information
   - User-friendly input validation
   - Success state with next steps
   - Privacy disclosure

4. **Additional Information**
   - Comprehensive FAQ section
   - Financing partner display
   - Clear explanations of financing terms

#### Implementation Approach
- **State Management**: Used React's useState for form handling and calculations
- **Dynamic Calculations**: Real-time updates using useEffect to monitor input changes
- **Currency Formatting**: Implemented with Intl.NumberFormat for proper display
- **Responsive Design**: Tailored layouts for mobile, tablet, and desktop views
- **Form Handling**: Complete validation and submission handling

#### Mobile App Integration (Upcoming)
We'll be enhancing the finance section with mobile app integration features:

1. **CarHub Finance Mobile App**
   - Real-time loan application status tracking
   - Push notifications for approval updates
   - Document scanning for faster application process
   - Secure document upload for verification

2. **Third-Party Financing App Integration**
   - Connect with popular apps like TrueCar, Edmunds, and Used Car Search Pro
   - Import pre-approved loan offers from partner banks
   - Compare rates across multiple lenders in one interface
   - Quick application submission via app integrations

3. **Mobile-First Features**
   - QR code scanning for instant vehicle financing information on the lot
   - Augmented reality payment visualization
   - Voice-guided loan application process
   - Biometric authentication for secure application submission

4. **Digital Wallet & Payment Integration**
   - Support for Apple Pay and Google Pay for application fees
   - Payment scheduling and automatic withdrawal setup
   - Financing milestone achievements and rewards
   - Digital loan document storage and retrieval

### Saved Cars Functionality

Implemented a complete saved cars system that allows users to track favorite vehicles:

1. **Saved Cars Page** (`/saved-cars`)
   - List view of all favorited vehicles
   - Ability to remove cars from saved list
   - Sort options (Recently Saved, Price, Year)
   - Empty state UI when no cars are saved
   - Price drop alert subscription

2. **Car Saving Integration**
   - Heart icon in navbar links directly to saved cars
   - Save/unsave button in car detail overlays
   - Visual indicators for saved state
   - Save date tracking and display

3. **User Experience**
   - Quick access from both desktop and mobile navigation
   - Hover tooltips for save/remove actions
   - Consistent save/unsave behavior across the site

### Settings Page

Created a comprehensive settings page that allows users to customize their experience:

1. **Accessibility Settings**
   - High contrast mode toggle
   - Text size adjustment
   - Reduced motion option
   - Screen reader optimizations

2. **Notification Preferences**
   - Price drop alerts toggle
   - New listing notifications
   - Saved car updates
   - Market updates and promotions

3. **Privacy & Security**
   - Activity sharing controls
   - Location services toggle
   - Data collection settings
   - Cookie preferences management
   - Two-factor authentication

4. **Language & Location**
   - Language selection
   - Location settings
   - Distance unit preference (miles/kilometers)

5. **Account Management**
   - Email and password update options
   - Profile information management
   - Account security controls

### Contact System Improvements

We implemented enhanced contact functionality to make it easier for users to reach out:

1. **Click-to-Call Integration**
   - Phone number links with `tel:` protocol across the site
   - Formatted phone number display (016-612 8291)
   - Call button with phone icon for visual clarity
   - Multiple call button styles for different contexts
   - Click tracking for analytics

2. **Contact Component**
   - Reusable `ContactInfo` component for consistent display
   - Three different UI variants:
     - Text link for minimal interfaces
     - Button with icon for prominent placement
     - Alternative styled button for visual variety
   - Proper accessibility attributes (aria-labels)
   - Hover and active states for better UX

3. **Implementation Locations**
   - Main contact page
   - Footer component
   - Navigation header
   - (Future) Car detail pages

4. **Mobile Optimization**
   - Touch-friendly button sizes
   - Proper spacing for mobile tapping
   - Visual feedback on tap interactions
   - Direct dialer integration on mobile devices

## Next.js App Router Best Practices

During the implementation of this project, we learned several important lessons about working with Next.js App Router:

### 1. Route Naming Conventions

- **Page Routes**: Pages should be placed in their respective folders with a `page.js` file (e.g., `/app/about/page.js` for the `/about` route).
- **Dynamic Routes**: Use brackets for dynamic segments (e.g., `/app/news/[id]/page.js` for `/news/1`, `/news/2`, etc.).
- **API Routes**: Place API routes in their corresponding folders with a `route.js` file (e.g., `/app/api/auth/[...nextauth]/route.js`).

### 2. Handling Redirects

We implemented multiple redirect strategies for maximum compatibility:

- **Client-side Redirects**: Using `useRouter` from `next/navigation` for client-side redirections.
  ```jsx
  const router = useRouter();
  useEffect(() => {
    router.replace("/auth/login");
  }, [router]);
  ```

- **Server-side Redirects**: Using the Next.js Route Handlers API for server-side redirections.
  ```jsx
  import { NextResponse } from "next/server";
  
  export function GET() {
    return NextResponse.redirect(new URL("/auth/login", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"));
  }
  ```

### 3. Data Fetching and Sharing

- For data needed across multiple components, we created shared data files.
- For static content like news articles, we used a centralized data array to ensure consistency.
- For dynamic data that would normally come from an API, we structured the code to easily replace mock data with real API calls.

### 4. Navigation Best Practices

- Use the `Link` component from `next/link` for client-side navigation between pages.
- Make sure href paths match your folder structure (e.g., `/auth/login`, not `/login` if your page is in `/app/auth/login/page.js`).
- For dynamic routes, pass the correct parameter format (e.g., `/news/${articleId}`).

### 5. Error Prevention

- Always implement fallback UI for dynamic routes when data might not be available.
- Use proper error boundaries to handle unexpected errors gracefully.
- Implement loading states for asynchronous operations.

## Upcoming Features

### Interactive Car Details
- Hover-based detailed view with smooth animations
- Image gallery with zoom functionality
- Quick action buttons (Save, Share, Contact)
- Detailed specifications in an elegant layout
- 360-degree car view integration

### Enhanced Filtering and Search
- Price range slider with visual feedback
- Color selection with swatches
- Multiple image previews
- Save filter preferences
- Advanced sorting options

### User Experience Improvements
- Save for Later functionality
- Car comparison tool
- Recently viewed section
- Similar cars recommendations
- Search history tracking

### Authentication Enhancements
- Social login options (Google, Facebook, Twitter)
- Two-factor authentication
- Profile customization
- User preferences storage
- Account recovery options
- User activity dashboard

### News and Content Improvements
- Real-time news API integration
- User comments on news articles
- Content sharing capabilities
- Video content integration
- Notification system for new articles
- Personalized news recommendations

### About and Company Section
- Team member profiles
- Interactive company timeline
- Location-based dealer finder
- Career opportunities section
- Customer testimonials
- Company blog integration

### Visual Enhancements
- Dark/Light mode toggle
- Interactive elements:
  - Image zoom on hover
  - 360-degree car view
  - Color swatches for variants
  - Interactive price history graph

### Performance Optimizations
- Infinite scroll for car listings
- Skeleton loading states
- Blur image placeholders
- Progressive loading for details

### Social Features
- Social media sharing
- Rating and review system
- ✅ Comment section documentation added
- Share with friends feature

### Mobile Optimizations
- Enhanced touch interactions
- Swipe gestures for galleries
- Responsive layout improvements
- Mobile-friendly filter interface

### Accessibility Improvements
- ARIA labels
- Keyboard navigation
- Screen reader support
- Focus management

## Recent Enhancements

### User Settings System Improvements

The user settings system has been significantly enhanced with the following features:

1. **System Preference Detection**
   - Automatic detection of OS-level preferences (dark mode, reduced motion)
   - Real-time event listeners for system preference changes
   - "Use System Preferences" option for easy synchronization

2. **Theme Management**
   - Comprehensive dark/light theme implementation using CSS variables
   - Theme toggle in settings page with immediate visual feedback
   - Persistent theme selection across browser sessions

3. **Performance Optimizations**
   - Combined localStorage operations for reduced write frequency
   - Error handling for storage failures with graceful degradation
   - Status indicators for successful settings application

4. **User Experience Improvements**
   - Clear visual feedback when settings are changed
   - Organized settings categories for better navigation
   - Improved accessibility through proper ARIA attributes

### Recommendations for Future Refinements

Based on best practices for React Context usage, consider these refinements for the user settings system:

1. **Performance Optimization**
   - Implement React.memo for components that consume settings context
   - Split the settings context into smaller, more focused contexts
   - Use useCallback for all setting update functions
   - Consider using context selectors to prevent unnecessary re-renders

2. **Enhanced State Management**
   - Move to a reducer pattern for more predictable state updates
   - Implement middleware for side effects (like localStorage persistence)
   - Add state transitions for animations during theme changes

3. **Additional Features**
   - Server-side persistence for authenticated users
   - Sync settings across devices for logged-in users
   - Expand theme options beyond light/dark (high contrast, sepia, etc.)
   - Add font family options for enhanced accessibility

4. **Code Improvements**
   - Extract complex logic from components into custom hooks
   - Add comprehensive unit tests for settings logic
   - Create a settings API for programmatic access from other features

These recommendations are prioritized based on impact and implementation complexity, with performance optimizations and state management improvements offering the most significant benefits for minimal effort.

## Prerequisites

- Node.js 18.x or later
- npm or yarn

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd car-website
```

2. Install dependencies:
```bash
npm install
```

3. Add car images to the `public/cars` directory:
- tesla-model-3.jpg
- bmw-m3.jpg
- (Add more car images as needed)

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
car-website/
├── app/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Hero.js
│   │   ├── CarCard.js
│   │   ├── Filter.js
│   │   ├── CarDetailsOverlay.js
│   │   ├── Footer.js
│   │   ├── OptimizedImage.js
│   │   ├── RevealOnScroll.js
│   │   ├── ConditionFilter.js
│   │   └── ContactInfo.js
│   ├── auth/
│   │   ├── login/
│   │   │   └── page.js
│   │   ├── register/
│   │   │   └── page.js
│   │   └── forgot-password/
│   │       └── page.js
│   ├── buy/
│   │   └── page.js
│   ├── cars/
│   │   └── page.js
│   ├── new-cars/
│   │   └── page.js
│   ├── used-cars/
│   │   └── page.js
│   ├── hot-deals/
│   │   └── page.js
│   ├── finance/
│   │   └── page.js
│   ├── news/
│   │   ├── [id]/
│   │   │   └── page.js
│   │   └── page.js
│   ├── about/
│   │   └── page.js
│   ├── saved-cars/
│   │   └── page.js
│   ├── settings/
│   │   └── page.js
│   ├── sell/
│   │   └── page.js
│   ├── sell-your-car/        # Redirect page
│   │   └── page.js
│   ├── dealer-signup/        # Redirect page
│   │   └── page.js
│   ├── login/                # Redirect pages
│   │   ├── page.js
│   │   └── route.js
│   ├── register/             # Redirect pages
│   │   ├── page.js
│   │   └── route.js
│   ├── page.js
│   ├── layout.js
│   └── globals.css
├── public/
│   └── cars/
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## Code Documentation

We've added comprehensive code documentation throughout the application:

1. **JSDoc Comments**: All components and functions include JSDoc-style comments explaining:
   - Component/function purpose
   - Parameters and return values
   - Key features and behavior

2. **In-line Comments**: Critical sections of code include explanatory comments for:
   - Complex logic
   - State management
   - UI rendering decisions
   - Animation effects

3. **HTML Comments**: UI sections are clearly labeled with HTML comments to improve readability

This documentation approach makes the codebase more maintainable and easier for new developers to understand.

## Technologies Used

- Next.js 14
- React 18
- Tailwind CSS
- Heroicons

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request 

Links to images:
-https://www.istockphoto.com/photo/tesla-ev-electric-vehicles-on-display-tesla-products-include-electric-cars-battery-gm1386070484-444526727
-https://www.google.com/search?q=tesla+model+3+copyright+free&sca_esv=2a2a93e8be91f013&rlz=1C1NHXL_enMY1143MY1143&udm=2&biw=1280&bih=593&sxsrf=AHTn8zqs7Y9c9YfTeikNIli8YMkaXONWUg%3A1742953456558&ei=8FvjZ9XmIeqYseMPvaaVkQQ&ved=0ahUKEwjVno3Nz6aMAxVqTGwGHT1TJUIQ4dUDCBE&uact=5&oq=tesla+model+3+copyright+free&gs_lp=EgNpbWciHHRlc2xhIG1vZGVsIDMgY29weXJpZ2h0IGZyZWVI-dEDULWoA1iN0QNwB3gAkAEAmAFWoAHJB6oBAjIwuAEDyAEA-AEBmAILoAKEA8ICDRAAGIAEGLEDGEMYigXCAgYQABgHGB7CAgoQABiABBhDGIoFwgIFEAAYgATCAgQQABgewgIGEAAYBRgewgIGEAAYCBgemAMAiAYBkgcCMTGgB-opsgcBNrgH3AI&sclient=img#vhid=VnyDDR6e2gEQ7M&vssid=mosaic
-https://cdn.pixabay.com/photo/2021/01/21/11/09/tesla-5937063_640.jpg
-https://www.motortrend.com/files/65a4a458391bac000853bb00/142-2024-tesla-model-3-rwd-short-range-rear-three-quarter-view.jpg?w=768&width=768&q=75&format=webp

Tesla Model Y
-https://images.squarespace-cdn.com/content/v1/6151d38ea56f9d31cf76ec07/1736661382904-LVV5C42YARUYBZJ7ZKJC/Screenshot+2025-01-12+at+4.50.57+pm.png
-https://www.motortrend.com/files/6792fb96636561000870ebbf/2026teslamodelyjuniperuslaunch25.jpg
-https://media.ed.edmunds-media.com/tesla/model-y/2025/oem/2025_tesla_model-y_4dr-suv_performance_fq_oem_1_600.jpg

BMW M3 Competition
-https://www.google.com/search?sca_esv=2a2a93e8be91f013&rlz=1C1NHXL_enMY1143MY1143&sxsrf=AHTn8zqT4QB8P8h1P-gsEElgmuyfc23_2A:1742977057704&q=bmw+m3+competition&udm=2&fbs=ABzOT_CWdhQLP1FcmU5B0fn3xuWpA-dk4wpBWOGsoR7DG5zJBpwxALD7bRaeOIZxqOFEngwcoULlEZAGqxMSwSTuV0BpV7PHogP6iDpo5GmRd-2qKuGUnCqnf5vbU_6xydH9TO3UkKuqOJceIuJdG6VKB6Sxld213U8oqMUVXU26aqnCc4tYVg1kfc169zv1ax4S_hG_OrPAt-7ZzelJrj3kqh5SMNDNSg&sa=X&ved=2ahUKEwiz7YDDp6eMAxVWzjgGHarhAyIQtKgLegQIEhAB&biw=1280&bih=593&dpr=1.5
-https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReBztQRFCv8k1KJc-l3yyTcrVteEnOjKJaXQ&s
-https://www.piston.my/wp-content/uploads/2024/05/PISTON.MY-2025-BMW-M3_8.jpeg
-https://www.mosselmanturbo.com/uploads/cars/detail_default/1200x675/bmw-m3-competition-g80-510hp-1.jpeg
-https://automacha.com/wp-content/uploads/2020/12/0FCCF7C5-F475-47D2-8823-7513CC471342.png
-https://bmw.scene7.com/is/image/BMW/g80_competition_interior_m-carbon-bucket-seats_fb?qlt=80&wid=1024&fmt=webp
-https://images.clickdealer.co.uk/blog/2403/post_images/954f95e1096a20a89e493d7ac9ab2ae4.jpg
-https://cdn.bmwblog.com/wp-content/uploads/2021/08/2021_bmw_m5_cs_images_17.jpg
-https://www.bmw-m.com/content/dam/bmw/marketBMW_M/www_bmw-m_com/all-models/m-automobile/2020/2024/bmw-m3-competition-sedan-hd-04.jpg
-https://prestigeandperformancecar.com/wp-content/uploads/BMW-M3-vs-BMW-M4-12-1024x640.jpg
-https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQddjO5LJVDJh2Lv6olRnpgqiG0U1Rrn_d6mg&s

Toyota Supra MK5:
-https://www.topgear.com/sites/default/files/2022/06/1-Toyota-GR-Supra.jpg
-https://s3.us-east-1.amazonaws.com/ccw-craft-storage/dev/assets/images/gallery/_2000xAUTO_crop_center-center_none/215374/Gunmetal-MK5-Toyota-Supra-CCW-D540-Polished-Web-01.webp
-https://robbreport.com/wp-content/uploads/2020/10/6-10.jpg
-https://www.ragazzon.com/storage/news/15/gallery/L_mar02540-_fileminimizer_.jpg
-https://w0.peakpx.com/wallpaper/261/202/HD-wallpaper-2020-toyota-supra-color-renaissance-red-front-three-quarter-car.jpg

Toyta Rav4:
-https://www.topgear.com/sites/default/files/2024/09/Toyota-RAV4-Hybrid-036.jpg
-https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0_z0YZORsMr5s1a3Aas3_2bvmZjICjsM1iQ&s
-https://global.toyota/pages/news/images/2020/06/08/1330/007.jpg

Toyota Camry:
-https://paultan.org/image/2022/02/2022-Toyota-Camry-facelift-Malaysia-1.jpg
-https://img.wapcar.my/file/b0206c8d0f694ac0914944fd1c89f93f.jpg
-https://dealerinspire-image-library-prod.s3.us-east-1.amazonaws.com/images/0jLQmpicIFJn0rkFZG6ZYQtpdLM9nIX8lHzgsGRS.jpg

Honda Civic Type R:
-https://upload.wikimedia.org/wikipedia/commons/c/cb/Honda_Civic_Type_R_%28FK%3B_France%29_front_view.jpg
-https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlAHmCUGhrZkpP8A2GwnrjqrsToxXABx5nXg&s
-https://soyacincau.com/wp-content/uploads/2023/09/230927-Honda-Civic-Type-R-Malaysia-1.jpg
-https://www.honda.co.uk/content/dam/central/cars/civic-type-r-2023/Overview/Honda-civic-type-r-09-desktop-16x9.jpg/_jcr_content/renditions/fb.jpg

Honda CRV:
-https://evault.honda.com.my/pixelvault/2023-12/e9cc04472b590711a48f99d9d02ea0c8e91355b026294.png
-https://assets.autobuzz.my/wp-content/uploads/2020/11/05124559/2020-Honda-CR-V-Launch-Malaysia-8.jpg
-https://www.dsf.my/wp-content/uploads/2024/07/2023-Honda-CR-V-e-HEV-RS-6.jpeg?v=1721784840

Honda Accord:
-https://static0.carbuzzimages.com/wordpress/wp-content/uploads/2025/02/honda-accord-facelift-china-03.jpg
-https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS42259UmVK3GWgEg16Txfyk3BqGnerFI3Hug&s