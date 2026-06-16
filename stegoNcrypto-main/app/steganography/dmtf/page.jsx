"use client";
import { useEffect, useRef, useState } from "react";

const DTMF_LOW_FREQUENCIES = [697, 770, 852, 941];
const DTMF_HIGH_FREQUENCIES = [1209, 1336, 1477, 1633];

const DTMF_MAP = {
  "697,1209": "1",
  "697,1336": "2",
  "697,1477": "3",
  "697,1633": "A",
  "770,1209": "4",
  "770,1336": "5",
  "770,1477": "6",
  "770,1633": "B",
  "852,1209": "7",
  "852,1336": "8",
  "852,1477": "9",
  "852,1633": "C",
  "941,1209": "*",
  "941,1336": "0",
  "941,1477": "#",
  "941,1633": "D",
};

const FREQUENCY_TOLERANCE = 15;
const MAGNITUDE_THRESHOLD_DB = -40;
const TONE_DETECT_FRAMES = 5;
const SILENCE_DETECT_FRAMES = 15;

export default function DtmfAsciiDecoder() {
  const [audioFile, setAudioFile] = useState(null);
  const [decodedDtmf, setDecodedDtmf] = useState("");
  const [decodedAsciiText, setDecodedAsciiText] = useState("");
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const animationRef = useRef();

  const detectionStateRef = useRef({
    currentTone: null,
    toneFrameCount: 0,
    silenceFrameCount: 0,
    lastDecodedTone: null,

    lastDecodedChar: null,
  });

  const handleFileChange = (e) => {
    if (audioFile) {
      URL.revokeObjectURL(audioFile);
    }
    const file = e.target.files[0];
    if (file) {
      setAudioFile(URL.createObjectURL(file));
      setDecodedDtmf("");
      setDecodedAsciiText("");
      detectionStateRef.current = {
        currentTone: null,
        toneFrameCount: 0,
        silenceFrameCount: 0,
        lastDecodedTone: null,
        lastDecodedChar: null,
      };
    } else {
      setAudioFile(null);
      setDecodedDtmf("");
      setDecodedAsciiText("");
      detectionStateRef.current = {
        currentTone: null,
        toneFrameCount: 0,
        silenceFrameCount: 0,
        lastDecodedTone: null,
        lastDecodedChar: null,
      };
    }
  };

  useEffect(() => {
    const audio = audioRef.current;

    const cleanup = () => {
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
            audioContextRef.current = null;
          })
          .catch((e) => console.error("Error closing AudioContext:", e));
      }

      if (audio) {
        audio.removeEventListener("play", handlePlay);
        audio.removeEventListener("pause", handlePauseOrEnd);
        audio.removeEventListener("ended", handlePauseOrEnd);
      }
    };

    if (!audio || !audioFile) {
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
      } catch (e) {
        console.error("Error creating AudioContext:", e);
        cleanup();
        return;
      }
    }

    const analyser = analyserRef.current;
    const audioCtx = audioContextRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Float32Array(bufferLength);

    const dtmfBins = {
      low: DTMF_LOW_FREQUENCIES.map((freq) => ({
        freq,
        bin: Math.round((freq * analyser.fftSize) / audioCtx.sampleRate),
        binMin: Math.round(
          ((freq - FREQUENCY_TOLERANCE) * analyser.fftSize) /
            audioCtx.sampleRate
        ),
        binMax: Math.round(
          ((freq + FREQUENCY_TOLERANCE) * analyser.fftSize) /
            audioCtx.sampleRate
        ),
      })),
      high: DTMF_HIGH_FREQUENCIES.map((freq) => ({
        freq,
        bin: Math.round((freq * analyser.fftSize) / audioCtx.sampleRate),
        binMin: Math.round(
          ((freq - FREQUENCY_TOLERANCE) * analyser.fftSize) /
            audioCtx.sampleRate
        ),
        binMax: Math.round(
          ((freq + FREQUENCY_TOLERANCE) * analyser.fftSize) /
            audioCtx.sampleRate
        ),
      })),
    };

    Object.values(dtmfBins).forEach((group) => {
      group.forEach((f) => {
        f.binMin = Math.max(0, f.binMin);
        f.binMax = Math.min(bufferLength - 1, f.binMax);
      });
    });

    const decodeFrame = () => {
      animationRef.current = requestAnimationFrame(decodeFrame);

      analyser.getFloatFrequencyData(dataArray);

      let strongestLowPeak = { freq: -1, mag: MAGNITUDE_THRESHOLD_DB - 1 };
      let strongestHighPeak = { freq: -1, mag: MAGNITUDE_THRESHOLD_DB - 1 };

      dtmfBins.low.forEach(({ freq, binMin, binMax }) => {
        for (let i = binMin; i <= binMax; i++) {
          if (
            dataArray[i] > strongestLowPeak.mag &&
            dataArray[i] >= MAGNITUDE_THRESHOLD_DB
          ) {
            strongestLowPeak = { freq, mag: dataArray[i] };
          }
        }
      });

      dtmfBins.high.forEach(({ freq, binMin, binMax }) => {
        for (let i = binMin; i <= binMax; i++) {
          if (
            dataArray[i] > strongestHighPeak.mag &&
            dataArray[i] >= MAGNITUDE_THRESHOLD_DB
          ) {
            strongestHighPeak = { freq, mag: dataArray[i] };
          }
        }
      });

      let detectedToneKey = null;
      if (strongestLowPeak.freq !== -1 && strongestHighPeak.freq !== -1) {
        const toneKey = `${strongestLowPeak.freq},${strongestHighPeak.freq}`;
        if (DTMF_MAP[toneKey]) {
          detectedToneKey = toneKey;
        }
      }

      const currentState = detectionStateRef.current;

      if (detectedToneKey && detectedToneKey === currentState.currentTone) {
        currentState.toneFrameCount++;
        currentState.silenceFrameCount = 0;
      } else if (
        detectedToneKey &&
        detectedToneKey !== currentState.currentTone
      ) {
        currentState.currentTone = detectedToneKey;
        currentState.toneFrameCount = 1;
        currentState.silenceFrameCount = 0;
      } else {
        currentState.currentTone = null;
        currentState.toneFrameCount = 0;
        currentState.silenceFrameCount++;
      }

      if (
        currentState.currentTone &&
        currentState.toneFrameCount >= TONE_DETECT_FRAMES &&
        (currentState.currentTone !== currentState.lastDecodedTone ||
          currentState.silenceFrameCount >= SILENCE_DETECT_FRAMES)
      ) {
        const symbol = DTMF_MAP[currentState.currentTone];
        if (symbol >= "0" && symbol <= "9") {
          setDecodedDtmf((prev) => {
            const newDtmf = prev + symbol;
            currentState.lastDecodedChar = symbol;
            return newDtmf;
          });
        } else {
        }
        currentState.lastDecodedTone = currentState.currentTone;
        currentState.silenceFrameCount = 0;
      } else if (
        !detectedToneKey &&
        currentState.lastDecodedTone !== null &&
        currentState.silenceFrameCount >= SILENCE_DETECT_FRAMES &&
        currentState.lastDecodedChar !== " "
      ) {
        setDecodedDtmf((prev) => {
          if (prev.length > 0 && prev[prev.length - 1] !== " ") {
            currentState.lastDecodedChar = " ";
            return prev + " ";
          }
          return prev;
        });
        currentState.lastDecodedTone = null;
      } else if (
        !detectedToneKey &&
        currentState.lastDecodedTone !== null &&
        currentState.silenceFrameCount >= SILENCE_DETECT_FRAMES
      ) {
        currentState.lastDecodedTone = null;
      }
    };

    const handlePlay = () => {
      if (
        audioContextRef.current &&
        audioContextRef.current.state === "suspended"
      ) {
        audioContextRef.current
          .resume()
          .then(() => {
            animationRef.current = requestAnimationFrame(decodeFrame);
          })
          .catch((e) => console.error("Error resuming AudioContext:", e));
      } else {
        animationRef.current = requestAnimationFrame(decodeFrame);
      }
    };

    const handlePauseOrEnd = () => {
      cancelAnimationFrame(animationRef.current);
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePauseOrEnd);
    audio.addEventListener("ended", handlePauseOrEnd);

    return cleanup;
  }, [audioFile]);

  useEffect(() => {
    let textResult = "";

    const asciiChunks = decodedDtmf.split(" ");

    for (const chunk of asciiChunks) {
      const digitsOnlyChunk = chunk
        .split("")
        .filter((char) => char >= "0" && char <= "9")
        .join("");

      if (digitsOnlyChunk.length === 3) {
        const asciiCodeInt = parseInt(digitsOnlyChunk, 10);

        if (!isNaN(asciiCodeInt) && asciiCodeInt >= 0 && asciiCodeInt <= 255) {
          textResult += String.fromCharCode(asciiCodeInt);
        } else {
          textResult += "?";
        }
      } else if (digitsOnlyChunk.length > 0) {
        textResult += "?";
      } else if (
        chunk === "" &&
        asciiChunks.length > 1 &&
        textResult.length > 0 &&
        textResult[textResult.length - 1] !== " "
      ) {
        textResult += " ";
      }
    }
    setDecodedAsciiText(textResult.trim());
  }, [decodedDtmf]);

  return (
    <div className="flex flex-col items-center gap-6 p-10 bg-gray-900 text-white rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold text-pink-400">
        📞 DTMF to ASCII Decoder
      </h2>

      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="w-full bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium cursor-pointer"
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

          <div className="w-full max-w-xl">
            <h3 className="text-xl font-semibold text-pink-300 mb-2">
              Detected DTMF Digits Sequence:
            </h3>
            <div className="bg-gray-800 p-4 rounded break-words min-h-[40px] text-gray-300">
              {decodedDtmf || (
                <span className="text-gray-500 italic">
                  Play audio to detect DTMF digits...
                </span>
              )}
            </div>
          </div>

          <div className="w-full max-w-xl mt-4">
            <h3 className="text-xl font-semibold text-teal-300 mb-2">
              Decoded ASCII Text:
            </h3>
            <div className="bg-gray-800 p-4 rounded break-words min-h-[40px] text-gray-300">
              {decodedAsciiText || (
                <span className="text-gray-500 italic">
                  Waiting for DTMF digits...
                </span>
              )}
            </div>

            <p className="text-gray-500 text-xs mt-2">
              This attempts to decode DTMF digits (0-9) as 3-digit ASCII codes.
              Spaces indicate detected pauses between codes.
            </p>
          </div>

          <p className="text-gray-400 text-sm mt-4">
            Upload an audio file containing DTMF tones representing 3-digit
            ASCII codes to decode the hidden text. Accuracy depends on audio
            quality and tone/silence duration.
          </p>
        </>
      )}
    </div>
  );
}
