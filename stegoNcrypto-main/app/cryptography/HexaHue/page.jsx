"use client";
import { useState, useEffect } from "react";

const HEXAHUE_COLORS = {
  RED: "#FF0000",
  GREEN: "#00FF00",
  BLUE: "#0000FF",
  YELLOW: "#FFFF00",
  CYAN: "#00FFFF",
  MAGENTA: "#FF00FF",
  WHITE: "#FFFFFF",
  GRAY: "#808080",
  BLACK: "#000000",
};

const HEXAHUE_MAP = {
  A: [
    HEXAHUE_COLORS.MAGENTA,
    HEXAHUE_COLORS.RED,
    HEXAHUE_COLORS.GREEN,
    HEXAHUE_COLORS.YELLOW,
    HEXAHUE_COLORS.BLUE,
    HEXAHUE_COLORS.CYAN,
  ],
  B: [
    HEXAHUE_COLORS.RED,
    HEXAHUE_COLORS.MAGENTA,
    HEXAHUE_COLORS.GREEN,
    HEXAHUE_COLORS.YELLOW,
    HEXAHUE_COLORS.BLUE,
    HEXAHUE_COLORS.CYAN,
  ],
  C: [
    HEXAHUE_COLORS.RED,
    HEXAHUE_COLORS.GREEN,
    HEXAHUE_COLORS.BLUE,
    HEXAHUE_COLORS.MAGENTA,
    HEXAHUE_COLORS.CYAN,
    HEXAHUE_COLORS.YELLOW,
  ],
  D: [
    HEXAHUE_COLORS.RED,
    HEXAHUE_COLORS.GREEN,
    HEXAHUE_COLORS.BLUE,
    HEXAHUE_COLORS.MAGENTA,
    HEXAHUE_COLORS.YELLOW,
    HEXAHUE_COLORS.CYAN,
  ],
  E: [
    HEXAHUE_COLORS.RED,
    HEXAHUE_COLORS.GREEN,
    HEXAHUE_COLORS.CYAN,
    HEXAHUE_COLORS.BLUE,
    HEXAHUE_COLORS.YELLOW,
    HEXAHUE_COLORS.MAGENTA,
  ],
  F: [
    HEXAHUE_COLORS.RED,
    HEXAHUE_COLORS.GREEN,
    HEXAHUE_COLORS.CYAN,
    HEXAHUE_COLORS.BLUE,
    HEXAHUE_COLORS.MAGENTA,
    HEXAHUE_COLORS.YELLOW,
  ],
  G: [
    HEXAHUE_COLORS.RED,
    HEXAHUE_COLORS.YELLOW,
    HEXAHUE_COLORS.GREEN,
    HEXAHUE_COLORS.BLUE,
    HEXAHUE_COLORS.CYAN,
    HEXAHUE_COLORS.MAGENTA,
  ],
  H: [
    HEXAHUE_COLORS.RED,
    HEXAHUE_COLORS.YELLOW,
    HEXAHUE_COLORS.GREEN,
    HEXAHUE_COLORS.BLUE,
    HEXAHUE_COLORS.MAGENTA,
    HEXAHUE_COLORS.CYAN,
  ],
  I: [
    HEXAHUE_COLORS.RED,
    HEXAHUE_COLORS.YELLOW,
    HEXAHUE_COLORS.GREEN,
    HEXAHUE_COLORS.MAGENTA,
    HEXAHUE_COLORS.CYAN,
    HEXAHUE_COLORS.BLUE,
  ],
  J: [
    HEXAHUE_COLORS.RED,
    HEXAHUE_COLORS.YELLOW,
    HEXAHUE_COLORS.GREEN,
    HEXAHUE_COLORS.MAGENTA,
    HEXAHUE_COLORS.BLUE,
    HEXAHUE_COLORS.CYAN,
  ],
  K: [
    HEXAHUE_COLORS.RED,
    HEXAHUE_COLORS.CYAN,
    HEXAHUE_COLORS.GREEN,
    HEXAHUE_COLORS.BLUE,
    HEXAHUE_COLORS.YELLOW,
    HEXAHUE_COLORS.MAGENTA,
  ],
  L: [
    HEXAHUE_COLORS.RED,
    HEXAHUE_COLORS.CYAN,
    HEXAHUE_COLORS.GREEN,
    HEXAHUE_COLORS.BLUE,
    HEXAHUE_COLORS.MAGENTA,
    HEXAHUE_COLORS.YELLOW,
  ],
  M: [
    HEXAHUE_COLORS.RED,
    HEXAHUE_COLORS.MAGENTA,
    HEXAHUE_COLORS.GREEN,
    HEXAHUE_COLORS.BLUE,
    HEXAHUE_COLORS.CYAN,
    HEXAHUE_COLORS.YELLOW,
  ],
  N: [
    HEXAHUE_COLORS.RED,
    HEXAHUE_COLORS.MAGENTA,
    HEXAHUE_COLORS.GREEN,
    HEXAHUE_COLORS.BLUE,
    HEXAHUE_COLORS.YELLOW,
    HEXAHUE_COLORS.CYAN,
  ],
  O: [
    HEXAHUE_COLORS.RED,
    HEXAHUE_COLORS.BLUE,
    HEXAHUE_COLORS.GREEN,
    HEXAHUE_COLORS.YELLOW,
    HEXAHUE_COLORS.CYAN,
    HEXAHUE_COLORS.MAGENTA,
  ],
  P: [
    HEXAHUE_COLORS.RED,
    HEXAHUE_COLORS.BLUE,
    HEXAHUE_COLORS.GREEN,
    HEXAHUE_COLORS.YELLOW,
    HEXAHUE_COLORS.MAGENTA,
    HEXAHUE_COLORS.CYAN,
  ],
  Q: [
    HEXAHUE_COLORS.RED,
    HEXAHUE_COLORS.BLUE,
    HEXAHUE_COLORS.GREEN,
    HEXAHUE_COLORS.CYAN,
    HEXAHUE_COLORS.YELLOW,
    HEXAHUE_COLORS.MAGENTA,
  ],
  R: [
    HEXAHUE_COLORS.RED,
    HEXAHUE_COLORS.BLUE,
    HEXAHUE_COLORS.GREEN,
    HEXAHUE_COLORS.CYAN,
    HEXAHUE_COLORS.MAGENTA,
    HEXAHUE_COLORS.YELLOW,
  ],
  S: [
    HEXAHUE_COLORS.RED,
    HEXAHUE_COLORS.GREEN,
    HEXAHUE_COLORS.YELLOW,
    HEXAHUE_COLORS.BLUE,
    HEXAHUE_COLORS.CYAN,
    HEXAHUE_COLORS.MAGENTA,
  ],
  T: [
    HEXAHUE_COLORS.RED,
    HEXAHUE_COLORS.GREEN,
    HEXAHUE_COLORS.YELLOW,
    HEXAHUE_COLORS.BLUE,
    HEXAHUE_COLORS.MAGENTA,
    HEXAHUE_COLORS.CYAN,
  ],
  U: [
    HEXAHUE_COLORS.RED,
    HEXAHUE_COLORS.GREEN,
    HEXAHUE_COLORS.MAGENTA,
    HEXAHUE_COLORS.BLUE,
    HEXAHUE_COLORS.CYAN,
    HEXAHUE_COLORS.YELLOW,
  ],
  V: [
    HEXAHUE_COLORS.RED,
    HEXAHUE_COLORS.GREEN,
    HEXAHUE_COLORS.MAGENTA,
    HEXAHUE_COLORS.BLUE,
    HEXAHUE_COLORS.YELLOW,
    HEXAHUE_COLORS.CYAN,
  ],
  W: [
    HEXAHUE_COLORS.YELLOW,
    HEXAHUE_COLORS.RED,
    HEXAHUE_COLORS.CYAN,
    HEXAHUE_COLORS.GREEN,
    HEXAHUE_COLORS.MAGENTA,
    HEXAHUE_COLORS.BLUE,
  ],
  X: [
    HEXAHUE_COLORS.YELLOW,
    HEXAHUE_COLORS.RED,
    HEXAHUE_COLORS.CYAN,
    HEXAHUE_COLORS.GREEN,
    HEXAHUE_COLORS.BLUE,
    HEXAHUE_COLORS.MAGENTA,
  ],
  Y: [
    HEXAHUE_COLORS.YELLOW,
    HEXAHUE_COLORS.RED,
    HEXAHUE_COLORS.BLUE,
    HEXAHUE_COLORS.GREEN,
    HEXAHUE_COLORS.CYAN,
    HEXAHUE_COLORS.MAGENTA,
  ],
  Z: [
    HEXAHUE_COLORS.YELLOW,
    HEXAHUE_COLORS.RED,
    HEXAHUE_COLORS.BLUE,
    HEXAHUE_COLORS.GREEN,
    HEXAHUE_COLORS.MAGENTA,
    HEXAHUE_COLORS.CYAN,
  ],

  0: [
    HEXAHUE_COLORS.BLACK,
    HEXAHUE_COLORS.WHITE,
    HEXAHUE_COLORS.GRAY,
    HEXAHUE_COLORS.GRAY,
    HEXAHUE_COLORS.WHITE,
    HEXAHUE_COLORS.BLACK,
  ],
  1: [
    HEXAHUE_COLORS.BLACK,
    HEXAHUE_COLORS.GRAY,
    HEXAHUE_COLORS.WHITE,
    HEXAHUE_COLORS.WHITE,
    HEXAHUE_COLORS.GRAY,
    HEXAHUE_COLORS.BLACK,
  ],
  2: [
    HEXAHUE_COLORS.BLACK,
    HEXAHUE_COLORS.WHITE,
    HEXAHUE_COLORS.WHITE,
    HEXAHUE_COLORS.BLACK,
    HEXAHUE_COLORS.GRAY,
    HEXAHUE_COLORS.GRAY,
  ],
  3: [
    HEXAHUE_COLORS.BLACK,
    HEXAHUE_COLORS.GRAY,
    HEXAHUE_COLORS.BLACK,
    HEXAHUE_COLORS.WHITE,
    HEXAHUE_COLORS.GRAY,
    HEXAHUE_COLORS.WHITE,
  ],
  4: [
    HEXAHUE_COLORS.BLACK,
    HEXAHUE_COLORS.BLACK,
    HEXAHUE_COLORS.WHITE,
    HEXAHUE_COLORS.GRAY,
    HEXAHUE_COLORS.WHITE,
    HEXAHUE_COLORS.GRAY,
  ],
  5: [
    HEXAHUE_COLORS.GRAY,
    HEXAHUE_COLORS.BLACK,
    HEXAHUE_COLORS.WHITE,
    HEXAHUE_COLORS.BLACK,
    HEXAHUE_COLORS.GRAY,
    HEXAHUE_COLORS.WHITE,
  ],
  6: [
    HEXAHUE_COLORS.WHITE,
    HEXAHUE_COLORS.BLACK,
    HEXAHUE_COLORS.GRAY,
    HEXAHUE_COLORS.WHITE,
    HEXAHUE_COLORS.BLACK,
    HEXAHUE_COLORS.GRAY,
  ],
  7: [
    HEXAHUE_COLORS.BLACK,
    HEXAHUE_COLORS.WHITE,
    HEXAHUE_COLORS.GRAY,
    HEXAHUE_COLORS.BLACK,
    HEXAHUE_COLORS.WHITE,
    HEXAHUE_COLORS.GRAY,
  ],
  8: [
    HEXAHUE_COLORS.GRAY,
    HEXAHUE_COLORS.WHITE,
    HEXAHUE_COLORS.BLACK,
    HEXAHUE_COLORS.GRAY,
    HEXAHUE_COLORS.WHITE,
    HEXAHUE_COLORS.BLACK,
  ],
  9: [
    HEXAHUE_COLORS.WHITE,
    HEXAHUE_COLORS.GRAY,
    HEXAHUE_COLORS.BLACK,
    HEXAHUE_COLORS.WHITE,
    HEXAHUE_COLORS.GRAY,
    HEXAHUE_COLORS.BLACK,
  ],

  ",": [
    HEXAHUE_COLORS.BLACK,
    HEXAHUE_COLORS.WHITE,
    HEXAHUE_COLORS.BLACK,
    HEXAHUE_COLORS.WHITE,
    HEXAHUE_COLORS.BLACK,
    HEXAHUE_COLORS.WHITE,
  ],
  ".": [
    HEXAHUE_COLORS.WHITE,
    HEXAHUE_COLORS.BLACK,
    HEXAHUE_COLORS.WHITE,
    HEXAHUE_COLORS.BLACK,
    HEXAHUE_COLORS.WHITE,
    HEXAHUE_COLORS.BLACK,
  ],

  " ": [
    HEXAHUE_COLORS.BLACK,
    HEXAHUE_COLORS.BLACK,
    HEXAHUE_COLORS.BLACK,
    HEXAHUE_COLORS.BLACK,
    HEXAHUE_COLORS.BLACK,
    HEXAHUE_COLORS.BLACK,
  ],
  _: [
    HEXAHUE_COLORS.WHITE,
    HEXAHUE_COLORS.WHITE,
    HEXAHUE_COLORS.WHITE,
    HEXAHUE_COLORS.WHITE,
    HEXAHUE_COLORS.WHITE,
    HEXAHUE_COLORS.WHITE,
  ],
};

