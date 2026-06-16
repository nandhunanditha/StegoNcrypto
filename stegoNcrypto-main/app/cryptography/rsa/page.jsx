"use client";

import { useState, useEffect } from "react";

const modPow = (base, exponent, modulus) => {
  if (modulus === 1n) return 0n;
  let result = 1n;
  base = base % modulus;
  while (exponent > 0n) {
    if (exponent % 2n === 1n) result = (result * base) % modulus;
    base = (base * base) % modulus;
    exponent = exponent / 2n;
  }
  return result;
};

const modInverse = (e, phi) => {
  let m0 = phi;
  let y = 0n,
    x = 1n;

  if (phi === 1n) return 0n;

  while (e > 1n) {
    let q = e / phi;
    let t = phi;

    (phi = e % phi), (e = t);
    t = y;

    y = x - q * y;
    x = t;
  }

  if (x < 0n) x = x + m0;

  return x;
};

export default function RSATool() {
  const [message, setMessage] = useState("");
  const [encrypted, setEncrypted] = useState("");
  const [decrypted, setDecrypted] = useState("");
  const [publicKey, setPublicKey] = useState({ e: 0n, n: 0n });
  const [privateKey, setPrivateKey] = useState({ d: 0n, n: 0n });

  useEffect(() => {}, []);

  const generateKeys = () => {
    const p = 61n;
    const q = 53n;
    const n = p * q;
    const phi = (p - 1n) * (q - 1n);

    const e = 17n;

    const d = modInverse(e, phi);

    if (d === 0n) {
      console.error("Could not find modular inverse (d). Check p, q, e.");
      return;
    }

    setPublicKey({ e, n });
    setPrivateKey({ d, n });
  };

  const encrypt = () => {
    const { e, n } = publicKey;
    if (n === 0n || e === 0n) {
      console.warn("Keys not generated.");
      return;
    }

    const encryptedChars = Array.from(message).map((char) => {
      const charCode = BigInt(char.charCodeAt(0));

      if (charCode >= n) {
        console.error(
          `Character code ${charCode} is too large for modulus ${n}`
        );
        return -1n;
      }
      return modPow(charCode, e, n);
    });

    if (encryptedChars.includes(-1n)) {
      setEncrypted("Error: Message contains characters with codes >= n");
      return;
    }

    setEncrypted(encryptedChars.join(" "));
  };

  const decrypt = () => {
    const { d, n } = privateKey;
    if (n === 0n || d === 0n) {
      console.warn("Keys not generated or encrypted data missing.");
      return;
    }
    if (!encrypted) {
      console.warn("No data to decrypt.");
      return;
    }

    const decryptedChars = encrypted
      .split(" ")
      .map((codeStr) => {
        try {
          const code = BigInt(codeStr);
          const decryptedCode = modPow(code, d, n);
          return String.fromCharCode(Number(decryptedCode));
        } catch (error) {
          console.error("Error during decryption:", error);
          return "?";
        }
      })
      .join("");

    setDecrypted(decryptedChars);
  };

  return (
    <div className="w-full p-10 bg-gray-900 text-white rounded-xl shadow-2xl space-y-8">
      <h2 className="text-4xl font-bold text-pink-400">🔐 RSA Cipher Tool</h2>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message here..."
        className="w-full p-4 text-xl rounded bg-gray-800 border border-gray-600 min-h-[150px] text-white resize-none"
      />

      <div className="flex gap-6 flex-wrap">
        <button
          onClick={generateKeys}
          className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Generate Keys
        </button>
        <button
          onClick={encrypt}
          disabled={!publicKey.n || message.length === 0}
          className="bg-pink-600 hover:bg-pink-500 text-white px-6 py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Encrypt
        </button>
        <button
          onClick={decrypt}
          disabled={!privateKey.n || encrypted.length === 0}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Decrypt
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-pink-300">
            Encrypted Output:
          </h3>
          <p className="text-gray-200 whitespace-pre-wrap break-all">
            {encrypted || "No output yet."}
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-pink-300">
            Decrypted Output:
          </h3>
          <p className="text-gray-200 whitespace-pre-wrap break-all">
            {decrypted || "No output yet."}
          </p>
        </div>
        <div className="pt-4 text-sm text-gray-400">
          <p>
            🔑 Public Key: (e: {publicKey.e.toString()}, n:{" "}
            {publicKey.n.toString()})
          </p>
          <p>
            🔐 Private Key: (d: {privateKey.d.toString()}, n:{" "}
            {privateKey.n.toString()})
          </p>
          <p className="mt-2 italic text-gray-500">
            Note: This uses fixed small primes (61, 53) and is for demonstration
            only. Real RSA uses very large primes.
          </p>
        </div>
      </div>
    </div>
  );
}
