import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

const withSerwist = withSerwistInit({
  // Service worker source + output. Serwist compiles this and injects the
  // precache manifest at build time.
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  // Keep the SW out of the way during local development (avoids stale caches).
  // It is fully active in production builds and on Vercel.
  disable: process.env.NODE_ENV === "development",
});

export default withSerwist(nextConfig);
