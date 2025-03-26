/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

console.log("Next.js での DB_URL:", process.env.DB_URL); // 修正：DATABASE_URL → DB_URL

module.exports = nextConfig;
