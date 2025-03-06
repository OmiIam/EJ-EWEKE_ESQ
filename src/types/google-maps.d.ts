
declare namespace google.maps {
  interface MapOptions {
    center: LatLng | LatLngLiteral;
    zoom: number;
    styles?: any[];
    mapTypeId?: string;
    disableDefaultUI?: boolean;
  }

  interface MarkerOptions {
    position: LatLng | LatLngLiteral;
    map?: Map;
    title?: string;
    icon?: string | Symbol;
    animation?: any;
  }

  interface InfoWindowOptions {
    content: string;
    position?: LatLng | LatLngLiteral;
  }

  interface Symbol {
    path: any;
    fillColor: string;
    fillOpacity: number;
    strokeColor: string;
    strokeWeight: number;
    scale: number;
  }

  class SymbolPath {
    static CIRCLE: number;
    static FORWARD_CLOSED_ARROW: number;
    static FORWARD_OPEN_ARROW: number;
    static BACKWARD_CLOSED_ARROW: number;
    static BACKWARD_OPEN_ARROW: number;
  }

  class Animation {
    static BOUNCE: number;
    static DROP: number;
  }

  class InfoWindow {
    constructor(opts?: InfoWindowOptions);
    open(map: Map, anchor?: MVCObject): void;
    close(): void;
  }

  class MVCObject {
    addListener(eventName: string, handler: Function): MapsEventListener;
  }

  interface MapsEventListener {
    remove(): void;
  }

  class Marker extends MVCObject {
    constructor(opts: MarkerOptions);
    setAnimation(animation: number | null): void;
  }
}
