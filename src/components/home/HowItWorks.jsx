import { motion } from 'framer-motion';
import { MessageCircle, Home, CheckCircle } from 'lucide-react';
import SectionHeader from '../shared/SectionHeader';
import Button from '../shared/Button';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      icon: MessageCircle,
      title: 'Connect',
      description:
        'Reach out through our form or schedule a consultation. Tell us what you\'re looking for.',
    },
    {
      number: '02',
      icon: Home,
      title: 'Curate',
      description:
        'We match you with properties that fit your criteria. View detailed information and schedule site visits.',
    },
    {
      number: '03',
      icon: CheckCircle,
      title: 'Close',
      description:
        'From offer to handover, we\'re with you. Documentation, negotiations, and everything in between.',
    },
  ];

  return (
    <section className="py-20 bg-nh-cream">
      <div className="container mx-auto px-4">
        <SectionHeader
          headline="Your Journey to NewHaus"
          centered
        />

        <div className="max-w-5xl mx-auto mt-12">
          {/* Desktop Timeline */}
          <div className="hidden md:flex items-start justify-between relative">
            {/* Connecting Line */}
            <div className="absolute top-12 left-0 right-0 h-0.5 bg-nh-copper/30 z-0"></div>

            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative z-10 flex-1 text-center px-4"
              >
                <div className="w-24 h-24 bg-nh-copper rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl font-heading font-bold text-nh-copper mb-2">
                  {step.number}
                </div>
                <h3 className="text-2xl font-heading font-bold text-nh-charcoal mb-3">
                  {step.title}
                </h3>
                <p className="text-nh-grey">{step.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-nh-copper rounded-full flex items-center justify-center shadow-lg">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-heading font-bold text-nh-copper mb-1">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-heading font-bold text-nh-charcoal mb-2">
                    {step.title}
                  </h3>
                  <p className="text-nh-grey">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Button to="/contact" size="lg">
            Start Your Search Today
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
