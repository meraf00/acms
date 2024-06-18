/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8333',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
