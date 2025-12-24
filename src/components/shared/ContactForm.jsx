import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useLocation } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { properties } from '../../data/properties';
import { getAllTrackingData } from '../../utils/utmTracking';
import Button from './Button';

const STORAGE_KEY = 'newhaus_contact_form_data';

const ContactForm = ({ propertyInterest = '', onSuccess, formSource = 'Contact us' }) => {
  const location = useLocation();
  const { slug } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

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

  // Get all tracking data (UTM + Referrer + Ad IDs)
  const getTrackingData = () => {
    return getAllTrackingData();
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
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: savedData,
  });

  // Watch form changes and save to localStorage
  const formData = watch();
  useEffect(() => {
    // Only save if there's actual data
    if (formData.name || formData.email || formData.phone) {
      saveFormData(formData);
    }
  }, [formData]);

  // Clean payload - remove empty strings and undefined values
  const cleanPayload = (data) => {
    const cleaned = {};
    for (const [key, value] of Object.entries(data)) {
      // Keep the field if it has a meaningful value (not empty string, null, or undefined)
      if (value !== '' && value !== null && value !== undefined) {
        cleaned[key] = value;
      }
    }
    return cleaned;
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setError('');

    const trackingData = getTrackingData();
    const pageName = getPageName();

    // Clean the form data before building payload
    const cleanedData = cleanPayload(data);

    const payload = {
      ...cleanedData,
      form_type: 'contact',
      form_source: formSource, // User intent: Contact us, etc.
      property_interest: propertyName || undefined, // Only include if not empty
      submitted_at: new Date().toISOString(),
      source_page: window.location.href,
      page_name: pageName,
      ...cleanPayload(trackingData), // Include all tracking data (UTM, referrer, ad IDs)
    };

    // Remove undefined property_interest if it's empty
    if (!payload.property_interest) {
      delete payload.property_interest;
    }

    // Log payload for debugging (remove in production if needed)
    console.log('Submitting form with payload:', payload);

    try {
      // Webhook URL - use environment variable, proxy in dev, or default to production webhook
      const webhookUrl = import.meta.env.VITE_WEBHOOK_URL || 
        (import.meta.env.DEV 
          ? '/api/webhook' 
          : 'https://build.goproxe.com/webhook/newhaus-website');

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
        mode: 'cors', // Explicitly set CORS mode
      }).catch((fetchError) => {
        // Clear timeout if fetch fails before response
        clearTimeout(timeoutId);
        // Re-throw with more context
        console.error('Fetch error details:', {
          error: fetchError,
          webhookUrl,
          message: fetchError.message,
        });
        throw fetchError;
      });

      clearTimeout(timeoutId);

      // Read response body - read as text first to avoid "body stream already read" error
      let responseData;
      const textResponse = await response.text();
      try {
        responseData = JSON.parse(textResponse);
        console.log('Webhook response:', responseData);
      } catch (parseError) {
        // If response is not JSON, check if it's HTML
        if (textResponse.trim().startsWith('<!DOCTYPE') || textResponse.trim().startsWith('<html')) {
          // Extract error message from HTML if possible
          const errorMatch = textResponse.match(/<pre[^>]*>([^<]+)<\/pre>/i) || 
                            textResponse.match(/<title[^>]*>([^<]+)<\/title>/i);
          const htmlError = errorMatch ? errorMatch[1].trim() : 'Internal Server Error';
          console.log('Webhook response (HTML error):', htmlError);
          responseData = { message: htmlError, isHtml: true };
        } else {
          // Plain text response
          console.log('Webhook response (text):', textResponse);
          responseData = { message: textResponse };
        }
      }

      if (!response.ok) {
        console.error('Webhook error:', {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
          responseData: responseData,
          payload: payload,
          webhookUrl: webhookUrl
        });
        
        // Extract a clean error message
        let errorMessage = 'Internal Server Error';
        if (responseData?.message && !responseData.isHtml) {
          errorMessage = responseData.message;
        } else if (responseData?.error) {
          errorMessage = responseData.error;
        } else if (response.status === 500) {
          errorMessage = 'Server error. Please try again later or contact us directly.';
        } else {
          errorMessage = response.statusText || 'Unknown error';
        }
        
        throw new Error(`Submission failed: ${response.status} ${errorMessage}`);
      }

      // Clear saved form data on successful submission
      clearSavedFormData();

      // Also send to admin API for tracking
      try {
        await fetch('/api/leads', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }).catch((err) => {
          // Silently fail - admin tracking is secondary
          console.log('Admin API tracking failed:', err);
        });
      } catch (err) {
        // Silently fail - admin tracking is secondary
        console.log('Admin API tracking error:', err);
      }

      // Success - show message on page or call onSuccess callback
      if (onSuccess) {
        onSuccess();
      } else {
        // Show success message on the same page (for contact page)
        setIsSuccess(true);
        setIsSubmitting(false);
        // Reset form
        reset();
      }
    } catch (err) {
      console.error('Form submission error:', err);
      console.error('Error details:', {
        name: err.name,
        message: err.message,
        stack: err.stack,
        webhookUrl: import.meta.env.VITE_WEBHOOK_URL || 
          (import.meta.env.DEV 
            ? '/api/webhook' 
            : 'https://build.goproxe.com/webhook/newhaus-website')
      });
      
      // Check for different error types
      if (err.name === 'AbortError') {
        setError('Request timed out. Please check your connection and try again, or call us at +91 96320 04011');
      } else if (err instanceof TypeError && (err.message.includes('fetch') || err.message.includes('Failed to fetch'))) {
        // More specific network error handling
        setError('Network error. Please check your connection and try again, or call us at +91 96320 04011');
      } else if (err.message && err.message.includes('Submission failed')) {
        // Server returned an error status
        setError(`Unable to submit. ${err.message}. Please try again or call us at +91 96320 04011`);
      } else {
        setError('Unable to submit. Please try again or call us at +91 96320 04011');
      }
      setIsSubmitting(false);
    }
  };

  // Show success message instead of form
  if (isSuccess) {
    return (
      <div className="bg-nh-grey p-8 rounded-lg border border-nh-copper/20 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-heading font-bold text-white mb-3">
          Thank You!
        </h3>
        <p className="text-lg text-gray-300 mb-4">
          We'll get back to you at the earliest.
        </p>
        <p className="text-sm text-gray-400">
          We've received your inquiry and will respond within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

      {/* Enquiry Type */}
      <div>
        <label htmlFor="enquiry_type" className="block text-sm font-medium text-white mb-1">
          Enquiry Type *
        </label>
        <select
          id="enquiry_type"
          {...register('enquiry_type', { required: 'Enquiry type is required' })}
          className="w-full px-4 py-3 bg-nh-charcoal border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-nh-copper focus:border-nh-copper"
        >
          <option value="" className="bg-nh-charcoal">Select enquiry type</option>
          <option value="Job" className="bg-nh-charcoal">Job</option>
          <option value="Business Enquiry" className="bg-nh-charcoal">Business Enquiry</option>
          <option value="Callback" className="bg-nh-charcoal">Callback</option>
          <option value="Partnership" className="bg-nh-charcoal">Partnership</option>
          <option value="General Inquiry" className="bg-nh-charcoal">General Inquiry</option>
          <option value="Media Inquiry" className="bg-nh-charcoal">Media Inquiry</option>
        </select>
        {errors.enquiry_type && (
          <p className="mt-1 text-sm text-red-600">{errors.enquiry_type.message}</p>
        )}
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-white mb-1">
          Notes *
        </label>
        <textarea
          id="notes"
          rows={4}
          {...register('notes', { required: 'Notes are required' })}
          className="w-full px-4 py-3 bg-nh-charcoal border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-nh-copper focus:border-nh-copper placeholder-gray-400 resize-none"
          placeholder="Please provide details about your enquiry..."
        />
        {errors.notes && (
          <p className="mt-1 text-sm text-red-600">{errors.notes.message}</p>
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
        {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
      </Button>
    </form>
  );
};

export default ContactForm;
