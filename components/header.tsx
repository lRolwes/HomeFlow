import Image from "next/image";

export const Header = () => {
  return (
    <div className="flex justify-between items-center bg-blue-300 px-14 py-8">
      <div className="flex items-center space-x-4 ml-auto">
        <h1 className="text-2xl font-medium mb-4 font-montserrat-alternates text-light-50 mt-4">
          Homeflow
        </h1>
        <Image
          className="h-8 w-10"
          src="/images/HomeFlow-Logomark-light.png"
          alt="Homeflow Logo"
          width={100}
          height={100}
        />
      </div>
    </div>
  );
};
