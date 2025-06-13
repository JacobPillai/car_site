# EmailJS Integration Setup

This project uses EmailJS to handle contact form submissions. Follow these steps to complete the setup:

## Step 1: Create an EmailJS Account
1. Go to [EmailJS](https://www.emailjs.com/) and create an account if you don't have one already.
2. Verify your email address.

## Step 2: Create an Email Service
1. In your EmailJS dashboard, go to "Email Services".
2. Click "Add New Service" and select your email provider (Gmail, Outlook, etc.).
3. Follow the instructions to connect your email account.
4. Note the Service ID that is generated (you'll need this later).

## Step 3: Create Email Templates
1. In your EmailJS dashboard, go to "Email Templates".
2. You will need to create three templates:

### Contact Form Template
1. Click "Create New Template".
2. Name it "Contact Form"
3. Set the Template ID to "contact_form" (or update the code in `app/contact/page.js`)
4. Design your email template with the following variables:
   - `{{from_name}}` - The name of the person submitting the form
   - `{{reply_to}}` - The email address of the person submitting the form
   - `{{message}}` - The message content
   - `{{to_email}}` - The recipient email address

### Sell Car Form Template
1. Click "Create New Template".
2. Name it "Sell Car Form"
3. Set the Template ID to "sell_car_form" (or update the code in `app/sell/page.js`)
4. Design your email template with the following variables:
   - `{{from_name}}` - The name of the person selling the car
   - `{{reply_to}}` - The email address of the person selling the car
   - `{{phone}}` - The phone number of the person selling the car
   - `{{car_details}}` - The details of the car being sold
   - `{{to_email}}` - The recipient email address

### Dealer Signup Form Template
1. Click "Create New Template".
2. Name it "Dealer Signup Form"
3. Set the Template ID to "dealer_signup_form" (or update the code in `app/sell/page.js`)
4. Design your email template with the following variables:
   - `{{from_name}}` - The name of the contact person
   - `{{reply_to}}` - The email address of the contact person
   - `{{phone}}` - The phone number of the contact person
   - `{{dealer_details}}` - The details of the dealer business
   - `{{to_email}}` - The recipient email address

## Step 4: Update the Form Code
1. Open `app/contact/page.js` and `app/sell/page.js`.
2. Replace the placeholder values:
   - Replace `"default_service"` with your actual Service ID
   - Update template IDs if you used different names

## Security Notes
- The public key `gJ-E18JRSDyKcCUpy` is already set in the code.
- The private key should be kept secure and not committed to version control.
- For additional security, consider moving the public key to an environment variable.

## Testing
After completing the setup, test the forms by:
1. Fill out each form with valid information
2. Submit the form
3. Check your email to confirm receipt
4. Verify that the success message appears on the website

For any issues, check the browser console for errors and ensure that your EmailJS account is properly configured.

# Click-to-Call Functionality Implementation

This project implements click-to-call functionality to allow users to directly contact the business by phone. Here's an overview of the implementation:

## Component Structure

1. Created a reusable `ContactInfo` component in `app/components/ContactInfo.js` that provides:
   - Text link version of the phone number
   - Button version with phone icon
   - Alternative styled button for different contexts

## Implementation Details

1. **Phone Number Format**
   - Raw number for `tel:` links: `0166128291`
   - Formatted display: `016-612 8291` (Malaysian format)
   - Used regex pattern for consistent formatting: `phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2 $3')`

2. **Integration Points**
   - Updated contact page with clickable phone number
   - Updated footer component with clickable phone number
   - Updated navbar with clickable phone number
   - Added full ContactInfo component to the contact page

3. **Styling Approach**
   - Used Tailwind CSS classes for consistent styling
   - Implemented hover and active states for better UX
   - Ensured mobile-friendly tap targets

4. **Accessibility Considerations**
   - Added proper `aria-label` attributes
   - Used semantic HTML elements
   - Maintained color contrast for visibility

## Analytics Integration

The component includes a `handleCallClick` function that logs click events and can be extended to integrate with analytics platforms:

```javascript
const handleCallClick = () => {
  console.log('Call button clicked');
  // Example: gtag('event', 'click_to_call', { phone_number: phoneNumber });
};
```

## Future Enhancements

- Add click-to-call buttons to individual car detail pages
- Implement call tracking with unique IDs for conversion tracking
- Add click-to-WhatsApp functionality as an alternative contact method

# Page Transitions Implementation

This project uses Framer Motion to implement smooth page transitions between routes. Here's an overview of the implementation:

## Component Structure

1. Created a reusable `PageTransition` component in `app/components/PageTransition.js` that provides:
   - Smooth fade-in and slide-up animation
   - Consistent transition timing across pages
   - Custom easing function for natural movement

## Implementation Details

1. **Animation Configuration**
   - Initial state: Slightly offset vertically (y: 20px) and transparent (opacity: 0)
   - Animated state: Normal position (y: 0) and fully visible (opacity: 1)
   - Transition duration: 0.4 seconds
   - Custom easing function: [0.61, 1, 0.88, 1] for a smooth, professional feel

2. **Integration Points**
   - Applied to key pages:
     - About page
     - News page
     - Login page
     - Register page
   - Wraps content between Navbar and Footer components

3. **Technical Approach**
   - Used Framer Motion's `motion.div` component
   - Implemented using variants pattern for cleaner code
   - Client-side component with "use client" directive

## Usage Example

To apply the page transition to a new page:

```javascript
import PageTransition from "../components/PageTransition";

export default function YourPage() {
  return (
    <>
      <Navbar />
      <PageTransition>
        {/* Your page content here */}
      </PageTransition>
      <Footer />
    </>
  );
}
```

## Future Enhancements

- Add exit animations for smoother transitions between pages
- Implement staggered animations for page elements
- Add different transition types for different sections of the site
- Consider implementing route-based animation variations

# Notification System

This project implements a comprehensive notification system to keep users informed about price changes, listing updates, and system messages. Here's an overview of the implementation:

## Component Structure

1. Created a reusable `NotificationCenter` component in `app/components/NotificationCenter.js` that provides:
   - Notification bell icon with unread count badge
   - Dropdown panel for displaying notifications
   - Controls for managing notifications (mark as read, clear all)

## Implementation Details

1. **Notification Types**
   - Price drops on saved/watched cars
   - New matches for saved searches
   - Listing expiry reminders
   - System notifications

2. **Notification State Management**
   - In-memory storage for current session
   - Polling mechanism to simulate real-time notifications
   - Counter for unread notifications
   - Visual indicators for unread items

3. **User Interactions**
   - Mark individual notifications as read
   - Mark all notifications as read
   - Clear all notifications
   - Click to navigate to relevant pages

4. **Visual Design**
   - Categorized notifications with different icons
   - Relative timestamps (e.g., "2 hours ago")
   - Hover states for interactive elements
   - Responsive design for desktop and mobile

## Integration Points

- Added to desktop navbar next to user profile
- Added to mobile menu for accessibility on smaller screens
- Designed to be compatible with privacy settings

## Future Enhancements

- Implement server-side storage for persistent notifications
- Add push notification capability for browser/device notifications
- Create user preferences for notification types
- Implement real-time updates using WebSockets

# Search History and Recent Searches

This project implements a search history feature to improve user experience when searching for cars. Here's an overview of the implementation:

## Component Structure

1. Created utility functions in `app/utils/searchHistory.js` for managing search history:
   - `addToSearchHistory`: Saves a search query and its filters
   - `getSearchHistory`: Retrieves saved searches
   - `clearSearchHistory`: Deletes all search history
   - `removeSearchItem`: Removes a specific search item
   - Additional helper functions for formatting and URL generation

2. Created a reusable `SearchHistory` component in `app/components/SearchHistory.js` that:
   - Displays recent searches in a list
   - Provides controls for managing search history
   - Respects privacy settings
   - Can be limited to a specific number of items

## Implementation Details

1. **Data Structure**
   - Each search includes query text, filters, and timestamp
   - Searches are stored in localStorage for persistence
   - Limited to 20 most recent searches to prevent overflow

2. **Privacy Integration**
   - Respects user's privacy settings for search history storage
   - Provides clear UI for disabled search history
   - Links to privacy settings for easy adjustment

3. **User Interactions**
   - Click to reapply a previous search
   - Remove individual search items
   - Clear all search history
   - View all searches on dedicated page

## Integration Points

- Added to car search sidebar
- Created a dedicated search history page at `/search-history`
- Search queries from the main search bar automatically saved
- History cleared when privacy settings disabled

## Technical Approach

- Used localStorage with error handling for persistence
- Implemented duplicate detection to prevent redundant entries
- Created formatters for readable search display
- Built with responsive design for all device sizes

## Future Enhancements

- Add search analytics and trending searches
- Implement server-side storage for authenticated users
- Add categorization for different types of searches
- Create shareable search links

# Privacy Controls Implementation

This project implements comprehensive privacy controls to address concerns about data collection in the automotive industry. This implementation was inspired by Mozilla Foundation research highlighting cars as one of the worst product categories for privacy. Here's an overview:

## Component Structure

1. Created a dedicated privacy settings page at `app/settings/privacy/page.js` that provides:
   - Toggles for different types of data collection
   - Clear explanations of what each setting controls
   - Options for data management (download/delete)

## Implementation Details

1. **Privacy Settings Categories**
   - Location data controls
   - Data sharing with dealers
   - Search and browsing history
   - Device permissions (microphone, camera)

2. **Data Management**
   - Options to download personal data
   - Controls to delete all user data
   - Reset to default settings option

3. **Technical Implementation**
   - Settings stored in localStorage
   - Integration with other features to respect settings
   - Real-time updating when settings change

4. **User Education**
   - Clear explanations of data usage
   - Transparency about legal requirements
   - Links to detailed privacy policies

## Integration Points

- Search history respects privacy settings
- Notification settings tied to privacy controls
- Settings accessible from user menu and related pages

## Future Enhancements

- Implement granular permission controls
- Add data retention policy settings
- Create privacy score/dashboard
- Implement encryption for sensitive stored data

# Debugging Non-Functional Features

This document provides guidance for debugging and implementing the non-functional features in the car website application.

## Common Issues and Solutions

### Form Submissions Not Working

Most forms in the application have frontend validation but do not connect to backend services.

**Debugging Steps:**
1. Check browser console for any errors when clicking submit buttons
2. Review form component event handlers in relevant page files
3. Note that form handlers usually include `console.log` statements showing captured data
4. Forms need API routes created in `/app/api` directory to handle submissions

### Authentication Not Persisting

The authentication system has UI components but lacks full backend implementation.

**Debugging Steps:**
1. Review auth form submission in `/app/auth/login/page.js` and `/app/auth/register/page.js`
2. Check that form data is correctly captured from input fields
3. For implementation, create API routes for authentication in `/app/api/auth/`
4. Consider implementing NextAuth.js for proper authentication flows

### Saved Cars Not Persisting

The saved cars functionality lacks data persistence between sessions.

**Implementation Guide:**
1. Create a client-side storage solution using `localStorage` or IndexedDB
2. For a complete solution, implement an API route at `/app/api/saved-cars`
3. Connect save/unsave buttons to this storage solution
4. Add loading states and error handling for better UX

### Settings Not Being Applied

User settings UI exists but doesn't persist or apply changes.

**Implementation Guide:**
1. Use `localStorage` for anonymous users' preferences
2. Create `/app/api/settings` endpoint for authenticated users
3. Connect toggle components to state management
4. Add logic to apply settings (e.g., high contrast mode) throughout the application

## Implementation Priorities

For implementing missing functionality, follow this recommended order:

1. **Authentication System**
   - Base requirement for user-specific features
   - Needed for saved cars, settings, and personal data

2. **Form Submissions**
   - Create API routes for contact, sell car, and dealer signup
   - Implement form validation and error handling

3. **Data Persistence**
   - Implement local storage for anonymous users
   - Create database models for authenticated users

4. **Notification Systems**
   - Implement email notifications and alerts
   - Set up subscription management

## Debugging Tools and Techniques

When troubleshooting non-functional features:

1. **Browser DevTools**
   - Monitor Network tab for failed requests
   - Check Console for JavaScript errors
   - Use Application tab to inspect localStorage and sessionStorage

2. **Component Inspection**
   - Use React DevTools to inspect component state
   - Add temporary debug output with `console.log` or inline display

3. **Form Testing**
   - Use temporary `alert()` calls to confirm handler execution
   - Add validation messages to verify input processing

4. **API Route Testing**
   - Test API routes with tools like Postman or Thunder Client
   - Add logging to API routes to track execution

Remember to remove any debugging code before deploying to production.

# LocalStorage Implementation

This project uses localStorage to persist user data and preferences between sessions. The implementation follows best practices for Next.js applications, ensuring compatibility with server-side rendering.

## Core Utilities

The localStorage implementation is built around utility functions in `app/utils/localStorage.js` that handle browser detection and error handling:

```javascript
// Check if we're running on the client side
const isClient = typeof window !== 'undefined';

// Safe getter with default value fallback
export const getFromStorage = (key, defaultValue = null) => {
  if (!isClient) return defaultValue;
  
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error getting item ${key} from localStorage:`, error);
    return defaultValue;
  }
};

