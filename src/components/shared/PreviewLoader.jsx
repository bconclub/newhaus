import { useEffect, useState, useRef } from 'react';
import { flushSync } from 'react-dom';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import logoImage from '../../assets/Newhaus logo.webp';

const PreviewLoader = ({ onComplete, onProgress }) => {
  const progress = useMotionValue(0);
  const [isReady, setIsReady] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const shouldRenderRef = useRef(true);

  useEffect(() => {
    // Wait for page to be ready
    const checkPageReady = async () => {
      // Wait for window load event
      const waitForLoad = () => {
        return new Promise((resolve) => {
          if (document.readyState === 'complete') {
            resolve();
          } else {
            window.addEventListener('load', resolve, { once: true });
          }
        });
      };

      // Wait for fonts to load
      const waitForFonts = () => {
        if (document.fonts && document.fonts.ready) {
          return document.fonts.ready;
        }
        return Promise.resolve();
      };

      // Wait for images to load (with shorter timeout)
      const waitForImages = () => {
        const images = document.querySelectorAll('img');
        if (images.length === 0) return Promise.resolve();
        
        const imagePromises = Array.from(images).map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve; // Continue even if image fails
            // Shorter timeout - 500ms max
            setTimeout(resolve, 500);
          });
        });

        return Promise.all(imagePromises);
      };

      try {
        await waitForLoad();
        // Don't wait too long - proceed quickly
        await Promise.race([
          Promise.all([waitForFonts(), waitForImages()]),
          new Promise(resolve => setTimeout(resolve, 200)) // Max 200ms wait - faster
        ]);
        setIsReady(true);
      } catch (error) {
        // If anything fails, proceed immediately
        setIsReady(true);
      }
    };

    checkPageReady();
  }, []);

  useEffect(() => {
    if (!isReady) return;

    // Start progress animation immediately - smooth and fast (50% faster)
    const animation = animate(progress, 100, {
      duration: 0.3, // 50% faster: 0.3 seconds (was 0.6)
      ease: [0.43, 0.13, 0.23, 0.96], // Very smooth easing curve
      onUpdate: (latest) => {
        if (onProgress) onProgress(latest);
        // Start hiding when progress reaches 85% - logo and bar should be gone by 100%
        if (latest >= 85 && !isExiting) {
          shouldRenderRef.current = false;
          flushSync(() => {
            setIsExiting(true);
          });
        }
      },
      onComplete: () => {
        if (onProgress) onProgress(100);
        // Logo and bar should already be faded out by now (started at 70%, gone by 100%)
        // Just hide the component completely
        shouldRenderRef.current = false;
        flushSync(() => {
          setIsHidden(true);
        });
        // Call onComplete to remove component from DOM
        onComplete();
      }
    });

    return () => animation.stop();
  }, [isReady, progress, onComplete, onProgress]);

  // Transform progress to blur and background opacity - fade during progress!
  const blurAmount = useTransform(progress, [0, 100], [20, 0]);
  const backdropFilter = useTransform(blurAmount, (v) => `blur(${v}px)`);
  const width = useTransform(progress, (v) => `${v}%`);
  
  // Background opacity - fades from 0.95 to 0 as progress goes 0-100
  const bgOpacity = useTransform(progress, [0, 100], [0.95, 0]);

  // Container opacity - starts fading at 70% progress, completely gone by 100%
  // Logo and bar fade out BEFORE the bar completes
  const containerOpacity = useTransform(progress, [70, 100], [1, 0]);
  
  // Container position for exit animation - moves up off screen
  const containerY = useMotionValue(0);
  const yTransform = useTransform(containerY, (v) => `${v}%`);

  // Removed separate exit useEffect - now handled directly in progress onComplete

  const backgroundColor = useTransform(bgOpacity, (v) => `rgba(41, 41, 41, ${v})`);

  // Don't render if ref says not to, or if completely hidden
  if (!shouldRenderRef.current || isHidden) {
    return null;
  }

  return (
    <motion.div 
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ 
        backdropFilter,
        backgroundColor,
        opacity: containerOpacity,
        y: yTransform,
        pointerEvents: isExiting || isHidden ? 'none' : 'auto'
      }}
    >
      {/* Logo with fade-in animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="mb-12"
      >
        <img
          src={logoImage}
          alt="NewHaus"
          className="h-24 md:h-32 w-auto"
        />
      </motion.div>

      {/* Loading Bar Container - much thinner */}
      <div className="w-64 md:w-80 h-px bg-nh-grey/50 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-nh-copper rounded-full"
          style={{ width }}
        />
      </div>
    </motion.div>
  );
};

export default PreviewLoader;

