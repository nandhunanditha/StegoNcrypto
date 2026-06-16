"use client";

import { useState, useRef } from "react";

export default function ImageSteganographyTool() {
  const [secret, setSecret] = useState("");
  const [revealed, setRevealed] = useState("");
  const [imageSrc, setImageSrc] = useState(null);
  const [encodedReady, setEncodedReady] = useState(false);
  const canvasRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
      setEncodedReady(false);
      setRevealed("");
    };
    reader.readAsDataURL(file);
  };

  const handleEncode = () => {
    if (!secret || !imageSrc) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      const message = secret + "\0";
      let msgIndex = 0;

      for (let i = 0; i < data.length; i += 8) {
        if (msgIndex < message.length) {
          const charCode = message.charCodeAt(msgIndex);
          data[i] = (data[i] & 0b11111110) | ((charCode >> 7) & 1);
          data[i + 1] = (data[i + 1] & 0b11111110) | ((charCode >> 6) & 1);
          data[i + 2] = (data[i + 2] & 0b11111110) | ((charCode >> 5) & 1);
          data[i + 3] = (data[i + 3] & 0b11111110) | ((charCode >> 4) & 1);
          data[i + 4] = (data[i + 4] & 0b11111110) | ((charCode >> 3) & 1);
          data[i + 5] = (data[i + 5] & 0b11111110) | ((charCode >> 2) & 1);
          data[i + 6] = (data[i + 6] & 0b11111110) | ((charCode >> 1) & 1);
          data[i + 7] = (data[i + 7] & 0b11111110) | ((charCode >> 0) & 1);
          msgIndex++;
        } else {
          break;
        }
      }

      ctx.putImageData(imageData, 0, 0);
      setEncodedReady(true);
      alert("Message encoded successfully!");
    };
    img.src = imageSrc;
  };

  const handleDecode = () => {
    if (!imageSrc) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      let chars = [];
      for (let i = 0; i < data.length; i += 8) {
        let charCode = 0;
        charCode |= (data[i] & 1) << 7;
        charCode |= (data[i + 1] & 1) << 6;
        charCode |= (data[i + 2] & 1) << 5;
        charCode |= (data[i + 3] & 1) << 4;
        charCode |= (data[i + 4] & 1) << 3;
        charCode |= (data[i + 5] & 1) << 2;
        charCode |= (data[i + 6] & 1) << 1;
        charCode |= (data[i + 7] & 1) << 0;

        if (charCode === 0) break;
        chars.push(String.fromCharCode(charCode));
      }

      setRevealed(chars.join(""));
    };
    img.src = imageSrc;
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "encoded-image.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="max-full mx-auto p-8 bg-gray-900 text-white rounded-xl shadow-xl space-y-6">
      <h2 className="text-3xl font-bold text-pink-400">
        🖼️ Image Steganography
      </h2>

      <input
        type="file"
        placeholder="Upload a Image"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium"
      />

      {imageSrc && (
        <>
          <img src={imageSrc} alt="Uploaded" className="max-w-full rounded" />
          <canvas ref={canvasRef} className="hidden"></canvas>

          <textarea
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Enter secret message to hide..."
            className="w-full p-4 bg-gray-800 border border-gray-600 rounded text-white min-h-[100px]"
          />

          <div className="flex flex-wrap gap-4 mt-4">
            <button
              onClick={handleEncode}
              className="bg-pink-600 hover:bg-pink-500 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Encode Message
            </button>

            <button
              onClick={handleDecode}
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Decode Message
            </button>

            {encodedReady && (
              <button
                onClick={handleDownload}
                className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Download Image
              </button>
            )}
          </div>

          {revealed && (
            <div className="mt-6 bg-gray-800 p-4 rounded border border-gray-700">
              <h3 className="text-xl font-semibold text-pink-300">
                Revealed Message:
              </h3>
              <p className="text-gray-200 mt-2">{revealed}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
