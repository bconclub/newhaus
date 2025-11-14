import { motion } from 'framer-motion';
import Button from '../shared/Button';
import headerVideo from '../../assets/New Haus Header.mp4';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={headerVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black opacity-70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-6 leading-tight md:leading-normal">
            Find Your New<span className="text-nh-copper">Haus</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-nh-cream mb-8 max-w-3xl mx-auto">
            Stop scrolling and find the right home
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button to="/properties" variant="primary" size="lg">
              Explore Curated Homes
            </Button>
            <Button to="/contact" variant="outline" size="lg">
              Schedule a Consultation
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
