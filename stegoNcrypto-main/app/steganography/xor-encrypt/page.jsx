"use client";

import { useRef, useState } from "react";

export default function XORRevealTool() {
  const [imageAUrl, setImageAUrl] = useState(null);
  const [imageBUrl, setImageBUrl] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);
  const canvasRef = useRef(null);

  const handleFileChange = (e, setImageUrl) => {
    const file = e.target.files[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const performXOR = async () => {
    if (!imageAUrl || !imageBUrl) {
      alert("Please upload both Image A and Image B.");
      return;
    }

    const imgA = new Image();
    const imgB = new Image();
    imgA.src = imageAUrl;
    imgB.src = imageBUrl;

    await Promise.all([
      new Promise((res) => (imgA.onload = res)),
      new Promise((res) => (imgB.onload = res)),
    ]);

    const width = Math.min(imgA.width, imgB.width);
    const height = Math.min(imgA.height, imgB.height);

    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(imgA, 0, 0, width, height);
    const dataA = ctx.getImageData(0, 0, width, height);

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(imgB, 0, 0, width, height);
    const dataB = ctx.getImageData(0, 0, width, height);

    const xorData = ctx.createImageData(width, height);

    for (let i = 0; i < dataA.data.length; i += 4) {
      const grayA = dataA.data[i];
      const grayB = dataB.data[i];

      const xor = grayA ^ grayB;

      xorData.data[i] = xor;
      xorData.data[i + 1] = xor;
      xorData.data[i + 2] = xor;
      xorData.data[i + 3] = 255;
    }

    ctx.putImageData(xorData, 0, 0);
    setResultUrl(canvas.toDataURL("image/png"));
  };

  const downloadResult = () => {
    const link = document.createElement("a");
    link.href = resultUrl;
    link.download = "xor_result.png";
    link.click();
  };

  return (
    <div className="p-10 bg-gray-900 text-white min-h-screen space-y-6">
      <h2 className="text-3xl font-bold text-pink-400">
        🖼️ XOR Message Reveal Tool
      </h2>

      <div className="grid sm:grid-cols-2 gap-10">
        <div>
          <label className="block mb-2 font-medium">Upload Image I</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, setImageAUrl)}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium"
          />
          {imageAUrl && (
            <div className="mt-4">
              <img
                src={imageAUrl}
                alt="Image A"
                className="border border-gray-700 rounded"
              />
              <p className="mt-2 text-sm text-gray-400 text-center">Image A</p>
            </div>
          )}
        </div>

        <div>
          <label className="block mb-2 font-medium">Upload Image II</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, setImageBUrl)}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium"
          />
          {imageBUrl && (
            <div className="mt-4">
              <img
                src={imageBUrl}
                alt="Image B"
                className="border border-gray-700 rounded"
              />
              <p className="mt-2 text-sm text-gray-400 text-center">Image B</p>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={performXOR}
        className="mt-6 px-6 py-3 bg-pink-600 hover:bg-pink-500 rounded-lg font-semibold"
      >
        Perform XOR
      </button>

      {resultUrl && (
        <div className="mt-10 space-y-4">
          <h3 className="text-xl font-semibold text-green-400">
            🧪 XOR Result:
          </h3>
          <img
            src={resultUrl}
            alt="XOR Result"
            className="rounded border border-gray-600"
          />
          <button
            onClick={downloadResult}
            className="px-5 py-2 bg-green-600 hover:bg-green-500 rounded"
          >
            Download XOR Image
          </button>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
