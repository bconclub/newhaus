import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Tag, CheckCircle, Calendar, Download } from 'lucide-react';
import { properties } from '../data/properties';
import ContactForm from '../components/shared/ContactForm';
import Button from '../components/shared/Button';
import Modal from '../components/shared/Modal';
import Tabs from '../components/shared/Tabs';

const PropertyDetail = () => {
  const { slug } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const property = properties.find((p) => p.slug === slug);

  // Scroll to top when property changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!property) {
    return <Navigate to="/properties" replace />;
  }

  // Tab content components
  const overviewContent = (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-heading font-bold text-white mb-4">Description</h3>
        <p className="text-gray-300 leading-relaxed">{property.description}</p>
      </div>
      
      {property.projectDetails && (
        <>
          <div>
            <h3 className="text-xl font-heading font-bold text-white mb-4">Why This Property</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-300">
                <CheckCircle className="w-5 h-5 text-nh-copper flex-shrink-0 mt-0.5" />
                <span>OC Received - Ready to Move In</span>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <CheckCircle className="w-5 h-5 text-nh-copper flex-shrink-0 mt-0.5" />
                <span>73% Carpet Area Efficiency - Maximum Usable Space</span>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <CheckCircle className="w-5 h-5 text-nh-copper flex-shrink-0 mt-0.5" />
                <span>Premium Location: 25 Kms from Airport, Next to Esteem Mall</span>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <CheckCircle className="w-5 h-5 text-nh-copper flex-shrink-0 mt-0.5" />
                <span>Architecture by Andy Fisher Workshop - Internationally Acclaimed Design</span>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <CheckCircle className="w-5 h-5 text-nh-copper flex-shrink-0 mt-0.5" />
                <span>75% Lung Space & 2 Acre Sky Deck - Unmatched Green Living</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-heading font-bold text-white mb-4">Ideal For</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-nh-grey p-4 rounded-lg border border-nh-copper/20">
                <h4 className="text-nh-copper font-semibold mb-2">Primary Residence Seekers</h4>
                <p className="text-gray-300 text-sm">Ready-to-move-in homes with OC received, perfect for families looking for immediate occupancy.</p>
              </div>
              <div className="bg-nh-grey p-4 rounded-lg border border-nh-copper/20">
                <h4 className="text-nh-copper font-semibold mb-2">Luxury Home Buyers</h4>
                <p className="text-gray-300 text-sm">Signature 4 & 5 BHK units with premium finishes and lake views for discerning buyers.</p>
              </div>
              <div className="bg-nh-grey p-4 rounded-lg border border-nh-copper/20">
                <h4 className="text-nh-copper font-semibold mb-2">Investors</h4>
                <p className="text-gray-300 text-sm">Completed project with strong rental potential and appreciation in North Bangalore corridor.</p>
              </div>
              <div className="bg-nh-grey p-4 rounded-lg border border-nh-copper/20">
                <h4 className="text-nh-copper font-semibold mb-2">NRI Buyers</h4>
                <p className="text-gray-300 text-sm">Ready possession with multiple approved banks for easy financing and documentation support.</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );

  const specificationsContent = (
    <div className="space-y-8">
      {property.projectDetails && (
        <>
          <div>
            <h3 className="text-xl font-heading font-bold text-white mb-4">Development Details</h3>
            <div className="bg-nh-grey p-6 rounded-lg border border-nh-copper/20">
              <ul className="space-y-3 text-gray-300">
                <li>
                  <strong className="text-white">Total Land Area:</strong> {property.projectDetails.landArea}
                </li>
                <li>
                  <strong className="text-white">Total Units:</strong> {property.projectDetails.totalUnits} Units
                </li>
                <li>
                  <strong className="text-white">Towers:</strong> {property.projectDetails.towers} Towers ({property.projectDetails.floors})
                </li>
                <li>
                  <strong className="text-white">Approval Status:</strong> {property.projectDetails.approvalStatus} ({property.projectDetails.approvalBy}) - Launch: {property.projectDetails.launchDate}
                </li>
                <li>
                  <strong className="text-white">Completion:</strong> {property.projectDetails.completionDate} ({property.projectDetails.currentStatus})
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-heading font-bold text-white mb-4">Unit Configuration</h3>
            <div className="bg-nh-grey p-6 rounded-lg border border-nh-copper/20">
              <ul className="space-y-3 text-gray-300">
                {property.projectDetails.unitSizes && Object.entries(property.projectDetails.unitSizes).map(([type, size]) => (
                  <li key={type}>
                    <strong className="text-white">{type}:</strong> {size}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-heading font-bold text-white mb-4">Carpet Efficiency</h3>
            <div className="bg-nh-grey p-6 rounded-lg border border-nh-copper/20">
              <p className="text-3xl font-heading font-bold text-nh-copper">{property.projectDetails.carpetEfficiency}</p>
              <p className="text-gray-300 mt-2">Maximum usable space with efficient design</p>
            </div>
          </div>
        </>
      )}
    </div>
  );

  const floorPlansContent = (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-heading font-bold text-white mb-4">Available Unit Types</h3>
        <p className="text-gray-300 mb-6">{property.projectDetails?.unitTypes || '3, 4, 5 BHK & 5 BHK Penthouse'}</p>
        
        {property.projectDetails?.unitSizes && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {Object.entries(property.projectDetails.unitSizes).map(([type, size]) => (
              <div key={type} className="bg-nh-grey p-6 rounded-lg border border-nh-copper/20 text-center">
                <h4 className="text-xl font-heading font-bold text-white mb-2">{type}</h4>
                <p className="text-nh-copper font-semibold">{size}</p>
              </div>
            ))}
          </div>
        )}

        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-nh-copper text-white hover:bg-nh-orange"
        >
          <Download className="w-4 h-4 mr-2 inline" />
          Download Brochure
        </Button>
      </div>
    </div>
  );

  const amenitiesContent = (
    <div className="space-y-6">
      {property.amenities && property.amenities.length > 0 && (
        <div>
          <h3 className="text-xl font-heading font-bold text-white mb-6">Amenities</h3>
          <div className="space-y-4">
            {property.amenities.map((amenity, index) => (
              <div key={index} className="bg-nh-grey p-6 rounded-lg border border-nh-copper/20">
                <p className="text-gray-300">{amenity}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {property.usps && property.usps.length > 0 && (
        <div>
          <h3 className="text-xl font-heading font-bold text-white mb-6">Key Highlights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {property.usps.map((usp, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-nh-grey p-4 rounded-lg border border-nh-copper/20"
              >
                <CheckCircle className="w-5 h-5 text-nh-copper flex-shrink-0 mt-0.5" />
                <span className="text-white">{usp}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const locationContent = (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-heading font-bold text-white mb-4">Address</h3>
        <div className="bg-nh-grey p-6 rounded-lg border border-nh-copper/20">
          <p className="text-gray-300 flex items-start gap-2">
            <MapPin className="text-nh-copper flex-shrink-0 mt-1" />
            <span>{property.address}</span>
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-heading font-bold text-white mb-4">Distance to Key Landmarks</h3>
        <div className="bg-nh-grey p-6 rounded-lg border border-nh-copper/20">
          <ul className="space-y-3 text-gray-300">
            <li>• Kempegowda International Airport: 25 Kms</li>
            <li>• Esteem Mall: Adjacent</li>
            <li>• Columbia Asia Hospital: Adjacent</li>
            <li>• Manyata Tech Park: 8 Kms</li>
            <li>• Hebbal Lake: 2 Kms</li>
          </ul>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-heading font-bold text-white mb-4">Connectivity Highlights</h3>
        <div className="bg-nh-grey p-6 rounded-lg border border-nh-copper/20">
          <ul className="space-y-3">
            {property.locationHighlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-300">
                <span className="w-1.5 h-1.5 bg-nh-copper rounded-full mt-2 flex-shrink-0"></span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-heading font-bold text-white mb-4">Map</h3>
        <div className="bg-nh-grey p-6 rounded-lg border border-nh-copper/20">
          <iframe
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6d-s6U4lR3Q3hYQ&q=${encodeURIComponent(property.address)}`}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg"
          ></iframe>
        </div>
      </div>
    </div>
  );

  const pricingContent = (
    <div className="space-y-6">
      {property.projectDetails && (
        <>
          <div>
            <h3 className="text-xl font-heading font-bold text-white mb-4">Current Availability</h3>
            <div className="bg-nh-grey p-6 rounded-lg border border-nh-copper/20">
              <ul className="space-y-3 text-gray-300">
                {property.projectDetails.unitSizes && (
                  <>
                    <li>
                      <strong className="text-white">3 BHK ({property.projectDetails.unitSizes['3 BHK']}):</strong> From ₹1.65 Cr
                    </li>
                    <li>
                      <strong className="text-white">4 BHK ({property.projectDetails.unitSizes['4 BHK']}):</strong> Price on Request
                    </li>
                    <li>
                      <strong className="text-white">5 BHK Penthouses ({property.projectDetails.unitSizes['5 BHK']}):</strong> Price on Request
                    </li>
                  </>
                )}
              </ul>
              <div className="mt-6 pt-6 border-t border-nh-copper/20">
                <p className="text-white font-semibold mb-2">Signature Units Available:</p>
                <p className="text-gray-300">{property.projectDetails.currentAvailability}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-heading font-bold text-white mb-4">Payment Plans</h3>
            <div className="bg-nh-grey p-6 rounded-lg border border-nh-copper/20">
              <p className="text-gray-300 mb-4">Multiple payment plans available. Contact us for detailed information.</p>
              {property.projectDetails.approvedBanks && property.projectDetails.approvedBanks.length > 0 && (
                <div>
                  <p className="text-white font-semibold mb-2">Financing Available Through:</p>
                  <p className="text-gray-300 text-sm">{property.projectDetails.approvedBanks.join(', ')}</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-heading font-bold text-white mb-4">RERA Registration</h3>
            <div className="bg-nh-grey p-6 rounded-lg border border-nh-copper/20">
              <p className="text-gray-300">RERA registration details available upon request.</p>
            </div>
          </div>
        </>
      )}
    </div>
  );

  const tabs = [
    { label: 'Overview', content: overviewContent },
    { label: 'Specifications', content: specificationsContent },
    { label: 'Floor Plans', content: floorPlansContent },
    { label: 'Amenities', content: amenitiesContent },
    { label: 'Location', content: locationContent },
    { label: 'Pricing & Availability', content: pricingContent },
  ];

  return (
    <div className="pt-20">
      {/* Section 1: Hero */}
      <section className="relative h-[70vh] md:h-[80vh]">
        <img
          src={property.images.hero}
          alt={property.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = `https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold mb-4">
                {property.name}
              </h1>
              <p className="text-xl md:text-2xl text-nh-cream mb-4">{property.tagline}</p>
              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="text-nh-copper" size={20} />
                  <span className="text-lg">{property.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="text-nh-copper" size={20} />
                  <span className="text-2xl md:text-3xl font-heading font-bold">{property.price}</span>
                </div>
              </div>
              <Button
                onClick={() => setIsModalOpen(true)}
                variant="primary"
                size="lg"
                className="bg-nh-copper text-white hover:bg-nh-orange"
              >
                <Calendar className="w-5 h-5 mr-2 inline" />
                Schedule a Viewing
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: Quick Overview */}
      <section className="bg-nh-charcoal py-12 border-b border-nh-copper/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">
                {property.name}
              </h2>
              <p className="text-lg text-gray-300">
                {property.location} | {property.price}
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {property.projectDetails && (
                <>
                  <div className="bg-nh-grey p-4 rounded-lg border border-nh-copper/20 text-center">
                    <CheckCircle className="w-6 h-6 text-nh-copper mx-auto mb-2" />
                    <p className="text-white font-semibold text-sm">{property.projectDetails.landArea}</p>
                    <p className="text-gray-400 text-xs">{property.projectDetails.totalUnits} Units</p>
                  </div>
                  <div className="bg-nh-grey p-4 rounded-lg border border-nh-copper/20 text-center">
                    <CheckCircle className="w-6 h-6 text-nh-copper mx-auto mb-2" />
                    <p className="text-white font-semibold text-sm">{property.projectDetails.currentStatus}</p>
                    <p className="text-gray-400 text-xs">Ready to Move</p>
                  </div>
                  <div className="bg-nh-grey p-4 rounded-lg border border-nh-copper/20 text-center">
                    <CheckCircle className="w-6 h-6 text-nh-copper mx-auto mb-2" />
                    <p className="text-white font-semibold text-sm">{property.projectDetails.unitTypes}</p>
                    <p className="text-gray-400 text-xs">Penthouses Available</p>
                  </div>
                  <div className="bg-nh-grey p-4 rounded-lg border border-nh-copper/20 text-center">
                    <CheckCircle className="w-6 h-6 text-nh-copper mx-auto mb-2" />
                    <p className="text-white font-semibold text-sm">{property.projectDetails.carpetEfficiency}</p>
                    <p className="text-gray-400 text-xs">Carpet Area Efficiency</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Tabbed Detail Sections */}
      <section className="min-h-[80vh] flex items-center bg-nh-charcoal py-20">
        <div className="container mx-auto px-4 w-full">
          <div className="max-w-6xl mx-auto">
            <Tabs tabs={tabs} />
          </div>
        </div>
      </section>

      {/* Schedule Viewing Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Schedule a Viewing"
      >
        <ContactForm 
          propertyInterest={property.name} 
          onSuccess={() => {
            setIsModalOpen(false);
            setTimeout(() => {
              window.location.href = '/thank-you';
            }, 500);
          }}
        />
      </Modal>
    </div>
  );
};

export default PropertyDetail;
