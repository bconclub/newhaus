import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAllTrackingData } from '../../utils/utmTracking';
import Button from './Button';

const STORAGE_KEY = 'newhaus_contact_form_data';

const SignupForm = ({ onSuccess, formSource = 'Sign Up' }) => {
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
    console.log('Original form data:', data);
    console.log('Cleaned form data:', cleanedData);

    const payload = {
      ...cleanedData,
      form_type: 'signup',
      form_source: formSource, // User intent: Start Exploring, Call Back, Sign Up, etc.
      submitted_at: new Date().toISOString(),
      source_page: window.location.href,
      page_name: pageName,
      ...cleanPayload(trackingData), // Include all tracking data (UTM, referrer, ad IDs)
    };

    // Log payload for debugging (remove in production if needed)
    console.log('Final payload being sent:', payload);
    console.log('Payload JSON:', JSON.stringify(payload, null, 2));

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

      // Success - navigate to thank you page or call onSuccess callback
      if (onSuccess) {
        onSuccess();
      } else {
        const previousPage = location.pathname;
        navigate(`/thank-you?form=signup&from=${encodeURIComponent(previousPage)}`);
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

