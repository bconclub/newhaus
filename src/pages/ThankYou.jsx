import { motion } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import Button from '../components/shared/Button';
import { useMetaTags } from '../utils/useMetaTags';

const ThankYou = () => {
  useMetaTags(
    'Thank You - NewHaus',
    'Thank you for contacting NewHaus. We\'ve received your inquiry and will get back to you within 24 hours.'
  );
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const formType = searchParams.get('form') || 'contact';

  // Get form-specific message
  const getFormMessage = () => {
    switch (formType) {
      case 'signup':
        return "Thank you for signing up! We're excited to help you explore your dream home.";
      case 'site-visit':
        return "Thank you for booking a site visit! We've received your request and will confirm the details with you shortly.";
      case 'contact':
      default:
        return "Thank you for reaching out! We've received your inquiry and will get back to you within 24 hours.";
    }
  };

  // Simple navigation options
  const navigationOptions = [
    { path: '/', label: 'Home' },
    { path: '/properties', label: 'Properties' },
  ];

  return (
    <div>
      {/* Content Section */}
      <section className="min-h-[80vh] flex items-center justify-center bg-nh-charcoal py-20 pt-32">
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
              {/* Browser Back Button */}
              <Button
                onClick={() => navigate(-1)}
                variant="secondary"
                size="md"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </Button>
              
              {/* Navigation Options */}
              {navigationOptions.map((option) => (
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
