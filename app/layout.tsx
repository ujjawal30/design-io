import { ReactNode } from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";

import Room from "@/components/liveblocks/Room";
import { cn } from "@/lib/utils";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata: Metadata = {
  title: "design.io",
  description:
    "A modern Figma clone built with Fabric.js and Liveblocks for real-time collaboration and design 🚀",
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html lang="en">
      <body className={cn(poppins.className, "bg-primary-grey-200")}>
        <Room>{children}</Room>
      </body>
    </html>
  );
};

export default RootLayout;
