
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { Quote } from 'lucide-react';
import { useState, useEffect } from 'react';

const Testimonials = () => {
  const titleRef = useScrollAnimation();
  const subtitleRef = useScrollAnimation({ delay: 200 });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Auto-advance testimonials
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background with Nigerian landmark silhouette */}
      <div className="absolute top-0 left-0 w-full h-full bg-law-charcoal opacity-80 z-0">
        <div className="w-full h-full opacity-10 bg-[url('https://images.unsplash.com/photo-1588773846628-13fce0a04f20?q=80&w=2000')] bg-cover bg-center bg-fixed"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-title" ref={titleRef as React.RefObject<HTMLHeadingElement>}>
            Client Testimonials
          </h2>
          <p className="section-subtitle mx-auto" ref={subtitleRef as React.RefObject<HTMLParagraphElement>}>
            Hear what our clients have to say about our services
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ease-in-out ${
                  activeIndex === index 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 absolute top-0 translate-x-20'
                }`}
              >
                <div className="glass-card p-8 md:p-10 rounded-xl relative">
                  <Quote className="text-law-gold absolute top-6 left-6 opacity-20" size={48} />
                  
                  <blockquote className="text-white text-lg md:text-xl italic relative z-10 mb-6">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-law-gold">
                      <div className="w-full h-full bg-law-gold/30"></div>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{testimonial.name}</h4>
                      <p className="text-white/70 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index ? 'bg-law-gold w-8' : 'bg-white/30'
                }`}
                aria-label={`View testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const testimonials = [
  {
    quote: "EJ Eweke & Co provided exceptional legal counsel during our corporate restructuring. Their knowledge of Nigerian business law was invaluable, and their strategic approach helped us navigate complex regulatory challenges.",
    name: "Adebayo Johnson",
    role: "CEO, Pinnacle Investments Ltd"
  },
  {
    quote: "As a foreign investor entering the Nigerian market, I needed counsel who understood local regulations while maintaining international standards. EJ Eweke & Co delivered exactly that with professionalism and attention to detail.",
    name: "Sarah Chen",
    role: "International Business Director"
  },
  {
    quote: "The team at EJ Eweke & Co handled my family's succession planning with sensitivity and expertise. Their knowledge of both customary and statutory law gave us confidence in the solutions they provided.",
    name: "Chioma Nwosu",
    role: "Family Client"
  },
  {
    quote: "When our company faced a complex labor dispute, EJ Eweke personally took charge of our case. His command of Nigerian labor law and litigation strategy resulted in a favorable settlement that protected our business interests.",
    name: "Mohammed Ibrahim",
    role: "HR Director, TechNova Nigeria"
  }
];

export default Testimonials;
