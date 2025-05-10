'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import DataTable from '@/components/DataTable';
import AdvancedSelectorsSection from '@/components/AdvancedSelectorsSection';
import OOPDemoSection from '@/components/OOPDemoSection';
import ContactForm from '@/components/ContactForm';

export default function DataPage() {
  const [isOnline, setIsOnline] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <main className="min-h-screen p-8">
      <Navigation />
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Data and Demonstrations</h1>
        <div className="flex items-center justify-center gap-4">
          <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`} />
          <span>{isOnline ? 'Online' : 'Offline'}</span>
          <button
            onClick={() => setIsOnline(!isOnline)}
            className="ml-4 px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Test Offline Mode
          </button>
        </div>
      </header>

      <section className="max-w-6xl mx-auto">
        <DataTable />
        <AdvancedSelectorsSection />
        <OOPDemoSection />
        <div className="mt-12">
          <ContactForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} />
        </div>
      </section>
    </main>
  );
} 