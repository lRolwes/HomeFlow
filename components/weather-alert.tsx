"use client";

import { useState } from "react";

interface WeatherAlertProps {
  title: string;
  description: string;
  jobs: string[];
}

export function WeatherAlert({ title, description, jobs }: WeatherAlertProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  return (
    <>
      {isDismissed ? (
        <></>
      ) : (
        <div className="m-4 p-10 text-blue-200">
          <div className="border-yellow-600 border-2 rounded-lg p-4 bg-yellow-50">
            <h2 className="text-lg font-medium mb-4 font-montserrat-alternates text-yellow-600">
              {title}
            </h2>
            <p className="text-sm font-circular-std mb-4 text-dark-100">
              {description} Click to see what projects are impacted.
            </p>
            <div className="flex justify-end gap-4">
              <button className="bg-yellow-600 border-yellow-600 border-2 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 hover:border-yellow-700 transition-colors duration-300">
                View Affected Jobs
              </button>

              <button
                onClick={() => setIsDismissed(true)}
                className="border-yellow-600 border-2 text-yellow-600 px-4 py-2 rounded-lg hover:bg-yellow-100 transition-colors duration-300"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
