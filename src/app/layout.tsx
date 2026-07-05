import type { Metadata, Viewport } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import { TabBar } from "@/components/ui/TabBar";
import "./globals.css";

// Display face — chunky, friendly (docs/02 §2).
const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-baloo",
  display: "swap",
});

// Body / UI face — highly readable rounded sans.
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  applicationName: "DashiDash",
  title: {
    default: "DashiDash — schnelle japanische Küche",
    template: "%s · DashiDash",
  },
  description:
    "Schnelle, authentische japanische Küche für faule Tage — offline, ohne Konto, ohne Stress.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "DashiDash",
  },
  // Icons come from file conventions: app/icon.svg (favicon) and
  // app/apple-icon.png (iOS home screen). Install icons live in the manifest.
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#FFF9F0",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${baloo.variable} ${nunito.variable}`}>
      <body>
        {/* Phone-shaped column: rice inside, rice-warm page outside on desktop. */}
        <div className="bg-rice relative mx-auto flex min-h-dvh max-w-[640px] flex-col">
          <main className="flex-1 pb-[calc(env(safe-area-inset-bottom)+96px)]">
            {children}
          </main>
          <TabBar />
        </div>
      </body>
    </html>
  );
}
