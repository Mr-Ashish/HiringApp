/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Suppress Grammarly extension warnings
  experimental: {
    // This will suppress the warning
    suppressHydrationWarning: true,
  },
};

module.exports = nextConfig;
