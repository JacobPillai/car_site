import "./globals.css";
import Providers from "./providers";

/**
 * Metadata for the entire application
 * These values are used for SEO and browser tab information
 */
export const metadata = {
  title: "Car Website",
  description: "Find your perfect car with our advanced search and filtering system",
};

/**
 * RootLayout Component
 * 
 * This is the main layout wrapper that applies to all pages in the application.
 * It provides:
 * - Common HTML structure
 * - Language settings
 * - Global CSS imports
 * - Context providers through the Providers component
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Page content to be rendered inside the layout
 */
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