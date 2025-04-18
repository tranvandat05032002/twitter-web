/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    return config; 
  },
};

module.exports = nextConfig;
