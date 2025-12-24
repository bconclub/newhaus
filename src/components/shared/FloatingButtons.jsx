import { useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { properties } from '../../data/properties';
import Modal from './Modal';
import SignupForm from './SignupForm';

const STORAGE_KEY = 'newhaus_contact_form_data';

const FloatingButtons = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { slug } = useParams();
  const [isEnquireModalOpen, setIsEnquireModalOpen] = useState(false);

  // Detect property from URL
  const detectedProperty = slug ? properties.find(p => p.slug === slug) : null;
  const propertyName = detectedProperty?.name || '';

  // Load saved form data from localStorage
  const loadSavedFormData = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      return {};
    }
  };

  // WhatsApp phone number
  const whatsappNumber = '919632004011';
  
  // Build WhatsApp message with user form data
  const buildWhatsAppMessage = () => {
    const formData = loadSavedFormData();
    const hasFormData = formData.name || formData.email || formData.phone;
    
    let message = '';
    
    // Start with greeting
    if (detectedProperty) {
      message += `Hi, I'm interested in *${detectedProperty.name}*.\n\n`;
    } else {
      message += 'Hi, I would like to know more about your properties.\n\n';
    }
    
    // Add user details and preferences if form was filled
    if (hasFormData) {
      message += '*My Details:*\n';
      if (formData.name) message += `*Name:* ${formData.name}\n`;
      if (formData.email) message += `*Email:* ${formData.email}\n`;
      if (formData.phone) message += `*Phone:* ${formData.phone}\n`;
      if (formData.budget_range) message += `*Budget:* ${formData.budget_range}\n`;
      if (formData.property_type) message += `*Property Type I'm Looking For:* ${formData.property_type}\n`;
      message += '\nCan you please provide more details?';
    } else {
      message += 'Can you please provide more details?';
    }
    
    return message;
  };

  const handleWhatsAppClick = () => {
    const whatsappMessage = buildWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Track WhatsApp click
    const clickData = {
      page_name: location.pathname,
      source_page: window.location.href,
      property_name: propertyName || undefined,
      referrer: document.referrer || undefined,
      user_agent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    };

    // Send to admin API (non-blocking)
    fetch('/api/whatsapp-clicks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clickData),
    }).catch((err) => {
      // Silently fail - tracking is secondary
      console.log('WhatsApp click tracking failed:', err);
    });

    window.open(whatsappUrl, '_blank');
  };

  const handleEnquireClick = () => {
    setIsEnquireModalOpen(true);
  };

  const handleEnquireSuccess = () => {
    setIsEnquireModalOpen(false);
    const previousPage = location.pathname;
    navigate(`/thank-you?form=contact&from=${encodeURIComponent(previousPage)}`);
  };

  const modalTitle = propertyName ? `Call back - ${propertyName}` : 'Call back';

  return (
    <>
      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-4">
        {/* Enquire Button - Top */}
        <button
          onClick={handleEnquireClick}
          className="w-[50.4px] h-[50.4px] md:w-16 md:h-16 bg-nh-copper hover:bg-nh-orange rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group"
          aria-label="Enquire about property"
        >
          <Phone className="text-white w-[21.6px] h-[21.6px] md:w-7 md:h-7" />
        </button>

        {/* WhatsApp Button - Bottom */}
        <button
          onClick={handleWhatsAppClick}
          className="w-[50.4px] h-[50.4px] md:w-16 md:h-16 bg-[#25D366] hover:bg-[#20BA5A] rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group"
          aria-label="Contact us on WhatsApp"
        >
          <svg 
            className="w-[21.6px] h-[21.6px] md:w-7 md:h-7 text-white" 
            fill="currentColor" 
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </button>
      </div>

      {/* Call back Modal */}
      <Modal
        isOpen={isEnquireModalOpen}
        onClose={() => setIsEnquireModalOpen(false)}
        title={modalTitle}
      >
        <SignupForm
          formSource="Call Back"
          onSuccess={handleEnquireSuccess}
        />
      </Modal>
    </>
  );
};

export default FloatingButtons;

