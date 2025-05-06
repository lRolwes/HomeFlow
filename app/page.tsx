import Image from "next/image";
import { AIChatInterface } from "../components/ai-chat-interface";
import { ProjectManagerComparison } from "../components/project-manager-comparison";
import { TradeComparison } from "@/components/trade-comparison";
import { WeatherAlert } from "@/components/weather-alert";
import { NeighborhoodMap } from "@/components/neighborhood-map";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CancellationAlert } from "@/components/cancellation-alert";

export default function Home() {
  return (
    <div className="min-h-screen bg-light-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* alerts */}
        <WeatherAlert />
        <CancellationAlert />

        {/* weekly summary */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold font-montserrat-alternates text-dark-100">
            Weekly Summary
          </h1>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-blue-200">
                  Homes Under Construction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-6xl font-bold font-circular-std text-dark-100">54</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-blue-200">
                  Finishes This Week
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-6xl font-bold font-circular-std text-dark-100">3</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-blue-200">
                  Jobsite Health
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="w-full h-3 bg-light-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-dark-100 rounded-full transition-all duration-500"
                      style={{ width: "95%" }}
                    />
                  </div>
                  <p className="text-2xl font-bold font-circular-std text-dark-100">95%</p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-blue-200">
                  Progress to Yearly Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="w-full h-3 bg-light-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-dark-100 rounded-full transition-all duration-500"
                      style={{ width: "95%" }}
                    />
                  </div>
                  <p className="text-2xl font-bold font-circular-std text-dark-100">95%</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-full">
            <ProjectManagerComparison />
          </div>
          <div className="h-full">
            <TradeComparison />
          </div>
        </div>

        {/* Neighborhood Map */}
        <NeighborhoodMap />

        {/* AI Analyst */}
        <div className="mt-8">
          <AIChatInterface />
        </div>
      </div>
    </div>
  );
}
