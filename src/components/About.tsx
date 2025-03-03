
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { Award, BookOpen, Scale, Clock } from 'lucide-react';

const About = () => {
  const titleRef = useScrollAnimation();
  const subtitleRef = useScrollAnimation({ delay: 200 });
  const imageRef = useScrollAnimation({ animation: "animate-fade-in-right", delay: 300 });
  const contentRef = useScrollAnimation({ animation: "animate-fade-in-left", delay: 400 });

  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/lovable-uploads/39cab3f2-37d5-47d5-b392-c36d03fff0cb.png')] bg-cover bg-center opacity-5 z-0"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-title" ref={titleRef as React.RefObject<HTMLHeadingElement>}>
            About EJ Eweke & Co
          </h2>
          <p className="section-subtitle mx-auto" ref={subtitleRef as React.RefObject<HTMLParagraphElement>}>
            A distinguished legal practice committed to excellence and integrity in service delivery
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-5/12" ref={imageRef as React.RefObject<HTMLDivElement>}>
            <div className="relative">
              <div className="glass-card rounded-lg overflow-hidden glow-border">
                <img 
                  src="/lovable-uploads/39cab3f2-37d5-47d5-b392-c36d03fff0cb.png" 
                  alt="EJ Eweke, Principal Partner" 
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="glass absolute -bottom-6 -right-6 p-4 rounded-lg">
                <p className="text-law-gold font-cormorant text-2xl font-semibold">EJ Eweke</p>
                <p className="text-white/80 text-sm">Principal Partner, SAN</p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-7/12" ref={contentRef as React.RefObject<HTMLDivElement>}>
            <h3 className="text-3xl text-white font-semibold mb-4 font-cormorant">
              A Legacy of Legal Excellence in Nigeria
            </h3>
            
            <p className="text-white/80 mb-6">
              EJ Eweke & Co is a premier law firm in Nigeria established to provide comprehensive legal services with the highest standards of professional ethics and excellence. Led by EJ Eweke, a Senior Advocate of Nigeria (SAN), our practice combines deep local insights with international best practices.
            </p>
            
            <p className="text-white/80 mb-8">
              With over two decades of experience in Nigerian courts and international tribunals, we have built a reputation for thorough preparation, strategic thinking, and unwavering commitment to our clients' best interests.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StatCard 
                icon={<Scale className="text-law-gold" size={24} />}
                title="Legal Excellence"
                description="Committed to the highest standards in legal practice and client service"
              />
              
              <StatCard 
                icon={<BookOpen className="text-law-gold" size={24} />}
                title="Specialized Knowledge"
                description="Deep expertise across various practice areas of Nigerian law"
              />
              
              <StatCard 
                icon={<Award className="text-law-gold" size={24} />}
                title="Recognized Expertise"
                description="Led by a Senior Advocate of Nigeria with national recognition"
              />
              
              <StatCard 
                icon={<Clock className="text-law-gold" size={24} />}
                title="20+ Years Experience"
                description="Decades of successful representation in complex legal matters"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const StatCard = ({ icon, title, description }: StatCardProps) => (
  <div className="glass-card flex items-start space-x-4">
    <div className="flex-shrink-0">
      {icon}
    </div>
    <div>
      <h4 className="text-white font-medium mb-1">{title}</h4>
      <p className="text-white/70 text-sm">{description}</p>
    </div>
  </div>
);

export default About;
