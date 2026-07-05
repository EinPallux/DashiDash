"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import {
  Badge,
  DietBadge,
  DifficultyBadge,
  SpiceBadge,
} from "@/components/ui/Badge";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { Card } from "@/components/ui/Card";
import { ChunkyButton } from "@/components/ui/ChunkyButton";
import { CountUpNumber } from "@/components/ui/CountUpNumber";
import { FilterChip } from "@/components/ui/FilterChip";
import { JuicyCheckbox } from "@/components/ui/JuicyCheckbox";
import { ProgressBar, ProgressRing } from "@/components/ui/Progress";
import { RecipeCard } from "@/components/ui/RecipeCard";
import { Skeleton, RecipeCardSkeleton } from "@/components/ui/Skeleton";
import { StatPill } from "@/components/ui/StatPill";
import { Stepper } from "@/components/ui/Stepper";
import { recipeCardFixtures } from "@/content/fixtures";
import { Mascot } from "@/content/illustrations/Mascot";
import {
  OnigiriArt,
  OyakodonArt,
  YakiUdonArt,
} from "@/content/illustrations/dishes";
import { getDishArt } from "@/content/illustrations/registry";
import { ingredients } from "@/content/ingredients";
import { recipes } from "@/content/recipes";
import { toRecipeCardData } from "@/lib/recipe-card";
import {
  IconBasket,
  IconBlender,
  IconBowl,
  IconBox,
  IconCheck,
  IconChevronRight,
  IconChili,
  IconChopstick,
  IconClock,
  IconDots,
  IconDrag,
  IconEuro,
  IconFish,
  IconFridge,
  IconGrater,
  IconInfo,
  IconKettle,
  IconKnife,
  IconLantern,
  IconLeaf,
  IconMinus,
  IconOven,
  IconPan,
  IconPlus,
  IconPot,
  IconRiceCooker,
  IconSaucepan,
  IconSearch,
  IconSettings,
  IconShare,
  IconSieve,
  IconSnowflake,
  IconTimer,
  IconTrash,
  IconWhisk,
} from "@/components/ui/icons";

/* ------------------------------ scaffolding ---------------------------- */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-9">
      <h2 className="font-display text-nori text-title font-extrabold">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Sub({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-4 first:mt-0">
      <p className="text-caption text-nori-60 mb-2 font-bold tracking-wide uppercase">
        {label}
      </p>
      {children}
    </div>
  );
}

const COLORS: { name: string; hex: string; cls: string }[] = [
  { name: "rice", hex: "#FFF9F0", cls: "bg-rice" },
  { name: "rice-warm", hex: "#FFF1DE", cls: "bg-rice-warm" },
  { name: "paper", hex: "#FFFFFF", cls: "bg-paper" },
  { name: "nori", hex: "#20312B", cls: "bg-nori" },
  { name: "nori-60", hex: "#5C6B65", cls: "bg-nori-60" },
  { name: "dashi", hex: "#FF7A45", cls: "bg-dashi" },
  { name: "dashi-deep", hex: "#E85D25", cls: "bg-dashi-deep" },
  { name: "dashi-soft", hex: "#FFE8DC", cls: "bg-dashi-soft" },
  { name: "matcha", hex: "#7BA05B", cls: "bg-matcha" },
  { name: "matcha-soft", hex: "#EAF2E0", cls: "bg-matcha-soft" },
  { name: "tamago", hex: "#FFC53D", cls: "bg-tamago" },
  { name: "ume", hex: "#E05252", cls: "bg-ume" },
  { name: "sora", hex: "#4E8DA6", cls: "bg-sora" },
];

