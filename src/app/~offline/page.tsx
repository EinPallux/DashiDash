import { Mascot } from "@/content/illustrations/Mascot";

export const metadata = { title: "Offline" };

/**
 * Navigation fallback served by the service worker when a page isn't cached
 * and the network is unavailable. Because all app content is precached, users
 * only reach this on a truly uncached route while offline.
 */
export default function OfflinePage() {
  return (
    <div className="px-gutter pt-safe flex min-h-dvh flex-col items-center justify-center text-center">
      <Mascot title="Dashi macht ein Nickerchen" className="h-40 w-40" />
      <h1 className="text-title text-nori mt-4 font-bold">
        Offline — aber halb so wild
      </h1>
      <p className="text-body text-nori-60 mt-2 max-w-xs">
        Diese Seite ist noch nicht gespeichert. Sobald du einmal online warst,
        funktioniert DashiDash komplett offline.
      </p>
    </div>
  );
}
