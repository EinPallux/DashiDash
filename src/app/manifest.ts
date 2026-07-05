import type { MetadataRoute } from "next";

/**
 * PWA manifest (docs/03 §4). Warm rice theme, standalone + portrait, with
 * regular and maskable icons so the home-screen icon looks right on iOS and
 * Android. Served at /manifest.webmanifest.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DashiDash — schnelle japanische Küche",
    short_name: "DashiDash",
    description:
      "Schnelle, authentische japanische Küche für faule Tage — offline, ohne Konto, ohne Stress.",
    lang: "de",
    dir: "ltr",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#FFF9F0",
    theme_color: "#FFF9F0",
    categories: ["food", "lifestyle"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/maskable-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
