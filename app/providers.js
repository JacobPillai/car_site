"use client";

import { SavedCarsProvider } from "./contexts/SavedCarsContext";
import { UserSettingsProvider } from "./contexts/UserSettingsContext";

/**
 * Providers Component
 * 
 * Wraps the application with all necessary context providers.
 * Using a separate component for providers because they use hooks
 * which require the "use client" directive.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Application content to be wrapped with providers
 */
export default function Providers({ children }) {
  return (
    <UserSettingsProvider>
      <SavedCarsProvider>
        {children}
      </SavedCarsProvider>
    </UserSettingsProvider>
  );
} 