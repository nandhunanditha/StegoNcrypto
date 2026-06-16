"use client";

import { useRouter, usePathname } from "next/navigation";
import { Image, EyeOff, Eye, ShieldCheck } from "lucide-react"; 

export default function SteganographyMenu() {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { label: "Home", path: "/steganography", icon: <Image size={20} /> },
    { label: "LSB", path: "/steganography/lsb", icon: <Eye size={20} /> },
    { label: "Spectral Analyzer", path: "/steganography/spectralanalyser", icon: <Eye size={20} /> },
    { label: "XOR-Encryption", path: "/steganography/xor-encrypt", icon: <Eye size={20} /> },
    { label: "DTMF-Decoder", path: "/steganography/dmtf", icon: <Eye size={20} /> },
    { label: "QR-Encode", path: "/steganography/mirror-rename", icon: <Eye size={20} /> },
    { label: "Go To Home", path: "/", icon: <ShieldCheck size={20} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white shadow-lg p-6 border-r border-gray-700 z-50">
      <h2 className="text-2xl font-extrabold mb-10 tracking-wide text-indigo-400">
        🖼️ Steganography
      </h2>
      <ul className="space-y-4">
        {menuItems.map(({ label, path, icon }) => (
          <li
            key={path}
            onClick={() => router.push(path)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all 
              ${
                pathname === path
                  ? "bg-indigo-600 text-white shadow-md"
                  : "hover:bg-gray-700 text-gray-300"
              }`}
          >
            {icon}
            <span className="font-medium">{label}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}
