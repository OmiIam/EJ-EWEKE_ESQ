
import { Link } from 'react-router-dom';
import { ChevronRight, Twitter, Linkedin, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-law-charcoal relative">
      {/* Gold accent line */}
      <div className="h-1 bg-law-gold w-full"></div>
      
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="flex items-center space-x-2 group mb-6">
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
            
            <p className="text-white/70 text-sm mb-6">
              A premier Nigerian law firm committed to excellence in legal service delivery and client satisfaction.
            </p>
            
            <div className="flex space-x-4">
              <SocialLink href="https://twitter.com" icon={<Twitter size={18} />} />
              <SocialLink href="https://linkedin.com" icon={<Linkedin size={18} />} />
              <SocialLink href="https://facebook.com" icon={<Facebook size={18} />} />
              <SocialLink href="https://instagram.com" icon={<Instagram size={18} />} />
            </div>
          </div>
          
          <div>
            <h4 className="text-white text-lg font-medium mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/services">Practice Areas</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white text-lg font-medium mb-6">Legal Services</h4>
            <ul className="space-y-3">
              <FooterLink to="/services">Corporate Law</FooterLink>
              <FooterLink to="/services">Commercial Litigation</FooterLink>
              <FooterLink to="/services">Family Law</FooterLink>
              <FooterLink to="/services">Labor Law</FooterLink>
              <FooterLink to="/services">Criminal Defense</FooterLink>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white text-lg font-medium mb-6">Contact Information</h4>
            <address className="text-white/70 text-sm not-italic space-y-3">
              <p>EJ Eweke Towers, 25 Bourdillon Road, Ikoyi, Lagos, Nigeria</p>
              <p>
                <a href="tel:+2348012345678" className="hover:text-law-gold transition-colors">
                  +234 801 234 5678
                </a>
              </p>
              <p>
                <a href="mailto:info@ejeweke.com" className="hover:text-law-gold transition-colors">
                  info@ejeweke.com
                </a>
              </p>
            </address>
          </div>
        </div>
        
        <hr className="border-white/10 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-white/60 text-sm">
            © {currentYear} EJ Eweke & Co. All rights reserved.
          </p>
          
          <div className="flex space-x-6 text-sm text-white/60">
            <Link to="/terms" className="hover:text-law-gold transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-law-gold transition-colors">Privacy Policy</Link>
            <Link to="/disclaimer" className="hover:text-law-gold transition-colors">Legal Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
}

const SocialLink = ({ href, icon }: SocialLinkProps) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-law-gold hover:text-law-dark transition-all duration-300"
  >
    {icon}
  </a>
);

interface FooterLinkProps {
  to: string;
  children: React.ReactNode;
}

const FooterLink = ({ to, children }: FooterLinkProps) => (
  <li>
    <Link 
      to={to} 
      className="text-white/70 hover:text-law-gold transition-colors duration-300 flex items-center"
    >
      <ChevronRight size={16} className="mr-2 text-law-gold" />
      {children}
    </Link>
  </li>
);

export default Footer;
