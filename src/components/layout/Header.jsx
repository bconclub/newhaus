import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Properties', path: '/properties' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1
              className={`text-2xl md:text-3xl font-heading font-bold transition-colors ${
                isScrolled ? 'text-nh-charcoal' : 'text-white'
              }`}
            >
              New<span className="text-nh-copper">Haus</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-nh-copper'
                    : isScrolled
                    ? 'text-nh-charcoal hover:text-nh-copper'
                    : 'text-white hover:text-nh-copper'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="bg-nh-copper text-white px-6 py-2 rounded-md hover:bg-nh-orange transition-colors"
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden ${
              isScrolled ? 'text-nh-charcoal' : 'text-white'
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 bg-white rounded-lg shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 transition-colors ${
                  location.pathname === link.path
                    ? 'text-nh-copper bg-nh-cream'
                    : 'text-nh-charcoal hover:bg-nh-cream'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="block mx-4 mt-2 text-center bg-nh-copper text-white px-6 py-3 rounded-md hover:bg-nh-orange transition-colors"
            >
              Get Started
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
