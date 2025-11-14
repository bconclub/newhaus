import { motion } from 'framer-motion';
import { Sparkles, MapPin, FileText, LineChart, Globe } from 'lucide-react';
import SectionHeader from '../shared/SectionHeader';

const Services = () => {
  const services = [
    {
      icon: Sparkles,
      title: 'Property Curation',
      description:
        'We handpick properties that match your lifestyle, budget, and investment goals. No generic listings—only homes worth your time.',
    },
    {
      icon: MapPin,
      title: 'Guided Sightseeing',
      description:
        'Personalized property tours with architectural insights. We help you see beyond the brochure.',
    },
    {
      icon: FileText,
      title: 'Documentation Support',
      description:
        'From offer letters to sale deeds, we guide you through paperwork. Clear, transparent, stress-free.',
    },
    {
      icon: LineChart,
      title: 'Investment Advisory',
      description:
        'Data-driven analysis on appreciation potential, rental yields, and market trends. Buy smart, not just beautiful.',
    },
    {
      icon: Globe,
      title: 'NRI Services',
      description:
        'Remote buying made simple. FEMA compliance, property management, and trusted local support.',
    },
  ];

  return (
    <section className="py-20 bg-nh-charcoal">
      <div className="container mx-auto px-4">
        <SectionHeader
          smallText="WHAT WE DO"
          headline="End-to-End Support for Your Home Journey"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-nh-copper/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <service.icon className="w-8 h-8 text-nh-copper" />
              </div>
              <h3 className="text-xl font-heading font-bold text-white mb-3">
                {service.title}
              </h3>
              <p className="text-nh-cream leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