const ICONS: {
  C: (p: { className?: string }) => React.ReactElement;
  name: string;
}[] = [
  { C: IconClock, name: "Clock" },
  { C: IconChopstick, name: "Chopstick" },
  { C: IconChili, name: "Chili" },
  { C: IconBasket, name: "Basket" },
  { C: IconEuro, name: "Euro" },
  { C: IconPan, name: "Pan" },
  { C: IconPot, name: "Pot" },
  { C: IconSaucepan, name: "Saucepan" },
  { C: IconRiceCooker, name: "RiceCooker" },
  { C: IconOven, name: "Oven" },
  { C: IconKnife, name: "Knife" },
  { C: IconBowl, name: "Bowl" },
  { C: IconSieve, name: "Sieve" },
  { C: IconGrater, name: "Grater" },
  { C: IconBlender, name: "Blender" },
  { C: IconKettle, name: "Kettle" },
  { C: IconWhisk, name: "Whisk" },
  { C: IconLeaf, name: "Leaf" },
  { C: IconFish, name: "Fish" },
  { C: IconFridge, name: "Fridge" },
  { C: IconLantern, name: "Lantern" },
  { C: IconBox, name: "Box" },
  { C: IconSnowflake, name: "Snowflake" },
  { C: IconDots, name: "Dots" },
  { C: IconPlus, name: "Plus" },
  { C: IconMinus, name: "Minus" },
  { C: IconCheck, name: "Check" },
  { C: IconTrash, name: "Trash" },
  { C: IconTimer, name: "Timer" },
  { C: IconSearch, name: "Search" },
  { C: IconSettings, name: "Settings" },
  { C: IconInfo, name: "Info" },
  { C: IconShare, name: "Share" },
  { C: IconDrag, name: "Drag" },
  { C: IconChevronRight, name: "ChevronRight" },
];

const FILTERS = [
  "≤ 15 Min",
  "≤ 20 Min",
  "Easy",
  "Vegetarisch",
  "Vegan",
  "≤ 5 Zutaten",
  "≤ 3,50 €",
];

/* -------------------------------- page --------------------------------- */

