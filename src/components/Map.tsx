
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

const Map = () => {
  return (
    <Card className="w-full h-96">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-gold" />
          Our Location - Lusaka, Zambia
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="w-full h-80 rounded-b-lg bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center border">
          <div className="text-center p-8">
            <MapPin className="h-16 w-16 text-gold mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">SAN Finance</h3>
            <p className="text-gray-600 mb-1">Lusaka, Zambia</p>
            <p className="text-sm text-gray-500">Financial Services</p>
            <div className="mt-4 text-xs text-gray-400">
              <p>Coordinates: 28.2833°E, 15.4167°S</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Map;
