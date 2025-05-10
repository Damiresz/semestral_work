'use client';

// Import necessary dependencies
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import DataTable from '@/components/DataTable';
import AdvancedSelectorsSection from '@/components/AdvancedSelectorsSection';
import OOPDemoSection from '@/components/OOPDemoSection';
import ContactForm from '@/components/ContactForm';

/**
 * DataPage component that serves as the data and demonstrations showcase
 * Includes data table, CSS selectors demo, OOP demo, and contact form
 */
export default function DataPage() {
  // State for online/offline status
  const [isOnline, setIsOnline] = useState(true);
  // State for contact form data
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  /**
   * Handle form submission
   * Shows success message and resets form data
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <main className="min-h-screen p-8">
      {/* Navigation component */}
      <Navigation />

      {/* Main content section with demonstrations */}
      <section className="max-w-6xl mx-auto">
        {/* Data table component */}
        <DataTable />
        {/* Advanced CSS selectors demo */}
        <AdvancedSelectorsSection />
        {/* OOP demonstration */}
        <OOPDemoSection />
        {/* Contact form section */}
        <div className="mt-12">
          <ContactForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} />
        </div>
      </section>
    </main>
  );
} 