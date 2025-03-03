
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PracticeAreas from '@/components/PracticeAreas';

const ServicesPage = () => {
  return (
    <>
      <Helmet>
        <title>Legal Services | EJ Eweke & Co</title>
        <meta name="description" content="Explore our comprehensive legal services at EJ Eweke & Co, covering corporate law, litigation, family law, and more throughout Nigeria." />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-20">
        <PracticeAreas />
        
        <section className="py-20 bg-gradient-to-b from-law-dark to-law-charcoal relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="glass rounded-xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-law-gold mb-6 font-cormorant">Our Approach</h2>
              <p className="text-white/80 mb-8">
                At EJ Eweke & Co, we approach each case with meticulous attention to detail and a commitment to excellence. Our legal strategies are tailored to the unique circumstances of each client, ensuring the best possible outcomes.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="glass-card">
                  <h3 className="text-xl text-white font-medium mb-4">Client-Centered</h3>
                  <p className="text-white/70">
                    We prioritize understanding our clients' needs and objectives, maintaining clear communication throughout the legal process.
                  </p>
                </div>
                
                <div className="glass-card">
                  <h3 className="text-xl text-white font-medium mb-4">Innovative Solutions</h3>
                  <p className="text-white/70">
                    Our team develops creative and effective legal strategies that address complex challenges across various practice areas.
                  </p>
                </div>
                
                <div className="glass-card">
                  <h3 className="text-xl text-white font-medium mb-4">Ethical Practice</h3>
                  <p className="text-white/70">
                    We maintain the highest standards of professional ethics and integrity in all our dealings with clients and legal proceedings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default ServicesPage;
