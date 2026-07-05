"use client";

import { useRef, useState } from "react";
import { ChunkyButton } from "@/components/ui/ChunkyButton";
import { Stepper } from "@/components/ui/Stepper";
import { Mascot } from "@/content/illustrations/Mascot";
import { useDefaultServings, useStandalone } from "@/lib/prefs";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-6">
      <h2 className="font-display text-heading text-nori mb-2 font-bold">
        {title}
      </h2>
      <div className="rounded-card border-hairline bg-paper border p-4">
        {children}
      </div>
    </section>
  );
}

export default function EinstellungenPage() {
  const [servings, setServings] = useDefaultServings();
  const standalone = useStandalone();
  const [status, setStatus] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const exportData = () => {
    const data: Record<string, string> = {};
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key?.startsWith("dd.")) data[key] = window.localStorage.getItem(key)!;
    }
    const blob = new Blob([JSON.stringify({ version: 1, data }, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dashidash-backup.json";
    a.click();
    URL.revokeObjectURL(url);
    setStatus("Backup heruntergeladen ✓");
  };

  const importData = async (file: File) => {
    try {
      const parsed = JSON.parse(await file.text()) as {
        data?: Record<string, string>;
      };
      if (parsed.data) {
        for (const [key, value] of Object.entries(parsed.data)) {
          if (key.startsWith("dd.")) window.localStorage.setItem(key, value);
        }
        setStatus("Import erfolgreich — lädt neu…");
        setTimeout(() => window.location.reload(), 600);
      }
    } catch {
      setStatus("Import fehlgeschlagen — ist das die richtige Datei?");
    }
  };

  const reset = () => {
    const keys: string[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key?.startsWith("dd.")) keys.push(key);
    }
    keys.forEach((k) => window.localStorage.removeItem(k));
    setStatus("Zurückgesetzt — lädt neu…");
    setTimeout(() => window.location.reload(), 600);
  };

  return (
    <div className="px-gutter pt-safe pt-6 pb-10">
      <header>
        <h1 className="text-display text-nori font-extrabold">Einstellungen</h1>
        <p className="text-body text-nori-60 mt-1">Deine App, deine Regeln.</p>
      </header>

      <Section title="Standard-Portionen">
        <div className="flex items-center justify-between gap-3">
          <p className="text-body text-nori-60">Startwert für neue Rezepte.</p>
          <Stepper
            value={servings}
            onChange={setServings}
            min={1}
            max={8}
            ariaLabel="Standard-Portionen"
          />
        </div>
      </Section>

      {!standalone && (
        <Section title="Als App installieren">
          <p className="text-body text-nori">
            iOS hat keinen Installations-Button. So geht’s:
          </p>
          <ol className="text-body text-nori-60 mt-2 list-decimal space-y-1 pl-5">
            <li>Unten auf „Teilen“ ⬆️ tippen</li>
            <li>„Zum Home-Bildschirm“ wählen</li>
            <li>Mit „Hinzufügen“ bestätigen</li>
          </ol>
          <p className="text-caption text-nori-60 mt-2">
            Danach läuft DashiDash offline wie eine echte App.
          </p>
        </Section>
      )}

      <Section title="Daten sichern">
        <p className="text-body text-nori-60">
          Alles liegt nur auf deinem Gerät. Lade dir ein Backup herunter oder
          spiel eines ein.
        </p>
        <p className="text-caption text-nori-60 mt-1">
          (Vorrat, Pläne & Liste kommen in den nächsten Phasen dazu.)
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <ChunkyButton variant="secondary" onClick={exportData}>
            Exportieren
          </ChunkyButton>
          <ChunkyButton
            variant="secondary"
            onClick={() => fileRef.current?.click()}
          >
            Importieren
          </ChunkyButton>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) importData(file);
              e.target.value = "";
            }}
          />
        </div>
      </Section>

      <Section title="Zurücksetzen">
        <p className="text-body text-nori-60">
          Setzt alle Einstellungen und den Onboarding-Status zurück.
        </p>
        <div className="mt-3">
          <ChunkyButton variant="danger" onClick={reset}>
            Alles zurücksetzen
          </ChunkyButton>
        </div>
      </Section>

      {status && (
        <p className="text-caption text-matcha mt-4 text-center font-semibold">
          {status}
        </p>
      )}

      <footer className="mt-10 flex flex-col items-center text-center">
        <Mascot className="h-16 w-16" />
        <p className="text-caption text-nori-60 mt-2">
          DashiDash · lokal, offline, ohne Konto. Mit ♥ gebaut.
        </p>
      </footer>
    </div>
  );
}
