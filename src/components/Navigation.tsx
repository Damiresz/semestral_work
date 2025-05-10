import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg mb-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex space-x-4">
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
          <div className="flex space-x-2">
            <button
              onClick={() => window.history.back()}
              className="px-3 py-2 rounded-md text-sm font-medium bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              ← Back
            </button>
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