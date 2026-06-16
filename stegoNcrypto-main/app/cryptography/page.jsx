export default function CryptographyHome() {
  const cards = [
    {
      title: "Encrypt Text",
      desc: "Encrypt your messages with secure algorithms.",
      emoji: "🔒",
      link: "/cryptography/rot13",
    },
    {
      title: "Decrypt Text",
      desc: "Decrypt your encrypted messages easily.",
      emoji: "🔓",
      link: "/cryptography/base64",
    },
    {
      title: "Morse-code",
      desc: "Convert the text into unreadable symbols",
      emoji: "🗝️",
      link: "/cryptography/morse-code",
    },
    {
      title: "Hashing",
      desc: "Generate hashes and verify data integrity.",
      emoji: "🧮",
      link: "/cryptography/rsa",
    },
    {
      title: "Hexa-Hue",
      desc: "Using the color code decrypt Text",
      emoji: "✍️",
      link: "/cryptography/HexaHue",
    },
    {
      title: "Vigenere",
      desc: "Place the key in the message",
      emoji: "📜",
      link: "/cryptography/vigenere",
    },
  ];

  const faqs = [
    {
      question: "What is cryptography?",
      answer:
        "Cryptography is the art of securing communication and data through the use of codes and encryption techniques.",
    },
    {
      question: "Why is encryption important?",
      answer:
        "Encryption protects sensitive information from unauthorized access, ensuring privacy and security.",
    },
    {
      question: "How does key management work?",
      answer:
        "Key management involves generating, distributing, storing, and revoking cryptographic keys safely.",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-8 py-16 space-y-16">
      <div>
        <h1 className="text-6xl font-extrabold mb-4 tracking-tight drop-shadow-md">
          🔐 Cryptography Dashboard
        </h1>
        <p className="text-lg text-gray-300 leading-relaxed max-w-4xl">
          Welcome to the Cryptography section. Here you can explore various
          tools and techniques related to secure communication. Learn how
          encryption and other cryptographic methods help keep data safe in our
          digital world.
        </p>
      </div>
      <section>
        <h2 className="text-4xl font-bold mb-8 text-pink-400">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-5xl">
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">
              1. Choose a Function
            </h3>
            <p className="text-gray-300">
              Select encryption, decryption, or any other cryptography tool from
              the menu.
            </p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">2. Provide Input</h3>
            <p className="text-gray-300">
              Enter your text or data securely using our forms and controls.
            </p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">3. Get Results</h3>
            <p className="text-gray-300">
              See the encrypted, decrypted, or hashed output instantly.
            </p>
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-4xl font-bold mb-8 text-pink-400">Explore Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl">
          {cards.map(({ title, desc, emoji, link }, idx) => (
            <a
              href={link}
              key={idx}
              className="block bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 rounded-xl p-6 shadow-lg hover:shadow-pink-500/40 hover:scale-[1.03] transition duration-300 cursor-pointer"
            >
              <h3 className="text-2xl font-bold text-pink-400 mb-2 flex items-center gap-3">
                <span className="text-4xl">{emoji}</span> {title}
              </h3>
              <p className="text-gray-300">{desc}</p>
            </a>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-4xl font-bold mb-8 text-pink-400">
          Frequently Asked Questions
        </h2>
        <div className="max-w-4xl space-y-6">
          {faqs.map(({ question, answer }, idx) => (
            <div key={idx} className="bg-gray-800 rounded-xl p-6 shadow-md">
              <h3 className="text-2xl font-semibold mb-2">{question}</h3>
              <p className="text-gray-300 leading-relaxed">{answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