// Additional utility functions for setting and removing items
```

## Storage Keys

To maintain consistency and avoid naming conflicts, all localStorage keys are defined in a central constants object:

```javascript
export const STORAGE_KEYS = {
  SAVED_CARS: 'carhub_saved_cars',
  ACCESSIBILITY_SETTINGS: 'carhub_accessibility_settings',
  NOTIFICATION_SETTINGS: 'carhub_notification_settings',
  PRIVACY_SETTINGS: 'carhub_privacy_settings',
  LANGUAGE_SETTINGS: 'carhub_language_settings'
};
```

## Saved Cars Functionality

The saved cars implementation uses a custom React hook (`useSavedCars`) and context provider pattern:

1. **Data Structure**: Each saved car includes:
   - Car details (id, name, price, etc.)
   - Saved date (timestamp when the car was saved)

2. **API**:
   - `isCarSaved(carId)`: Check if a car is in the saved list
   - `toggleSavedCar(car)`: Add or remove a car from saved list
   - `removeSavedCar(carId)`: Remove a car by ID
   - `sortSavedCars(sortBy)`: Sort saved cars by different criteria

3. **Context Provider**:
   - Provides saved cars state to all components
   - Handles loading state during initial data fetch
   - Automatically syncs state changes to localStorage

## User Settings

Settings are implemented using a similar pattern with the `useUserSettings` hook:

1. **Settings Categories**:
   - Accessibility (high contrast, larger text, reduced motion)
   - Notifications (price drops, new listings, etc.)
   - Privacy (data sharing, location tracking)
   - Language preferences

2. **API**:
   - `updateAccessibilitySetting(setting, value)`: Update a specific setting
   - `resetAllSettings()`: Reset to defaults

3. **Real-time Application**:
   - Accessibility settings are applied immediately using CSS classes
   - Settings persist between page refreshes and browser sessions

## Implementation in Components

Components access the localStorage data through context hooks:

```javascript
// In a component
import { useSavedCarsContext } from "../contexts/SavedCarsContext";

