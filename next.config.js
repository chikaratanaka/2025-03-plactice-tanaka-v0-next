/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    

  };
  
  console.log("Next.js での DB_URL:", process.env.DB_URL); // ← これでログ確認
  
  module.exports = nextConfig;
  