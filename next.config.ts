import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",   // static export for GitHub Pages
  basePath: process.env.NODE_ENV === "production" ? "/teststep-academy" : "",
  images: { unoptimized: true },
};

export default nextConfig;
