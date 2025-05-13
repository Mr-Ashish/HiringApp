import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to LeaderHire AI
        </h1>
        <p className="text-gray-600 mb-8">
          Your comprehensive platform for leadership hiring and recruitment
          management.
        </p>
        <Link
          href="/login"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors w-full"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
