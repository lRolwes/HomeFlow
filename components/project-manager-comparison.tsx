"use client"
import { BarChart } from "lucide-react";
import { useState } from "react";

const projectManagers = [
  { name: "John Smith", onTimeCompletion: 92, homesUnderConstruction: 15, communities: 3 },
  { name: "Jane Doe", onTimeCompletion: 88, homesUnderConstruction: 12, communities: 4 },
  { name: "Bob Johnson", onTimeCompletion: 95, homesUnderConstruction: 18, communities: 5 },
  { name: "Alice Brown", onTimeCompletion: 85, homesUnderConstruction: 10, communities: 2 },
];

type Metric = "onTimeCompletion" | "homesUnderConstruction" | "communities";

export function ProjectManagerComparison() {
  const [selectedMetric, setSelectedMetric] = useState<Metric>("onTimeCompletion");

  return (
    <div className="bg-light-50 p-8 rounded-lg shadow-md m-12">
      <h1 className="text-3xl font-bold mb-4 text-dark-100">Project Manager Comparison</h1>
      
      <div className="mb-8">
        <label htmlFor="metric" className="block text-sm font-medium text-dark-100 mb-1">Select Metric:</label>
        <select 
          id="metric"
          value={selectedMetric}
          onChange={(e) => setSelectedMetric(e.target.value as Metric)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-100 focus:border-blue-100 sm:text-sm rounded-md"
        >
          <option value="onTimeCompletion">% On Time Completion</option>  
          <option value="homesUnderConstruction"># Homes Under Construction</option>
          <option value="communities"># Communities</option>
        </select>
      </div>

      <div className="h-80 relative">
        {projectManagers.map((pm, index) => (
          <div 
            key={pm.name}
            className="absolute bottom-0 w-1/5 group mx-2"
            style={{ left: `${index * 20}%` }}
          >
            <div 
              className="bg-blue-100 rounded-t-lg transition group-hover:bg-blue-300"
              style={{ height: `${(pm[selectedMetric] / 100) * 320}px`, width: '80%', margin: '0 auto' }}
            ></div>
            <div className="mt-2 text-center text-sm text-dark-100 font-medium">{pm.name}</div>
            <div className="text-center text-sm text-dark-50">{pm[selectedMetric]}{selectedMetric === "onTimeCompletion" ? "%" : ""}</div>
          </div>
        ))}
      </div>
      
    </div>
  );
}
