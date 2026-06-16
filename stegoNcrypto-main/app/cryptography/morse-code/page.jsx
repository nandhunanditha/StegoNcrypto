"use client";

import { useState } from "react";

const morseCodeMap = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  0: "-----",
  1: ".----",
  2: "..---",
  3: "...--",
  4: "....-",
  5: ".....",
  6: "-....",
  7: "--...",
  8: "---..",
  9: "----.",
  " ": "/",
};

const reverseMorseCodeMap = Object.fromEntries(
  Object.entries(morseCodeMap).map(([k, v]) => [v, k])
);

export default function MorseTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const encrypt = () => {
    const upper = input.toUpperCase();
    const encoded = upper
      .split("")
      .map((char) => morseCodeMap[char] || "")
      .join(" ");
    setOutput(encoded);
  };

  const decrypt = () => {
    const decoded = input
      .split(" ")
      .map((code) => reverseMorseCodeMap[code] || "")
      .join("");
    setOutput(decoded);
  };

  return (
    <div className="w-full max-w-full mx-auto p-10 bg-gray-900 text-white rounded-xl shadow-xl space-y-6">
      <h2 className="text-3xl font-bold text-pink-400">📡 Morse Code Tool</h2>

      <textarea
        className="w-full p-4 text-lg bg-gray-800 border border-gray-600 rounded resize-y min-h-[150px]"
        placeholder="Enter text or Morse code here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="flex gap-4">
        <button
          onClick={encrypt}
          className="bg-pink-600 hover:bg-pink-500 px-6 py-3 rounded font-semibold"
        >
          Encrypt
        </button>
        <button
          onClick={decrypt}
          className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded font-semibold"
        >
          Decrypt
        </button>
      </div>

      <div className="bg-gray-800 p-4 rounded border border-gray-700">
        <h3 className="text-xl font-semibold text-pink-300 mb-2">Output:</h3>
        <p className="whitespace-pre-wrap text-lg">
          {output || "Your result will appear here..."}
        </p>
      </div>
    </div>
  );
}
