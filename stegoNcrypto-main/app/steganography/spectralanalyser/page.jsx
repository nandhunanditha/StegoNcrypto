"use client";
import { useEffect, useRef, useState } from "react";

export default function AudioSpectrogram() {
  const [audioFile, setAudioFile] = useState(null);
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const animationRef = useRef();
  const drawXRef = useRef(0);
  const handleFileChange = (e) => {
    if (audioFile) {
      URL.revokeObjectURL(audioFile);
    }
    const file = e.target.files[0];
    if (file) {
      setAudioFile(URL.createObjectURL(file));
    } else {
      setAudioFile(null);
    }
  };

  const mapMagnitudeToColor = (magnitude) => {
    const gray = magnitude;
    return `rgb(${gray}, ${gray}, ${gray})`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    const canvas = canvasRef.current;
    let ctx = null;

    const cleanup = () => {
      console.log("Running cleanup...");
      cancelAnimationFrame(animationRef.current);

      if (sourceRef.current) {
        sourceRef.current.disconnect();
        sourceRef.current = null;
      }
      if (analyserRef.current) {
        analyserRef.current.disconnect();
        analyserRef.current = null;
      }

      if (
        audioContextRef.current &&
        audioContextRef.current.state !== "closed"
      ) {
        audioContextRef.current
          .close()
          .then(() => {
            console.log("AudioContext closed.");
            audioContextRef.current = null;
          })
          .catch((e) => console.error("Error closing AudioContext:", e));
      }

      if (audio) {
        audio.removeEventListener("play", handlePlay);
        audio.removeEventListener("pause", handlePauseOrEnd);
        audio.removeEventListener("ended", handlePauseOrEnd);
      }

      console.log("Cleanup finished.");
    };

    if (!audio || !canvas || !audioFile) {
      cleanup();
      return;
    }

    ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("Could not get canvas context");
      cleanup();
      return;
    }

    if (!audioContextRef.current) {
      try {
        audioContextRef.current = new (window.AudioContext ||
          window.webkitAudioContext)();
        analyserRef.current = audioContextRef.current.createAnalyser();
        sourceRef.current =
          audioContextRef.current.createMediaElementSource(audio);

        sourceRef.current.connect(analyserRef.current);
        analyserRef.current.connect(audioContextRef.current.destination);

        analyserRef.current.fftSize = 2048;
        analyserRef.current.smoothingTimeConstant = 0;
        console.log("AudioContext and Analyser created and connected.");
      } catch (e) {
        console.error("Error creating AudioContext:", e);
        cleanup();
        return;
      }
    }

    const analyser = analyserRef.current;
    const audioCtx = audioContextRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const minFreq = 20;
    const maxFreq = audioCtx.sampleRate / 2;
    const logMinFreq = Math.log(minFreq);
    const logMaxFreq = Math.log(maxFreq);
    const logRange = logMaxFreq - logMinFreq;

    drawXRef.current = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log("Canvas cleared and draw position reset.");

    const drawSpectrogram = () => {
      animationRef.current = requestAnimationFrame(drawSpectrogram);

      analyser.getByteFrequencyData(dataArray);

      const x = drawXRef.current;

      const columnWidth = 1;

      if (x + columnWidth > canvas.width) {
        drawXRef.current = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      const currentX = drawXRef.current;

      for (let i = 0; i < bufferLength; i++) {
        const magnitude = dataArray[i];

        const frequency = i * (audioCtx.sampleRate / analyser.fftSize);

        const clampedFrequency = Math.max(frequency, minFreq);

        const normalizedLogFrequency =
          (Math.log(clampedFrequency) - logMinFreq) / logRange;

        const freqY = canvas.height - normalizedLogFrequency * canvas.height;

        if (freqY >= 0 && freqY < canvas.height) {
          const color = mapMagnitudeToColor(magnitude);
          ctx.fillStyle = color;

          ctx.fillRect(currentX, freqY, columnWidth, 1);
        }
      }

      drawXRef.current += columnWidth;
    };

    const handlePlay = () => {
      console.log("Audio play event.");

      if (
        audioContextRef.current &&
        audioContextRef.current.state === "suspended"
      ) {
        audioContextRef.current
          .resume()
          .then(() => {
            console.log("AudioContext resumed.");

            drawSpectrogram();
          })
          .catch((e) => console.error("Error resuming AudioContext:", e));
      } else {
        drawSpectrogram();
      }
    };

    const handlePauseOrEnd = () => {
      console.log("Audio pause or ended event. Stopping animation frame.");
      cancelAnimationFrame(animationRef.current);
    };

    console.log("Adding audio event listeners.");
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePauseOrEnd);
    audio.addEventListener("ended", handlePauseOrEnd);

    return cleanup;
  }, [audioFile]);

  return (
    <div className="flex flex-col items-center gap-6 p-10 bg-gray-900 text-white rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold text-pink-400">
        📊 Audio Spectrogram (Log Scale)
      </h2>

      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="w-full bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium"
      />

      {audioFile && (
        <>
          <audio
            ref={audioRef}
            src={audioFile}
            controls
            key={audioFile}
            className="mb-4"
          />
          <canvas
            ref={canvasRef}
            width={800}
            height={300}
            className="rounded border border-gray-600"
          />
          <p className="text-gray-400 text-sm mt-2">
            Spectrogram: Time (left to right), Frequency (bottom to top - Log
            Scale), Intensity (dark to light)
          </p>
        </>
      )}
    </div>
  );
}
