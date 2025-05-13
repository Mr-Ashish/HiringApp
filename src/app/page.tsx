import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold">Welcome to LeaderHire AI</h1>
      <p className="mb-4 text-lg">
        Your platform for streamlined leadership hiring.
      </p>
      <Link
        href="/login"
        className="p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Go to Login
      </Link>
    </div>
  );
}
