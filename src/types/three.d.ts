
// Extend the global Window interface
interface Window {
  THREE: typeof THREE;
}

// Define the THREE namespace
declare namespace THREE {
  class WebGLRenderer {
    constructor(parameters?: { canvas?: HTMLCanvasElement; alpha?: boolean; antialias?: boolean; logarithmicDepthBuffer?: boolean });
    setSize(width: number, height: number): void;
    setPixelRatio(ratio: number): void;
    render(scene: Scene, camera: Camera): void;
    dispose(): void;
    domElement: HTMLCanvasElement;
    shadowMap: {
      enabled: boolean;
      type: number;
    };
    getPixelRatio(): number;
  }

  class Scene {
    add(object: Object3D): this;
  }

  class PerspectiveCamera {
    constructor(fov: number, aspect: number, near: number, far: number);
    position: Vector3;
    aspect: number;
    updateProjectionMatrix(): void;
    lookAt(x: number | Vector3, y?: number, z?: number): void;
  }

  class Vector3 {
    constructor(x?: number, y?: number, z?: number);
    x: number;
    y: number;
    z: number;
    set(x: number, y: number, z: number): this;
  }

  class Clock {
    constructor();
    getElapsedTime(): number;
  }

  class BufferGeometry {
    constructor();
    setAttribute(name: string, attribute: BufferAttribute): this;
  }

  class BufferAttribute {
    constructor(array: ArrayLike<number>, itemSize: number);
  }

  class Material {
    constructor();
    dispose(): void;
  }

  class ShaderMaterial extends Material {
    constructor(parameters?: {
      uniforms?: { [uniform: string]: { value: any } };
      vertexShader?: string;
      fragmentShader?: string;
      transparent?: boolean;
      depthWrite?: boolean;
      blending?: number;
      vertexColors?: boolean;
    });
    uniforms: { [uniform: string]: { value: any } };
  }

  class MeshPhysicalMaterial extends Material {
    constructor(parameters?: {
      color?: number;
      metalness?: number;
      roughness?: number;
      clearcoat?: number;
      clearcoatRoughness?: number;
    });
  }

  class BoxGeometry extends BufferGeometry {
    constructor(width?: number, height?: number, depth?: number, widthSegments?: number, heightSegments?: number, depthSegments?: number);
  }

  class CylinderGeometry extends BufferGeometry {
    constructor(radiusTop?: number, radiusBottom?: number, height?: number, radialSegments?: number, heightSegments?: number, openEnded?: boolean, thetaStart?: number, thetaLength?: number);
  }

  class IcosahedronGeometry extends BufferGeometry {
    constructor(radius?: number, detail?: number);
  }

  class OctahedronGeometry extends BufferGeometry {
    constructor(radius?: number, detail?: number);
  }

  class TorusKnotGeometry extends BufferGeometry {
    constructor(radius?: number, tube?: number, tubularSegments?: number, radialSegments?: number, p?: number, q?: number);
  }

  class ExtrudeGeometry extends BufferGeometry {
    constructor(shapes: Shape | Shape[], options?: {
      steps?: number;
      depth?: number;
      bevelEnabled?: boolean;
      bevelThickness?: number;
      bevelSize?: number;
      bevelSegments?: number;
    });
  }

  class Shape {
    constructor();
    moveTo(x: number, y: number): this;
    lineTo(x: number, y: number): this;
  }

  class Points extends Object3D {
    constructor(geometry?: BufferGeometry, material?: Material);
    geometry: BufferGeometry;
    material: Material;
  }

  class Mesh extends Object3D {
    constructor(geometry?: BufferGeometry, material?: Material);
    geometry: BufferGeometry;
    material: Material;
    castShadow: boolean;
    receiveShadow: boolean;
  }

  class Group extends Object3D {
    constructor();
    children: Object3D[];
  }

  class Object3D {
    constructor();
    position: Vector3;
    rotation: { x: number; y: number; z: number };
    scale: Vector3;
    add(object: Object3D): this;
    remove(object: Object3D): this;
  }

  class DirectionalLight extends Light {
    constructor(color?: number, intensity?: number);
    shadow: {
      mapSize: {
        width: number;
        height: number;
      };
    };
    castShadow: boolean;
  }

  class PointLight extends Light {
    constructor(color?: number, intensity?: number, distance?: number);
  }

  class AmbientLight extends Light {
    constructor(color?: number, intensity?: number);
  }

  class Light extends Object3D {
    constructor(color?: number, intensity?: number);
  }

  // Constants
  const AdditiveBlending: number;
  const PCFSoftShadowMap: number;
}
