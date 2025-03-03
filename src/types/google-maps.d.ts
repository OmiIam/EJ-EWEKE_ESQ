
declare interface Window {
  google: any;
  initMap: () => void;
}

declare namespace google.maps {
  class Map {
    constructor(element: HTMLElement, options?: MapOptions);
  }
  
  interface MapOptions {
    center: LatLngLiteral;
    zoom: number;
    styles?: any[];
    disableDefaultUI?: boolean;
    [key: string]: any;
  }
  
  interface LatLngLiteral {
    lat: number;
    lng: number;
  }
  
  class Marker {
    constructor(options: MarkerOptions);
  }
  
  interface MarkerOptions {
    position: LatLngLiteral;
    map: Map;
    title?: string;
    icon?: string;
    [key: string]: any;
  }
}
