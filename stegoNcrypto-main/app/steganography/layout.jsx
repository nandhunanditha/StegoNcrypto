"use client";

import SteganographyMenu from "@/components/menus/SteganographyMenu";

export default function SteganographyLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-white text-gray-900">
      <SteganographyMenu />
      <main className="ml-64 p-6 flex-grow  bg-black">{children}</main>
    </div>
  );
}
