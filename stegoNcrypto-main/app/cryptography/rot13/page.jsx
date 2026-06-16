"use client";

import { useState } from "react";

export default function RotCipherTool() {
  const [input, setInput] = useState("");
  const [rotValue, setRotValue] = useState(13);
  const [result, setResult] = useState("");

  const rotEncrypt = (text, shift) => {
    return text.replace(/[a-zA-Z]/g, (char) => {
      const start = char <= "Z" ? 65 : 97;
      return String.fromCharCode(
        ((char.charCodeAt(0) - start + shift) % 26) + start
      );
    });
  };

  const rotDecrypt = (text, shift) => {
    return rotEncrypt(text, 26 - (shift % 26));
  };

  return (
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-8 py-16">
      <h1 className="text-4xl font-extrabold mb-6 text-pink-400">
        🔁 ROT-N Cipher Tool
      </h1>
      <p className="text-gray-300 mb-10 max-w-2xl">
        The ROT-N cipher is a simple letter substitution cipher that shifts each letter in the plaintext by N positions in the alphabet. It's a type of Caesar cipher commonly used for basic obfuscation.
      </p>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your text here..."
        className="w-full p-6 text-xl rounded bg-gray-800 text-white border border-gray-600 resize-y min-h-[200px]"
      />

      <div className="flex items-center gap-6">
        <label className="text-lg font-semibold">Shift Value (N):</label>
        <input
          type="number"
          value={rotValue}
          onChange={(e) => setRotValue(Number(e.target.value))}
          className="w-28 p-3 bg-gray-800 border border-gray-600 rounded text-center text-lg"
        />
      </div>

      <div className="flex gap-6 mt-4">
        <button
          onClick={() => setResult(rotEncrypt(input, rotValue))}
          className="bg-pink-600 hover:bg-pink-500 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Encrypt
        </button>
        <button
          onClick={() => setResult(rotDecrypt(input, rotValue))}
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