const HEXAHUE_TO_CHAR_MAP = {};
Object.entries(HEXAHUE_MAP).forEach(([char, pattern]) => {
  const patternKey = pattern.join(",");
  HEXAHUE_TO_CHAR_MAP[patternKey] = char;
});

const REFERENCE_SYMBOL_ORDER = [
  ".",
  ",",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  " ",
  "_W",
].filter((char) => HEXAHUE_MAP[char]);

export default function HexahueDecoderPage() {
  const [ciphertextBlocks, setCiphertextBlocks] = useState([]);

  const [decodedText, setDecodedText] = useState("");

  const handleAddSymbol = (char) => {
    const pattern = HEXAHUE_MAP[char];
    if (pattern) {
      setCiphertextBlocks([...ciphertextBlocks, pattern]);
      setDecodedText("");
    }
  };

  const handleRemoveLastSymbol = () => {
    if (ciphertextBlocks.length > 0) {
      setCiphertextBlocks(ciphertextBlocks.slice(0, -1));
      setDecodedText("");
    }
  };

  const handleClearCiphertext = () => {
    setCiphertextBlocks([]);
    setDecodedText("");
  };

  const handleDecrypt = () => {
    let result = "";
    for (const pattern of ciphertextBlocks) {
      if (pattern) {
        const patternKey = pattern.join(",");
        const char = HEXAHUE_TO_CHAR_MAP[patternKey];
        result += char !== undefined ? char : "?";
      } else {
        result += "?";
      }
    }
    setDecodedText(result);
  };

  const renderHexahueBlock = (pattern, index, charHint = null) => {
    if (!pattern) {
      return (
        <div
          key={index}
          className="w-[37px] h-[56px] shrink-0 flex items-center justify-center border border-dashed border-gray-500 text-gray-500 text-sm"
          title={
            charHint ? `Unsupported character: ${charHint}` : "Invalid block"
          }
        >
          ?
        </div>
      );
    }

    const titleText = charHint ? `Character: ${charHint}` : "Hexahue Symbol";

    return (
      <div
        key={index}
        className="grid grid-cols-2 grid-rows-3 gap-px bg-black w-[37px] h-[56px] shrink-0 overflow-hidden"
        title={titleText}
      >
        {pattern.map((color, squareIndex) => (
          <div
            key={squareIndex}
            className="w-[18px] h-[18px]"
            style={{ backgroundColor: color }}
          ></div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center gap-6 p-10 bg-gray-900 text-white rounded-xl shadow-2xl w-full max-w-full mx-auto my-8">
      <h2 className="text-3xl font-bold text-purple-400">🖼️ Hexahue Decoder</h2>

      <div className="w-[800px]">
        <h3 className="text-xl font-semibold text-yellow-300 mb-2">
          HEXAHUE SYMBOLS (Click to Add):
        </h3>
        <div className="bg-gray-800 p-6 rounded border border-gray-700 flex flex-wrap gap-2 justify-center">
          {REFERENCE_SYMBOL_ORDER.map((char, index) => {
            const pattern = HEXAHUE_MAP[char];
            if (!pattern) return null;

            return (
              <button
                key={index}
                onClick={() => handleAddSymbol(char)}
                className="p-0 border-none bg-transparent cursor-pointer hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
                title={`Add '${
                  char === "_W"
                    ? "White Space"
                    : char === " "
                    ? "Black Space"
                    : char
                }' to ciphertext`}
              >
                {renderHexahueBlock(pattern, index)}
              </button>
            );
          })}
        </div>
      </div>

      <div className="w-full mt-4">
        <h3 className="text-xl font-semibold text-pink-300 mb-2">
          HEXAHUE CIPHERTEXT:
        </h3>
        <div className="bg-gray-800 p-4 rounded border border-gray-700 min-h-[80px] flex flex-wrap gap-2 items-center">
          {ciphertextBlocks.length === 0 ? (
            <p className="text-gray-500 italic">
              Click symbols above to build the ciphertext...
            </p>
          ) : (
            ciphertextBlocks.map((pattern, index) =>
              renderHexahueBlock(pattern, index)
            )
          )}
        </div>
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={handleRemoveLastSymbol}
            disabled={ciphertextBlocks.length === 0}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            Remove Last
          </button>
          <button
            onClick={handleClearCiphertext}
            disabled={ciphertextBlocks.length === 0}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            Clear All
          </button>
        </div>
      </div>

      <button
        onClick={handleDecrypt}
        disabled={ciphertextBlocks.length === 0}
        className="mt-4 px-6 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
      >
        ▶ DECRYPT
      </button>

      <div className="w-full mt-4 bg-amber-50 text-gray-900 p-4 rounded shadow-inner">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Results:</h3>
        <div className="break-words min-h-[40px]">
          {decodedText === "" && ciphertextBlocks.length > 0 ? (
            <span className="text-gray-600 italic">
              Click Decrypt to see the result...
            </span>
          ) : decodedText === "" && ciphertextBlocks.length === 0 ? (
            <span className="text-gray-600 italic">
              Decoded text will appear here...
            </span>
          ) : (
            decodedText
          )}
        </div>

        <p className="text-gray-700 text-sm mt-4">
          Supported characters: ,.0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ (and
          Space)
        </p>
      </div>

      <p className="text-gray-400 text-sm mt-4 w-full text-center">
        Decode Hexahue ciphertext by clicking the symbols above to build the
        sequence, then click DECRYPT. Based on the dCode.fr Hexahue cipher page.
      </p>
    </div>
  );
}
