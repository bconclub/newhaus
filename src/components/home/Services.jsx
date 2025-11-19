import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MapPin, FileText, LineChart, Globe, CheckCircle } from 'lucide-react';
import image001 from '../../assets/New Haus 001.webp';
import image002 from '../../assets/New Haus 002.webp';
import image003 from '../../assets/New Haus 003.webp';
import image004 from '../../assets/New Haus 004.webp';

const Services = () => {
  const [activeTab, setActiveTab] = useState(0);
  const intervalRef = useRef(null);

  const placeholderImages = [image001, image002, image003, image004];

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
      image: image001,
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
      image: image002,
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
      image: image003,
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
      image: image004,
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
      image: image001,
    },
  ];

  // Auto-switch tabs every 3 seconds
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % services.length);
    }, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [services.length]);

  return (
    <section className="min-h-[80vh] flex items-center bg-nh-charcoal py-20">
      <div className="container mx-auto px-6 md:px-4 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Large Image */}
          <div className="relative aspect-square lg:aspect-auto lg:h-[600px] rounded-lg overflow-hidden">
            <motion.img
              key={activeTab}
              src={services[activeTab].image}
              alt={services[activeTab].title}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = image001;
              }}
            />
          </div>

          {/* Right Column - Content with Tabs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Small Text with Line */}
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-nh-copper"></div>
              <p className="text-sm text-nh-copper uppercase tracking-wider">WHAT WE DO</p>
            </div>

            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white">
              The Complete Home-Buying Experience
            </h2>

            <p className="text-lg text-nh-cream">
              Welcome to New Haus, where every home is crafted with care, and every service is designed with you in mind.
            </p>

            {/* Tabs */}
            <div className="mt-8">
              <div className="flex flex-wrap gap-4 mb-6 border-b border-nh-copper/20 pb-4">
                {services.map((service, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveTab(index);
                      // Reset interval on manual click
                      if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                      }
                      intervalRef.current = setInterval(() => {
                        setActiveTab((prev) => (prev + 1) % services.length);
                      }, 3000);
                    }}
                    className="relative font-heading font-semibold transition-colors pb-2"
                  >
                    <span className={activeTab === index ? 'text-nh-copper' : 'text-gray-400 hover:text-white'}>
                      {service.title}
                    </span>
                    {activeTab === index && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-nh-copper"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 3, ease: 'linear' }}
                        key={activeTab}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Active Tab Content */}
              <div className="min-h-[300px]">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-lg text-nh-cream mb-6">
                    {services[activeTab].description}
                  </p>

                  <div className="space-y-3">
                    {services[activeTab].details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-nh-copper flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{detail}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;
