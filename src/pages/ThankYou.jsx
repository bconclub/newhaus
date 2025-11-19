import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import Button from '../components/shared/Button';
import heroImage001 from '../assets/New Haus 001.webp';

const ThankYou = () => {
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
              Thank You for Reaching Out
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
            We've received your inquiry and will get back to you within 24 hours.
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

          <p className="text-gray-300 mb-8">
            In the meantime, feel free to explore our featured properties.
          </p>

          <Button to="/properties" size="lg">
            Browse Properties
          </Button>
        </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ThankYou;
