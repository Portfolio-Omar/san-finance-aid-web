
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, AlertCircle } from 'lucide-react';

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);
  const [map, setMap] = useState<any>(null);

  const initializeMap = async (token: string) => {
    if (!mapContainer.current || !token) return;

    try {
      // Dynamically import mapbox-gl
      const mapboxgl = await import('mapbox-gl');
      await import('mapbox-gl/dist/mapbox-gl.css');

      mapboxgl.default.accessToken = token;
      
      const newMap = new mapboxgl.default.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [28.2833, -15.4167], // Lusaka, Zambia coordinates
        zoom: 13,
        pitch: 0,
      });

      // Add navigation controls
      newMap.addControl(
        new mapboxgl.default.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      // Add a marker for SAN Finance office location
      new mapboxgl.default.Marker({
        color: '#E5B80B' // Gold color
      })
        .setLngLat([28.2833, -15.4167])
        .setPopup(
          new mapboxgl.default.Popup().setHTML(
            '<div style="padding: 15px; font-family: Arial, sans-serif;"><h3 style="margin: 0 0 8px 0; color: #000; font-size: 16px; font-weight: bold;">SAN Finance</h3><p style="margin: 0; font-size: 14px; color: #666;">Financial Services</p><p style="margin: 5px 0 0 0; font-size: 12px; color: #888;">Lusaka, Zambia</p></div>'
          )
        )
        .addTo(newMap);

      setMap(newMap);
      setShowTokenInput(false);

      return () => {
        newMap.remove();
      };
    } catch (error) {
      console.error('Error loading map:', error);
    }
  };

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapboxToken.trim()) {
      initializeMap(mapboxToken.trim());
    }
  };

  useEffect(() => {
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [map]);

  if (showTokenInput) {
    return (
      <Card className="w-full h-96">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-gold" />
            Our Location - Lusaka, Zambia
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="flex items-center gap-2 text-amber-600 mb-2">
            <AlertCircle className="h-5 w-5" />
            <span className="text-sm">Mapbox token required to display map</span>
          </div>
          <form onSubmit={handleTokenSubmit} className="w-full max-w-md space-y-3">
            <Input
              type="text"
              placeholder="Enter your Mapbox public token"
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="text-center"
            />
            <Button type="submit" className="w-full bg-gold hover:bg-gold/90 text-black">
              Load Map
            </Button>
          </form>
          <p className="text-xs text-muted-foreground text-center max-w-md">
            Get your free Mapbox token at{' '}
            <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
              mapbox.com
            </a>
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full h-96">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-gold" />
          Our Location - Lusaka, Zambia
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div ref={mapContainer} className="w-full h-80 rounded-b-lg" />
      </CardContent>
    </Card>
  );
};

export default Map;
