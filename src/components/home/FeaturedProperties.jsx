import { motion } from 'framer-motion';
import { properties } from '../../data/properties';
import PropertyCard from '../shared/PropertyCard';
import SectionHeader from '../shared/SectionHeader';

const FeaturedProperties = () => {
  const featuredProperties = properties.filter((property) => property.featured);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeader
          smallText="CURATED FOR YOU"
          headline="Five Exceptional Homes in Bangalore"
          subtext="Each property selected for discerning buyers who value quality, design, and smart investment."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {featuredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
