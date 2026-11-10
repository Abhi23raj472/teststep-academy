import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",   // static export for GitHub Pages
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "/teststep-academy",
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH ?? "/teststep-academy",
  images: { unoptimized: true },
};

export default nextConfig;
