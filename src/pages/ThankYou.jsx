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
            {/* Animated Checkmark */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                duration: 0.6
              }}
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.2,
                  type: "spring",
                  stiffness: 300,
                  damping: 10
                }}
              >
                <CheckCircle className="w-12 h-12 text-green-600" />
              </motion.div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-xl text-gray-300 mb-8"
            >
              {getFormMessage()}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-gray-300 mb-6"
            >
              Continue exploring:
            </motion.p>

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
