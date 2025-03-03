
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import About from '@/components/About';
import GoogleMap from '@/components/GoogleMap';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const AboutPage = () => {
  const titleRef = useScrollAnimation();
  const mapContainerRef = useScrollAnimation({ animation: "animate-fade-in", delay: 300 });

  return (
    <>
      <Helmet>
        <title>About Us | EJ Eweke & Co</title>
        <meta name="description" content="Learn about EJ Eweke & Co, a premier Nigerian law firm with over two decades of experience in various practice areas." />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-20">
        <About />
        
        <section className="py-20 bg-law-dark relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-law-dark/90 to-law-charcoal/90 z-0"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="section-title" ref={titleRef as React.RefObject<HTMLHeadingElement>}>
                Our Location
              </h2>
              <p className="section-subtitle mx-auto">
                Visit our office in the heart of Lagos, Nigeria
              </p>
            </div>
            
            <div 
              className="glass rounded-xl overflow-hidden h-[500px] glow-border"
              ref={mapContainerRef as React.RefObject<HTMLDivElement>}
            >
              <GoogleMap />
            </div>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="glass-card">
                <h3 className="text-law-gold text-xl font-semibold mb-3">Head Office</h3>
                <p className="text-white/80">
                  EJ Eweke Towers, 25 Bourdillon Road<br />
                  Ikoyi, Lagos, Nigeria
                </p>
              </div>
              
              <div className="glass-card">
                <h3 className="text-law-gold text-xl font-semibold mb-3">Branch Office</h3>
                <p className="text-white/80">
                  15 Aguiyi Ironsi Street<br />
                  Maitama District, Abuja, Nigeria
                </p>
              </div>
              
              <div className="glass-card">
                <h3 className="text-law-gold text-xl font-semibold mb-3">Working Hours</h3>
                <p className="text-white/80">
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 2:00 PM (By appointment)
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default AboutPage;
