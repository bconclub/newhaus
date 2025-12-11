import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import logoImage from '../../assets/Newhaus logo.webp';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Properties', path: '/properties' },
    { name: 'Contact', path: '/contact' },
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Facebook, href: '#', label: 'Facebook' },
  ];

  return (
    <footer className="bg-nh-charcoal text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Branding */}
          <div>
            <img
              src={logoImage}
              alt="NewHaus"
              className="h-20 mb-4 w-auto"
            />
            <p className="text-nh-cream text-sm">
              Curating Exceptional Homes in Bangalore
            </p>
          </div>

          {/* Middle Column - Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-nh-copper">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-nh-cream hover:text-nh-copper transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-nh-copper">
              Get in Touch
            </h3>
            <ul className="space-y-3 text-nh-cream text-sm">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-nh-copper" />
                <a href="tel:+919632004011" className="hover:text-nh-copper transition-colors">
                  +91 96320 04011
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-nh-copper" />
                <a href="mailto:Contact@newhaus.in" className="hover:text-nh-copper transition-colors">
                  Contact@newhaus.in
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-nh-copper mt-1 flex-shrink-0" />
                <span>Balaji Building, Shop No 4, 1st Floor, Hennur Bagalur Main Rd, above Ammas Bakery, Kothanur, Bengaluru, Karnataka 560077</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section - Social Media & Copyright */}
        <div className="border-t border-nh-grey mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex gap-4 mb-4 md:mb-0">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-nh-cream hover:text-nh-copper transition-colors"
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>

          <p className="text-nh-cream text-sm">
            © {currentYear} NewHaus. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
