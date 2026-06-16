export default function SteganographyHome() {
  const cards = [
    {
      title: "Hide Text in Image",
      desc: "Embed hidden messages inside images seamlessly.",
      emoji: "🖼️",
      link: "/steganography",
    },
    {
      title: "Extract Text from Image",
      desc: "Reveal hidden information from stego images.",
      emoji: "🔍",
      link: "/steganography",
    },
    {
      title: "Image Encryption",
      desc: "Encrypt images to prevent unauthorized viewing.",
      emoji: "🔒",
      link: "/steganography",
    },
    {
      title: "Audio Steganography",
      desc: "Conceal messages within audio files.",
      emoji: "🎵",
      link: "/steganography",
    },
    {
      title: "Video Steganography",
      desc: "Hide data inside video frames securely.",
      emoji: "🎥",
      link: "/steganography",
    },
    {
      title: "Advanced Techniques",
      desc: "Explore modern steganographic techniques.",
      emoji: "🧠",
      link: "/steganography",
    },
  ];

  const faqs = [
    {
      question: "What is steganography?",
      answer:
        "Steganography is the practice of hiding information within other non-secret text or media to avoid detection.",
    },
    {
      question: "How is it different from encryption?",
      answer:
        "Encryption makes data unreadable to unauthorized users, while steganography hides the very existence of the data.",
    },
    {
      question: "Is steganography secure?",
      answer:
        "When combined with encryption and proper techniques, steganography provides an additional layer of security.",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-8 py-16 space-y-16">
      <div>
        <h1 className="text-6xl font-extrabold mb-4 tracking-tight drop-shadow-md">
          🕵️‍♂️ Steganography Dashboard
        </h1>
        <p className="text-lg text-gray-300 leading-relaxed max-w-4xl">
          Welcome to the Steganography section. Here you can explore how to
          conceal data within images, audio, video, and more — helping you to
          communicate secretly in the digital age.
        </p>
      </div>

      <section>
        <h2 className="text-4xl font-bold mb-8 text-pink-400">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-5xl">
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">1. Select Media</h3>
            <p className="text-gray-300">
              Choose an image, audio, or video file to work with.
            </p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">2. Hide or Extract</h3>
            <p className="text-gray-300">
              Use our tools to embed secret data or extract hidden information.
            </p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">3. Secure & Share</h3>
            <p className="text-gray-300">
              Download your stego file or decrypt retrieved data with ease.
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
