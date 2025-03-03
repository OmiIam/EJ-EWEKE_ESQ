
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 bg-law-dark/90 backdrop-blur-lg shadow-lg' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 group"
        >
          <div className="w-10 h-10 flex items-center justify-center bg-law-gold/80 text-law-dark rounded-sm transition-all duration-300 group-hover:bg-law-gold">
            <span className="font-cormorant text-xl font-bold">EJ</span>
          </div>
          <div>
            <h1 className="font-cormorant text-xl font-bold text-white group-hover:text-law-gold transition-colors duration-300">
              EJ Eweke <span className="text-law-gold group-hover:text-white transition-colors duration-300">&</span> Co
            </h1>
            <p className="text-xs text-white/70 -mt-1 tracking-wider">LEGAL PRACTITIONERS</p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLink to="/" active={location.pathname === '/'}>Home</NavLink>
          <NavLink to="/about" active={location.pathname === '/about'}>About</NavLink>
          <NavLink to="/services" active={location.pathname === '/services'}>Services</NavLink>
          <NavLink to="/contact" active={location.pathname === '/contact'}>Contact</NavLink>
          <a 
            href="tel:+2348012345678" 
            className="py-2 px-4 bg-law-gold text-law-dark font-medium rounded hover:bg-law-gold/90 transition-all duration-300"
          >
            Call Now
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X size={24} className="text-law-gold" />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden glass absolute top-full left-0 w-full transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
          <MobileNavLink to="/" active={location.pathname === '/'}>Home</MobileNavLink>
          <MobileNavLink to="/about" active={location.pathname === '/about'}>About</MobileNavLink>
          <MobileNavLink to="/services" active={location.pathname === '/services'}>Services</MobileNavLink>
          <MobileNavLink to="/contact" active={location.pathname === '/contact'}>Contact</MobileNavLink>
          <a 
            href="tel:+2348012345678" 
            className="py-3 px-4 bg-law-gold text-law-dark font-medium rounded text-center hover:bg-law-gold/90 transition-all duration-300"
          >
            Call Now
          </a>
        </div>
      </div>
    </nav>
  );
};

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink = ({ to, active, children }: NavLinkProps) => (
  <Link 
    to={to} 
    className={`relative font-medium transition-colors duration-300 hover:text-law-gold ${
      active ? 'text-law-gold' : 'text-white'
    }`}
  >
    {children}
    <span 
      className={`absolute left-0 -bottom-1 w-full h-0.5 bg-law-gold transform origin-left transition-transform duration-300 ${
        active ? 'scale-x-100' : 'scale-x-0'
      }`}
    ></span>
  </Link>
);

const MobileNavLink = ({ to, active, children }: NavLinkProps) => (
  <Link 
    to={to} 
    className={`py-2 px-4 rounded font-medium transition-colors duration-300 ${
      active 
        ? 'bg-law-gold/20 text-law-gold' 
        : 'text-white hover:bg-white/5 hover:text-law-gold'
    }`}
  >
    {children}
  </Link>
);

export default Navbar;
