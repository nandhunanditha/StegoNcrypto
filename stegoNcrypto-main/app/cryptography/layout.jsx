"use client";

import CryptographyMenu from "@/components/menus/CryptographyMenu";

export default function CryptographyLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-white text-gray-900">
      <CryptographyMenu />
      <main className="ml-64 p-6 flex-grow  bg-black">{children}</main>
    </div>
  );
}
