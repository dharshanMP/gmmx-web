import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["images.unsplash.com"]
  }
};

export default nextConfig;
