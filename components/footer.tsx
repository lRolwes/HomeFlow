"use client";

import Link from "next/link";
import Image from "next/image"; // Make sure you import Image from next/image

export function Footer() {
  return (
    <footer className="bg-orange-100 py-8 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center px-6">
        {/* Logo */}
        <div className="flex items-center mb-4 sm:mb-0">
          <Image
            className="h-12 w-auto"
            src="/images/HomeFlow-Logomark-light.png"
            alt="Homeflow Logo"
            width={100}
            height={100}
          />
        </div>

        {/* Links */}
        <div className="flex gap-8 text-lg font-medium text-blue-600">
          <Link href="/dashboard" className="hover:text-blue-800">
            Dashboard
          </Link>
          <Link href="/scheduling" className="hover:text-blue-800">
            Scheduling
          </Link>
          <Link href="/production" className="hover:text-blue-800">
            Production
          </Link>
        </div>

        {/* Support Number */}
        <div className="mt-4 sm:mt-0 text-sm text-gray-600">
          <p className="text-gray-700">
            <strong>Support: </strong>
            <a href="tel:+13149317176" className="text-blue-600 hover:text-blue-800">
              (314) 931-7176
            </a>
          </p>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-300 pt-4 mt-4 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} HomeFlow. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
