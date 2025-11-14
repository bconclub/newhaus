import { motion } from 'framer-motion';
import Button from '../shared/Button';

const CTASection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden py-24">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero/cta-bg.jpg"
          alt="NewHaus consultation"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=600&fit=crop';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-nh-charcoal/90 to-nh-charcoal/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
            Ready to Find Your New<span className="text-nh-copper">Haus</span>?
          </h2>
          <p className="text-lg md:text-xl text-nh-cream mb-8 max-w-2xl mx-auto">
            Let's start with a conversation about what you're looking for.
          </p>
          <Button to="/contact" variant="primary" size="lg">
            Schedule a Consultation
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
