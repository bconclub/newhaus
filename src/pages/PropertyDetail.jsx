import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Tag, CheckCircle } from 'lucide-react';
import { properties } from '../data/properties';
import ContactForm from '../components/shared/ContactForm';

const PropertyDetail = () => {
  const { slug } = useParams();
  const property = properties.find((p) => p.slug === slug);

  if (!property) {
    return <Navigate to="/properties" replace />;
  }

  return (
    <div className="pt-20">
      {/* Hero Image */}
      <section className="relative h-[60vh] md:h-[70vh]">
        <img
          src={property.images.hero}
          alt={property.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = `https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">
                {property.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-lg">
                <div className="flex items-center gap-2">
                  <MapPin className="text-nh-copper" />
                  <span>{property.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="text-nh-copper" />
                  <span className="text-2xl font-bold">{property.price}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Tagline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-xl text-nh-copper font-semibold mb-6">
                  {property.tagline}
                </p>

                {/* Description */}
                <div className="prose prose-lg max-w-none mb-12">
                  <p className="text-nh-grey leading-relaxed">
                    {property.description}
                  </p>
                </div>

                {/* Key Features */}
                <div className="mb-12">
                  <h2 className="text-2xl font-heading font-bold text-nh-charcoal mb-6">
                    Key Features
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {property.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 bg-nh-cream p-4 rounded-lg"
                      >
                        <CheckCircle className="w-5 h-5 text-nh-copper flex-shrink-0 mt-0.5" />
                        <span className="text-nh-charcoal">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Location Highlights */}
                <div className="mb-12">
                  <h2 className="text-2xl font-heading font-bold text-nh-charcoal mb-6">
                    Location Highlights
                  </h2>
                  <div className="bg-nh-cream p-6 rounded-lg">
                    <ul className="space-y-3">
                      {property.locationHighlights.map((highlight, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-nh-grey"
                        >
                          <span className="w-1.5 h-1.5 bg-nh-copper rounded-full mt-2 flex-shrink-0"></span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <h2 className="text-2xl font-heading font-bold text-nh-charcoal mb-4">
                    Address
                  </h2>
                  <p className="text-nh-grey flex items-start gap-2">
                    <MapPin className="text-nh-copper flex-shrink-0 mt-1" />
                    <span>{property.address}</span>
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Sidebar - Enquiry Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-nh-cream p-6 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-heading font-bold text-nh-charcoal mb-4">
                    Interested in this property?
                  </h3>
                  <p className="text-nh-grey mb-6">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                  <ContactForm propertyInterest={property.name} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-nh-cream">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-nh-charcoal mb-8 text-center">
            Gallery
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {property.images.gallery.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <img
                  src={image}
                  alt={`${property.name} - Image ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = `https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop`;
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertyDetail;
