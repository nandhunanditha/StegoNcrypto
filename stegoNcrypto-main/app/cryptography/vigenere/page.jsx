"use client";

import { useState } from "react";

export default function VigenereTool() {
  const [input, setInput] = useState("");
  const [key, setKey] = useState("");
  const [result, setResult] = useState("");

  
  const formatKey = (text, keyword) => {
    keyword = keyword.replace(/[^a-zA-Z]/g, "").toUpperCase();
    let formattedKey = "";
    for (let i = 0, j = 0; i < text.length; i++) {
      const char = text[i];
      if (/[a-zA-Z]/.test(char)) {
        formattedKey += keyword[j % keyword.length];
        j++;
      } else {
        formattedKey += char;
      }
    }
    return formattedKey;
  };

  const encrypt = (text, keyword) => {
    const keyFormatted = formatKey(text, keyword);
    return text
      .split("")
      .map((char, i) => {
        if (!/[a-zA-Z]/.test(char)) return char;

        const base = char === char.toUpperCase() ? 65 : 97;
        const keyChar = keyFormatted[i].toUpperCase().charCodeAt(0) - 65;

        return String.fromCharCode(
          ((char.charCodeAt(0) - base + keyChar) % 26) + base
        );
      })
      .join("");
  };

  const decrypt = (text, keyword) => {
    const keyFormatted = formatKey(text, keyword);
    return text
      .split("")
      .map((char, i) => {
        if (!/[a-zA-Z]/.test(char)) return char;

        const base = char === char.toUpperCase() ? 65 : 97;
        const keyChar = keyFormatted[i].toUpperCase().charCodeAt(0) - 65;

        return String.fromCharCode(
          ((char.charCodeAt(0) - base - keyChar + 26) % 26) + base
        );
      })
      .join("");
  };

  return (
    <div className="w-full p-10 bg-gray-900 text-white rounded-xl shadow-2xl space-y-8">
      <h2 className="text-4xl font-bold text-pink-400">🔤 Vigenère Cipher Tool</h2>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your text here..."
        className="w-full p-6 text-xl rounded bg-gray-800 text-white border border-gray-600 resize-y min-h-[200px]"
      />

      <div>
        <label className="text-lg font-semibold block mb-2">Key (Keyword):</label>
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Enter your key"
          className="w-full p-3 bg-gray-800 border border-gray-600 rounded text-lg"
        />
      </div>

      <div className="flex gap-6 mt-4">
        <button
          onClick={() => setResult(encrypt(input, key))}
          className="bg-pink-600 hover:bg-pink-500 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Encrypt
        </button>
        <button
          onClick={() => setResult(decrypt(input, key))}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Decrypt
        </button>
      </div>

      <div className="bg-gray-800 p-6 rounded border border-gray-700 mt-6">
        <h3 className="text-2xl font-semibold mb-3 text-pink-300">Output:</h3>
        <p className="whitespace-pre-wrap text-lg text-gray-200">
          {result || "Your result will appear here..."}
        </p>
      </div>
    </div>
  );
}
