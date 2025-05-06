"use client";

import { useState, useRef, useEffect } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { 
  Home, 
  Construction, 
  CheckCircle, 
  ShoppingCart, 
  Timer, 
  AlertCircle,
  Info,
  Plus,
  Minus,
  Move
} from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type LotStatus = "construction" | "complete" | "bought" | "onTime" | "delayed" | "available";

const statusColors = {
  construction: "text-blue-500",
  complete: "text-green-500",
  bought: "text-purple-500",
  onTime: "text-yellow-500",
  delayed: "text-red-500",
  available: "text-green-500",
};

const statusIcons = {
  construction: <Construction className="h-4 w-4" />,
  complete: <CheckCircle className="h-4 w-4" />,
  bought: <ShoppingCart className="h-4 w-4" />,
  onTime: <Timer className="h-4 w-4" />,
  delayed: <AlertCircle className="h-4 w-4" />,
  available: <Info className="h-4 w-4" />,
};

export function MapComponent() {
  const [selectedStatus, setSelectedStatus] = useState<LotStatus[]>([]);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  const blueIcon = new L.Icon({
    iconUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%230075ff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'/%3E%3Cpolyline points='9 22 9 12 15 12 15 22'/%3E%3C/svg%3E",
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });

  const grayIcon = new L.Icon({
    iconUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23999999' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'/%3E%3Cpolyline points='9 22 9 12 15 12 15 22'/%3E%3C/svg%3E",
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });

  const getStatusForMarker = (index: number): LotStatus => {
    switch (index) {
      case 0: return "bought";      // Lot 101 - has buyer
      case 1: return "bought";      // Lot 102 - has buyer
      case 2: return "bought";      // Lot 103 - has buyer
      case 3: return "bought";      // Lot 104 - has buyer
      case 4: return "available";   // Lot 105 - no buyer
      case 5: return "bought";      // Lot 106 - has buyer
      default: return "available";  // All new lots (107-120) - no buyer
    }
  };

  const updateMarkerColors = () => {
    markersRef.current.forEach((marker, index) => {
      const status = getStatusForMarker(index);
      if (selectedStatus.length === 0 || selectedStatus.includes(status)) {
        marker.setIcon(blueIcon);
      } else {
        marker.setIcon(grayIcon);
      }
    });
  };

  useEffect(() => {
    if (mapRef.current) {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }

      setTimeout(() => {
        mapInstance.current = L.map(mapRef.current!, {
          center: [41.607442, -93.889172],
          zoom: 17,
          zoomControl: true,
          attributionControl: true
        });

        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 20
        }).addTo(mapInstance.current);

        // Clear existing markers
        markersRef.current = [];

        // Add marker for Lot 101
        const marker1 = L.marker([41.607442, -93.889172], { icon: blueIcon })
          .addTo(mapInstance.current!);
        markersRef.current.push(marker1);

        const popup1 = L.popup()
          .setContent(
            `<div style="color: #0075ff; font-size: 14px;">
              <strong>Lot 101</strong><br>
              Phase: Framing<br>
              Status: Under Construction<br>
              Buyer: John Smith
            </div>`
          );

        marker1.on('mouseover', () => {
          marker1.bindPopup(popup1).openPopup();
        });

        marker1.on('mouseout', () => {
          marker1.closePopup();
        });

        // Add marker for Lot 102
        const marker2 = L.marker([41.607430, -93.889929], { icon: blueIcon })
          .addTo(mapInstance.current!);
        markersRef.current.push(marker2);

        const popup2 = L.popup()
          .setContent(
            `<div style="color: #0075ff; font-size: 14px;">
              <strong>Lot 102</strong><br>
              Phase: Electrical<br>
              Status: Under Construction<br>
              Buyer: Sarah Johnson
            </div>`
          );

        marker2.on('mouseover', () => {
          marker2.bindPopup(popup2).openPopup();
        });

        marker2.on('mouseout', () => {
          marker2.closePopup();
        });

        // Add marker for Lot 103
        const marker3 = L.marker([41.607860, -93.890659], { icon: blueIcon })
          .addTo(mapInstance.current!);
        markersRef.current.push(marker3);

        const popup3 = L.popup()
          .setContent(
            `<div style="color: #0075ff; font-size: 14px;">
              <strong>Lot 103</strong><br>
              Phase: Plumbing<br>
              Status: Under Construction<br>
              Buyer: Michael Brown
            </div>`
          );

        marker3.on('mouseover', () => {
          marker3.bindPopup(popup3).openPopup();
        });

        marker3.on('mouseout', () => {
          marker3.closePopup();
        });

        // Add marker for Lot 104
        const marker4 = L.marker([41.607433, -93.890898], { icon: blueIcon })
          .addTo(mapInstance.current!);
        markersRef.current.push(marker4);

        const popup4 = L.popup()
          .setContent(
            `<div style="color: #0075ff; font-size: 14px;">
              <strong>Lot 104</strong><br>
              Phase: Drywall<br>
              Status: Under Construction<br>
              Buyer: Emily Davis
            </div>`
          );

        marker4.on('mouseover', () => {
          marker4.bindPopup(popup4).openPopup();
        });

        marker4.on('mouseout', () => {
          marker4.closePopup();
        });

        // Add marker for Lot 105
        const marker5 = L.marker([41.607860, -93.889432], { icon: blueIcon })
          .addTo(mapInstance.current!);
        markersRef.current.push(marker5);

        const popup5 = L.popup()
          .setContent(
            `<div style="color: #0075ff; font-size: 14px;">
              <strong>Lot 105</strong><br>
              Phase: n/a<br>
              Status: Available<br>
              Buyer: n/a
            </div>`
          );

        marker5.on('mouseover', () => {
          marker5.bindPopup(popup5).openPopup();
        });

        marker5.on('mouseout', () => {
          marker5.closePopup();
        });

        // Add marker for Lot 106
        const marker6 = L.marker([41.607858, -93.889679], { icon: blueIcon })
          .addTo(mapInstance.current!);
        markersRef.current.push(marker6);

        const popup6 = L.popup()
          .setContent(
            `<div style="color: #0075ff; font-size: 14px;">
              <strong>Lot 106</strong><br>
              Phase: Framing<br>
              Status: Delayed<br>
              Buyer: Jessica Taylor
            </div>`
          );

        marker6.on('mouseover', () => {
          marker6.bindPopup(popup6).openPopup();
        });

        marker6.on('mouseout', () => {
          marker6.closePopup();
        });

        // Add new markers
        const newMarkers = [
          { lat: 41.607860, lng: -93.889205, lot: "107" },
          { lat: 41.607429, lng: -93.889448, lot: "108" },
          { lat: 41.607429, lng: -93.889695, lot: "109" },
          { lat: 41.607860, lng: -93.889921, lot: "110" },
          { lat: 41.607860, lng: -93.890200, lot: "111" },
          { lat: 41.607860, lng: -93.890409, lot: "112" },
          { lat: 41.607429, lng: -93.890189, lot: "113" },
          { lat: 41.607429, lng: -93.890441, lot: "114" },
          { lat: 41.607429, lng: -93.890699, lot: "115" },
          { lat: 41.607429, lng: -93.891171, lot: "116" },
          { lat: 41.607429, lng: -93.891418, lot: "117" },
          { lat: 41.607860, lng: -93.890924, lot: "118" },
          { lat: 41.607860, lng: -93.891155, lot: "119" },
          { lat: 41.607860, lng: -93.891402, lot: "120" }
        ];

        newMarkers.forEach(({ lat, lng, lot }) => {
          const marker = L.marker([lat, lng], { icon: blueIcon })
            .addTo(mapInstance.current!);
          markersRef.current.push(marker);

          const popup = L.popup()
            .setContent(
              `<div style="color: #0075ff; font-size: 14px;">
                <strong>Lot ${lot}</strong><br>
                Phase: Planning<br>
                Status: Available<br>
                Buyer: n/a
              </div>`
            );

          marker.on('mouseover', () => {
            marker.bindPopup(popup).openPopup();
          });

          marker.on('mouseout', () => {
            marker.closePopup();
          });
        });

        // Update marker colors based on initial status
        updateMarkerColors();

        mapInstance.current.invalidateSize();
      }, 100);

      return () => {
        if (mapInstance.current) {
          mapInstance.current.remove();
          mapInstance.current = null;
        }
      };
    }
  }, []);

  // Update marker colors whenever selectedStatus changes
  useEffect(() => {
    if (mapInstance.current) {
      updateMarkerColors();
    }
  }, [selectedStatus]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Lot Status</span>
          <ToggleGroup
            type="multiple"
            value={selectedStatus}
            onValueChange={(value: string[]) => setSelectedStatus(value as LotStatus[])}
            className="flex-wrap"
          >
            {Object.entries(statusIcons).map(([status, icon]) => (
              <ToggleGroupItem
                key={status}
                value={status}
                className="flex items-center gap-2"
              >
                {icon}
                <span className="text-sm">{status}</span>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setScale(prev => Math.min(prev + 0.1, 2))}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <Plus className="h-4 w-4" />
          </button>
          <button
            onClick={() => setScale(prev => Math.max(prev - 0.1, 0.5))}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <Minus className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsDragging(!isDragging)}
            className={`p-2 rounded ${isDragging ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          >
            <Move className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="relative w-full h-[600px] overflow-hidden rounded-lg border border-light-200">
        <div
          className="w-full h-full"
          id="map"
          ref={mapRef}
        ></div>
      </div>
    </div>
  );
} 