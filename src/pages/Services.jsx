import { motion } from 'framer-motion';
import { Sparkles, MapPin, FileText, LineChart, Globe } from 'lucide-react';
import SectionHeader from '../components/shared/SectionHeader';
import Button from '../components/shared/Button';

const Services = () => {
  const services = [
    {
      icon: Sparkles,
      title: 'Property Curation',
      description:
        'We handpick properties that match your lifestyle, budget, and investment goals. No generic listings—only homes worth your time.',
      details: [
        'Personalized property matching based on your criteria',
        'Deep architectural and design analysis',
        'Location suitability assessment',
        'Investment potential evaluation',
      ],
    },
    {
      icon: MapPin,
      title: 'Guided Site Visit',
      description:
        'Personalized property tours with architectural insights. We help you see beyond the brochure.',
      details: [
        'Scheduled site visits at your convenience',
        'Expert architectural walkthroughs',
        'Neighborhood and amenity tours',
        'Honest pros and cons discussion',
      ],
    },
    {
      icon: LineChart,
      title: 'Investment Advisory',
      description:
        'Data-driven analysis on appreciation potential, rental yields, and market trends. Buy smart, not just beautiful.',
      details: [
        'Market trend analysis and forecasting',
        'Appreciation potential assessment',
        'Rental yield calculations',
        'Infrastructure development tracking',
      ],
    },
    {
      icon: Globe,
      title: 'NRI Services',
      description:
        'Remote buying made simple. FEMA compliance, property management, and trusted local support.',
      details: [
        'FEMA compliance guidance',
        'Remote viewing and virtual tours',
        'Power of attorney assistance',
        'Property management coordination',
      ],
    },
    {
      icon: FileText,
      title: 'Documentation Support',
      description:
        'From offer letters to sale deeds, we guide you through paperwork. Clear, transparent, stress-free.',
      details: [
        'Legal document review and guidance',
        'Sale agreement assistance',
        'Loan documentation support',
        'Registration and handover coordination',
      ],
    },
  ];

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
              End-to-End Support for Your Home Journey
            </h1>
            <p className="text-lg md:text-xl text-nh-cream max-w-3xl mx-auto">
              From curation to closing, we're with you every step of the way.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Details */}
      <section className="min-h-[80vh] flex items-center bg-nh-charcoal py-20">
        <div className="container mx-auto px-4 w-full">
          <div className="max-w-5xl mx-auto space-y-16 w-full">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } gap-8 items-center`}
              >
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-nh-copper/10 rounded-full flex items-center justify-center">
                    <service.icon className="w-12 h-12 text-nh-copper" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h2 className="text-3xl font-heading font-bold text-white mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-gray-300 mb-6">
                    {service.description}
                  </p>

                  <div className="bg-nh-grey p-6 rounded-lg border border-nh-copper/20">
                    <h3 className="font-semibold text-white mb-3">
                      What's Included:
                    </h3>
                    <ul className="space-y-2">
                      {service.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-300">
                          <span className="w-1.5 h-1.5 bg-nh-copper rounded-full mt-2 flex-shrink-0"></span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="min-h-[80vh] flex items-center bg-nh-charcoal py-20">
        <div className="container mx-auto px-4 text-center w-full">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help you find your perfect home in Bangalore.
          </p>
          <Button to="/contact" size="lg">
            Schedule a Consultation
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Services;
