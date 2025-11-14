import { Link } from 'react-router-dom';
import { MapPin, Tag } from 'lucide-react';
import Button from './Button';

const PropertyCard = ({ property }) => {
  return (
    <div className="bg-nh-grey rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border border-nh-copper/20 h-full flex flex-col">
      {/* Image */}
      <Link to={`/properties/${property.slug}`} className="block relative overflow-hidden flex-shrink-0">
        <div className="aspect-[4/3] bg-nh-cream">
          <img
            src={property.images.hero}
            alt={property.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              e.target.src = `https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop`;
            }}
          />
        </div>
        {property.featured && (
          <span className="absolute top-4 right-4 bg-nh-copper text-white px-3 py-1 rounded-full text-xs font-semibold">
            Featured
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <Link to={`/properties/${property.slug}`}>
          <h3 className="text-2xl font-heading font-bold text-white mb-2 group-hover:text-nh-copper transition-colors">
            {property.name}
          </h3>
        </Link>

        <p className="text-sm text-gray-300 mb-3">{property.tagline}</p>

        <div className="flex items-center text-sm text-gray-300 mb-4">
          <MapPin size={16} className="mr-1 text-nh-copper" />
          <span>{property.location}</span>
        </div>

        <div className="flex items-center text-lg font-bold text-white mb-4">
          <Tag size={18} className="mr-2 text-nh-copper" />
          <span>{property.price}</span>
        </div>

        {/* Highlights */}
        <ul className="space-y-2 mb-6 flex-grow">
          {property.highlights.map((highlight, index) => (
            <li key={index} className="flex items-center text-sm text-gray-300">
              <span className="w-1.5 h-1.5 bg-nh-copper rounded-full mr-2"></span>
              {highlight}
            </li>
          ))}
        </ul>

        <Button to={`/properties/${property.slug}`} className="w-full mt-auto">
          View Details
        </Button>
      </div>
    </div>
  );
};

export default PropertyCard;
