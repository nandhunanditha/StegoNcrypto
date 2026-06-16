"use client";

import { useRouter, usePathname } from "next/navigation";
import { ShieldCheck, Lock, Unlock } from "lucide-react"; // Optional icons, can be replaced or removed

export default function CryptographyMenu() {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { label: "Home", path: "/cryptography", icon: <ShieldCheck size={20} /> },
    { label: "ROT13", path: "/cryptography/rot13", icon: <Lock size={20} /> },
    { label: "Base64", path: "/cryptography/base64", icon: <Lock size={20} /> },
    { label: "RSA", path: "/cryptography/rsa", icon: <Lock size={20} /> },
    { label: "VIGENERE", path: "/cryptography/vigenere", icon: <Lock size={20} /> },
    { label: "HexaHue", path: "/cryptography/HexaHue", icon: <Lock size={20} /> },
    { label: "Morse Code", path: "/cryptography/morse-code", icon: <Lock size={20} /> },
    { label: "Home Page", path: "/", icon: <ShieldCheck size={20} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white shadow-lg p-6 border-r border-gray-700 z-50">
      <h2 className="text-2xl font-extrabold mb-10 tracking-wide text-pink-400">🔐Cryptography</h2>
      <ul className="space-y-4">
        {menuItems.map(({ label, path, icon }) => (
          <li
            key={path}
            onClick={() => router.push(path)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all 
              ${
                pathname === path
                  ? "bg-pink-600 text-white shadow-md"
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
