import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

interface ContactFormProps {
  formData: {
    name: string;
    email: string;
    message: string;
  };
  setFormData: (data: any) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function ContactForm({ formData, setFormData, handleSubmit }: ContactFormProps) {
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const nameRef = useRef<HTMLInputElement>(null);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = 'Имя должно содержать минимум 2 символа';
    }
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Введите корректный email';
    }
    if (!formData.message || formData.message.trim().length < 5) {
      newErrors.message = 'Сообщение должно содержать минимум 5 символов';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
      <h2 className="text-2xl font-semibold mb-4">Контактная Форма</h2>
      <div className="space-y-4">
        <div>
          <label className="block mb-2">Имя</label>
          <input
            ref={nameRef}
            type="text"
            required
            minLength={2}
            placeholder="Введите ваше имя"
            autoFocus
            className={`w-full p-2 border rounded dark:bg-gray-700 ${errors.name ? 'border-red-500' : ''}`}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            required
            placeholder="Введите ваш email"
            className={`w-full p-2 border rounded dark:bg-gray-700 ${errors.email ? 'border-red-500' : ''}`}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block mb-2">Сообщение</label>
          <textarea
            required
            minLength={5}
            placeholder="Введите сообщение"
            className={`w-full p-2 border rounded dark:bg-gray-700 ${errors.message ? 'border-red-500' : ''}`}
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Отправить
        </button>
      </div>
    </motion.form>
  );
} 