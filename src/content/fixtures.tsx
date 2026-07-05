import type { RecipeCardData } from "@/components/ui/RecipeCard";
import { DishArtPlaceholder } from "@/content/illustrations/DishArtPlaceholder";

/**
 * Fixture recipe cards for the styleguide and for developing feature screens
 * against before real content lands (Phase 2). These are NOT bundled content —
 * they carry no schema guarantees and use the placeholder dish art. Spread of
 * diets / difficulty / spice / cost so the RecipeCard is exercised in every
 * state.
 */
export const recipeCardFixtures: RecipeCardData[] = [
  {
    id: "oyakodon",
    title: "Oyakodon",
    titleJp: "親子丼",
    subtitle:
      "Cremiges Hähnchen-Ei-Omelett über dampfendem Reis — das japanische Soulfood.",
    timeMinutes: 15,
    difficulty: 1,
    ingredientCount: 6,
    costPerServing: 2.8,
    diet: "fleisch",
    spicy: 0,
    illustration: <DishArtPlaceholder tint="tamago" />,
  },
  {
    id: "yaki-udon",
    title: "Gemüse-Yaki-Udon",
    titleJp: "焼きうどん",
    subtitle: "Dicke Udon-Nudeln, knackiges Gemüse, süß-salzige Sauce.",
    timeMinutes: 18,
    difficulty: 1,
    ingredientCount: 7,
    costPerServing: 2.4,
    diet: "vegetarisch",
    spicy: 1,
    illustration: <DishArtPlaceholder tint="matcha" />,
  },
  {
    id: "onigiri",
    title: "Onigiri",
    titleJp: "おにぎり",
    subtitle: "Handliche Reisdreiecke mit Nori — der perfekte Snack.",
    timeMinutes: 12,
    difficulty: 1,
    ingredientCount: 4,
    costPerServing: 1.2,
    diet: "vegetarisch",
    spicy: 0,
    illustration: <DishArtPlaceholder tint="sora" />,
  },
  {
    id: "gyudon",
    title: "Gyudon",
    titleJp: "牛丼",
    subtitle: "Zart geschmortes Rindfleisch mit Zwiebeln auf Reis.",
    timeMinutes: 20,
    difficulty: 2,
    ingredientCount: 8,
    costPerServing: 3.2,
    diet: "fleisch",
    spicy: 0,
    illustration: <DishArtPlaceholder tint="dashi" />,
  },
  {
    id: "miso-lachs",
    title: "Miso-Lachs",
    titleJp: "鮭の味噌焼き",
    subtitle: "Glasierter Lachs aus dem Ofen — süß, salzig, umami.",
    timeMinutes: 22,
    difficulty: 2,
    ingredientCount: 6,
    costPerServing: 4.1,
    diet: "fisch",
    spicy: 0,
    illustration: <DishArtPlaceholder tint="dashi" />,
  },
  {
    id: "mapo-tofu",
    title: "Mapo Tofu",
    titleJp: "麻婆豆腐",
    subtitle: "Seidiger Tofu in feuriger Bohnensauce — richtig scharf.",
    timeMinutes: 25,
    difficulty: 3,
    ingredientCount: 9,
    costPerServing: 3.6,
    diet: "vegan",
    spicy: 3,
    illustration: <DishArtPlaceholder tint="matcha" />,
  },
];
