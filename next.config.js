/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    localPatterns: [
      {
        pathname: '/public/image/**',
        search: '',
      },
    ],
  },
};

module.exports = nextConfig;
