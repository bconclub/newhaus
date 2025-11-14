import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { properties } from '../data/properties';
import PropertyCard from '../components/shared/PropertyCard';
import SectionHeader from '../components/shared/SectionHeader';
import Modal from '../components/shared/Modal';
import SignupForm from '../components/shared/SignupForm';
import Button from '../components/shared/Button';

const Properties = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Check if form was previously submitted
  useEffect(() => {
    const submitted = localStorage.getItem('propertiesFormSubmitted');
    if (submitted === 'true') {
      setFormSubmitted(true);
    }
  }, []);

  const displayedProperties = properties.slice(0, 2);
  const lockedProperty = properties[2]; // 3rd property

  const handleFormSuccess = () => {
    setFormSubmitted(true);
    localStorage.setItem('propertiesFormSubmitted', 'true');
    setIsModalOpen(false);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-32 bg-nh-charcoal">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
              Curated Properties
            </h1>
            <p className="text-lg md:text-xl text-nh-cream max-w-3xl mx-auto">
              Every home handpicked for exceptional design and investment value.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="min-h-[80vh] flex items-center bg-nh-charcoal py-20">
        <div className="container mx-auto px-4 w-full">
          <SectionHeader
            smallText="CURATED FOR YOU"
            headline="Featured Homes"
            subtext="Each property selected for discerning buyers who value quality, design, and smart investment."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {/* First 2 Properties */}
            {displayedProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}

            {/* 3rd Property - Locked or Unlocked */}
            {lockedProperty && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative h-full"
              >
                {formSubmitted ? (
                  // Show unlocked property after form submission
                  <PropertyCard property={lockedProperty} />
                ) : (
                  // Show blurred locked property
                  <div className="relative h-full rounded-lg border-2 border-nh-copper overflow-hidden">
                    <div className="blur-sm pointer-events-none h-full">
                      <PropertyCard property={lockedProperty} />
                    </div>
                    
                    {/* Overlay with Button */}
                    <div className="absolute inset-0 flex items-center justify-center bg-nh-charcoal/60">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-center px-4"
                      >
                        <Button
                          onClick={() => setIsModalOpen(true)}
                          className="bg-nh-copper text-white px-8 py-3 rounded-md hover:bg-nh-orange transition-colors"
                        >
                          View More
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Sign Up Form Modal - To unlock more properties */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Sign Up"
      >
        <p className="text-gray-300 mb-6 text-sm">
          Sign up for unlimited access
        </p>
        <SignupForm onSuccess={handleFormSuccess} />
      </Modal>
    </div>
  );
};

export default Properties;
