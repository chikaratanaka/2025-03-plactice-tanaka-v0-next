/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
      DB_URL: "postgresql://db_2025_03_plactice_tanaka_v0:ZWViOGQ3YWY0OTM0@104.198.119.18:5432/db_2025_03_plactice_tanaka_v0"
    }
  };
  
  console.log("Next.js での DB_URL:", process.env.DB_URL); // ← これでログ確認
  
  module.exports = nextConfig;
  