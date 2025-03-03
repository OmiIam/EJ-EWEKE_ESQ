
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { Building2, BookText, Landmark, Users, Briefcase, GraduationCap, Scale, Globe } from 'lucide-react';
import { useEffect, useRef } from 'react';

const PracticeAreas = () => {
  const titleRef = useScrollAnimation();
  const subtitleRef = useScrollAnimation({ delay: 200 });
  const scene3DRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Three.js from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.async = true;
    
    script.onload = initialize3DScene;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initialize3DScene = () => {
    if (!scene3DRef.current || !window.THREE) return;
    
    const container = scene3DRef.current;
    
    // Setup
    const scene = new window.THREE.Scene();
    const camera = new window.THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new window.THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    
    // Create a simple courthouse model
    const buildGroup = new window.THREE.Group();
    
    // Base/Steps
    const baseGeometry = new window.THREE.BoxGeometry(5, 0.5, 3);
    const baseMaterial = new window.THREE.MeshStandardMaterial({ color: 0xcccccc });
    const base = new window.THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = -2;
    buildGroup.add(base);
    
    // Pillars
    const createPillar = (x: number, z: number) => {
      const pillarGeometry = new window.THREE.CylinderGeometry(0.2, 0.2, 3, 32);
      const pillarMaterial = new window.THREE.MeshStandardMaterial({ color: 0xD4AF37 });
      const pillar = new window.THREE.Mesh(pillarGeometry, pillarMaterial);
      pillar.position.set(x, -0.25, z);
      return pillar;
    };
    
    // Front pillars
    buildGroup.add(createPillar(-1.8, 1));
    buildGroup.add(createPillar(-0.6, 1));
    buildGroup.add(createPillar(0.6, 1));
    buildGroup.add(createPillar(1.8, 1));
    
    // Roof
    const roofGeometry = new window.THREE.BoxGeometry(5, 0.4, 3);
    const roofMaterial = new window.THREE.MeshStandardMaterial({ color: 0xeeeeee });
    const roof = new window.THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = 1.25;
    buildGroup.add(roof);
    
    // Triangular pediment
    const pedimentShape = new window.THREE.Shape();
    pedimentShape.moveTo(-2.5, 0);
    pedimentShape.lineTo(2.5, 0);
    pedimentShape.lineTo(0, 1);
    pedimentShape.lineTo(-2.5, 0);
    
    const extrudeSettings = {
      steps: 1,
      depth: 2,
      bevelEnabled: false,
    };
    
    const pedimentGeometry = new window.THREE.ExtrudeGeometry(pedimentShape, extrudeSettings);
    const pedimentMaterial = new window.THREE.MeshStandardMaterial({ color: 0xD4AF37 });
    const pediment = new window.THREE.Mesh(pedimentGeometry, pedimentMaterial);
    pediment.position.set(0, 1.45, -0.5);
    pediment.rotation.x = Math.PI / 2;
    buildGroup.add(pediment);
    
    // Main building
    const buildingGeometry = new window.THREE.BoxGeometry(4, 2, 2);
    const buildingMaterial = new window.THREE.MeshStandardMaterial({ color: 0xf5f5f5 });
    const building = new window.THREE.Mesh(buildingGeometry, buildingMaterial);
    building.position.y = 0;
    building.position.z = -0.2;
    buildGroup.add(building);
    
    scene.add(buildGroup);
    
    // Lighting
    const ambientLight = new window.THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight1 = new window.THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight1.position.set(1, 2, 3);
    scene.add(directionalLight1);
    
    const directionalLight2 = new window.THREE.DirectionalLight(0xD4AF37, 0.3);
    directionalLight2.position.set(-1, 1, -2);
    scene.add(directionalLight2);
    
    // Camera positioning
    camera.position.z = 5;
    camera.position.y = 0;
    
    // Mouse interaction for rotation
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;
    
    const handleMouseMove = (event: MouseEvent) => {
      // Get mouse position relative to the container
      const rect = container.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;
      
      // Set target rotation based on mouse position
      targetRotationY = mouseX * 0.5;
      targetRotationX = mouseY * 0.3;
    };
    
    container.addEventListener('mousemove', handleMouseMove);
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Smooth rotation based on mouse position
      buildGroup.rotation.y += (targetRotationY - buildGroup.rotation.y) * 0.05;
      buildGroup.rotation.x += (targetRotationX - buildGroup.rotation.x) * 0.05;
      
      // Add gentle floating animation
      buildGroup.position.y = Math.sin(Date.now() * 0.001) * 0.1;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  };

  return (
    <section id="services" className="py-20 md:py-32 bg-law-dark relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-law-dark to-law-charcoal opacity-80 z-0"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-title" ref={titleRef as React.RefObject<HTMLHeadingElement>}>
            Our Practice Areas
          </h2>
          <p className="section-subtitle mx-auto" ref={subtitleRef as React.RefObject<HTMLParagraphElement>}>
            Comprehensive legal services tailored to the Nigerian legal landscape
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
          <div className="lg:w-1/2 order-2 lg:order-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {practiceAreas.map((area, index) => (
                <PracticeAreaCard 
                  key={index}
                  icon={area.icon}
                  title={area.title}
                  description={area.description}
                  delay={index * 100 + 300}
                />
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2 h-[400px] order-1 lg:order-2" ref={scene3DRef}>
            {/* 3D scene will be rendered here */}
          </div>
        </div>
      </div>
    </section>
  );
};

interface PracticeAreaType {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const practiceAreas: PracticeAreaType[] = [
  {
    icon: <Building2 size={24} />,
    title: "Corporate Law",
    description: "Business incorporation, mergers & acquisitions, corporate governance"
  },
  {
    icon: <Landmark size={24} />,
    title: "Constitutional Law",
    description: "Civil rights, constitutional interpretation and litigation"
  },
  {
    icon: <BookText size={24} />,
    title: "Commercial Litigation",
    description: "Complex commercial disputes, arbitration, debt recovery"
  },
  {
    icon: <Users size={24} />,
    title: "Family Law",
    description: "Marriage, divorce, child custody, inheritance and succession"
  },
  {
    icon: <Briefcase size={24} />,
    title: "Labor Law",
    description: "Employment contracts, workplace disputes, labor compliance"
  },
  {
    icon: <Scale size={24} />,
    title: "Criminal Defense",
    description: "Criminal representation, investigations, white-collar crime"
  },
  {
    icon: <GraduationCap size={24} />,
    title: "Intellectual Property",
    description: "Patents, trademarks, copyrights, IP litigation"
  },
  {
    icon: <Globe size={24} />,
    title: "International Law",
    description: "Cross-border transactions, international arbitration"
  }
];

interface PracticeAreaCardProps extends PracticeAreaType {
  delay: number;
}

const PracticeAreaCard = ({ icon, title, description, delay }: PracticeAreaCardProps) => {
  const cardRef = useScrollAnimation({ animation: "animate-scale", delay });
  
  return (
    <div 
      className="glass-card flex items-start space-x-4 group hover:border-law-gold/30 transition-all duration-300"
      ref={cardRef as React.RefObject<HTMLDivElement>}
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-law-gold/20 flex items-center justify-center group-hover:bg-law-gold/30 transition-all duration-300">
        <div className="text-law-gold">
          {icon}
        </div>
      </div>
      <div>
        <h4 className="text-white font-medium mb-1 group-hover:text-law-gold transition-colors duration-300">{title}</h4>
        <p className="text-white/70 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default PracticeAreas;
