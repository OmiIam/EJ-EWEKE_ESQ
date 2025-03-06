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
    
    const scene = new window.THREE.Scene();
    const camera = new window.THREE.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new window.THREE.WebGLRenderer({ 
      canvas, 
      alpha: true, 
      antialias: true,
      logarithmicDepthBuffer: true
    });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create enhanced particles with depth and glow
    const particlesGeometry = new window.THREE.BufferGeometry();
    const count = 3000;
    
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count * 3; i += 3) {
      // Create a spiral pattern
      const radius = Math.random() * 5 + 3;
      const angle = (i / count) * Math.PI * 20;
      const y = (Math.random() - 0.5) * 10;
      
      positions[i] = Math.cos(angle) * radius;
      positions[i + 1] = y;
      positions[i + 2] = Math.sin(angle) * radius;
      
      // Gold color variations
      colors[i] = 0.83 + Math.random() * 0.17;
      colors[i + 1] = 0.68 + Math.random() * 0.12;
      colors[i + 2] = 0.21 + Math.random() * 0.09;
      
      // Varied sizes for depth
      sizes[i / 3] = Math.random() * 0.1 + 0.02;
    }
    
    particlesGeometry.setAttribute('position', new window.THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new window.THREE.BufferAttribute(colors, 3));
    particlesGeometry.setAttribute('size', new window.THREE.BufferAttribute(sizes, 1));
    
    // Create custom shader material for enhanced particles
    const particlesMaterial = new window.THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: window.THREE.AdditiveBlending,
      vertexColors: true,
      uniforms: {
        time: { value: 0 },
        pixelRatio: { value: renderer.getPixelRatio() }
      },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        uniform float time;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * 1500.0 / -mvPosition.z;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          
          float alpha = 1.0 - smoothstep(0.4, 0.5, dist);
          gl_FragColor = vec4(vColor, alpha);
        }
      `
    });
    
    const particles = new window.THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Create floating Nigerian symbols
    const symbolsGroup = new window.THREE.Group();
    const symbolGeometries = [
      new window.THREE.TorusKnotGeometry(0.3, 0.1, 64, 8),
      new window.THREE.IcosahedronGeometry(0.4, 1),
      new window.THREE.OctahedronGeometry(0.3, 0)
    ];
    
    for (let i = 0; i < 5; i++) {
      const geometry = symbolGeometries[Math.floor(Math.random() * symbolGeometries.length)];
      const material = new window.THREE.MeshPhysicalMaterial({
        color: 0xD4AF37,
        metalness: 0.7,
        roughness: 0.2,
        clearcoat: 1.0,
        clearcoatRoughness: 0.4
      });
      
      const symbol = new window.THREE.Mesh(geometry, material);
      symbol.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      symbolsGroup.add(symbol);
    }
    
    scene.add(symbolsGroup);
    
    // Add lighting
    const ambientLight = new window.THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const directionalLight = new window.THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    const goldLight = new window.THREE.PointLight(0xD4AF37, 1, 10);
    goldLight.position.set(-2, 2, 2);
    scene.add(goldLight);
    
    camera.position.z = 5;
    
    // Animation
    const clock = new window.THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Update particle material time uniform
      particlesMaterial.uniforms.time.value = elapsedTime;
      
      // Rotate particles
      particles.rotation.y = elapsedTime * 0.05;
      
      // Animate symbols
      symbolsGroup.children.forEach((symbol, i) => {
        symbol.rotation.x = elapsedTime * 0.2 + i;
        symbol.rotation.y = elapsedTime * 0.3 + i;
        symbol.position.y = Math.sin(elapsedTime + i) * 0.5;
      });
      
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
