import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import ContactForm from '../components/shared/ContactForm';
import SectionHeader from '../components/shared/SectionHeader';
import heroImage003 from '../assets/New Haus 003.webp';

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone Number',
      value: '+91 9591004043',
      href: 'tel:+919591004043',
    },
    {
      icon: Mail,
      title: 'Email Address',
      value: 'Contact@newhaus.in',
      href: 'mailto:Contact@newhaus.in',
    },
    {
      icon: MapPin,
      title: 'Visit Us On',
      value: 'Balaji Building, Shop No 4, 1st Floor, Hennur Bagalur Main Rd, above Ammas Bakery, Kothanur, Bengaluru, Karnataka 560077',
      href: null,
    },
    {
      icon: Clock,
      title: 'Visit Between',
      value: 'Mon - sat: 9:30 am - 6:30 pm',
      href: null,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-nh-charcoal overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: `url(${heroImage003})`
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-nh-charcoal/60" />
        {/* Content */}
        <div className="container mx-auto px-6 md:px-4 text-center relative z-10 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 drop-shadow-2xl">
              Let's Find Your New<span className="text-nh-copper">Haus</span>
            </h1>
            <p className="text-lg md:text-xl text-nh-cream max-w-3xl mx-auto">
              Tell us what you're looking for, and we'll curate the perfect options for you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="min-h-[80vh] flex items-center bg-nh-charcoal py-20">
        <div className="container mx-auto px-6 md:px-4 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto w-full">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-heading font-bold text-white mb-6">
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
              <h2 className="text-3xl font-heading font-bold text-white mb-6">
                Get in touch
              </h2>
              <p className="text-gray-300 mb-8">
                Have questions? We're here to help. Reach out to us through any of the following channels.
              </p>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-nh-grey rounded-lg border border-nh-copper/20"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-nh-copper/10 rounded-full flex items-center justify-center">
                        <info.icon className="w-6 h-6 text-nh-copper" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">
                        {info.title}
                      </h3>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-gray-300 hover:text-nh-copper transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <>
                          <p className="text-gray-300">{info.value}</p>
                          {info.subValue && (
                            <p className="text-gray-300 text-sm">{info.subValue}</p>
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
