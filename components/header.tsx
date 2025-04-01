import Image from "next/image";

export const Header = () => {
  return (
    <div className="flex justify-start gap-4 items-center bg-blue-300 px-14 py-8 ">
      <Image
        className="h-8 w-10"
        src="/images/HomeFlow-Logomark-light.png"
        alt="Homeflow Logo"
        width={100}
        height={100}
      />
      <h1 className="text-2xl font-medium mb-4 font-montserrat-alternates text-light-50 mt-4">
        Homeflow
      </h1>
    </div>
  );
};
