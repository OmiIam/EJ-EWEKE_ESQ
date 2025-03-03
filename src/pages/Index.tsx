
import Hero from '@/components/Hero';
import About from '@/components/About';
import PracticeAreas from '@/components/PracticeAreas';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const Index = () => {
  return (
    <main className="min-h-screen bg-law-dark">
      <Navbar />
      <Hero />
      <About />
      <PracticeAreas />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
