import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logoImage from '../../assets/Newhaus logo.webp';

const PreviewLoader = ({ onComplete, onProgress }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate loading bar over 2 seconds
    const duration = 2000; // 2 seconds
    const interval = 50; // Update every 50ms for smooth animation
    const increment = (100 / duration) * interval;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          clearInterval(timer);
          if (onProgress) onProgress(100);
          onComplete();
          return 100;
        }
        if (onProgress) onProgress(newProgress);
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete, onProgress]);

  // Calculate blur based on progress (starts at 20px, goes to 0px)
  const blurAmount = 20 - (progress / 100) * 20;
  const opacity = 0.95 - (progress / 100) * 0.95;
  // Logo fades out as progress increases (starts at 1, goes to 0)
  const logoOpacity = 1 - (progress / 100);

  return (
    <div 
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-300"
      style={{ 
        backdropFilter: `blur(${blurAmount}px)`,
        backgroundColor: `rgba(41, 41, 41, ${opacity})`
      }}
    >
      {/* Logo with fade-in and fade-out animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: logoOpacity > 0.1 ? logoOpacity : 0,
          scale: 1 
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="mb-12"
        style={{ opacity: logoOpacity }}
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

