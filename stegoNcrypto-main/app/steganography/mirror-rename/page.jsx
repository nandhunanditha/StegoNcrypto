"use client";

import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import jsQR from "jsqr";

function binaryToText(binaryString) {
  if (!binaryString) return "";
  if (!/^[01]+$/.test(binaryString)) return null;
  if (binaryString.length % 8 !== 0) return null;
  let text = "";
  for (let i = 0; i < binaryString.length; i += 8) {
    const byte = binaryString.substring(i, i + 8);
    const charCode = parseInt(byte, 2);
    text += String.fromCharCode(charCode);
  }
  return text;
}

export default function QRCodeTool() {
  const [binaryInput, setBinaryInput] = useState("");
  const [decodedTextResult, setDecodedTextResult] = useState("");
  const qrRef = useRef(null);
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  const textToEncode = binaryToText(binaryInput);
  const isBinaryInputValid = binaryInput === "" || textToEncode !== null;

  const handleDownload = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "qr-code.png";
    a.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setDecodedTextResult("No file selected.");
      return;
    }

    setDecodedTextResult("Scanning...");

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });

        if (code) {
          setDecodedTextResult(code.data);
        } else {
          setDecodedTextResult("No QR code found in the image.");
        }
      };
      img.onerror = () => {
        setDecodedTextResult("Error loading image.");
      };
      img.src = e.target.result;
    };
    reader.onerror = () => {
      setDecodedTextResult("Error reading file.");
    };
    reader.readAsDataURL(file);
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="min-h-screen p-10 bg-gray-900 text-white flex flex-col items-center space-y-10">
      <h1 className="text-4xl font-bold text-pink-400 text-center">
        🔳 QR Code Generator & Scanner
      </h1>

      <div className="w-full max-w-xl bg-gray-800 rounded-xl p-6 space-y-4 shadow-lg">
        <h2 className="text-2xl font-semibold text-green-400">
          🔐 Encode Binary as QR
        </h2>
        <textarea
          value={binaryInput}
          onChange={(e) => setBinaryInput(e.target.value.trim())}
          placeholder="Enter 8-bit binary string (e.g., 0100100001100101011011000110110001101111 for 'hello')"
          className="w-full h-32 p-4 rounded-lg bg-gray-700 border border-gray-600 text-lg resize-none"
        />
        {!isBinaryInputValid && (
          <p className="text-red-400 text-center">
            Invalid binary input (must be 0s and 1s, multiple of 8 bits)
          </p>
        )}
        {binaryInput && isBinaryInputValid && (
          <div className="mt-2 bg-gray-700 p-3 rounded text-sm text-white">
            <strong>Converted Text:</strong>{" "}
            <span className="text-green-300 break-all">{textToEncode}</span>
          </div>
        )}
        {textToEncode && isBinaryInputValid && (
          <>
            <div
              ref={qrRef}
              className="bg-white p-4 rounded w-fit mx-auto mt-4"
            >
              <QRCodeCanvas
                value={textToEncode}
                size={200}
                bgColor="#ffffff"
                fgColor="#000000"
              />
            </div>
            <button
              onClick={handleDownload}
              className="block mx-auto bg-pink-600 hover:bg-pink-500 text-white px-6 py-2 rounded-lg font-medium"
            >
              Download QR Code
            </button>
          </>
        )}
      </div>

      <div className="w-full max-w-xl bg-gray-800 rounded-xl p-6 space-y-4 shadow-lg">
        <h2 className="text-2xl font-semibold text-blue-400">
          📷 Scan QR Code from Image
        </h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
        <button
          onClick={triggerFileSelect}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium"
        >
          Select Image File
        </button>

        {decodedTextResult && (
          <div className="mt-4 bg-gray-700 p-4 rounded text-lg text-white">
            <strong>Decoded Text:</strong>
            <p className="mt-2 text-green-300 break-all">{decodedTextResult}</p>
          </div>
        )}

        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      </div>
    </div>
  );
}
