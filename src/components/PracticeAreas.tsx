import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { Building2, BookText, Landmark, Users, Briefcase, GraduationCap, Scale, Globe } from 'lucide-react';
import { useEffect, useRef } from 'react';

const PracticeAreas = () => {
  const titleRef = useScrollAnimation();
  const subtitleRef = useScrollAnimation({ delay: 200 });
  const scene3DRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
    
    const scene = new window.THREE.Scene();
    const camera = new window.THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new window.THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      logarithmicDepthBuffer: true
    });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = window.THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    
    const buildGroup = new window.THREE.Group();
    
    const baseGeometry = new window.THREE.BoxGeometry(7, 0.5, 5);
    const baseMaterial = new window.THREE.MeshPhysicalMaterial({ 
      color: 0xcccccc,
      metalness: 0.2,
      roughness: 0.1,
      clearcoat: 0.3,
      clearcoatRoughness: 0.2
    });
    const base = new window.THREE.Mesh(baseGeometry, baseMaterial);
    base.castShadow = true;
    base.receiveShadow = true;
    base.position.y = -2;
    buildGroup.add(base);
    
    const createDetailedPillar = (x: number, z: number) => {
      const pillarGroup = new window.THREE.Group();
      
      const segments = 32;
      const pillarGeometry = new window.THREE.CylinderGeometry(0.25, 0.3, 4, segments);
      const pillarMaterial = new window.THREE.MeshPhysicalMaterial({ 
        color: 0xD4AF37,
        metalness: 0.3,
        roughness: 0.2,
        clearcoat: 0.4
      });
      const pillar = new window.THREE.Mesh(pillarGeometry, pillarMaterial);
      pillar.castShadow = true;
      
      for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        const flutingGeometry = new window.THREE.BoxGeometry(0.02, 3.5, 0.02);
        const fluting = new window.THREE.Mesh(flutingGeometry, pillarMaterial);
        const radius = 0.28;
        fluting.position.x = Math.cos(angle) * radius;
        fluting.position.z = Math.sin(angle) * radius;
        pillar.add(fluting);
      }
      
      const capitalGeometry = new window.THREE.CylinderGeometry(0.4, 0.3, 0.3, segments);
      const capital = new window.THREE.Mesh(capitalGeometry, pillarMaterial);
      capital.position.y = 2;
      pillar.add(capital);
      
      const baseGeometry = new window.THREE.CylinderGeometry(0.35, 0.4, 0.3, segments);
      const base = new window.THREE.Mesh(baseGeometry, pillarMaterial);
      base.position.y = -2;
      pillar.add(base);
      
      pillarGroup.add(pillar);
      pillarGroup.position.set(x, -0.25, z);
      return pillarGroup;
    };
    
    const pillarPositions = [
      [-2.5, 1.5], [-0.8, 1.5], [0.8, 1.5], [2.5, 1.5],
      [-2.5, -1.5], [-0.8, -1.5], [0.8, -1.5], [2.5, -1.5]
    ];
    
    pillarPositions.forEach(([x, z]) => {
      buildGroup.add(createDetailedPillar(x, z));
    });
    
    const roofGroup = new window.THREE.Group();
    
    const mainRoofGeometry = new window.THREE.BoxGeometry(7.5, 0.4, 5.5);
    const roofMaterial = new window.THREE.MeshPhysicalMaterial({ 
      color: 0xeeeeee,
      metalness: 0.1,
      roughness: 0.2
    });
    const mainRoof = new window.THREE.Mesh(mainRoofGeometry, roofMaterial);
    mainRoof.position.y = 2;
    mainRoof.castShadow = true;
    roofGroup.add(mainRoof);
    
    const pedimentShape = new window.THREE.Shape();
    pedimentShape.moveTo(-3.75, 0);
    pedimentShape.lineTo(3.75, 0);
    pedimentShape.lineTo(0, 1.5);
    pedimentShape.lineTo(-3.75, 0);
    
    const extrudeSettings = {
      steps: 1,
      depth: 1,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.1,
      bevelSegments: 3
    };
    
    const pedimentGeometry = new window.THREE.ExtrudeGeometry(pedimentShape, extrudeSettings);
    const pedimentMaterial = new window.THREE.MeshPhysicalMaterial({ 
      color: 0xD4AF37,
      metalness: 0.3,
      roughness: 0.2,
      clearcoat: 0.4
    });
    const pediment = new window.THREE.Mesh(pedimentGeometry, pedimentMaterial);
    pediment.position.set(0, 2.2, -2);
    pediment.rotation.x = Math.PI / 2;
    pediment.castShadow = true;
    roofGroup.add(pediment);
    
    buildGroup.add(roofGroup);
    
    const buildingGeometry = new window.THREE.BoxGeometry(6, 3.5, 4);
    const buildingMaterial = new window.THREE.MeshPhysicalMaterial({ 
      color: 0xf5f5f5,
      metalness: 0.1,
      roughness: 0.3,
      clearcoat: 0.2
    });
    const building = new window.THREE.Mesh(buildingGeometry, buildingMaterial);
    building.position.y = 0;
    building.position.z = -0.2;
    building.castShadow = true;
    building.receiveShadow = true;
    buildGroup.add(building);
    
    scene.add(buildGroup);
    
    const ambientLight = new window.THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const mainLight = new window.THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(5, 5, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    scene.add(mainLight);
    
    const fillLight = new window.THREE.DirectionalLight(0xD4AF37, 0.3);
    fillLight.position.set(-5, 3, -5);
    scene.add(fillLight);
    
    const rimLight = new window.THREE.DirectionalLight(0xffffff, 0.2);
    rimLight.position.set(0, -5, 0);
    scene.add(rimLight);
    
    camera.position.set(8, 4, 8);
    camera.lookAt(0, 0, 0);
    
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;
    
    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;
      
      targetRotationY = mouseX * 0.5;
      targetRotationX = mouseY * 0.3;
    };
    
    container.addEventListener('mousemove', handleMouseMove);
    
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      buildGroup.rotation.y += (targetRotationY - buildGroup.rotation.y) * 0.05;
      buildGroup.rotation.x += (targetRotationX - buildGroup.rotation.x) * 0.05;
      
      buildGroup.position.y = Math.sin(Date.now() * 0.001) * 0.1;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
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
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-law-dark to-law-charcoal opacity-80 z-0"></div>
      
      <div className="absolute inset-0 bg-nsibidi-pattern opacity-5 z-0"></div>
      
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
          
          <div className="lg:w-1/2 h-[400px] order-1 lg:order-2 nsibidi-border" ref={scene3DRef}>
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
      className="glass-card benin-accent animate-morph"
      ref={cardRef as React.RefObject<HTMLDivElement>}
    >
      <div className="flex items-start space-x-4 relative z-10">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-benin-gold/20 flex items-center justify-center group-hover:bg-benin-gold/30 transition-all duration-300">
          <div className="text-benin-gold">
            {icon}
          </div>
        </div>
        <div>
          <h4 className="text-white font-medium mb-1 group-hover:text-benin-gold transition-colors duration-300">{title}</h4>
          <p className="text-white/70 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default PracticeAreas;
