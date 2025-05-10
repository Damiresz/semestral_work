// Import necessary dependencies
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Navigation component that provides the main navigation menu
 * Includes links to different sections and browser navigation buttons
 */
export default function Navigation() {
  // Get current pathname for active link highlighting
  const pathname = usePathname();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg mb-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Main navigation links */}
          <div className="flex space-x-4">
            {/* Home link */}
            <Link 
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === '/' 
                  ? 'bg-gray-900 text-white dark:bg-gray-700' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Home
            </Link>
            {/* Interactive section link */}
            <Link 
              href="/interactive"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === '/interactive' 
                  ? 'bg-gray-900 text-white dark:bg-gray-700' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Interactive
            </Link>
            {/* Data section link */}
            <Link 
              href="/data"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === '/data' 
                  ? 'bg-gray-900 text-white dark:bg-gray-700' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Data
            </Link>
          </div>
          {/* Browser navigation buttons */}
          <div className="flex space-x-2">
            {/* Back button */}
            <button
              onClick={() => window.history.back()}
              className="px-3 py-2 rounded-md text-sm font-medium bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              ← Back
            </button>
            {/* Forward button */}
            <button
              onClick={() => window.history.forward()}
              className="px-3 py-2 rounded-md text-sm font-medium bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Forward →
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 