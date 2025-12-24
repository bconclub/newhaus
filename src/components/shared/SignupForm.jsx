import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { getStoredUTMParams } from '../../utils/utmTracking';
import Button from './Button';

const STORAGE_KEY = 'newhaus_contact_form_data';

const SignupForm = ({ onSuccess }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Load saved form data from localStorage
  const loadSavedFormData = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      return {};
    }
  };

  // Save form data to localStorage
  const saveFormData = (data) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save form data:', error);
    }
  };

  // Clear saved form data
  const clearSavedFormData = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear form data:', error);
    }
  };

  // Get UTM parameters (from stored values or URL)
  const getUTMParams = () => {
    return getStoredUTMParams();
  };

  // Get page name from pathname
  const getPageName = () => {
    const pathname = location.pathname;
    if (pathname === '/') return 'home';
    if (pathname === '/contact') return 'contact';
    if (pathname === '/about') return 'about';
    if (pathname === '/services') return 'services';
    if (pathname === '/properties') return 'properties';
    if (pathname.startsWith('/properties/')) return 'property-detail';
    return pathname.replace('/', '').replace(/\//g, '-') || 'unknown';
  };

  const savedData = loadSavedFormData();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: savedData,
  });

  // Watch form changes and save to localStorage
  const formData = watch();
  useEffect(() => {
    // Only save if there's actual data
    if (formData.name || formData.email || formData.phone || formData.budget_range) {
      saveFormData(formData);
    }
  }, [formData]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setError('');

    const utmParams = getUTMParams();
    const pageName = getPageName();

    const payload = {
      ...data,
      form_type: 'signup',
      submitted_at: new Date().toISOString(),
      source_page: window.location.href,
      page_name: pageName,
      ...utmParams,
    };

    try {
      // Webhook URL - use environment variable or default to production webhook
      const webhookUrl = import.meta.env.VITE_WEBHOOK_URL || 'https://build.goproxe.com/webhook/newhaus-website';

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      // Clear saved form data on successful submission
      clearSavedFormData();

      // Success - navigate to thank you page or call onSuccess callback
      if (onSuccess) {
        onSuccess();
      } else {
        const previousPage = location.pathname;
        navigate(`/thank-you?form=signup&from=${encodeURIComponent(previousPage)}`);
      }
    } catch (err) {
      setError('Unable to submit. Please try again or call us at +91 96320 04011');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Name */}
      <div>
        <label htmlFor="signup-name" className="block text-sm font-medium text-white mb-1">
          Name *
        </label>
        <input
          id="signup-name"
          type="text"
          {...register('name', { required: 'Name is required' })}
          className="w-full px-4 py-3 bg-nh-charcoal border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-nh-copper focus:border-nh-copper placeholder-gray-400"
          placeholder="Your full name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="signup-email" className="block text-sm font-medium text-white mb-1">
          Email *
        </label>
        <input
          id="signup-email"
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          className="w-full px-4 py-3 bg-nh-charcoal border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-nh-copper focus:border-nh-copper placeholder-gray-400"
          placeholder="your@email.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="signup-phone" className="block text-sm font-medium text-white mb-1">
          Phone *
        </label>
        <input
          id="signup-phone"
          type="tel"
          {...register('phone', {
            required: 'Phone number is required',
            pattern: {
              value: /^[+]?[0-9]{10,}$/,
              message: 'Invalid phone number',
            },
          })}
          className="w-full px-4 py-3 bg-nh-charcoal border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-nh-copper focus:border-nh-copper placeholder-gray-400"
          placeholder="+91 98765 43210"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      {/* Budget Range */}
      <div>
        <label htmlFor="signup-budget-range" className="block text-sm font-medium text-white mb-1">
          Budget Range
        </label>
        <select
          id="signup-budget-range"
          {...register('budget_range')}
          className="w-full px-4 py-3 bg-nh-charcoal border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-nh-copper focus:border-nh-copper"
        >
          <option value="" className="bg-nh-charcoal">Select budget range</option>
          <option value="1-2 Cr" className="bg-nh-charcoal">1-2 Cr</option>
          <option value="2-3 Cr" className="bg-nh-charcoal">2-3 Cr</option>
          <option value="3-5 Cr" className="bg-nh-charcoal">3-5 Cr</option>
          <option value="5 Cr+" className="bg-nh-charcoal">5 Cr+</option>
          <option value="Prefer not to say" className="bg-nh-charcoal">Prefer not to say</option>
        </select>
      </div>

      {/* Property Type */}
      <div>
        <label htmlFor="signup-property-type" className="block text-sm font-medium text-white mb-1">
          Property Type *
        </label>
        <select
          id="signup-property-type"
          {...register('property_type', { required: 'Property type is required' })}
          className="w-full px-4 py-3 bg-nh-charcoal border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-nh-copper focus:border-nh-copper"
        >
          <option value="" className="bg-nh-charcoal">Select property type</option>
          <option value="2 BHK" className="bg-nh-charcoal">2 BHK</option>
          <option value="3 BHK" className="bg-nh-charcoal">3 BHK</option>
          <option value="4 BHK" className="bg-nh-charcoal">4 BHK</option>
          <option value="5 BHK" className="bg-nh-charcoal">5 BHK</option>
          <option value="Penthouse" className="bg-nh-charcoal">Penthouse</option>
          <option value="Villa" className="bg-nh-charcoal">Villa</option>
        </select>
        {errors.property_type && (
          <p className="mt-1 text-sm text-red-600">{errors.property_type.message}</p>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Exploring...' : 'Explore Now'}
      </Button>
    </form>
  );
};

export default SignupForm;

