/**
 * Content barrel — one import point for the bundled seed data (docs/03). All
 * modules are plain typed data (no runtime Zod), validated at build/CI by
 * `scripts/validate-content.ts`.
 */
export { ingredients } from "@/content/ingredients";
export { lexicon } from "@/content/lexicon";
export { categories, CATEGORY_TIME_CAPS } from "@/content/categories";
export { recipes } from "@/content/recipes";
export { guides } from "@/content/guides";
