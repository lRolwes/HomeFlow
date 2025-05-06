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

const affectedTrades = [
  {
    trade: "Plumbing",
    cancelledDate: "March 15, 2024",
    reason: "Equipment failure",
    affectedTrades: [
      {
        name: "Drywall",
        delay: "2 days",
        impact: "High",
        description: "Cannot proceed with wall installation until plumbing is complete"
      },
      {
        name: "Electrical",
        delay: "1 day",
        impact: "Medium",
        description: "Some electrical work requires coordination with plumbing"
      }
    ]
  },
  {
    trade: "Electrical",
    cancelledDate: "March 16, 2024",
    reason: "Staff shortage",
    affectedTrades: [
      {
        name: "Drywall",
        delay: "3 days",
        impact: "High",
        description: "Cannot proceed with wall installation until electrical is complete"
      },
      {
        name: "Painting",
        delay: "2 days",
        impact: "Medium",
        description: "Painting schedule pushed back due to drywall delay"
      }
    ]
  }
];

export function CancellationAlert() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <Alert variant="destructive" className="bg-red-50 border-red-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <div>
              <AlertTitle className="text-red-800">Cancellations</AlertTitle>
              <AlertDescription className="text-red-700">
                Recent trade cancellations may affect construction timelines. Click to view details.
              </AlertDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-red-800 border-red-300 hover:bg-red-100">
                  View Affected Trades
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Trade Cancellations & Impact</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  {affectedTrades.map((cancellation, index) => (
                    <div key={index} className="p-4 border rounded-lg bg-red-50">
                      <div className="mb-4">
                        <h3 className="font-semibold text-red-800">{cancellation.trade}</h3>
                        <p className="text-sm text-red-700">Cancelled: {cancellation.cancelledDate}</p>
                        <p className="text-sm text-red-700">Reason: {cancellation.reason}</p>
                      </div>
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-red-800">Affected Trades:</h4>
                        {cancellation.affectedTrades.map((trade, tradeIndex) => (
                          <div key={tradeIndex} className="pl-4 border-l-2 border-red-200">
                            <div className="flex justify-between items-start">
                              <div>
                                <h5 className="font-medium">{trade.name}</h5>
                                <p className="text-sm text-gray-600">{trade.description}</p>
                              </div>
                              <div className="text-right">
                                <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                                  trade.impact === 'High' ? 'bg-red-100 text-red-800' :
                                  'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {trade.impact} Impact
                                </span>
                              </div>
                            </div>
                            <div className="mt-1 text-sm text-gray-500">
                              Expected Delay: {trade.delay}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="ghost" size="sm" className="text-red-800 hover:bg-red-100">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Alert>
    </div>
  );
} 