import { motion } from 'framer-motion';
import Button from '../shared/Button';
import headerVideo from '../../assets/NH Header.mp4';

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
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="text-6xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-6 leading-tight md:leading-normal">
            {["Find", "Your", "New"].map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.5 + index * 0.2,
                  ease: "easeOut"
                }}
                className="inline-block mr-2"
              >
                {word}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.5 + 3 * 0.2,
                ease: "easeOut"
              }}
              className="text-nh-copper inline-block"
            >
              Haus
            </motion.span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-nh-cream mb-8 max-w-3xl mx-auto">
            Stop scrolling and find the right home
          </p>

          <div className="flex justify-center items-center">
            <button
              onClick={() => {
                const element = document.getElementById('featured-properties');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="bg-nh-copper text-white px-4 py-2 rounded-md hover:bg-nh-orange transition-colors text-lg font-heading font-bold tracking-widest"
            >
              Explore Homes
            </button>
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
