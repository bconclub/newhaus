import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import { properties } from '../../data/properties';
import { getStoredUTMParams } from '../../utils/utmTracking';
import Button from './Button';

const STORAGE_KEY = 'newhaus_site_visit_form_data';
const CONTACT_FORM_STORAGE_KEY = 'newhaus_contact_form_data';

const BookSiteVisitForm = ({ propertyInterest = '', onSuccess }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { slug } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Auto-detect property from URL or use prop
  const detectedProperty = slug ? properties.find(p => p.slug === slug) : null;
  const propertyName = detectedProperty?.name || propertyInterest || '';

  // Load saved form data from localStorage
  const loadSavedFormData = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      return {};
    }
  };

  // Load contact form data from localStorage (from ContactForm or SignupForm)
  const loadContactFormData = () => {
    try {
      const saved = localStorage.getItem(CONTACT_FORM_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      return {};
    }
  };

  // Get merged form data - contact form data as defaults, site visit form data overrides
  const getMergedFormData = () => {
    const contactData = loadContactFormData();
    const siteVisitData = loadSavedFormData();
    
    // Merge: contact form data provides defaults, site visit form data takes precedence
    return {
      name: siteVisitData.name || contactData.name || '',
      email: siteVisitData.email || contactData.email || '',
      phone: siteVisitData.phone || contactData.phone || '',
      visit_date: siteVisitData.visit_date || '',
      visit_time: siteVisitData.visit_time || '',
    };
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

  // Get UTM parameters
  const getUTMParams = () => {
    return getStoredUTMParams();
  };

  // Get page name from pathname
  const getPageName = () => {
    const pathname = location.pathname;
    if (pathname.startsWith('/properties/')) return 'property-detail';
    return 'property-detail';
  };

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Generate time slots from 1 AM to 6 PM (1-hour slots)
  const generateTimeSlots = () => {
    const slots = [];
    // 1 AM to 11 AM
    for (let i = 1; i <= 11; i++) {
      slots.push(`${i} AM`);
    }
    // 12 PM
    slots.push('12 PM');
    // 1 PM to 6 PM
    for (let i = 1; i <= 6; i++) {
      slots.push(`${i} PM`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const savedData = getMergedFormData();
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
    if (formData.name || formData.email || formData.phone || formData.visit_date) {
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
      form_type: 'site_visit_booking',
      property_interest: propertyName,
      submitted_at: new Date().toISOString(),
      source_page: window.location.href,
      page_name: pageName,
      ...utmParams,
    };

    try {
      // Webhook URL - use environment variable or default to production webhook
      const webhookUrl = import.meta.env.VITE_WEBHOOK_URL || 'https://build.goproxe.com/webhook/newhaus-website';

      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Webhook error:', response.status, errorText);
        throw new Error(`Submission failed: ${response.status} ${response.statusText}`);
      }

      // Clear saved form data on successful submission
      clearSavedFormData();

      // Success - navigate to thank you page or call onSuccess callback
      if (onSuccess) {
        onSuccess();
      } else {
        const previousPage = location.pathname;
        navigate(`/thank-you?form=site-visit&from=${encodeURIComponent(previousPage)}`);
      }
    } catch (err) {
      console.error('Form submission error:', err);
      // Check for different error types
      if (err.name === 'AbortError') {
        setError('Request timed out. Please check your connection and try again, or call us at +91 96320 04011');
      } else if (err instanceof TypeError && err.message.includes('fetch')) {
        setError('Network error. Please check your connection and try again, or call us at +91 96320 04011');
      } else {
        setError('Unable to submit. Please try again or call us at +91 96320 04011');
      }
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Property Name - only show on property pages */}
      {propertyName && (
        <div className="mb-4 pb-4 border-b border-nh-copper/20">
          <p className="text-sm text-gray-400 mb-1">Property</p>
          <p className="text-lg font-heading font-semibold text-white">{propertyName}</p>
        </div>
      )}

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
          Name *
        </label>
        <input
          id="name"
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
        <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
          Email *
        </label>
        <input
          id="email"
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
        <label htmlFor="phone" className="block text-sm font-medium text-white mb-1">
          Phone *
        </label>
        <input
          id="phone"
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

      {/* Visit Date */}
      <div>
        <label htmlFor="visit_date" className="block text-sm font-medium text-white mb-1">
          Preferred Date *
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            id="visit_date"
            type="date"
            min={getMinDate()}
            {...register('visit_date', { required: 'Visit date is required' })}
            className="w-full pl-10 pr-4 py-3 bg-nh-charcoal border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-nh-copper focus:border-nh-copper placeholder-gray-400"
          />
        </div>
        {errors.visit_date && (
          <p className="mt-1 text-sm text-red-600">{errors.visit_date.message}</p>
        )}
      </div>

      {/* Visit Time */}
      <div>
        <label htmlFor="visit_time" className="block text-sm font-medium text-white mb-1">
          Preferred Time *
        </label>
        <div className="relative">
          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
          <select
            id="visit_time"
            {...register('visit_time', { required: 'Visit time is required' })}
            className="w-full pl-10 pr-4 py-3 bg-nh-charcoal border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-nh-copper focus:border-nh-copper appearance-none cursor-pointer"
          >
            <option value="" className="bg-nh-charcoal">Select time slot</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot} className="bg-nh-charcoal">
                {slot}
              </option>
            ))}
          </select>
        </div>
        {errors.visit_time && (
          <p className="mt-1 text-sm text-red-600">{errors.visit_time.message}</p>
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
        {isSubmitting ? 'Booking...' : 'Book Site Visit'}
      </Button>
    </form>
  );
};

export default BookSiteVisitForm;

