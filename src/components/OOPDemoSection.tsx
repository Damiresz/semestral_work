import { useEffect, useState } from 'react';

/**
 * Global type declaration for the OOP demo result function
 * Extends Window interface to include the demo function
 */
declare global {
  interface Window {
    oopDemoResult?: () => string[];
  }
}

/**
 * OOPDemoSection component that demonstrates Object-Oriented Programming concepts
 * Loads and displays results from an external JavaScript file
 */
export default function OOPDemoSection() {
  // State for storing the demo results
  const [result, setResult] = useState<string[]>([]);

  // Effect for loading the OOP demo script
  useEffect(() => {
    // Create and configure script element
    const script = document.createElement('script');
    script.src = '/oop-demo.js';
    
    // Handle script load event
    script.onload = () => {
      if (window.oopDemoResult) {
        setResult(window.oopDemoResult());
      }
    };
    
    // Append script to document
    document.body.appendChild(script);
    
    // Cleanup: remove script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold mb-4">OOP, prototypal inheritance and namespace (JS)</h2>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        {/* Display demo results */}
        <pre className="text-sm text-gray-800 dark:text-gray-200">
          {result.length > 0 ? result.map((line, i) => <div key={i}>{line}</div>) : 'Loading...'}
        </pre>
        {/* Code example display */}
        <div className="mt-4 text-xs text-gray-500">
          <b>Code:</b> <br />
          <code>window.MyApp = &#123;&#125;;<br />MyApp.Person = function(name) &#123; ... &#125;;<br />MyApp.Student = function(name, university) &#123; ... &#125;;<br />MyApp.Student.prototype = Object.create(MyApp.Person.prototype);<br />// ...</code>
        </div>
      </div>
    </section>
  );
} 