import Image from "next/image";
import { AIChatInterface } from "../components/ai-chat-interface";
import { ProjectManagerComparison } from "../components/project-manager-comparison";
import { TradeComparison } from "@/components/trade-comparison";

export default function Home() {
  return (
    <div className="px-[100px] bg-light-50">
      {/* Header with logo and Homeflow name*/}
      <div className="flex justify-start gap-4 items-center bg-light-50 px-14 py-4">
        <Image className="h-8 w-10" src="/images/HomeFlow-Logomark-dark.png" alt="Homeflow Logo" width={100} height={100} />
        <h1 className="text-2xl font-medium mb-4 font-montserrat-alternates text-dark-100 mt-4">Homeflow</h1>
      </div>

      {/* alerts */}
      <div className="m-4 p-10 text-blue-200">
      <div className=" border-yellow-600 border-2 rounded-lg p-4 bg-yellow-50">
        <h2 className="text-lg font-medium mb-4 font-montserrat-alternates text-yellow-600">Weather Alert</h2>
        <p className="text-sm font-circular-std mb-4 text-dark-100">There is a 60% chance of rain this Thursday which may effect the following jobs: Crooked Creek 79, Whispering Pines 1</p>
        {/* dismiss button */}
        <div className="flex justify-end">
          <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors duration-300">Dismiss</button>
        </div>
      </div>
      </div>



      {/* weekly summary */}
      <div className="m-4 p-10 text-blue-200">
        <h1 className="text-lg font-2xl mb-4 font-montserrat-alternates font-bold text-blue-200">Weekly Summary</h1>
       <div className="flex justify-between flex-row">
        <div className="flex flex-col items-center justify-center p-8 rounded rounded-md shadow-xl bg-light-100 border-4 border-dark-100">
          <h3 className="text-lg font-medium mb-4 font-montserrat-alternates text-blue-200">Homes Under Construction</h3>
          <p className="text-8xl font-circular-std mb-4 text-dark-100">54</p>
       </div>
       <div className="flex flex-col items-center justify-center p-8 rounded rounded-md shadow-xl bg-light-100 border-4 border-dark-100">
          <h3 className="text-lg font-medium mb-4 font-montserrat-alternates text-blue-200">Finishes This Week</h3>
          <p className="text-8xl font-circular-std mb-4 text-dark-100">3</p>
       </div>
       <div className="flex flex-col items-center justify-center p-8 rounded rounded-md shadow-xl bg-light-100 border-4 border-dark-100">
        <h3 className="text-lg font-medium mb-4 font-montserrat-alternates text-blue-200">Jobsite Health</h3>
        <div className="w-full h-4 bg-gray-300 rounded-full">
          <div className="h-4 bg-dark-100 rounded-full" style={{ width: '95%' }}></div>
        </div>
       </div>
       <div className="flex flex-col items-center justify-center p-8 rounded rounded-md shadow-xl bg-light-100 border-4 border-dark-100">
          <h3 className="text-lg font-medium mb-4 font-montserrat-alternates text-blue-200">Progress to Yearly Goal</h3>
          <div className="w-full h-4 bg-gray-300 rounded-full">
            <div className="h-4 bg-dark-100 rounded-full" style={{ width: '95%' }}></div>
          </div>
       </div>
       </div>
      </div>    
    
      <ProjectManagerComparison /> 

      <TradeComparison />

      {/* AI Analyst */}
      <div className="m-4 p-10 text-blue-200">
        <AIChatInterface />
      </div>

      {/* <h1 className="text-4xl font-bold mb-4">Font Test</h1>
      <p className="text-lg font-circular-std mb-4">This is Circular Std</p>
      <p className="text-lg font-poppins mb-4">This is Poppins</p>
      <p className="text-lg font-montserrat-alternates mb-4">This is Montserrat Alternates</p>
      <p className="text-lg mb-4">This is the default font</p>
      
      <div className="mt-8 p-4 bg-blue-100 text-white">Blue 100 background</div>
      <div className="mt-4 p-4 bg-orange text-white">Orange background</div> */}
    </div>
  );
}
