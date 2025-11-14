import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import Button from '../components/shared/Button';

const ThankYou = () => {
  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-nh-cream">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          <h1 className="text-4xl md:text-5xl font-heading font-bold text-nh-charcoal mb-6">
            Thank You for Reaching Out
          </h1>

          <p className="text-xl text-nh-grey mb-8">
            We've received your inquiry and will get back to you within 24 hours.
          </p>

          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-heading font-bold text-nh-charcoal mb-4">
              What happens next?
            </h2>
            <div className="text-left space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-nh-copper rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <p className="text-nh-grey">
                  One of our property curators will review your requirements
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-nh-copper rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <p className="text-nh-grey">
                  We'll prepare personalized property recommendations
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-nh-copper rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <p className="text-nh-grey">
                  We'll reach out to schedule a consultation
                </p>
              </div>
            </div>
          </div>

          <p className="text-nh-grey mb-8">
            In the meantime, feel free to explore our featured properties.
          </p>

          <Button to="/properties" size="lg">
            Browse Properties
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default ThankYou;
