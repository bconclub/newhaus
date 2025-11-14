import { motion } from 'framer-motion';
import { Sparkles, Eye, TrendingUp, Shield } from 'lucide-react';
import SectionHeader from '../shared/SectionHeader';

const BrandPillars = () => {
  const pillars = [
    {
      icon: Sparkles,
      title: 'Curated Selection',
      description:
        "We don't list everything. We select the best. Every property is handpicked for its architecture, location, and investment potential.",
    },
    {
      icon: Eye,
      title: "Architect's Eye",
      description:
        'We understand spaces deeply. Our team evaluates design quality, spatial flow, and livability - not just square footage.',
    },
    {
      icon: TrendingUp,
      title: 'Investment Intelligence',
      description:
        'Smart homes are good investments. We analyze appreciation potential, infrastructure growth, and long-term value.',
    },
    {
      icon: Shield,
      title: 'Trusted Guide',
      description:
        'From sightseeing to documentation, we\'re with you every step. Especially for NRI buyers who need reliable remote support.',
    },
  ];

  return (
    <section className="min-h-[80vh] flex items-center bg-nh-charcoal py-20">
      <div className="container mx-auto px-4 w-full">
        <SectionHeader
          smallText="WHY NEWHAUS"
          headline="Not Another Property Listing Site"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-nh-grey p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-nh-copper/20 hover:border-nh-copper"
            >
              {/* Icon and Heading */}
              <div className="flex items-center gap-4 mb-3">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-nh-copper/10 rounded-lg flex items-center justify-center">
                    <pillar.icon className="w-6 h-6 text-nh-copper" />
                  </div>
                </div>
                <h3 className="text-xl font-heading font-bold text-white">
                  {pillar.title}
                </h3>
              </div>
              {/* Description - Full Width */}
              <p className="text-gray-300 leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandPillars;
