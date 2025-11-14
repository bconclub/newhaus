import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import ContactForm from '../components/shared/ContactForm';
import SectionHeader from '../components/shared/SectionHeader';

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 98765 43210',
      href: 'tel:+919876543210',
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'hello@newhaus.in',
      href: 'mailto:hello@newhaus.in',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Bangalore, India',
      href: null,
    },
    {
      icon: Clock,
      title: 'Office Hours',
      value: 'Mon-Sat: 10AM - 7PM',
      subValue: 'Sunday: By Appointment',
      href: null,
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
              Let's Find Your New<span className="text-nh-copper">Haus</span>
            </h1>
            <p className="text-lg md:text-xl text-nh-cream max-w-3xl mx-auto">
              Tell us what you're looking for, and we'll curate the perfect options for you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-heading font-bold text-nh-charcoal mb-6">
                Send us a message
              </h2>
              <ContactForm />
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-3xl font-heading font-bold text-nh-charcoal mb-6">
                Get in touch
              </h2>
              <p className="text-nh-grey mb-8">
                Have questions? We're here to help. Reach out to us through any of the following channels.
              </p>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-nh-cream rounded-lg"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-nh-copper/10 rounded-full flex items-center justify-center">
                        <info.icon className="w-6 h-6 text-nh-copper" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-nh-charcoal mb-1">
                        {info.title}
                      </h3>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-nh-grey hover:text-nh-copper transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <>
                          <p className="text-nh-grey">{info.value}</p>
                          {info.subValue && (
                            <p className="text-nh-grey text-sm">{info.subValue}</p>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
