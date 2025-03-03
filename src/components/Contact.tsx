
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const Contact = () => {
  const titleRef = useScrollAnimation();
  const subtitleRef = useScrollAnimation({ delay: 200 });
  const formRef = useScrollAnimation({ animation: "animate-fade-in-right", delay: 300 });
  const infoRef = useScrollAnimation({ animation: "animate-fade-in-left", delay: 400 });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Thank you for your message. We'll contact you shortly.", {
        description: "Your inquiry has been received by our legal team.",
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-law-dark relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute top-0 left-0 w-full h-full z-0 opacity-30">
        <div className="w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(212,175,55,0.1)_25%,rgba(212,175,55,0.1)_50%,transparent_50%,transparent_75%,rgba(212,175,55,0.1)_75%,rgba(212,175,55,0.1))] bg-[length:20px_20px]"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-title" ref={titleRef as React.RefObject<HTMLHeadingElement>}>
            Contact Us
          </h2>
          <p className="section-subtitle mx-auto" ref={subtitleRef as React.RefObject<HTMLParagraphElement>}>
            Get in touch with our legal team for expert consultation
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row items-start gap-12">
          <div className="lg:w-7/12" ref={formRef as React.RefObject<HTMLDivElement>}>
            <div className="glass rounded-xl p-8">
              <h3 className="text-2xl text-white font-semibold mb-6 font-cormorant">
                Request a Consultation
              </h3>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-white mb-2 text-sm font-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-law-gold/50 focus:ring-1 focus:ring-law-gold/50 transition-all"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-white mb-2 text-sm font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-law-gold/50 focus:ring-1 focus:ring-law-gold/50 transition-all"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-white mb-2 text-sm font-medium">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-law-gold/50 focus:ring-1 focus:ring-law-gold/50 transition-all"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-white mb-2 text-sm font-medium">
                      Legal Matter
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-law-gold/50 focus:ring-1 focus:ring-law-gold/50 transition-all"
                      required
                    >
                      <option value="" disabled className="bg-law-dark">Select a practice area</option>
                      <option value="Corporate Law" className="bg-law-dark">Corporate Law</option>
                      <option value="Commercial Litigation" className="bg-law-dark">Commercial Litigation</option>
                      <option value="Family Law" className="bg-law-dark">Family Law</option>
                      <option value="Labor Law" className="bg-law-dark">Labor Law</option>
                      <option value="Criminal Defense" className="bg-law-dark">Criminal Defense</option>
                      <option value="Other" className="bg-law-dark">Other Legal Matters</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-white mb-2 text-sm font-medium">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-law-gold/50 focus:ring-1 focus:ring-law-gold/50 transition-all"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="py-3 px-8 bg-law-gold text-law-dark font-medium rounded-md hover:bg-law-gold/90 transition-all duration-300 flex items-center justify-center disabled:opacity-70"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-law-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Send Message
                      <Send size={16} className="ml-2" />
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>
          
          <div className="lg:w-5/12" ref={infoRef as React.RefObject<HTMLDivElement>}>
            <div className="glass rounded-xl p-8 mb-6">
              <h3 className="text-2xl text-white font-semibold mb-6 font-cormorant">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <ContactInfo 
                  icon={<Phone size={20} />}
                  title="Phone"
                  details={["+234 801 234 5678", "+234 902 345 6789"]}
                />
                
                <ContactInfo 
                  icon={<Mail size={20} />}
                  title="Email"
                  details={["info@ejeweke.com", "consultation@ejeweke.com"]}
                />
                
                <ContactInfo 
                  icon={<MapPin size={20} />}
                  title="Office Address"
                  details={[
                    "EJ Eweke Towers, 25 Bourdillon Road",
                    "Ikoyi, Lagos, Nigeria"
                  ]}
                />
                
                <ContactInfo 
                  icon={<Clock size={20} />}
                  title="Business Hours"
                  details={[
                    "Monday - Friday: 9:00 AM - 6:00 PM",
                    "Saturday: 10:00 AM - 2:00 PM (By appointment)"
                  ]}
                />
              </div>
            </div>
            
            <div className="glass rounded-xl p-8">
              <h3 className="text-xl text-white font-semibold mb-4 font-cormorant">
                Emergency Legal Assistance
              </h3>
              <p className="text-white/80 text-sm mb-4">
                For urgent legal matters outside business hours, please call our 24/7 emergency line.
              </p>
              <a 
                href="tel:+2349012345678" 
                className="py-2 px-4 bg-law-burgundy text-white font-medium rounded-md hover:bg-law-burgundy/90 transition-all duration-300 flex items-center justify-center w-full"
              >
                <Phone size={16} className="mr-2" />
                +234 901 234 5678
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface ContactInfoProps {
  icon: React.ReactNode;
  title: string;
  details: string[];
}

const ContactInfo = ({ icon, title, details }: ContactInfoProps) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-law-gold/20 flex items-center justify-center">
      <div className="text-law-gold">
        {icon}
      </div>
    </div>
    <div>
      <h4 className="text-white font-medium mb-1">{title}</h4>
      {details.map((detail, index) => (
        <p key={index} className="text-white/70 text-sm">{detail}</p>
      ))}
    </div>
  </div>
);

export default Contact;
