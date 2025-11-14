import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import SectionHeader from '../components/shared/SectionHeader';
import Button from '../components/shared/Button';

const About = () => {
  const approaches = [
    'We visit every property ourselves',
    'We analyze investment potential with data',
    "We prioritize your needs, not commissions",
    'We\'re transparent about pros and cons',
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
              We're Not Just Property Advisors.<br />
              We're Home Curators.
            </h1>
            <p className="text-lg md:text-xl text-nh-cream max-w-3xl mx-auto">
              Founded by professionals who've experienced the frustration of Bangalore's property hunt firsthand.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="min-h-[80vh] flex items-center bg-nh-charcoal py-20">
        <div className="container mx-auto px-4 w-full">
          <div className="max-w-4xl mx-auto w-full">
            <SectionHeader
              headline="Our Story"
              centered
            />

            <div className="prose prose-lg mx-auto text-gray-300">
              <p className="text-lg leading-relaxed mb-6">
                Bangalore's real estate market is overwhelming. Thousands of listings, aggressive sales pitches,
                and no one who truly understands what makes a home both beautiful and a smart investment.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                We started NewHaus to change that.
              </p>
              <p className="text-lg leading-relaxed">
                With backgrounds in architecture and real estate investment, we bring a unique perspective:
                we evaluate properties the way you wish someone would—with an eye for design quality,
                spatial intelligence, and long-term value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="min-h-[80vh] flex items-center bg-nh-charcoal py-20">
        <div className="container mx-auto px-4 w-full">
          <div className="max-w-4xl mx-auto w-full">
            <SectionHeader
              headline="Our Approach"
              centered
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              {approaches.map((approach, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 bg-nh-grey p-6 rounded-lg shadow-md border border-nh-copper/20"
                >
                  <CheckCircle className="w-6 h-6 text-nh-copper flex-shrink-0 mt-1" />
                  <p className="text-white font-medium">{approach}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="min-h-[80vh] flex items-center bg-nh-charcoal py-20">
        <div className="container mx-auto px-4 w-full">
          <div className="max-w-4xl mx-auto text-center w-full">
            <SectionHeader
              headline="Our Vision"
              centered
            />

            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              To become Bangalore's most trusted name for discerning homebuyers who refuse to compromise on quality.
            </p>

            <Button to="/properties" size="lg">
              See Our Curated Properties
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
