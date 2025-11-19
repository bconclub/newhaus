import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logoImage from '../../assets/Newhaus logo.webp';

const PreviewLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate loading bar over 2 seconds
    const duration = 2000; // 2 seconds
    const interval = 50; // Update every 50ms for smooth animation
    const increment = (100 / duration) * interval;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          // Wait a bit after reaching 100% before calling onComplete
          setTimeout(() => {
            onComplete();
          }, 100);
          return 100;
        }
        return prev + increment;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-nh-charcoal flex flex-col items-center justify-center">
      {/* Logo with fade-in animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mb-12"
      >
        <img
          src={logoImage}
          alt="NewHaus"
          className="h-24 md:h-32 w-auto"
        />
      </motion.div>

      {/* Loading Bar Container */}
      <div className="w-64 md:w-80 h-2 bg-nh-grey/50 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-nh-copper rounded-full"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.05, ease: 'linear' }}
        />
      </div>
    </div>
  );
};

export default PreviewLoader;

