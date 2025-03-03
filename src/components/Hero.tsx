
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Three.js from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.async = true;
    
    script.onload = initThreeJS;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initThreeJS = () => {
    if (!canvasRef.current || !containerRef.current || !window.THREE) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    
    // Setup
    const scene = new window.THREE.Scene();
    const camera = new window.THREE.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new window.THREE.WebGLRenderer({ 
      canvas, 
      alpha: true, 
      antialias: true 
    });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create particles
    const particlesGeometry = new window.THREE.BufferGeometry();
    const count = 2000;
    
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count * 3; i += 3) {
      // Positions (slightly behind camera and more to the bottom right)
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10 - 1;
      positions[i + 2] = (Math.random() - 0.5) * 10 - 3;
      
      // Gold color with variations
      colors[i] = 0.83 + Math.random() * 0.17; // R (gold)
      colors[i + 1] = 0.68 + Math.random() * 0.12; // G (gold)
      colors[i + 2] = 0.21 + Math.random() * 0.09; // B (gold)
    }
    
    particlesGeometry.setAttribute('position', new window.THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new window.THREE.BufferAttribute(colors, 3));
    
    const particlesMaterial = new window.THREE.PointsMaterial({
      size: 0.02,
      sizeAttenuation: true,
      transparent: true,
      alphaMap: null,
      depthWrite: false,
      blending: window.THREE.AdditiveBlending,
      vertexColors: true
    });
    
    const particles = new window.THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Camera positioning
    camera.position.z = 5;
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation
    const animate = () => {
      const animationId = requestAnimationFrame(animate);
      
      targetX = mouseX * 0.1;
      targetY = mouseY * 0.1;
      
      particles.rotation.y += 0.002;
      particles.rotation.x += 0.001;
      
      particles.rotation.y += (targetX - particles.rotation.y) * 0.05;
      particles.rotation.x += (targetY - particles.rotation.x) * 0.05;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden" ref={containerRef}>
      {/* 3D Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full -z-10"
      />
      
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-law-dark/50 -z-10"></div>
      
      {/* Content */}
      <div className="container mx-auto px-6 py-32 md:py-28 z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-7/12 space-y-6 text-center md:text-left mb-12 md:mb-0">
            <h2 className="inline-block text-sm bg-law-gold/20 border border-law-gold/30 px-3 py-1 rounded-full text-law-gold uppercase tracking-wider">
              Premier Legal Services
            </h2>
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold text-white leading-tight">
              Excellence in <br className="hidden md:block" /><span className="text-law-gold">Nigerian</span> Legal Practice
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-xl mx-auto md:mx-0">
              Providing expert legal counsel and dedicated representation across various practice areas with a commitment to justice and client success.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
              <Link
                to="/contact"
                className="py-3 px-8 bg-law-gold text-law-dark font-medium rounded-md hover:bg-law-gold/90 transition-all duration-300 flex items-center justify-center"
              >
                Consult Now
                <ChevronRight size={16} className="ml-1" />
              </Link>
              <Link
                to="/services"
                className="py-3 px-8 bg-transparent text-white border border-white/30 rounded-md hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
              >
                Our Services
              </Link>
            </div>
          </div>
          
          <div className="md:w-5/12 relative">
            <div className="glass rounded-xl p-6 animate-float glow-border">
              <h3 className="text-law-gold text-2xl font-semibold mb-2">EJ Eweke & Co</h3>
              <p className="text-white/90 mb-4">
                A forward-thinking legal practice delivering excellence in Nigerian and international law.
              </p>
              <div className="flex items-center space-x-3 text-white/80">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-law-gold/20">
                  <span className="text-law-gold font-semibold">20+</span>
                </div>
                <span>Years of Legal Excellence</span>
              </div>
            </div>
            
            <div className="glass rounded-xl p-6 absolute -bottom-10 -right-4 w-3/4 animate-float animation-delay-1000 glow-border">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-6 h-6 rounded-full bg-green-500"></div>
                <span className="text-white">Available for Consultation</span>
              </div>
              <a 
                href="tel:+2348012345678"
                className="text-law-gold hover:underline"
              >
                +234 801 234 5678
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
