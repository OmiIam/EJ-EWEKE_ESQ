
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { Award, BookOpen, Scale, User, Landmark, GraduationCap } from 'lucide-react';

const AboutUs = () => {
  const titleRef = useScrollAnimation();
  const subtitleRef = useScrollAnimation({ delay: 200 });
  const contentRef = useScrollAnimation({ animation: "animate-fade-in-right", delay: 300 });
  const imageRef = useScrollAnimation({ animation: "animate-fade-in-left", delay: 400 });

  return (
    <main className="min-h-screen bg-law-dark">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-law-dark/50 z-0"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-cormorant" ref={titleRef as React.RefObject<HTMLHeadingElement>}>
              About <span className="text-law-gold">Our Firm</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto" ref={subtitleRef as React.RefObject<HTMLParagraphElement>}>
              Learn about our history, our values, and our commitment to excellence in legal practice.
            </p>
          </div>
        </div>
      </section>
      
      {/* Firm History */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2" ref={contentRef as React.RefObject<HTMLDivElement>}>
              <h2 className="section-title">Our History</h2>
              <p className="text-white/80 mb-6">
                EJ Eweke & Co was founded in 2003 by Emmanuel J. Eweke, a distinguished legal practitioner with a vision to establish a law firm that would set new standards in the Nigerian legal landscape. Beginning with a small team of dedicated attorneys, the firm quickly built a reputation for legal excellence and client satisfaction.
              </p>
              <p className="text-white/80 mb-6">
                Over the past two decades, we have grown into one of Nigeria's most respected legal practices, serving a diverse clientele that includes multinational corporations, government agencies, small businesses, and individuals.
              </p>
              <p className="text-white/80">
                Today, under the continued leadership of EJ Eweke, SAN, our firm stands as a testament to our founding principles of integrity, excellence, and commitment to justice.
              </p>
            </div>
            
            <div className="lg:w-1/2" ref={imageRef as React.RefObject<HTMLDivElement>}>
              <div className="glass-card glow-border h-full flex items-center justify-center p-12">
                <div className="relative text-center">
                  <div className="text-law-gold text-8xl font-cormorant font-bold opacity-30">20+</div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
                    <p className="text-white font-medium text-xl mb-2">Years of Excellence</p>
                    <p className="text-white/70 text-sm">Serving clients since 2003</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team */}
      <section className="py-16 md:py-24 bg-law-dark relative overflow-hidden">
        <div className="container mx-auto px-6">
          <h2 className="section-title mb-16 text-center">Meet Our Principal</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3">
                <div className="rounded-lg overflow-hidden border-2 border-law-gold">
                  <img 
                    src="/lovable-uploads/39cab3f2-37d5-47d5-b392-c36d03fff0cb.png" 
                    alt="EJ Eweke" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
              
              <div className="md:w-2/3">
                <h3 className="text-2xl font-semibold text-law-gold mb-2 font-cormorant">
                  Emmanuel J. Eweke, SAN
                </h3>
                <p className="text-white/80 text-sm mb-4">Principal Partner, Senior Advocate of Nigeria</p>
                
                <p className="text-white/80 mb-4">
                  Emmanuel J. Eweke is the founder and Principal Partner of EJ Eweke & Co. With over 25 years of legal experience, he has established himself as one of Nigeria's preeminent attorneys, earning the prestigious rank of Senior Advocate of Nigeria (SAN) in 2015.
                </p>
                
                <p className="text-white/80 mb-6">
                  EJ specializes in corporate law, commercial litigation, and constitutional matters. He has represented clients before Nigeria's highest courts and international tribunals, setting precedents in several landmark cases.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Credential icon={<GraduationCap size={16} />} text="LL.B, University of Lagos" />
                  <Credential icon={<GraduationCap size={16} />} text="BL, Nigerian Law School" />
                  <Credential icon={<GraduationCap size={16} />} text="LL.M, Harvard Law School" />
                  <Credential icon={<Award size={16} />} text="Senior Advocate of Nigeria" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Values */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle mx-auto">
              The principles that guide our practice and client relationships
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ValueCard 
              icon={<Scale size={32} />}
              title="Integrity"
              description="We uphold the highest ethical standards in all our dealings, ensuring transparency and honesty in every client interaction."
            />
            
            <ValueCard 
              icon={<BookOpen size={32} />}
              title="Excellence"
              description="We strive for excellence in every aspect of our practice, from legal research to courtroom advocacy and client communication."
            />
            
            <ValueCard 
              icon={<User size={32} />}
              title="Client-Centered"
              description="Our clients' interests are paramount. We tailor our approach to each client's unique needs and circumstances."
            />
            
            <ValueCard 
              icon={<Landmark size={32} />}
              title="Justice"
              description="We are committed to the pursuit of justice and fair outcomes, regardless of a client's background or resources."
            />
            
            <ValueCard 
              icon={<Award size={32} />}
              title="Professionalism"
              description="We maintain the highest standards of professional conduct, punctuality, and attention to detail in all our work."
            />
            
            <ValueCard 
              icon={<BookOpen size={32} />}
              title="Continuous Learning"
              description="We stay abreast of legal developments and innovations to provide cutting-edge advice and representation."
            />
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
};

interface CredentialProps {
  icon: React.ReactNode;
  text: string;
}

const Credential = ({ icon, text }: CredentialProps) => (
  <div className="bg-white/10 rounded-full px-4 py-1 text-sm text-white/90 flex items-center">
    <span className="mr-2 text-law-gold">{icon}</span>
    {text}
  </div>
);

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ValueCard = ({ icon, title, description }: ValueCardProps) => {
  const cardRef = useScrollAnimation({ animation: "animate-scale" });
  
  return (
    <div 
      className="glass-card flex flex-col items-center text-center p-8 group hover:border-law-gold/30 transition-all duration-300"
      ref={cardRef as React.RefObject<HTMLDivElement>}
    >
      <div className="w-16 h-16 rounded-full bg-law-gold/20 flex items-center justify-center mb-6 group-hover:bg-law-gold/30 transition-all duration-300">
        <div className="text-law-gold">
          {icon}
        </div>
      </div>
      <h3 className="text-xl text-white font-medium mb-4 group-hover:text-law-gold transition-colors duration-300">{title}</h3>
      <p className="text-white/70">{description}</p>
    </div>
  );
};

export default AboutUs;
