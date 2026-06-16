"use client";

import { useState } from "react";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleEncrypt = () => {
    try {
      const encoded = btoa(input);
      setOutput(encoded);
      setError("");
    } catch (e) {
      setError("Failed to encode. Please check your input.");
    }
  };

  const handleDecrypt = () => {
    try {
      const decoded = atob(input);
      setOutput(decoded);
      setError("");
    } catch (e) {
      setError("Failed to decode. Please ensure it's valid Base64.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-8 py-16">
      <h1 className="text-4xl font-extrabold mb-6 text-pink-400">
        🧬 Base64 Encoder / Decoder
      </h1>
      <p className="text-gray-300 mb-10 max-w-2xl">
        Easily encode or decode Base64 messages. This is useful for transmitting binary data over media that are designed to deal with textual data.
      </p>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text to encode or decode..."
        className="w-full h-40 p-4 rounded-lg bg-gray-800 text-white border border-gray-600 mb-6 focus:outline-none focus:ring-2 focus:ring-pink-500"
      />

      <div className="flex gap-4 mb-6">
        <button
          onClick={handleEncrypt}
          className="bg-pink-600 hover:bg-pink-500 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Encrypt (Encode)
        </button>
        <button
          onClick={handleDecrypt}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Decrypt (Decode)
        </button>
      </div>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      <div>
        <h2 className="text-xl font-semibold mb-2 text-pink-400">Result:</h2>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-600 whitespace-pre-wrap break-words">
          {output || <span className="text-gray-500">Output will appear here...</span>}
        </div>
      </div>
    </div>
  );
}
