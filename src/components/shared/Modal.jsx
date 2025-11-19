import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, children, title }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-nh-charcoal/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <div className="relative max-w-md md:max-w-[394px] w-full">
              {/* Close Button - Above Container */}
              <button
                onClick={onClose}
                className="absolute -top-12 right-0 text-gray-400 hover:text-white transition-colors p-2 hover:bg-nh-charcoal/30 rounded-full z-20"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>

              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-nh-grey border-2 border-nh-copper rounded-lg shadow-2xl w-full max-h-[90vh] overflow-y-auto relative"
              >
                {/* Header */}
                <div className="sticky top-0 bg-nh-grey border-b border-nh-copper/20 px-6 py-4 flex items-center justify-center relative z-10">
                  {title && (
                    <h2 className="text-2xl font-heading font-bold text-white text-center">
                      {title}
                    </h2>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  {children}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;