export default function StyleguidePage() {
  const [filters, setFilters] = useState<Record<string, boolean>>({});
  const [checks, setChecks] = useState([false, true, false]);
  const [portions, setPortions] = useState(2);
  const [count, setCount] = useState(42);
  const [progress, setProgress] = useState(0.4);
  const [pulsing, setPulsing] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);

  const activeFilters = Object.values(filters).filter(Boolean).length;
  const resultCount = Math.max(0, 24 - activeFilters * 4);
  const eggs = Math.round((3 * portions) / 2);

  // Real batch-1 content mapped through the RecipeCard view-model.
  const ingredientsById = new Map(ingredients.map((i) => [i.id, i]));
  const realCards = recipes.map((r) => {
    const Art = getDishArt(r.illustrationId);
    return toRecipeCardData(r, ingredientsById, <Art title={r.title} />);
  });

  const calibration = [
    { Art: OyakodonArt, label: "oyakodon" },
    { Art: YakiUdonArt, label: "yaki-udon" },
    { Art: OnigiriArt, label: "onigiri" },
  ];

  return (
    <div className="px-gutter pt-safe pb-16">
      <header className="pt-6">
        <p className="font-display text-caption text-dashi font-bold tracking-wide uppercase">
          Phase 1 · Referenz
        </p>
        <h1 className="text-display text-nori mt-1 font-extrabold">
          Styleguide
        </h1>
        <p className="text-body text-nori-60 mt-1">
          Jedes Primitive in jedem Zustand. Die visuelle Regressions-Referenz
          für das Designsystem.
        </p>
      </header>

      {/* --------------------- Phase 2 · Kalibrierung ----------------------- */}
      <Section title="Kalibrierung (Illustrationen)">
        <p className="text-body text-nori-60 -mt-1 mb-3">
          Die drei Kalibrier-Illustrationen (docs/02 §7) — gleicher Stil, 2,5px
          Nori-Kontur, palettentreue Füllungen. Stil hiermit gelockt.
        </p>
        <div className="grid grid-cols-3 gap-3">
          {calibration.map(({ Art, label }) => (
            <div key={label} className="flex flex-col items-center gap-1.5">
              <div className="rounded-card bg-rice-warm grid aspect-square w-full place-items-center">
                <Art title={label} className="h-[86%] w-[86%]" />
              </div>
              <span className="text-caption text-nori-60 font-mono">
                {label}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------------------- Phase 2 · Echte Rezepte --------------------- */}
      <Section title="Batch 1 · echte Rezepte">
        <p className="text-body text-nori-60 -mt-1 mb-3">
          {`${recipes.length} Rezepte, echte Zutaten, abgeleitete Kosten & Zutatenzahl. Die Kalibrier-Trio-Karten zeigen die finale Illustration, der Rest Platzhalter.`}
        </p>
        <div className="no-scrollbar -mx-gutter px-gutter flex gap-3 overflow-x-auto pb-1">
          {realCards.map((data) => (
            <RecipeCard
              key={data.id}
              data={data}
              size="rail"
              href={`/rezept/${data.id}`}
            />
          ))}
        </div>
        <div className="mt-4 space-y-3">
          {realCards.slice(0, 3).map((data) => (
            <RecipeCard
              key={data.id}
              data={data}
              size="grid"
              href={`/rezept/${data.id}`}
            />
          ))}
        </div>
      </Section>

      {/* ------------------------------- Farben ------------------------------ */}
      <Section title="Farben">
        <div className="grid grid-cols-3 gap-3">
          {COLORS.map((c) => (
            <div key={c.name} className="flex flex-col gap-1">
              <div
                className={cn(
                  "rounded-card border-hairline h-14 border",
                  c.cls,
                )}
              />
              <div className="text-caption text-nori font-bold">{c.name}</div>
              <div className="text-caption text-nori-60 tabular">{c.hex}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------------------------- Typografie ----------------------------- */}
      <Section title="Typografie">
        <div className="space-y-2">
          <p className="font-display text-display text-nori font-extrabold">
            Display · 28
          </p>
          <p className="font-display text-title text-nori font-bold">
            Title · 22
          </p>
          <p className="text-heading text-nori font-bold">Heading · 17</p>
          <p className="text-body text-nori">
            Body · 15 — schnelle, authentische japanische Küche für faule Tage.
          </p>
          <p className="text-caption text-nori-60">
            Caption · 13 — Meta & Labels
          </p>
          <p className="font-display text-stat text-dashi tabular font-extrabold">
            34 · Stat-Zahl
          </p>
        </div>
      </Section>

      {/* ----------------------------- Buttons ------------------------------- */}
      <Section title="Buttons">
        <Sub label="Varianten (M)">
          <div className="flex flex-wrap gap-3">
            <ChunkyButton variant="primary">Los geht&apos;s</ChunkyButton>
            <ChunkyButton variant="secondary">Zurück</ChunkyButton>
            <ChunkyButton variant="success">Abhaken</ChunkyButton>
            <ChunkyButton variant="ghost">Mehr</ChunkyButton>
            <ChunkyButton variant="danger">Löschen</ChunkyButton>
          </div>
        </Sub>
        <Sub label="Größe L, mit Icons, Full-Width, Disabled">
          <div className="space-y-3">
            <ChunkyButton
              variant="primary"
              size="l"
              fullWidth
              rightIcon={<IconChevronRight className="h-5 w-5" />}
            >
              Kochmodus starten 🔥
            </ChunkyButton>
            <div className="flex flex-wrap gap-3">
              <ChunkyButton
                variant="secondary"
                leftIcon={<IconPlus className="h-5 w-5" />}
              >
                Zur Liste
              </ChunkyButton>
              <ChunkyButton variant="primary" disabled>
                Deaktiviert
              </ChunkyButton>
            </div>
          </div>
        </Sub>
      </Section>

      {/* ------------------------------ Cards -------------------------------- */}
      <Section title="Cards">
        <div className="space-y-3">
          <Card className="p-4">
            <p className="text-body text-nori">
              Standard-Card (Paper, Card-Schatten).
            </p>
          </Card>
          <Card bordered className="bg-rice-warm p-4">
            <p className="text-body text-nori">
              Bordered-Card mit Hairline auf getöntem Grund.
            </p>
          </Card>
          <Card interactive className="p-4">
            <p className="text-body text-nori">
              Interaktive Card — drück mich (Squash &amp; Release).
            </p>
          </Card>
        </div>
      </Section>

      {/* --------------------------- Stat Pills ------------------------------ */}
      <Section title="Stat-Pills & Badges">
        <Sub label="Stat-Pills">
          <div className="flex flex-wrap gap-2">
            <StatPill icon={<IconClock />}>15 Min</StatPill>
            <StatPill icon={<IconBasket />}>6 Zutaten</StatPill>
            <StatPill icon={<IconEuro />}>≈ 2,80 €</StatPill>
            <StatPill icon={<IconPan />} onClick={() => setSheetOpen(true)}>
              Equipment
            </StatPill>
          </div>
        </Sub>
        <Sub label="Diät">
          <div className="flex flex-wrap gap-2">
            <DietBadge diet="fleisch" />
            <DietBadge diet="fisch" />
            <DietBadge diet="vegetarisch" />
            <DietBadge diet="vegan" />
          </div>
        </Sub>
        <Sub label="Schwierigkeit & Schärfe">
          <div className="flex flex-wrap gap-2">
            <DifficultyBadge level={1} />
            <DifficultyBadge level={2} />
            <DifficultyBadge level={3} />
            <SpiceBadge level={0} showZero />
            <SpiceBadge level={1} />
            <SpiceBadge level={2} />
            <SpiceBadge level={3} />
            <Badge>Donburi</Badge>
          </div>
        </Sub>
      </Section>

      {/* --------------------------- Filter Chips ---------------------------- */}
      <Section title="Filter-Chips">
        <div className="no-scrollbar -mx-gutter px-gutter flex gap-2 overflow-x-auto pb-1">
          {FILTERS.map((f, i) => (
            <FilterChip
              key={f}
              active={!!filters[f]}
              count={(i + 2) * 2}
              onClick={() => setFilters((s) => ({ ...s, [f]: !s[f] }))}
            >
              {f}
            </FilterChip>
          ))}
        </div>
        <p className="text-heading text-nori mt-3 font-bold">
          <CountUpNumber value={resultCount} className="text-dashi" /> Rezepte
        </p>
      </Section>

      {/* ---------------------------- Bottom Sheet --------------------------- */}
      <Section title="Bottom Sheet">
        <ChunkyButton variant="secondary" onClick={() => setSheetOpen(true)}>
          Lexikon öffnen
        </ChunkyButton>
        <BottomSheet
          open={sheetOpen}
          onClose={() => setSheetOpen(false)}
          title="Mirin"
        >
          <div className="space-y-4 pb-2">
            <div>
              <p className="text-caption text-nori-60 font-bold uppercase">
                Was ist das?
              </p>
              <p className="text-body text-nori mt-1">
                Ein süßer, milder Reiswein zum Kochen. Gibt Saucen Glanz und
                eine sanfte Süße.
              </p>
            </div>
            <div>
              <p className="text-caption text-nori-60 font-bold uppercase">
                Schmeckt wie
              </p>
              <p className="text-body text-nori mt-1">
                Wie ein Mix aus Sherry und Honig — nur milder.
              </p>
            </div>
            <ChunkyButton
              variant="primary"
              fullWidth
              onClick={() => setSheetOpen(false)}
            >
              Verstanden
            </ChunkyButton>
          </div>
        </BottomSheet>
      </Section>

      {/* --------------------------- Juicy Checkbox -------------------------- */}
      <Section title="Juicy Checkbox">
        <div className="space-y-3">
          {["Mirin", "Sojasauce", "Frühlingszwiebeln"].map((item, i) => (
            <JuicyCheckbox
              key={item}
              checked={checks[i] ?? false}
              onChange={(v) =>
                setChecks((s) => s.map((c, j) => (j === i ? v : c)))
              }
              label={item}
            />
          ))}
        </div>
      </Section>

      {/* ------------------------------ Stepper ------------------------------ */}
      <Section title="Stepper">
        <div className="flex flex-wrap items-center gap-4">
          <Stepper
            value={portions}
            onChange={setPortions}
            min={1}
            max={8}
            unitLabel="Portionen"
            ariaLabel="Portionen"
          />
          <p className="text-body text-nori">
            <CountUpNumber value={eggs} className="font-bold" /> Eier
          </p>
        </div>
      </Section>

      {/* --------------------------- Count-up Number ------------------------- */}
      <Section title="Count-up Number">
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-display text-stat text-dashi font-extrabold">
            <CountUpNumber value={count} />
          </span>
          <div className="flex gap-2">
            <ChunkyButton
              variant="ghost"
              onClick={() => setCount((c) => c + 7)}
            >
              +7
            </ChunkyButton>
            <ChunkyButton
              variant="ghost"
              onClick={() => setCount((c) => Math.max(0, c - 5))}
            >
              −5
            </ChunkyButton>
          </div>
          <span className="text-heading text-matcha font-bold">
            sparst ca.{" "}
            <CountUpNumber
              value={count / 10}
              format={(n) =>
                `${n.toLocaleString("de-DE", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })} €`
              }
            />
          </span>
        </div>
      </Section>

      {/* ------------------------------ Progress ----------------------------- */}
      <Section title="Progress">
        <Sub label="Fortschrittsbalken (mit Maskottchen)">
          <div className="pt-4">
            <ProgressBar
              value={progress}
              showMascot
              aria-label="Kochfortschritt"
            />
          </div>
          <div className="mt-3 flex gap-2">
            <ChunkyButton
              variant="ghost"
              onClick={() => setProgress((p) => Math.max(0, p - 0.2))}
            >
              −
            </ChunkyButton>
            <ChunkyButton
              variant="ghost"
              onClick={() => setProgress((p) => Math.min(1, p + 0.2))}
            >
              +
            </ChunkyButton>
          </div>
        </Sub>
        <Sub label="Timer-Ring">
          <div className="flex items-center gap-4">
            <ProgressRing
              progress={progress}
              pulsing={pulsing}
              aria-label="Timer"
            >
              <span className="font-display text-heading text-nori tabular font-extrabold">
                {Math.round(progress * 60)}s
              </span>
            </ProgressRing>
            <ChunkyButton
              variant="secondary"
              onClick={() => setPulsing((p) => !p)}
            >
              Puls: {pulsing ? "an" : "aus"}
            </ChunkyButton>
          </div>
        </Sub>
      </Section>

      {/* ------------------------------ Skeleton ----------------------------- */}
      <Section title="Skeleton">
        <div className="flex gap-3 overflow-hidden">
          <RecipeCardSkeleton />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-3/4 rounded-md" />
            <Skeleton className="h-4 w-1/2 rounded-md" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </Section>

      {/* ----------------------------- Recipe Card --------------------------- */}
      <Section title="Recipe Card — Rail">
        <div className="no-scrollbar -mx-gutter px-gutter flex gap-3 overflow-x-auto pb-1">
          {recipeCardFixtures.map((r) => (
            <RecipeCard
              key={r.id}
              data={r}
              size="rail"
              href={`/rezept/${r.id}`}
            />
          ))}
        </div>
      </Section>

      <Section title="Recipe Card — Grid">
        <div className="space-y-3">
          {recipeCardFixtures.slice(0, 3).map((r) => (
            <RecipeCard
              key={r.id}
              data={r}
              size="grid"
              href={`/rezept/${r.id}`}
            />
          ))}
        </div>
      </Section>

      {/* ------------------------------- Icons ------------------------------- */}
      <Section title="Icons">
        <div className="grid grid-cols-5 gap-3">
          {ICONS.map(({ C, name }) => (
            <div key={name} className="flex flex-col items-center gap-1.5">
              <div className="rounded-card border-hairline bg-paper text-nori grid h-12 w-full place-items-center border">
                <C className="h-6 w-6" />
              </div>
              <span className="text-nori-60 text-[0.6875rem] leading-tight">
                {name}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* ------------------------------ Mascot ------------------------------- */}
      <Section title="Maskottchen">
        <Card className="grid place-items-center p-6">
          <Mascot title="Dashi, das Maskottchen" className="h-32 w-32" />
        </Card>
      </Section>
    </div>
  );
}
