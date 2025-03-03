
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { Building2, BookText, Landmark, Users, Briefcase, GraduationCap, Scale, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const titleRef = useScrollAnimation();
  const subtitleRef = useScrollAnimation({ delay: 200 });

  return (
    <main className="min-h-screen bg-law-dark">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-law-dark/50 z-0"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-cormorant" ref={titleRef as React.RefObject<HTMLHeadingElement>}>
              Our <span className="text-law-gold">Services</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto" ref={subtitleRef as React.RefObject<HTMLParagraphElement>}>
              Comprehensive legal services tailored to your needs
            </p>
          </div>
        </div>
      </section>
      
      {/* Services Overview */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Practice Areas</h2>
            <p className="section-subtitle mx-auto">
              We offer specialized legal expertise across a broad spectrum of practice areas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard 
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                features={service.features}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-law-charcoal relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="section-title">Why Choose Us</h2>
            <p className="section-subtitle mx-auto">
              What sets EJ Eweke & Co apart in the Nigerian legal landscape
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto glass-card p-8">
            <div className="space-y-6">
              <FeatureItem 
                title="Exceptional Legal Expertise"
                description="Our firm combines deep knowledge of Nigerian law with international best practices to deliver superior legal solutions."
              />
              
              <FeatureItem 
                title="Client-Focused Approach"
                description="We prioritize understanding your unique needs and developing strategies tailored to your specific circumstances."
              />
              
              <FeatureItem 
                title="Proven Track Record"
                description="With numerous successful cases across our practice areas, we have established a reputation for delivering results."
              />
              
              <FeatureItem 
                title="Ethical Practice"
                description="We uphold the highest standards of professional ethics and integrity in all our dealings."
              />
              
              <FeatureItem 
                title="Innovative Solutions"
                description="We leverage our creativity and legal knowledge to find innovative approaches to complex legal challenges."
              />
            </div>
            
            <div className="mt-8 text-center">
              <Link 
                to="/contact" 
                className="py-3 px-8 bg-law-gold text-law-dark font-medium rounded-md hover:bg-law-gold/90 transition-all duration-300 inline-flex items-center"
              >
                Schedule a Consultation
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
};

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  delay: number;
}

const ServiceCard = ({ icon, title, description, features, delay }: ServiceCardProps) => {
  const cardRef = useScrollAnimation({ animation: "animate-scale", delay });
  
  return (
    <div 
      className="glass-card h-full group hover:border-law-gold/30 transition-all duration-300"
      ref={cardRef as React.RefObject<HTMLDivElement>}
    >
      <div className="w-14 h-14 rounded-full bg-law-gold/20 flex items-center justify-center mb-6 group-hover:bg-law-gold/30 transition-all duration-300">
        <div className="text-law-gold">
          {icon}
        </div>
      </div>
      <h3 className="text-xl text-white font-medium mb-3 group-hover:text-law-gold transition-colors duration-300">{title}</h3>
      <p className="text-white/70 mb-6">{description}</p>
      
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <div className="mr-2 mt-1 text-law-gold">
              <div className="w-1.5 h-1.5 rounded-full bg-law-gold"></div>
            </div>
            <span className="text-white/80 text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

interface FeatureItemProps {
  title: string;
  description: string;
}

const FeatureItem = ({ title, description }: FeatureItemProps) => {
  const itemRef = useScrollAnimation({ animation: "animate-fade-in" });
  
  return (
    <div 
      className="flex items-start space-x-4"
      ref={itemRef as React.RefObject<HTMLDivElement>}
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-law-gold/20 flex items-center justify-center mt-1">
        <div className="text-law-gold">
          <Scale size={20} />
        </div>
      </div>
      <div>
        <h4 className="text-white font-medium mb-1">{title}</h4>
        <p className="text-white/70">{description}</p>
      </div>
    </div>
  );
};

const services = [
  {
    icon: <Building2 size={28} />,
    title: "Corporate Law",
    description: "Comprehensive legal solutions for businesses at every stage of development.",
    features: [
      "Business incorporation and registration",
      "Mergers and acquisitions",
      "Corporate governance and compliance",
      "Shareholder agreements",
      "Corporate restructuring"
    ]
  },
  {
    icon: <BookText size={28} />,
    title: "Commercial Litigation",
    description: "Strategic advocacy to resolve complex business disputes effectively.",
    features: [
      "Contract disputes",
      "Debt recovery",
      "Banking litigation",
      "Alternative dispute resolution",
      "Enforcement of judgments"
    ]
  },
  {
    icon: <Landmark size={28} />,
    title: "Constitutional Law",
    description: "Expert representation in matters concerning constitutional rights and governance.",
    features: [
      "Fundamental rights enforcement",
      "Constitutional interpretation",
      "Public interest litigation",
      "Administrative law",
      "Electoral disputes"
    ]
  },
  {
    icon: <Users size={28} />,
    title: "Family Law",
    description: "Sensitive guidance through personal and family legal matters.",
    features: [
      "Marriage and divorce proceedings",
      "Child custody and support",
      "Adoption",
      "Inheritance and succession planning",
      "Domestic violence protection"
    ]
  },
  {
    icon: <Briefcase size={28} />,
    title: "Labor Law",
    description: "Protecting rights and ensuring compliance in employment relationships.",
    features: [
      "Employment contracts and policies",
      "Workplace discrimination claims",
      "Collective bargaining",
      "Wrongful termination cases",
      "Labor compliance audits"
    ]
  },
  {
    icon: <Scale size={28} />,
    title: "Criminal Defense",
    description: "Vigorous defense against criminal charges with a focus on client rights.",
    features: [
      "Criminal representation",
      "White-collar crime defense",
      "Fraud investigations",
      "Appeals",
      "Bail applications"
    ]
  },
  {
    icon: <GraduationCap size={28} />,
    title: "Intellectual Property",
    description: "Protecting your creative and business innovations in the marketplace.",
    features: [
      "Patent registration and disputes",
      "Trademark protection",
      "Copyright matters",
      "IP licensing agreements",
      "IP portfolio management"
    ]
  },
  {
    icon: <Globe size={28} />,
    title: "International Law",
    description: "Navigating cross-border legal challenges with global perspective.",
    features: [
      "International business transactions",
      "Cross-border disputes",
      "International arbitration",
      "Foreign investment advice",
      "Immigration matters"
    ]
  },
  {
    icon: <Building2 size={28} />,
    title: "Real Estate & Property",
    description: "Comprehensive legal services for property transactions and disputes.",
    features: [
      "Property acquisition and sales",
      "Land documentation and registration",
      "Landlord-tenant disputes",
      "Construction contracts",
      "Property development agreements"
    ]
  }
];

export default Services;
