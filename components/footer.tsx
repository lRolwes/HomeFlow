"use client";

import Link from "next/link";
import Image from "next/image"; // Make sure you import Image from next/image

export function Footer() {
  return (
    <footer className="bg-gray-100 py-8 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col px-6">
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            className="h-12 w-auto brightness-0 opacity-70"
            src="/images/HomeFlow-Logomark-light.png"
            alt="Homeflow Logo"
            width={100}
            height={100}
          />
        </div>

        {/* Bottom Copyright and Support */}
        <div className="border-t border-gray-300 pt-4 mt-4 text-center text-sm text-gray-500">
        <p className="text-gray-700">
            <strong>Support: </strong>
            <a href="tel:+13149317176" className="text-blue-600 hover:text-blue-800">
              (314) 931-7176
            </a>
          </p>
          <p className="mb-2">&copy; {new Date().getFullYear()} HomeFlow. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
