"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
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

type Community = { name: string, lat: number, lng: number };

const communities: Community[] = [
  { name: "Fox Valley", lat: 41.607442, lng: -93.889172 },
  { name: "Riverbend", lat: 38.778426, lng: -89.931366 },
  { name: "Oakridge", lat: 40.061553, lng: -88.271980 },
];

export function NeighborhoodMap() {
  const [selectedCommunity, setSelectedCommunity] = useState<Community>(communities[0]);

  const handleCommunityChange = (name: string) => {
    const community = communities.find(c => c.name === name);
    if (community) {
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
            onValueChange={(value) => {
              if (value) {
                handleCommunityChange(value);
              }
            }}
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
        <MapComponent 
          center={{ lat: selectedCommunity.lat, lng: selectedCommunity.lng }}
          zoom={16}
        />
      </CardContent>
    </Card>
  );
}
