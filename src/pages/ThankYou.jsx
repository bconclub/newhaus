import { motion } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Button from '../components/shared/Button';
import heroImage001 from '../assets/New Haus 001.webp';

const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const formType = searchParams.get('form') || 'contact';
  const previousPage = searchParams.get('from') || '/';

  // Get form-specific message
  const getFormMessage = () => {
    switch (formType) {
      case 'signup':
        return "Thank you for signing up! We're excited to help you explore your dream home.";
      case 'contact':
      default:
        return "Thank you for reaching out! We've received your inquiry and will get back to you within 24 hours.";
    }
  };

  // Navigation options based on previous page
  const getNavigationOptions = () => {
    const options = [
      { path: '/', label: 'Home' },
      { path: '/properties', label: 'Properties' },
      { path: '/about', label: 'About' },
      { path: '/services', label: 'Services' },
    ];

    // Add previous page if it's not already in the list and is a valid page
    if (previousPage && previousPage !== '/' && previousPage !== '/thank-you') {
      // Check if previous page is already in options
      const isAlreadyIncluded = options.some(opt => opt.path === previousPage);
      if (!isAlreadyIncluded) {
        // Get a friendly name for the page
        let pageLabel = 'Previous Page';
        if (previousPage.startsWith('/properties/')) {
          pageLabel = 'Back to Property';
        } else if (previousPage === '/contact') {
          pageLabel = 'Back to Contact';
        } else {
          const pageName = previousPage.split('/').pop() || '';
          pageLabel = `Back to ${pageName.charAt(0).toUpperCase() + pageName.slice(1)}`;
        }
        options.push({ path: previousPage, label: pageLabel });
      }
    }

    return options;
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-nh-charcoal overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: `url(${heroImage001})`
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-nh-charcoal/60" />
        {/* Content */}
        <div className="container mx-auto px-6 md:px-4 text-center relative z-10 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 drop-shadow-2xl">
              Thank You!
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="min-h-[60vh] flex items-center justify-center bg-nh-charcoal py-20">
        <div className="container mx-auto px-6 md:px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>

            <p className="text-xl text-gray-300 mb-8">
              {getFormMessage()}
            </p>

            <div className="bg-nh-grey p-8 rounded-lg shadow-md mb-8 border border-nh-copper/20">
              <h2 className="text-2xl font-heading font-bold text-white mb-4">
                What happens next?
              </h2>
              <div className="text-left space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-nh-copper rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <p className="text-gray-300">
                    One of our property curators will review your requirements
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-nh-copper rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <p className="text-gray-300">
                    We'll prepare personalized property recommendations
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-nh-copper rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <p className="text-gray-300">
                    We'll reach out to schedule a consultation
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-300 mb-6">
              Continue exploring:
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              {getNavigationOptions().map((option) => (
                <Button
                  key={option.path}
                  to={option.path}
                  variant="secondary"
                  size="md"
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ThankYou;
