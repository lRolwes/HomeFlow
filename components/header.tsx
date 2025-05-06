import Image from "next/image";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

export const Header = () => {
  return (
    <div className="flex justify-between items-center bg-blue-200 px-14 py-4 overscroll-none touch-none relative">
      <div className="absolute inset-0 bg-blue-200 -z-10" />
      <div className="flex items-center space-x-4 ml-8">
        <h1 className="text-2xl font-medium mb-4 font-montserrat-alternates text-light-50 mt-4">
          Builder Console
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/messages" className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-300 hover:bg-blue-400 transition-colors">
          <MessageCircle className="h-5 w-5 text-light-50" />
        </Link>
        <Link href="/profile" className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-300 hover:bg-blue-400 transition-colors">
          <span className="text-light-50 font-medium">J</span>
        </Link>
      </div>
    </div>
  );
};
