import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { properties } from '../../data/properties';
import PropertyCard from '../shared/PropertyCard';
import SectionHeader from '../shared/SectionHeader';
import Modal from '../shared/Modal';
import SignupForm from '../shared/SignupForm';
import Button from '../shared/Button';

const FeaturedProperties = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Check if form was previously submitted
  useEffect(() => {
    const submitted = localStorage.getItem('propertiesFormSubmitted');
    if (submitted === 'true') {
      setFormSubmitted(true);
    }
  }, []);

  const featuredProperties = properties.filter((property) => property.featured);
  const displayedProperties = featuredProperties.slice(0, 2);
  const blurredProperty = featuredProperties[2]; // 3rd property

  const handleFormSuccess = () => {
    setFormSubmitted(true);
    localStorage.setItem('propertiesFormSubmitted', 'true');
    setIsModalOpen(false);
  };

  return (
    <section id="featured-properties" className="min-h-[80vh] flex items-center bg-nh-charcoal py-20">
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
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <PropertyCard property={property} />
            </motion.div>
          ))}

          {/* 3rd Property - Locked or Unlocked */}
          {blurredProperty && (
            <motion.div
              key={formSubmitted ? 'unlocked' : 'locked'}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative h-full"
            >
              {formSubmitted ? (
                // Show unlocked property after form submission
                <PropertyCard property={blurredProperty} />
              ) : (
                // Show blurred locked property
                <div className="relative h-full rounded-lg border-2 border-nh-copper overflow-hidden">
                  <div className="blur-sm pointer-events-none h-full">
                    <PropertyCard property={blurredProperty} />
                  </div>
                  
                  {/* Overlay with Button */}
                  <div className="absolute inset-0 flex items-center justify-center bg-nh-charcoal/60">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      viewport={{ once: true }}
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

        {/* View All Properties Button - Shows after form submission */}
        {formSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center mt-12"
          >
            <Button
              to="/properties"
              variant="primary"
              size="lg"
              className="bg-nh-copper text-white px-8 py-3 rounded-md hover:bg-nh-orange transition-colors"
            >
              View All Properties
            </Button>
          </motion.div>
        )}
      </div>

      {/* Sign Up Form Modal - To unlock more properties */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Sign Up to New Haus"
      >
        <p className="text-gray-300 mb-6 text-sm">
          Sign up for unlimited access
        </p>
        <SignupForm onSuccess={handleFormSuccess} />
      </Modal>
    </section>
  );
};

export default FeaturedProperties;
