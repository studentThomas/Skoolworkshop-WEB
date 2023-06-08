/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

module.exports = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/workshops',
          permanent: true, // or false if you want temporary redirection
        },
      ];
    },
  };