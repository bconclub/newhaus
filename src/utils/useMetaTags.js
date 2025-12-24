import { useEffect } from 'react';

/**
 * Custom hook to update document title and meta description
 * @param {string} title - Page title
 * @param {string} description - Meta description
 */
export const useMetaTags = (title, description) => {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title;
    }

    // Update or create meta description tag
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    if (description) {
      metaDescription.setAttribute('content', description);
    }

    // Cleanup function to restore default title/description if needed
    return () => {
      // Optionally restore default values on unmount
      // For now, we'll let the next page set its own values
    };
  }, [title, description]);
};

