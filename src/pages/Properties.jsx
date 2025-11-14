import { motion } from 'framer-motion';
import { properties } from '../data/properties';
import PropertyCard from '../components/shared/PropertyCard';
import SectionHeader from '../components/shared/SectionHeader';

const Properties = () => {
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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Properties;
