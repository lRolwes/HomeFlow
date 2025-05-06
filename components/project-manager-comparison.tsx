"use client"
import { BarChart } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const projectManagers = [
  { name: "John Smith", onTimeCompletion: 92, homesUnderConstruction: 15, communities: 3, color: "from-blue-300 to-blue-400" },
  { name: "Jane Doe", onTimeCompletion: 88, homesUnderConstruction: 12, communities: 4, color: "from-green-400 via-green-500 to-green-600" },
  { name: "Bob Johnson", onTimeCompletion: 95, homesUnderConstruction: 18, communities: 5, color: "from-purple-400 via-purple-500 to-purple-600" },
  { name: "Alice Brown", onTimeCompletion: 85, homesUnderConstruction: 10, communities: 2, color: "from-yellow-400 via-yellow-500 to-yellow-600" },
];

type Metric = "onTimeCompletion" | "homesUnderConstruction" | "communities";

export function ProjectManagerComparison() {
  const [selectedMetric, setSelectedMetric] = useState<Metric>("onTimeCompletion");

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-dark-100">
          Project Manager Comparison
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <label htmlFor="metric" className="block text-sm font-medium text-dark-100 mb-1">Select Metric:</label>
          <select 
            id="metric"
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value as Metric)}
            className="mt-1 block w-full pl-3 pr-12 py-2 text-sm border border-light-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-100 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22M6%208l4%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_0.5rem_center] bg-[length:1.5em_1.5em] bg-no-repeat"
          >
            <option value="onTimeCompletion">% On Time Completion</option>  
            <option value="homesUnderConstruction"># Homes Under Construction</option>
            <option value="communities"># Communities</option>
          </select>
        </div>

        <div className="h-[400px] relative">
          {/* Main chart container */}
          <div className="absolute left-0 right-0 top-0 bottom-0 flex">
            {/* Y-axis */}
            <div className="w-8 flex flex-col justify-between" style={{ height: '320px', marginTop: '40px' }}>
              {selectedMetric === "onTimeCompletion" ? (
                // Percentage scale for On Time Completion
                [100, 75, 50, 25, 0].map((value) => (
                  <div key={value} className="text-xs text-dark-50">
                    {value}%
                  </div>
                ))
              ) : selectedMetric === "homesUnderConstruction" ? (
                // Scale for Homes Under Construction (max 20)
                [20, 15, 10, 5, 0].map((value) => (
                  <div key={value} className="text-xs text-dark-50">
                    {value}
                  </div>
                ))
              ) : (
                // Scale for Communities (max 5)
                [5, 4, 3, 2, 1, 0].map((value) => (
                  <div key={value} className="text-xs text-dark-50">
                    {value}
                  </div>
                ))
              )}
            </div>

            {/* Chart area */}
            <div className="flex-1 relative" style={{ height: '320px', marginTop: '40px' }}>
              {/* Grid Lines */}
              {selectedMetric === "onTimeCompletion" ? (
                // Grid lines for percentage
                [100, 75, 50, 25, 0].map((value) => (
                  <div 
                    key={value} 
                    className="absolute w-full border-b border-dashed border-light-200"
                    style={{ bottom: `${(value / 100) * 320}px` }}
                  />
                ))
              ) : selectedMetric === "homesUnderConstruction" ? (
                // Grid lines for homes
                [20, 15, 10, 5, 0].map((value) => (
                  <div 
                    key={value} 
                    className="absolute w-full border-b border-dashed border-light-200"
                    style={{ bottom: `${(value / 20) * 320}px` }}
                  />
                ))
              ) : (
                // Grid lines for communities
                [5, 4, 3, 2, 1, 0].map((value) => (
                  <div 
                    key={value} 
                    className="absolute w-full border-b border-dashed border-light-200"
                    style={{ bottom: `${(value / 5) * 320}px` }}
                  />
                ))
              )}

              {/* Bars */}
              <div className="absolute left-0 right-0 h-[320px]">
                {projectManagers.map((pm, index) => (
                  <div 
                    key={pm.name}
                    className="absolute w-1/5 group mx-2"
                    style={{ 
                      left: `${index * 20}%`,
                      bottom: '0'
                    }}
                  >
                    <div 
                      className={`bg-gradient-to-b ${pm.color} rounded-t-lg transition group-hover:opacity-80`}
                      style={{ 
                        height: selectedMetric === "onTimeCompletion" 
                          ? `${(pm[selectedMetric] / 100) * 320}px`
                          : selectedMetric === "homesUnderConstruction"
                            ? `${(pm[selectedMetric] / 20) * 320}px`
                            : `${(pm[selectedMetric] / 5) * 320}px`,
                        width: '60%', 
                        margin: '0 auto' 
                      }}
                    ></div>
                    <div className="mt-2 text-center text-sm text-dark-100 font-medium">{pm.name}</div>
                    <div className="text-center text-sm text-dark-50">{pm[selectedMetric]}{selectedMetric === "onTimeCompletion" ? "%" : ""}</div>
                    
                    {/* Hover Card */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-3 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-48 z-50">
                      <div className="text-sm font-medium text-dark-100 mb-2">{pm.name}</div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-dark-50">On Time Completion:</span>
                          <span className="text-dark-100 font-medium">{pm.onTimeCompletion}%</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-dark-50">Homes Under Construction:</span>
                          <span className="text-dark-100 font-medium">{pm.homesUnderConstruction}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-dark-50">Communities:</span>
                          <span className="text-dark-100 font-medium">{pm.communities}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