function MyComponent() {
  const { savedCars, toggleSavedCar } = useSavedCarsContext();
  
  // Use the data and methods...
}
```

## Future Enhancements

For a production environment, consider these enhancements:

1. **Storage Limits**: Add size checking to prevent exceeding localStorage limits
2. **Sync with Backend**: Implement syncing with user accounts when authenticated
3. **Expiration**: Add TTL (time-to-live) for cached data
4. **Migration**: Version the storage schema to handle data structure changes

# Troubleshooting Common React Context Errors

## Error: "useUserSettingsContext must be used within a UserSettingsProvider"

### Error Description

This error occurs when a component attempts to use the `useUserSettingsContext` hook, but it's not wrapped within a `UserSettingsProvider` component in the component tree. The specific error message was:

```
Uncaught Error: useUserSettingsContext must be used within a UserSettingsProvider
    at useUserSettingsContext (UserSettingsContext.js:29:11)
    at SettingsPage (page.js:42:29)
```

### Root Cause Analysis

The error happens because React context consumers (components using the `useContext` hook) must be descendants of the corresponding provider component in the React component tree. In our case, the `SettingsPage` component was trying to access user settings context data, but the `UserSettingsProvider` wasn't present in the parent component hierarchy.

The issue was that while we had created the `UserSettingsProvider` in `app/contexts/UserSettingsContext.js` and the `Providers` component in `app/providers.js`, we hadn't properly integrated the providers into the application's root layout.

### Detailed Technical Explanation

React's Context API follows these principles:

1. **Provider-Consumer Relationship**: Context data flows down from providers to consumers in the component tree.
2. **Scoped Availability**: Context is only available to components that are children of the provider.
3. **Error Boundaries**: React throws an error when a context hook is used outside its provider's scope.

Our `useUserSettingsContext` hook includes a safety check that throws an error when the context is `null`, which happens when it's used outside of a provider:

```javascript
export function useUserSettingsContext() {
  const context = useContext(UserSettingsContext);
  
  if (!context) {
    throw new Error('useUserSettingsContext must be used within a UserSettingsProvider');
  }
  
  return context;
}
```

### Solution Implemented

The fix involved updating the root layout component to wrap the entire application with the `Providers` component:

```javascript
// app/layout.js
import "./globals.css";
import Providers from "./providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
```

This ensures that all components in the application have access to the contexts provided by `UserSettingsProvider` and `SavedCarsProvider`.

### Prevention Strategies

To prevent similar errors in the future:

1. **Always wrap context consumers**: Ensure that any component using a context hook is wrapped by the corresponding provider.
2. **Use root-level providers**: For application-wide contexts, place providers at the root layout level.
3. **Check React DevTools**: Use React DevTools to inspect the component tree and verify provider placement.
4. **Consider error boundaries**: Implement React error boundaries to gracefully handle context-related errors.
5. **Create custom hooks**: Use custom hooks with descriptive error messages to make debugging easier.

### Related React Context Best Practices

- **Minimize context usage**: Only put truly global state in context to avoid unnecessary re-renders.
- **Split contexts**: Use multiple smaller contexts instead of one large context to reduce re-renders.
- **Memoize context values**: Use `useMemo` for context values to prevent unnecessary re-renders.
- **Default values**: Provide meaningful default values to context for better testing and component reuse.

# Enhanced User Settings System

## Comprehensive User Preferences Management

The user settings system has been enhanced with the following features:

### Accessibility Features

1. **System Preference Detection**
   - Automatically detects OS-level preferences for dark mode and reduced motion
   - Listens for system preference changes in real-time
   - Offers option to sync with system settings with a single click

2. **Theme Management**
   - Dark/light theme switching with CSS variables
   - High contrast mode for better visibility
   - Larger text option for improved readability
   - Reduced motion setting for users with vestibular disorders

3. **Persistence Layer**
   - Settings persist between sessions via localStorage
   - Fallback to system preferences when no saved preferences exist
   - Error handling for storage failures
   - Success confirmation for settings changes

### Implementation Details

1. **Architecture**
   - React Context Provider pattern for global state access
   - Custom hook (`useUserSettings`) for settings management logic
   - CSS variables for dynamic theming
   - Media queries for initial system preference detection

2. **Performance Optimizations**
   - Batched localStorage updates to reduce write operations
   - Memoized setting update functions with `useCallback`
   - Conditional CSS class application for theme switching
   - Loading state to prevent flash of unstyled content

3. **User Experience**
   - Visual feedback on settings save status
   - Immediate application of settings changes
   - System preference sync option
   - Settings organized in logical categories

### Usage in Components

```javascript
import { useUserSettingsContext } from "../contexts/UserSettingsContext";

