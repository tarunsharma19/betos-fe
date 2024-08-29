/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript:{
    ignoreBuildErrors: true,
  },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'media.api-sports.io',
          },
          {
            protocol: 'https',
            hostname: 'encrypted-tbn0.gstatic.com',
          }
        ],
      },
};

export default nextConfig;
