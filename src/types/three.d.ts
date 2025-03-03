
// Type declarations for ThreeJS loaded from CDN
declare namespace THREE {
  class Scene {
    add(object: Object3D): void;
  }

  class PerspectiveCamera {
    constructor(fov: number, aspect: number, near: number, far: number);
    position: Vector3;
    aspect: number;
    updateProjectionMatrix(): void;
  }

  class WebGLRenderer {
    constructor(parameters?: { canvas?: HTMLCanvasElement; alpha?: boolean; antialias?: boolean });
    setSize(width: number, height: number): void;
    setPixelRatio(ratio: number): void;
    render(scene: Scene, camera: PerspectiveCamera): void;
    domElement: HTMLCanvasElement;
    dispose(): void;
  }

  class BufferGeometry {
    setAttribute(name: string, attribute: BufferAttribute): BufferGeometry;
  }

  class BufferAttribute {
    constructor(array: Float32Array, itemSize: number);
  }

  class Vector3 {
    x: number;
    y: number;
    z: number;
    set(x: number, y: number, z: number): Vector3;
  }

  class Object3D {
    position: Vector3;
    rotation: {
      x: number;
      y: number;
      z: number;
    };
    add(object: Object3D): void;
  }

  class Points extends Object3D {
    constructor(geometry: BufferGeometry, material: PointsMaterial);
  }

  class Mesh extends Object3D {
    constructor(geometry: BufferGeometry | BoxGeometry | CylinderGeometry | ExtrudeGeometry, material: MeshStandardMaterial);
  }

  class Group extends Object3D {
    constructor();
  }

  class PointsMaterial {
    constructor(parameters: {
      size?: number;
      sizeAttenuation?: boolean;
      transparent?: boolean;
      alphaMap?: any;
      depthWrite?: boolean;
      blending?: number;
      vertexColors?: boolean;
    });
  }

  class MeshStandardMaterial {
    constructor(parameters: { color?: number });
  }

  class BoxGeometry extends BufferGeometry {
    constructor(width?: number, height?: number, depth?: number);
  }

  class CylinderGeometry extends BufferGeometry {
    constructor(radiusTop?: number, radiusBottom?: number, height?: number, radialSegments?: number);
  }

  class Shape {
    constructor();
    moveTo(x: number, y: number): void;
    lineTo(x: number, y: number): void;
  }

  class ExtrudeGeometry extends BufferGeometry {
    constructor(shape: Shape, options: { steps: number; depth: number; bevelEnabled: boolean });
  }

  class AmbientLight extends Object3D {
    constructor(color: number, intensity: number);
  }

  class DirectionalLight extends Object3D {
    constructor(color: number, intensity: number);
    position: Vector3;
  }

  // Constants
  const AdditiveBlending: number;
}

interface Window {
  THREE: typeof THREE;
}
