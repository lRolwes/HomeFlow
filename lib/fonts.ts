import { Poppins, Montserrat_Alternates } from "next/font/google";
import localFont from "next/font/local";

export const poppins = Poppins({
    variable: "--font-poppins",
    weight: ['400', '500', '600', '700'],
    subsets: ["latin"],
  });
  
export const montserratAlternates = Montserrat_Alternates({
    variable: "--font-montserrat-alternates",
    subsets: ["latin"],
    weight: ['400', '500', '600', '700'],
});

export const circularStd = localFont({
    src: [
      {
        path: "../public/fonts/CircularStd-Book.woff2",
        weight: "400",
        style: "normal",
      },
      {
        path: "../public/fonts/CircularStd-Book.woff",
        weight: "400",
        style: "normal",
      },
      {
        path: "../public/fonts/CircularStd-Bold.woff2",
        weight: "700",
        style: "normal",
      },
      {
        path: "../public/fonts/CircularStd-Bold.woff",
        weight: "700",
        style: "normal",
      },
    ],
    variable: "--font-circular-std",
  });