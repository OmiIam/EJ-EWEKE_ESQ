
import React, { useEffect, useRef, useState } from 'react';

const GoogleMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    // Load Google Maps API script
    const googleMapScript = document.createElement('script');
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=&libraries=places&callback=initMap`;
    googleMapScript.async = true;
    googleMapScript.defer = true;
    
    // Define the callback function for when the API loads
    window.initMap = () => {
      setLoaded(true);
    };
    
    // Append the script to the document
    document.body.appendChild(googleMapScript);
    
    return () => {
      // Clean up the global callback
      window.initMap = undefined;
      // Remove the script tag
      document.body.removeChild(googleMapScript);
    };
  }, []);
  
  // Initialize the map once the API has loaded
  useEffect(() => {
    if (!loaded || !mapRef.current) return;
    
    // Lagos, Nigeria coordinates
    const lagos = { lat: 6.4550, lng: 3.3841 };
    
    // Customize map styles to match website theme
    const mapOptions = {
      center: lagos,
      zoom: 14,
      styles: [
        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
        {
          featureType: "administrative.locality",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d4af37" }],
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d4af37" }],
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [{ color: "#263c3f" }],
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [{ color: "#6b9a76" }],
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#38414e" }],
        },
        {
          featureType: "road",
          elementType: "geometry.stroke",
          stylers: [{ color: "#212a37" }],
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [{ color: "#9ca5b3" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [{ color: "#746855" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [{ color: "#1f2835" }],
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.fill",
          stylers: [{ color: "#f3d19c" }],
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [{ color: "#2f3948" }],
        },
        {
          featureType: "transit.station",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d4af37" }],
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#17263c" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [{ color: "#515c6d" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#17263c" }],
        },
      ],
      disableDefaultUI: true,
      zoomControl: true,
    };
    
    // Create the map
    const map = new google.maps.Map(mapRef.current, mapOptions);
    
    // Add a marker for the law firm location
    const marker = new google.maps.Marker({
      position: { lat: 6.4530, lng: 3.4350 }, // Ikoyi, Lagos
      map: map,
      title: "EJ Eweke & Co",
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: "#D4AF37",
        fillOpacity: 1,
        strokeColor: "#FFFFFF",
        strokeWeight: 2,
        scale: 8,
      },
    });
    
    // Add an info window
    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div style="color: #333; padding: 8px;">
          <h3 style="margin: 0; font-weight: bold;">EJ Eweke & Co</h3>
          <p style="margin: 5px 0 0;">25 Bourdillon Road, Ikoyi, Lagos</p>
        </div>
      `,
    });
    
    // Open info window when marker is clicked
    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });
    
    // Add a subtle animation to the marker
    let bounceTimer: ReturnType<typeof setTimeout>;
    
    const animateMarker = () => {
      marker.setAnimation(google.maps.Animation.BOUNCE);
      bounceTimer = setTimeout(() => {
        marker.setAnimation(null);
      }, 1500);
    };
    
    // Animate marker initially
    animateMarker();
    
    // Clean up
    return () => {
      clearTimeout(bounceTimer);
    };
  }, [loaded]);
  
  return (
    <div ref={mapRef} className="w-full h-full">
      {!loaded && (
        <div className="w-full h-full flex items-center justify-center bg-law-dark/50">
          <div className="glass p-4 rounded-lg">
            <div className="animate-spin h-8 w-8 border-4 border-law-gold border-t-transparent rounded-full mx-auto mb-2"></div>
            <p className="text-white text-sm">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Add global declaration for the initMap callback
declare global {
  interface Window {
    initMap: () => void;
  }
}

export default GoogleMap;
