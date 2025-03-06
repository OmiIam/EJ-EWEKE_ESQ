
declare namespace google {
  namespace maps {
    class Map {
      constructor(mapDiv: Element, opts?: MapOptions);
      setCenter(latLng: LatLng): void;
      setZoom(zoom: number): void;
    }

    class LatLng {
      constructor(lat: number, lng: number);
      lat(): number;
      lng(): number;
    }

    class Marker {
      constructor(opts: MarkerOptions);
      setMap(map: Map): void;
    }

    interface MapOptions {
      center?: LatLng;
      zoom?: number;
      styles?: any[];
      disableDefaultUI?: boolean;
      zoomControl?: boolean;
      scrollwheel?: boolean;
      mapTypeControl?: boolean;
      streetViewControl?: boolean;
      fullscreenControl?: boolean;
    }

    interface MarkerOptions {
      position: LatLng;
      map?: Map;
      title?: string;
      icon?: string;
    }
  }
}
