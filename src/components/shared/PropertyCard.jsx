import { Link } from 'react-router-dom';
import { MapPin, Tag } from 'lucide-react';
import Button from './Button';
import fallbackImage002 from '../../assets/New Haus 002.webp';

const PropertyCard = ({ property }) => {
  return (
    <div className="bg-nh-grey rounded-[25px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border border-nh-copper/20 h-full flex flex-col">
      {/* Image */}
      <Link to={`/properties/${property.slug}`} className="block relative overflow-hidden flex-shrink-0">
        <div className="aspect-[4/3] bg-nh-cream">
          <img
            src={property.images.hero}
            alt={property.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              e.target.src = fallbackImage002;
            }}
          />
        </div>
        {property.featured && (
          <span className="absolute top-3 right-3 bg-nh-copper text-white px-2.5 py-1 rounded-full text-xs font-semibold">
            Featured
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <Link to={`/properties/${property.slug}`}>
          <h3 className="text-xl font-heading font-bold text-white mb-1.5 group-hover:text-nh-copper transition-colors">
            {property.name}
          </h3>
        </Link>

        <p className="text-xs text-gray-300 mb-2">{property.tagline}</p>

        <div className="flex items-center text-xs text-gray-300 mb-3">
          <MapPin size={14} className="mr-1 text-nh-copper" />
          <span>{property.location}</span>
        </div>

        <div className="flex items-center text-base font-bold text-white mb-3">
          <Tag size={16} className="mr-2 text-nh-copper" />
          <span>{property.price}</span>
        </div>

        {/* Highlights */}
        <ul className="space-y-1.5 mb-4 flex-grow">
          {property.highlights.slice(0, 3).map((highlight, index) => (
            <li key={index} className="flex items-center text-xs text-gray-300">
              <span className="w-1.5 h-1.5 bg-nh-copper rounded-full mr-2"></span>
              {highlight}
            </li>
          ))}
        </ul>

        <Button to={`/properties/${property.slug}`} className="w-full mt-auto text-sm py-2">
          View Details
        </Button>
      </div>
    </div>
  );
};

export default PropertyCard;
