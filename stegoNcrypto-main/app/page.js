import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[url('/1688125792772.png')] bg-cover bg-center flex flex-col">
      <header className="w-full bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 shadow-lg fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-white text-3xl font-extrabold tracking-wide">
            stegoNcrypto
          </h1>
          <nav className="space-x-6 hidden md:flex">
            <Link
              href="/cryptography"
              className="text-white hover:text-pink-400 font-semibold transition"
            >
              Cryptography
            </Link>
            <Link
              href="/stegno"
              className="text-white hover:text-pink-400 font-semibold transition"
            >
              Steganography
            </Link>
          </nav>
        </div>
      </header>
      <div className="h-20" />
      <main className="flex-grow flex flex-col items-end justify-center pr-12 text-right text-white drop-shadow-lg">
        <h2 className="text-5xl font-bold mb-6 max-w-3xl">
          Explore the World of Cryptography & Steganography
        </h2>
        <p className="text-lg mb-12 max-w-xl">
          Secure your communication and hide secrets with powerful tools
          designed for encryption and concealment. Select a category below to
          Get Started!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-xl w-full">
          <Link
            href="/cryptography"
            className="block bg-indigo-700 hover:bg-indigo-800 transition rounded-lg py-5 px-6 font-semibold text-xl shadow-lg text-center"
          >
            Cryptography
          </Link>
          <Link
            href="/steganography"
            className="block bg-pink-700 hover:bg-pink-800 transition rounded-lg py-5 px-6 font-semibold text-xl shadow-lg text-center"
          >
            Steganography
          </Link>
        </div>
      </main>
    </div>
  );
}
