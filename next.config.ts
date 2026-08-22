import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets kids' phones/tablets on the home wifi load the app in dev mode —
  // Next.js blocks cross-origin dev asset requests (JS chunks, HMR) from any
  // host other than localhost by default. Only relevant to `next dev`;
  // production builds (`next start` / server.mjs) aren't affected.
  allowedDevOrigins: [
    "192.168.1.195",
    "sohels-macbook-pro.local",
  ],
};

export default nextConfig;
