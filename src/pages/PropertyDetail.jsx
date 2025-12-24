import { useState, useEffect } from 'react';
import { useParams, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Tag, CheckCircle, Calendar, Download } from 'lucide-react';
import { properties } from '../data/properties';
import ContactForm from '../components/shared/ContactForm';
import BookSiteVisitForm from '../components/shared/BookSiteVisitForm';
import Button from '../components/shared/Button';
import Modal from '../components/shared/Modal';
import Tabs from '../components/shared/Tabs';
import fallbackImage001 from '../assets/New Haus 001.webp';

const PropertyDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
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
              {property.whyThisProperty ? (
                property.whyThisProperty.map((point, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-nh-copper flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))
              ) : (
                <>
                  <li className="flex items-start gap-2 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-nh-copper flex-shrink-0 mt-0.5" />
                    <span>OC Received - Ready to Move In</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-nh-copper flex-shrink-0 mt-0.5" />
                    <span>{property.projectDetails.carpetEfficiency} Carpet Area Efficiency - Maximum Usable Space</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-nh-copper flex-shrink-0 mt-0.5" />
                    <span>Premium Location: {property.location}</span>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-heading font-bold text-white mb-4">Ideal For</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {property.idealFor ? (
                property.idealFor.map((item, index) => (
                  <div key={index} className="bg-nh-grey p-4 rounded-lg border border-nh-copper/20">
                    <h4 className="text-nh-copper font-semibold mb-2">{item.title}</h4>
                    <p className="text-gray-300 text-sm">{item.description}</p>
                  </div>
                ))
              ) : (
                <>
                  <div className="bg-nh-grey p-4 rounded-lg border border-nh-copper/20">
                    <h4 className="text-nh-copper font-semibold mb-2">Primary Residence Seekers</h4>
                    <p className="text-gray-300 text-sm">Ready-to-move-in homes with OC received, perfect for families looking for immediate occupancy.</p>
                  </div>
                  <div className="bg-nh-grey p-4 rounded-lg border border-nh-copper/20">
                    <h4 className="text-nh-copper font-semibold mb-2">Luxury Home Buyers</h4>
                    <p className="text-gray-300 text-sm">Premium units with exceptional finishes and views for discerning buyers.</p>
                  </div>
                  <div className="bg-nh-grey p-4 rounded-lg border border-nh-copper/20">
                    <h4 className="text-nh-copper font-semibold mb-2">Investors</h4>
                    <p className="text-gray-300 text-sm">Completed project with strong rental potential and appreciation potential.</p>
                  </div>
                  <div className="bg-nh-grey p-4 rounded-lg border border-nh-copper/20">
                    <h4 className="text-nh-copper font-semibold mb-2">NRI Buyers</h4>
                    <p className="text-gray-300 text-sm">Ready possession with multiple approved banks for easy financing and documentation support.</p>
                  </div>
                </>
              )}
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
                {property.projectDetails.totalUnits && (
                  <li>
                    <strong className="text-white">Total Units:</strong> {property.projectDetails.totalUnits} Units
                  </li>
                )}
                {property.projectDetails.totalPlots && (
                  <li>
                    <strong className="text-white">Total Plots:</strong> {property.projectDetails.totalPlots} Plots
                  </li>
                )}
                {property.projectDetails.totalApartments && (
                  <li>
                    <strong className="text-white">Total Apartments:</strong> {property.projectDetails.totalApartments} Apartments
                  </li>
                )}
                {property.projectDetails.towers && (
                  <li>
                    <strong className="text-white">Towers:</strong> {property.projectDetails.towers} Towers {property.projectDetails.floors && `(${property.projectDetails.floors})`}
                  </li>
                )}
                {property.projectDetails.blocks && (
                  <li>
                    <strong className="text-white">Number of Blocks:</strong> {property.projectDetails.blocks} Blocks
                  </li>
                )}
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
            <h3 className="text-xl font-heading font-bold text-white mb-4">Available Options</h3>
            <div className="bg-nh-grey p-6 rounded-lg border border-nh-copper/20 space-y-6">
              {property.slug === 'embassy-springs' ? (
                <>
                  <div>
                    <h4 className="text-lg font-heading font-semibold text-nh-copper mb-3">PLOTS:</h4>
                    <ul className="space-y-2 text-gray-300">
                      {property.projectDetails.plotSizes && Object.entries(property.projectDetails.plotSizes).map(([type, size]) => (
                        <li key={type}>
                          <strong className="text-white">{type}:</strong> {size}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-heading font-semibold text-nh-copper mb-3">APARTMENTS:</h4>
                    <ul className="space-y-2 text-gray-300">
                      {property.projectDetails.apartmentSizes && Object.entries(property.projectDetails.apartmentSizes).map(([type, size]) => (
                        <li key={type}>
                          <strong className="text-white">{type}:</strong> {size}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-heading font-semibold text-nh-copper mb-3">VILLAS:</h4>
                    <ul className="space-y-2 text-gray-300">
                      {property.projectDetails.villaSizes && Object.entries(property.projectDetails.villaSizes).map(([type, size]) => (
                        <li key={type}>
                          <strong className="text-white">{type}:</strong> {size}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-heading font-semibold text-nh-copper mb-3">RETAIL:</h4>
                    <p className="text-gray-300">
                      <strong className="text-white">Current BSP:</strong> {property.projectDetails.retailBSP}
                    </p>
                  </div>
                </>
              ) : (
                <ul className="space-y-3 text-gray-300">
                  {property.projectDetails.unitSizes && Object.entries(property.projectDetails.unitSizes).map(([type, size]) => (
                    <li key={type}>
                      <strong className="text-white">{type}:</strong> {size}
                    </li>
                  ))}
                </ul>
              )}
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
        <p className="text-gray-300 mb-6">
          {property.slug === 'embassy-grove' 
            ? 'KGA & Non-KGA 4 BHK Duplex & 5 BHK Triplex'
            : property.slug === 'embassy-springs'
            ? 'PLOTS, APARTMENTS, VILLAS'
            : property.projectDetails?.unitTypes || '3, 4, 5 BHK & 5 BHK Penthouse'
          }
        </p>
        
        {property.slug === 'embassy-one-four-seasons' && (
          <div className="bg-nh-grey p-4 rounded-lg border border-nh-copper/20 mb-6">
            <p className="text-white font-semibold mb-2">Currently Available for Sale:</p>
            <p className="text-gray-300 text-sm">South Tower - 1, 1.5, 2 BHK Units Only</p>
          </div>
        )}
        
        {property.slug === 'embassy-springs' ? (
          <div className="space-y-6 mb-8">
            <div>
              <h4 className="text-lg font-heading font-semibold text-nh-copper mb-4">PLOTS</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.projectDetails.plotSizes && Object.entries(property.projectDetails.plotSizes).map(([type, size]) => (
                  <div key={type} className="bg-nh-grey p-6 rounded-lg border border-nh-copper/20 text-center">
                    <h5 className="text-lg font-heading font-bold text-white mb-2">{type}</h5>
                    <p className="text-nh-copper font-semibold">{size}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-heading font-semibold text-nh-copper mb-4">APARTMENTS</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {property.projectDetails.apartmentSizes && Object.entries(property.projectDetails.apartmentSizes).map(([type, size]) => (
                  <div key={type} className="bg-nh-grey p-6 rounded-lg border border-nh-copper/20 text-center">
                    <h5 className="text-lg font-heading font-bold text-white mb-2">{type}</h5>
                    <p className="text-nh-copper font-semibold">{size}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-heading font-semibold text-nh-copper mb-4">VILLAS</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.projectDetails.villaSizes && Object.entries(property.projectDetails.villaSizes).map(([type, size]) => (
                  <div key={type} className="bg-nh-grey p-6 rounded-lg border border-nh-copper/20 text-center">
                    <h5 className="text-lg font-heading font-bold text-white mb-2">{type}</h5>
                    <p className="text-nh-copper font-semibold">{size}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          property.projectDetails?.unitSizes && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {Object.entries(property.projectDetails.unitSizes).map(([type, size]) => {
                // For Embassy One, only show available South Tower units (1, 1.5, 2 BHK)
                if (property.slug === 'embassy-one-four-seasons') {
                  if (type !== '1 Bedroom' && type !== '1.5 Bedroom' && type !== '2 Bedroom') {
                    return null;
                  }
                }
                return (
                  <div key={type} className="bg-nh-grey p-6 rounded-lg border border-nh-copper/20 text-center">
                    <h4 className="text-xl font-heading font-bold text-white mb-2">{type}</h4>
                    <p className="text-nh-copper font-semibold">{size}</p>
                  </div>
                );
              })}
            </div>
          )
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
            {property.distanceToLandmarks ? (
              property.distanceToLandmarks.map((landmark, index) => (
                <li key={index}>• {landmark.name}: {landmark.distance}</li>
              ))
            ) : (
              <>
                <li>• Kempegowda International Airport: 25 Kms</li>
                <li>• Esteem Mall: Adjacent</li>
                <li>• Columbia Asia Hospital: Adjacent</li>
                <li>• Manyata Tech Park: 8 Kms</li>
                <li>• Hebbal Lake: 2 Kms</li>
              </>
            )}
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

      {property.investmentHighlights && property.investmentHighlights.length > 0 && (
        <div>
          <h3 className="text-xl font-heading font-bold text-white mb-4">Investment Highlights</h3>
          <div className="bg-nh-grey p-6 rounded-lg border border-nh-copper/20">
            <ul className="space-y-3">
              {property.investmentHighlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-300">
                  <span className="w-1.5 h-1.5 bg-nh-copper rounded-full mt-2 flex-shrink-0"></span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

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
            <h3 className="text-xl font-heading font-bold text-white mb-4">Current Availability & Pricing</h3>
            <div className="bg-nh-grey p-6 rounded-lg border border-nh-copper/20">
              {property.slug === 'embassy-springs' ? (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-heading font-semibold text-nh-copper mb-3">PLOTS:</h4>
                    <ul className="space-y-2 text-gray-300">
                      {property.projectDetails.plotSizes && Object.entries(property.projectDetails.plotSizes).map(([type, size], index) => (
                        <li key={index}>
                          <strong className="text-white">{type} ({size}):</strong> Price on Request
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-heading font-semibold text-nh-copper mb-3">APARTMENTS:</h4>
                    <ul className="space-y-2 text-gray-300">
                      {property.projectDetails.apartmentSizes && Object.entries(property.projectDetails.apartmentSizes).map(([type, size], index) => {
                        const price = type === '3 BHK' ? 'SOLD OUT' : 'Price on Request';
                        return (
                          <li key={index}>
                            <strong className="text-white">{type} ({size}):</strong> {price}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-heading font-semibold text-nh-copper mb-3">VILLAS:</h4>
                    <ul className="space-y-2 text-gray-300">
                      {property.projectDetails.villaSizes && Object.entries(property.projectDetails.villaSizes).map(([type, size], index) => {
                        // Extract price from size string
                        const priceMatch = size.match(/Range: (.+)\)/);
                        const price = priceMatch ? priceMatch[1] : 'Price on Request';
                        const sizeOnly = size.split(' (')[0];
                        return (
                          <li key={index}>
                            <strong className="text-white">{type} ({sizeOnly}):</strong> {price}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-heading font-semibold text-nh-copper mb-3">RETAIL:</h4>
                    <p className="text-gray-300">
                      <strong className="text-white">Current BSP:</strong> {property.projectDetails.retailBSP}
                    </p>
                  </div>
                  {property.projectDetails.constructionStatus && (
                    <div className="mt-6 pt-6 border-t border-nh-copper/20">
                      <p className="text-white font-semibold mb-3">Construction Status:</p>
                      <p className="text-gray-300 text-sm whitespace-pre-line">{property.projectDetails.constructionStatus}</p>
                    </div>
                  )}
                </div>
              ) : (
                <ul className="space-y-3 text-gray-300">
                  {property.projectDetails.unitSizes && Object.entries(property.projectDetails.unitSizes).map(([type, size], index) => {
                    // Determine price based on unit type
                    let price = 'Price on Request';
                    
                    if (property.slug === 'embassy-one-four-seasons') {
                      // Only South Tower units (1, 1.5, 2 BHK) are available
                      if (type === '1 Bedroom' || type === '1.5 Bedroom' || type === '2 Bedroom') {
                        price = 'Price on Request';
                      } else {
                        // North Tower units are sold out
                        return null;
                      }
                    } else if (type === '4 BHK Duplex' && property.price) {
                      price = property.price;
                    } else if (type === '4 BHK - Willow' && property.price) {
                      price = property.price;
                    } else if (type === '5 BHK Triplex') {
                      price = 'Price on Request';
                    } else if (type === '3 BHK') {
                      price = 'From ₹1.65 Cr';
                    } else if (type === '4 BHK - Pine' || type === '5 BHK - Cedar' || type === '5 BHK - Silver Oaks') {
                      price = 'Price on Request';
                    }
                    
                    return (
                      <li key={index}>
                        <strong className="text-white">{type} ({size}):</strong> {price}
                      </li>
                    );
                  })}
                </ul>
              )}
              {property.projectDetails.currentAvailability && (
                <div className="mt-6 pt-6 border-t border-nh-copper/20">
                  {property.slug === 'embassy-grove' && (
                    <>
                      <p className="text-white font-semibold mb-2">Special Units:</p>
                      <ul className="space-y-2 text-gray-300 mb-4">
                        <li>• KGA-facing units: Premium pricing</li>
                        <li>• Non-KGA units: Available at attractive rates</li>
                      </ul>
                    </>
                  )}
                  {property.slug !== 'embassy-springs' && (
                    <>
                      <p className="text-white font-semibold mb-2">Current Availability:</p>
                      <p className="text-gray-300">{property.projectDetails.currentAvailability}</p>
                    </>
                  )}
                  {property.slug === 'embassy-one-four-seasons' && property.projectDetails.fourSeasonsServices && (
                    <div className="mt-4 pt-4 border-t border-nh-copper/20">
                      <p className="text-white font-semibold mb-2">Four Seasons Services:</p>
                      <p className="text-gray-300 text-sm">{property.projectDetails.fourSeasonsServices}</p>
                    </div>
                  )}
                  {property.slug === 'embassy-springs' && property.projectDetails.specialNotes && (
                    <div className="mt-6 pt-6 border-t border-nh-copper/20">
                      <p className="text-white font-semibold mb-3">Special Notes:</p>
                      <p className="text-gray-300 text-sm whitespace-pre-line">{property.projectDetails.specialNotes}</p>
                    </div>
                  )}
                </div>
              )}
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
    <div>
      {/* Section 1: Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <img
          src={property.images.hero}
          alt={property.name}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          onError={(e) => {
            e.target.src = fallbackImage001;
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-nh-charcoal/60"></div>

        {/* Content */}
        <div className="container mx-auto px-6 md:px-4 text-center relative z-10 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-4 drop-shadow-2xl">
              {property.name}
            </h1>
            <p className="text-lg md:text-xl text-nh-cream mb-4">{property.tagline}</p>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Quick Overview */}
      <section className="bg-nh-charcoal py-12 border-b border-nh-copper/20">
        <div className="container mx-auto px-6 md:px-4">
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
                    <p className="text-gray-400 text-xs">{property.projectDetails.unitTypes.includes('Triplex') ? 'Triplex Available' : property.projectDetails.unitTypes.includes('Penthouse') ? 'Penthouses Available' : 'Units Available'}</p>
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
        <div className="container mx-auto px-6 md:px-4 w-full">
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
            const previousPage = location.pathname;
            navigate(`/thank-you?form=contact&from=${encodeURIComponent(previousPage)}`);
          }}
        />
      </Modal>

      {/* Book Site Visit Modal */}
      <Modal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        title="Book a Site Visit"
      >
        <BookSiteVisitForm 
          propertyInterest={property.name} 
          onSuccess={() => {
            setIsBookingModalOpen(false);
            const previousPage = location.pathname;
            navigate(`/thank-you?form=site-visit&from=${encodeURIComponent(previousPage)}`);
          }}
        />
      </Modal>

      {/* Floating Book Site Visit Button */}
      <div className="fixed bottom-4 left-0 right-0 z-40 flex justify-center md:bottom-6">
        <div className="w-auto">
          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="inline-flex items-center justify-center w-auto bg-black border border-nh-copper text-nh-copper hover:bg-nh-charcoal hover:border-nh-orange hover:text-nh-orange px-3 py-2 md:px-6 md:py-3 text-sm md:text-lg font-heading font-semibold shadow-lg rounded-lg transition-all duration-300"
          >
            <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1.5 md:mr-2" />
            Visit Property
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
