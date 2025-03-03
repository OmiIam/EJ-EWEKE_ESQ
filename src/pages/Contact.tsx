
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | EJ Eweke & Co</title>
        <meta name="description" content="Get in touch with EJ Eweke & Co's legal team for expert consultation on various legal matters in Nigeria." />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-20">
        <Contact />
      </main>
      
      <Footer />
    </>
  );
};

export default ContactPage;