function MyComponent() {
  const { 
    accessibilitySettings, 
    updateAccessibilitySetting 
  } = useUserSettingsContext();
  
  // Access specific settings
  const isDarkTheme = accessibilitySettings.prefersDarkTheme;
  
  // Update a setting
  const toggleTheme = () => {
    updateAccessibilitySetting('prefersDarkTheme');
  };
  
  return (
    <div>
      <button onClick={toggleTheme}>
        Switch to {isDarkTheme ? 'Light' : 'Dark'} Theme
      </button>
    </div>
  );
}
```

### Recent Improvements (2024)

1. **Enhanced OS Integration**
   - Added detection for prefers-color-scheme media query
   - Added detection for prefers-reduced-motion media query
   - Real-time updates when OS settings change

2. **Status Feedback**
   - Added visual confirmation when settings are applied
   - Error handling with user feedback
   - Save status indicators

3. **Performance Enhancements**
   - Consolidated multiple useEffects into single effect for localStorage operations
   - Added debouncing to prevent excessive storage operations
   - Optimized theme application for reduced layout thrashing

### Recommendations for Future Refinement

Based on React best practices, consider these improvements for the user settings system:

1. **State Management Optimization**
   - Consider implementing a reducer pattern for more predictable state updates
   - Split contexts into smaller, more focused contexts to reduce re-renders
   - Use React.memo for components that only need specific settings

2. **Technical Debt Reduction**
   - Improve test coverage for settings logic
   - Create a consistent API for programmatic settings access
   - Document all settings options and their effects

3. **Feature Extensions**
   - Add more theme options (sepia mode, auto-switching based on time)
   - Implement font family selection for additional accessibility
   - Add animation speed controls beyond simple on/off

These recommendations are ordered by priority, with state management optimizations offering the most immediate benefits for performance and maintainability.