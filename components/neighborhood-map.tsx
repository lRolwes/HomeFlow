"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { 
  Home, 
  Construction, 
  CheckCircle, 
  ShoppingCart, 
  Timer, 
  AlertCircle,
  Info,
  Move,
  Plus,
  Minus
} from "lucide-react";
import dynamic from 'next/dynamic';

// Dynamically import Leaflet with no SSR
const MapComponent = dynamic(
  () => import('./MapComponent').then((mod) => mod.MapComponent),
  {
    ssr: false,
    loading: () => (
      <div className="h-[500px] w-full bg-light-100 flex items-center justify-center">
        <p className="text-dark-100">Loading map...</p>
      </div>
    ),
  }
);

type LotStatus = "construction" | "complete" | "bought" | "sold" | "onTime" | "delayed" | "available";
type Community = { name: string, lat: number, lng: number };

const statusIcons = {
  construction: <Construction className="h-4 w-4" />,
  complete: <CheckCircle className="h-4 w-4" />,
  bought: <ShoppingCart className="h-4 w-4" />,
  sold: <Home className="h-4 w-4" />,
  onTime: <Timer className="h-4 w-4" />,
  delayed: <AlertCircle className="h-4 w-4" />,
  available: <Info className="h-4 w-4" />,
};

const communities: Community[] = [
  { name: "Fox Valley", lat: 41.607442, lng: -93.889172 },
  { name: "Riverbend", lat: 38.778426, lng: -89.931366 },
  { name: "Oakridge", lat: 40.061553, lng: -88.271980 },
];

export function NeighborhoodMap() {
  const mapRef = useRef<any>(null);
  const [selectedCommunity, setSelectedCommunity] = useState<Community>(communities[0]);

  const handleCommunityChange = (name: string) => {
    const community = communities.find(c => c.name === name);
    if (community && mapRef.current?.recenterMap) {
      mapRef.current.recenterMap(community.lat, community.lng, 16);
      setSelectedCommunity(community);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-dark-100">
          Neighborhood Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap gap-4 items-center">
          <span className="text-sm font-medium">Select Community:</span>
          <ToggleGroup
            type="single"
            value={selectedCommunity.name}
            onValueChange={handleCommunityChange}
          >
            {communities.map((community) => (
              <ToggleGroupItem
                key={community.name}
                value={community.name}
                className="text-sm"
              >
                {community.name}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <MapComponent />
      </CardContent>
    </Card>
  );
}
