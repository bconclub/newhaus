import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const ContactForm = ({ propertyInterest = '', onSuccess }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      property_interest: propertyInterest,
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setError('');

    const payload = {
      ...data,
      submitted_at: new Date().toISOString(),
      source_page: window.location.href,
    };

    try {
      // Placeholder webhook URL - client will provide actual URL
      const webhookUrl = 'YOUR_N8N_WEBHOOK_URL_HERE';

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

      // Success - call onSuccess callback if provided, otherwise navigate
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/thank-you');
      }
    } catch (err) {
      setError('Unable to submit. Please try again or call us at +91 98765 43210');
      setIsSubmitting(false);
    }
  };

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

      {/* Budget Range */}
      <div>
        <label htmlFor="budget_range" className="block text-sm font-medium text-white mb-1">
          Budget Range
        </label>
        <select
          id="budget_range"
          {...register('budget_range')}
          className="w-full px-4 py-3 bg-nh-charcoal border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-nh-copper focus:border-nh-copper"
        >
          <option value="" className="bg-nh-charcoal">Select budget range</option>
          <option value="1-2 Cr">1-2 Cr</option>
          <option value="2-3 Cr">2-3 Cr</option>
          <option value="3-5 Cr">3-5 Cr</option>
          <option value="5 Cr+">5 Cr+</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </select>
      </div>

      {/* Property Interest */}
      <div>
        <label htmlFor="property_interest" className="block text-sm font-medium text-white mb-1">
          Property Interest
        </label>
        <select
          id="property_interest"
          {...register('property_interest')}
          className="w-full px-4 py-3 bg-nh-charcoal border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-nh-copper focus:border-nh-copper"
        >
          <option value="" className="bg-nh-charcoal">Select property</option>
          <option value="Embassy Lake Terraces">Embassy Lake Terraces</option>
          <option value="Embassy Grove">Embassy Grove</option>
          <option value="Embassy Boulevard">Embassy Boulevard</option>
          <option value="Embassy One (Four Seasons)">Embassy One (Four Seasons)</option>
          <option value="Embassy Springs">Embassy Springs</option>
          <option value="Not sure yet">Not sure yet</option>
        </select>
      </div>

      {/* Property Type */}
      <div>
        <label htmlFor="property_type" className="block text-sm font-medium text-white mb-1">
          Property Type *
        </label>
        <select
          id="property_type"
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
          <option value="Plot/Land" className="bg-nh-charcoal">Plot/Land</option>
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
        {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
      </Button>
    </form>
  );
};

export default ContactForm;
