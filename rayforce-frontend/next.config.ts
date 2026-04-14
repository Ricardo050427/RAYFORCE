import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.truper.com",
        pathname: "/media/import/imagenes/**",
      },
      {
        protocol: "https",
        hostname: "**.hostingersite.com",
      },
      {
        protocol: "https",
        hostname: "**.wp.com",
      },
    ],
  },
  output: "standalone",
};

export default nextConfig;
