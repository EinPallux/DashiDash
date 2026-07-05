import type { CategoryMeta } from "@/content/schema";

/**
 * The 11 landing categories (docs/01 §4.1, docs/06). `order` is the rail order
 * on Entdecken. Titles/taglines are German, du-Form, warm (docs/01 §11).
 * Emojis are decorative copy only.
 */
export const categories: CategoryMeta[] = [
  {
    id: "15-minuten",
    title: "In 15 Minuten",
    tagline: "Auf dem Tisch, bevor der Hunger nervt.",
    emoji: "⏱️",
    order: 1,
  },
  {
    id: "20-minuten",
    title: "In 20 Minuten",
    tagline: "Ein bisschen mehr, immer noch fix.",
    emoji: "⏲️",
    order: 2,
  },
  {
    id: "5-zutaten",
    title: "5 Zutaten",
    tagline: "Kurze Einkaufsliste, großer Geschmack.",
    emoji: "🖐️",
    order: 3,
  },
  {
    id: "anfaenger",
    title: "Für Anfänger",
    tagline: "Kann nichts schiefgehen. Versprochen.",
    emoji: "🌱",
    order: 4,
  },
  {
    id: "meal-prep",
    title: "Meal Prep",
    tagline: "Einmal kochen, die ganze Woche freuen.",
    emoji: "🍱",
    order: 5,
  },
  {
    id: "ramen-upgrades",
    title: "Ramen-Upgrades",
    tagline: "Aus der Instant-Packung wird ein Gericht.",
    emoji: "🍜",
    order: 6,
  },
  {
    id: "donburi",
    title: "Donburi & Reisschüsseln",
    tagline: "Alles auf Reis — Japans Soulfood.",
    emoji: "🍚",
    order: 7,
  },
  {
    id: "fruehstueck",
    title: "Japanisches Frühstück",
    tagline: "Sanft in den Tag, mit Umami.",
    emoji: "🌅",
    order: 8,
  },
  {
    id: "vegetarisch",
    title: "Vegetarisch & Vegan",
    tagline: "Ganz ohne Fleisch, ganz viel Geschmack.",
    emoji: "🥬",
    order: 9,
  },
  {
    id: "guenstig",
    title: "Günstig kochen",
    tagline: "Lecker essen, wenig ausgeben.",
    emoji: "💸",
    order: 10,
  },
  {
    id: "snacks",
    title: "Snacks & Onigiri",
    tagline: "Kleine Häppchen für zwischendurch.",
    emoji: "🍙",
    order: 11,
  },
];

/** Time caps enforced by validate:content (docs/04 §10). */
export const CATEGORY_TIME_CAPS: Partial<Record<CategoryMeta["id"], number>> = {
  "15-minuten": 15,
  "20-minuten": 20,
};
