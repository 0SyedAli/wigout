/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/",
        destination: "/auth/login",
        permanent: false, // false = 307 redirect (recommended)
      },
    ];
  },
};

export default nextConfig;
