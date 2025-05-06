"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { 
  Home, 
  Construction, 
  CheckCircle, 
  ShoppingCart, 
  Timer, 
  AlertCircle,
  Info
} from "lucide-react";

type LotStatus = "construction" | "complete" | "bought" | "sold" | "onTime" | "delayed";
type ConstructionPhase = "foundation" | "framing" | "electrical" | "plumbing" | "drywall" | "finishing";

interface Lot {
  id: number;
  number: string;
  status: LotStatus;
  phase?: ConstructionPhase;
  completionDate?: string;
  buyer?: string;
  saleDate?: string;
  expectedCompletion?: string;
  delayReason?: string;
}

// Mock data - replace with real data
const mockLots: Lot[] = [
  { id: 1, number: "101", status: "construction", phase: "framing", expectedCompletion: "2024-06-15" },
  { id: 2, number: "102", status: "complete", completionDate: "2024-03-01" },
  { id: 3, number: "103", status: "bought", buyer: "John Smith", saleDate: "2024-02-15" },
  { id: 4, number: "104", status: "sold", saleDate: "2024-01-20" },
  { id: 5, number: "105", status: "onTime", phase: "electrical", expectedCompletion: "2024-05-01" },
  { id: 6, number: "106", status: "delayed", phase: "plumbing", expectedCompletion: "2024-05-15", delayReason: "Material delay" },
  // Add more lots as needed
];

const statusIcons = {
  construction: <Construction className="h-4 w-4" />,
  complete: <CheckCircle className="h-4 w-4" />,
  bought: <ShoppingCart className="h-4 w-4" />,
  sold: <Home className="h-4 w-4" />,
  onTime: <Timer className="h-4 w-4" />,
  delayed: <AlertCircle className="h-4 w-4" />,
};

const statusColors = {
  construction: "bg-blue-100",
  complete: "bg-green-100",
  bought: "bg-purple-100",
  sold: "bg-gray-100",
  onTime: "bg-yellow-100",
  delayed: "bg-red-100",
};

export function CommunityMap() {
  const [selectedStatus, setSelectedStatus] = useState<LotStatus[]>([]);
  const [hoveredLot, setHoveredLot] = useState<Lot | null>(null);

  const filteredLots = selectedStatus.length === 0 
    ? mockLots 
    : mockLots.filter(lot => selectedStatus.includes(lot.status));

  const getStatusLabel = (status: LotStatus) => {
    switch (status) {
      case "construction": return "In Construction";
      case "complete": return "Complete";
      case "bought": return "Bought";
      case "sold": return "Sold";
      case "onTime": return "On Time";
      case "delayed": return "Delayed";
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold text-dark-100">
            Community Map
          </CardTitle>
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
                <span className="text-sm">{getStatusLabel(status as LotStatus)}</span>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Map Grid - Replace with actual map component */}
          <div className="grid grid-cols-4 gap-4">
            {filteredLots.map((lot) => (
              <div
                key={lot.id}
                className={`relative p-4 rounded-lg border-2 ${
                  lot.status === "construction" 
                    ? statusColors[lot.status] 
                    : "bg-gray-100"
                } cursor-pointer hover:shadow-lg transition-all duration-200`}
                onMouseEnter={() => setHoveredLot(lot)}
                onMouseLeave={() => setHoveredLot(null)}
              >
                <div className="text-lg font-bold text-dark-100">Lot {lot.number}</div>
                {lot.phase && (
                  <div className="text-sm text-dark-100 mt-1">
                    Phase: {lot.phase}
                  </div>
                )}
                {lot.status === "construction" && lot.expectedCompletion && (
                  <div className="text-sm text-dark-100 mt-1">
                    Expected: {new Date(lot.expectedCompletion).toLocaleDateString()}
                  </div>
                )}

                {hoveredLot?.id === lot.id && (
                  <div className="absolute top-0 left-0 w-full min-h-full bg-white p-4 rounded-lg shadow-lg border border-light-200 z-10 transform transition-all duration-300 ease-in-out scale-100 opacity-100">
                    <div className="flex items-center gap-2 mb-2">
                      {statusIcons[hoveredLot.status]}
                      <span className="font-bold text-dark-100">Lot {hoveredLot.number}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="font-medium">Status:</span> {getStatusLabel(hoveredLot.status)}
                      </div>
                      {hoveredLot.phase && (
                        <div className="text-sm">
                          <span className="font-medium">Current Phase:</span> {hoveredLot.phase}
                        </div>
                      )}
                      {hoveredLot.expectedCompletion && (
                        <div className="text-sm">
                          <span className="font-medium">Expected Completion:</span> {new Date(hoveredLot.expectedCompletion).toLocaleDateString()}
                        </div>
                      )}
                      {hoveredLot.completionDate && (
                        <div className="text-sm">
                          <span className="font-medium">Completion Date:</span> {new Date(hoveredLot.completionDate).toLocaleDateString()}
                        </div>
                      )}
                      {hoveredLot.buyer && (
                        <div className="text-sm">
                          <span className="font-medium">Buyer:</span> {hoveredLot.buyer}
                        </div>
                      )}
                      {hoveredLot.saleDate && (
                        <div className="text-sm">
                          <span className="font-medium">Sale Date:</span> {new Date(hoveredLot.saleDate).toLocaleDateString()}
                        </div>
                      )}
                      {hoveredLot.delayReason && (
                        <div className="text-sm">
                          <span className="font-medium">Delay Reason:</span> {hoveredLot.delayReason}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 