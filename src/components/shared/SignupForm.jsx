import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from './Button';

const SignupForm = ({ onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setError('');

    const payload = {
      ...data,
      form_type: 'signup',
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

      // Success - call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError('Unable to submit. Please try again or call us at +91 9591004043');
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
          placeholder="+91 9591004043"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
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
        {isSubmitting ? 'Signing Up...' : 'Sign Up'}
      </Button>
    </form>
  );
};

export default SignupForm;

