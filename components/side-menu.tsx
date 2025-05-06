"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Settings,
  HelpCircle,
} from "lucide-react";
import Image from "next/image";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard size={24} />,
  },
  {
    title: "Scheduling",
    href: "/scheduling",
    icon: <Calendar size={24} />,
  },
  {
    title: "Production",
    href: "/production",
    icon: <Settings size={24} />,
  },
];

export function SideMenu() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<boolean>(false);
  
  return (
    <div className="relative flex">
      {/* Background dimming effect */}
      {hovered && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          aria-hidden="true"
        ></div>
      )}
      
      {/* Sidebar with fixed positioning */}
      <aside
        className="fixed top-0 left-0 h-full flex flex-col items-center py-6 bg-blue-200 shadow-sm transition-all duration-300 ease-in-out z-50"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: hovered ? "11rem" : "5rem",
        }}
      >
        {/* Logo */}
        <div className="mb-10">
          <Image
            className="h-8 w-10"
            src="/images/HomeFlow-Logomark-light.png"
            alt="Homeflow Logo"
            width={100}
            height={100}
          />
        </div>
        
        {/* Nav Icons */}
        <nav className="flex-1 flex flex-col gap-8 items-center">
          {menuItems.map(({ title, href, icon }) => {
            const isActive = pathname === href;
            return (
                              <Link
                key={href}
                href={href}
                className={`flex flex-row justify-center items-center ${!hovered && "w-full"} text-xs font-medium transition-all duration-200 ${
                  isActive ? "text-white" : "text-white"
                }`}
              >
                {/* Text: Only visible when expanded */}
                {icon}
                <span
                  className={`px-2 py-1 rounded-md text-white transition-all duration-200 ${
                    hovered ? "block opacity-100 text-sm" : "hidden opacity-0 w-0 h-0 overflow-hidden"
                  }`}
                >
                  {title}
                </span>
              </Link>
            );
          })}
        </nav>
        
        {/* Footer Icons */}
        <div className="mb-6 flex flex-col gap-6 items-center">
          <Link
            href="/support"
            className={`flex flex-col items-center ${!hovered && "w-full"} text-white text-xs transition`}
          >
            <div className="p-2 rounded-full hover:bg-blue-300 transition">
              <HelpCircle size={20} />
            </div>
            <span
              className={`px-2 py-1 transition-all duration-200 ${
                hovered ? "opacity-100 text-sm" : "opacity-0 w-0 h-0 overflow-hidden"
              }`}
            >
              Support
            </span>
          </Link>
        </div>
      </aside>
      
      {/* Main Content */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          hovered ? "ml-44" : "ml-20"
        }`}
      >
        {/* Your page content goes here */}
      </div>
    </div>
  );
}