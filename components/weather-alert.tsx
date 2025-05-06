"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

const affectedJobs = [
  {
    name: "Framing",
    description: "Wood framing work is delayed due to high winds and rain",
    impact: "High",
    duration: "2-3 days"
  },
  {
    name: "Foundation",
    description: "Concrete pouring is postponed due to heavy rain",
    impact: "High",
    duration: "1-2 days"
  },
  {
    name: "Roofing",
    description: "Roof installation is delayed due to high winds",
    impact: "Medium",
    duration: "1 day"
  },
  {
    name: "Exterior Siding",
    description: "Siding installation is postponed due to rain",
    impact: "Medium",
    duration: "1 day"
  },
  {
    name: "Landscaping",
    description: "Grading and landscaping work is delayed due to wet conditions",
    impact: "Low",
    duration: "2-3 days"
  }
];

export function WeatherAlert() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <Alert variant="destructive" className="bg-yellow-50 border-yellow-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <AlertCircle className="h-5 w-5 text-yellow-500" />
            <div>
              <AlertTitle className="text-yellow-800">Weather Alert</AlertTitle>
              <AlertDescription className="text-yellow-700">
                Severe weather conditions expected in the next 24 hours. High winds and heavy rain may affect construction progress.
              </AlertDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-yellow-800 border-yellow-300 hover:bg-yellow-100">
                  View Affected Jobs
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Jobs Affected by Weather</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {affectedJobs.map((job, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{job.name}</h3>
                          <p className="text-sm text-gray-600">{job.description}</p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                            job.impact === 'High' ? 'bg-red-100 text-red-800' :
                            job.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {job.impact} Impact
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        Expected Delay: {job.duration}
                      </div>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="ghost" size="sm" className="text-yellow-800 hover:bg-yellow-100">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Alert>
    </div>
  );
}
