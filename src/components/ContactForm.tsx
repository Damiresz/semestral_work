import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

/**
 * Interface defining the props for the ContactForm component
 * Includes form data, setter function, and submit handler
 */
interface ContactFormProps {
  formData: {
    name: string;
    email: string;
    message: string;
  };
  setFormData: (data: any) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

/**
 * ContactForm component that handles user contact information
 * Includes form validation and error handling
 */
export default function ContactForm({ formData, setFormData, handleSubmit }: ContactFormProps) {
  // State for storing validation errors
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  // Reference for the name input field
  const nameRef = useRef<HTMLInputElement>(null);

  /**
   * Validates form data and sets error messages
   * @returns {boolean} True if form is valid, false otherwise
   */
  const validate = () => {
    const newErrors: typeof errors = {};
    // Validate name
    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    // Validate email format
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
    }
    // Validate message length
    if (!formData.message || formData.message.trim().length < 5) {
      newErrors.message = 'Message must be at least 5 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles form submission
   * Validates form data before submitting
   */
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setErrors({});
      handleSubmit(e);
    }
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={onSubmit}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg md:col-span-2"
    >
      <h2 className="text-2xl font-semibold mb-4">Contact Form</h2>
      <div className="space-y-4">
        {/* Name input field */}
        <div>
          <label className="block mb-2">Name</label>
          <input
            ref={nameRef}
            type="text"
            required
            minLength={2}
            placeholder="Enter your name"
            autoFocus
            className={`w-full p-2 border rounded dark:bg-gray-700 ${errors.name ? 'border-red-500' : ''}`}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        {/* Email input field */}
        <div>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            required
            placeholder="Enter your email"
            className={`w-full p-2 border rounded dark:bg-gray-700 ${errors.email ? 'border-red-500' : ''}`}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        {/* Message textarea */}
        <div>
          <label className="block mb-2">Message</label>
          <textarea
            required
            minLength={5}
            placeholder="Enter your message"
            className={`w-full p-2 border rounded dark:bg-gray-700 ${errors.message ? 'border-red-500' : ''}`}
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
        </div>
        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Send
        </button>
      </div>
    </motion.form>
  );
} 