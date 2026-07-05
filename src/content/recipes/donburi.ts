import type { Recipe } from "@/content/schema";
import { ri } from "@/content/recipes/_helpers";

/**
 * Donburi & Reisschüsseln (docs/06 #1–5). Authored for servingsBase 2, honest
 * German times, one action per step with sensory checkpoints, explicit heat and
 * {amount:id} tokens so the portion calculator scales steps too (docs/05 §1).
 */
export const donburiRecipes: Recipe[] = [
  {
    id: "oyakodon",
    title: "Oyakodon",
    titleJp: "親子丼",
    subtitle:
      "Cremiges Hähnchen-Ei-Omelett über dampfendem Reis — Japans Soulfood.",
    intro:
      "Der Name heißt „Eltern und Kind“ — Huhn und Ei in einer Schüssel. Klingt frech, schmeckt himmlisch: weiches Ei, süß-salzige Dashi-Sauce, alles auf Reis.",
    categories: ["donburi", "20-minuten"],
    tags: ["reisschüssel", "hähnchen", "ei", "huhn", "donburi"],
    timeMinutes: 20,
    activeMinutes: 15,
    difficulty: "easy",
    diet: "fleisch",
    spicy: 0,
    servingsBase: 2,
    ingredients: [
      ri("reis", 160, "g"),
      ri("haehnchenschenkel", 250, "g", { note: "in mundgerechte Stücke" }),
      ri("ei", 4, "stueck", { note: "locker verquirlt" }),
      ri("zwiebel", 1, "stueck", { note: "in dünne Spalten" }),
      ri("wasser", 150, "ml", { group: "Sauce" }),
      ri("dashi-pulver", 1, "tl", { group: "Sauce" }),
      ri("shoyu", 3, "el", { group: "Sauce" }),
      ri("mirin", 2, "el", { group: "Sauce" }),
      ri("zucker", 1, "tl", { group: "Sauce" }),
      ri("fruehlingszwiebel", 2, "stueck", {
        note: "in feine Ringe",
        group: "Topping",
      }),
    ],
    equipment: ["schneidebrett", "pfanne", "reiskocher-oder-topf"],
    steps: [
      {
        text: "Setz zuerst den Reis auf: {amount:reis} Reis waschen, bis das Wasser klar ist, dann nach Packung kochen. So ist alles gleichzeitig fertig.",
        tip: "Reis zuerst — er gart parallel, während du den Rest machst.",
      },
      {
        text: "Schneide die Zwiebel in dünne Spalten und das Hähnchen in mundgerechte Stücke.",
      },
      {
        text: "Verquirle die {amount:ei} Eier in einer Schüssel — nur locker, nicht schaumig.",
      },
      {
        text: "Rühr die Sauce an: {amount:wasser} Wasser, {amount:dashi-pulver} Dashi-Pulver, {amount:shoyu} Sojasauce, {amount:mirin} Mirin und {amount:zucker} Zucker.",
      },
      {
        text: "Gib Sauce und Zwiebeln in die Pfanne und koch sie bei mittlerer Hitze (Stufe 6 von 9) auf, bis die Zwiebeln weich sind.",
        timerSeconds: 180,
      },
      {
        text: "Leg das Hähnchen hinein und lass es köcheln, bis es durch ist (nicht mehr glasig).",
        timerSeconds: 300,
      },
      {
        text: "Gieß das Ei gleichmäßig darüber. Deckel drauf und nur stocken lassen — nicht rühren!",
        tip: "Stocken heißt: fest werden lassen, ohne zu rühren. Das Ei darf in der Mitte noch leicht wackeln — das ist perfekt cremig.",
        attention: "Nicht rühren, sonst wird’s Rührei statt Oyakodon.",
        timerSeconds: 90,
      },
      {
        text: "Reis in zwei Schüsseln geben, die Ei-Hähnchen-Decke daraufgleiten lassen und mit {amount:fruehlingszwiebel} Frühlingszwiebeln bestreuen.",
      },
    ],
    substitutionNotes:
      "Kein Mirin? 1 EL Zucker in 2 EL Wasser auflösen. Kein Dashi? Nimm eine Prise mehr Sojasauce und etwas Wasser — wird auch lecker.",
    guideIds: [],
    illustrationId: "oyakodon",
  },
  {
    id: "gyudon",
    title: "Gyudon",
    titleJp: "牛丼",
    subtitle:
      "Zart geschmortes Rindfleisch mit süßen Zwiebeln auf Reis — wie bei Yoshinoya.",
    intro:
      "Die Bowl, die in Japan an jeder Ecke schnell und günstig über den Tresen geht: hauchdünnes Rind, weiche Zwiebeln, eine süß-salzige Dashi-Sauce. Feierabend gerettet.",
    categories: ["donburi", "20-minuten"],
    tags: ["reisschüssel", "rind", "zwiebel", "donburi", "yoshinoya"],
    timeMinutes: 20,
    activeMinutes: 15,
    difficulty: "easy",
    diet: "fleisch",
    spicy: 0,
    servingsBase: 2,
    ingredients: [
      ri("reis", 160, "g"),
      ri("rindfleisch", 250, "g", { note: "hauchdünn geschnitten" }),
      ri("zwiebel", 1, "stueck", { note: "in dünne Spalten" }),
      ri("ingwer", 10, "g", { note: "gerieben" }),
      ri("wasser", 150, "ml", { group: "Sauce" }),
      ri("dashi-pulver", 1, "tl", { group: "Sauce" }),
      ri("shoyu", 3, "el", { group: "Sauce" }),
      ri("mirin", 2, "el", { group: "Sauce" }),
      ri("kochsake", 2, "el", { group: "Sauce" }),
      ri("zucker", 1, "el", { group: "Sauce" }),
      ri("fruehlingszwiebel", 1, "stueck", {
        note: "in Ringe",
        group: "Topping",
      }),
    ],
    equipment: ["schneidebrett", "pfanne", "reiskocher-oder-topf"],
    steps: [
      {
        text: "Setz zuerst den Reis auf: {amount:reis} Reis waschen und nach Packung kochen.",
        tip: "Reis zuerst — dann ist alles gleichzeitig fertig.",
      },
      {
        text: "Schneide die Zwiebel in dünne Spalten und reibe den Ingwer.",
      },
      {
        text: "Gib {amount:wasser} Wasser, {amount:dashi-pulver} Dashi, {amount:shoyu} Sojasauce, {amount:mirin} Mirin, {amount:kochsake} Sake und {amount:zucker} Zucker mit den Zwiebeln in die Pfanne.",
      },
      {
        text: "Bei mittlerer Hitze (Stufe 6 von 9) köcheln lassen, bis die Zwiebeln weich und glasig sind.",
        timerSeconds: 300,
      },
      {
        text: "Zupf das dünne Rindfleisch auseinander, leg es in die Sauce und rühr vorsichtig, bis es gerade durch ist.",
        timerSeconds: 180,
        tip: "Dünnes Rind braucht nur 2–3 Minuten — länger macht es zäh.",
      },
      {
        text: "Reis in zwei Schüsseln geben, Fleisch samt Sauce darüber und mit {amount:fruehlingszwiebel} Frühlingszwiebeln toppen.",
      },
    ],
    substitutionNotes:
      "Kein hauchdünnes Rind bekommen? Leg ein Stück Rinderhüfte 15 Min ins Gefrierfach — dann lässt es sich super dünn schneiden. Kein Sake? Trockener Weißwein oder einfach weglassen.",
    guideIds: [],
    illustrationId: "gyudon",
  },
  {
    id: "tamagodon",
    title: "Tamagodon",
    titleJp: "玉子丼",
    subtitle:
      "Nur Ei, Zwiebel und Dashi über Reis — Soulfood pur, in 15 Minuten.",
    intro:
      "Oyakodon ohne Huhn — und mindestens genauso tröstlich. Weiches, in Dashi gestocktes Ei über warmem Reis. Günstiger und schneller geht Glück kaum.",
    categories: [
      "donburi",
      "15-minuten",
      "vegetarisch",
      "guenstig",
      "anfaenger",
    ],
    tags: ["reisschüssel", "ei", "vegetarisch", "günstig", "donburi"],
    timeMinutes: 15,
    activeMinutes: 12,
    difficulty: "easy",
    diet: "vegetarisch",
    spicy: 0,
    servingsBase: 2,
    ingredients: [
      ri("reis", 160, "g"),
      ri("ei", 4, "stueck", { note: "locker verquirlt" }),
      ri("zwiebel", 1, "stueck", { note: "in dünne Spalten" }),
      ri("wasser", 150, "ml", { group: "Sauce" }),
      ri("dashi-pulver-vegan", 1, "tl", { group: "Sauce" }),
      ri("shoyu", 2, "el", { group: "Sauce" }),
      ri("mirin", 2, "el", { group: "Sauce" }),
      ri("zucker", 1, "tl", { group: "Sauce" }),
      ri("fruehlingszwiebel", 1, "stueck", {
        note: "in Ringe",
        group: "Topping",
      }),
    ],
    equipment: ["schneidebrett", "pfanne", "reiskocher-oder-topf"],
    steps: [
      {
        text: "Setz zuerst den Reis auf: {amount:reis} Reis waschen und nach Packung kochen.",
        tip: "Reis zuerst — er gart nebenbei.",
      },
      {
        text: "Schneide die Zwiebel in dünne Spalten und verquirle die {amount:ei} Eier locker.",
      },
      {
        text: "Gib {amount:wasser} Wasser, {amount:dashi-pulver-vegan} vegane Dashi, {amount:shoyu} Sojasauce, {amount:mirin} Mirin und {amount:zucker} Zucker mit den Zwiebeln in die Pfanne.",
      },
      {
        text: "Bei mittlerer Hitze (Stufe 6 von 9) köcheln, bis die Zwiebeln weich sind.",
        timerSeconds: 180,
      },
      {
        text: "Ei gleichmäßig darübergießen, Deckel drauf und nur stocken lassen — nicht rühren.",
        tip: "Es darf in der Mitte noch leicht wackeln, das bleibt schön cremig.",
        timerSeconds: 90,
      },
      {
        text: "Über den Reis gleiten lassen und mit {amount:fruehlingszwiebel} Frühlingszwiebeln bestreuen.",
      },
    ],
    substitutionNotes:
      "Statt veganer Dashi geht auch normales Dashi-Pulver (dann nicht mehr vegetarisch) oder einfach Wasser + eine Prise mehr Sojasauce.",
    guideIds: [],
    illustrationId: "tamagodon",
  },
  {
    id: "tuna-mayo-don",
    title: "Thunfisch-Mayo-Don",
    subtitle:
      "Der Konbini-Klassiker aus der Dose — cremig, salzig, in Minuten fertig.",
    intro:
      "Das schnelle Mittagessen aus dem japanischen Kiosk: Thunfisch mit cremiger Kewpie-Mayo auf warmem Reis. Fünf Zutaten, null Aufwand, maximaler Suchtfaktor.",
    categories: ["donburi", "15-minuten", "5-zutaten", "guenstig", "anfaenger"],
    tags: ["reisschüssel", "thunfisch", "mayo", "günstig", "schnell"],
    timeMinutes: 10,
    activeMinutes: 8,
    difficulty: "easy",
    diet: "fisch",
    spicy: 0,
    servingsBase: 2,
    ingredients: [
      ri("reis", 160, "g"),
      ri("thunfisch-dose", 1, "dose", { note: "gut abgetropft" }),
      ri("kewpie-mayo", 2, "el"),
      ri("shoyu", 1, "tl"),
      ri("fruehlingszwiebel", 1, "stueck", {
        note: "in Ringe",
        group: "Topping",
      }),
      ri("nori", 1, "blatt", {
        note: "in Streifen",
        group: "Topping",
        optional: true,
      }),
    ],
    equipment: ["schuessel", "reiskocher-oder-topf"],
    steps: [
      {
        text: "Setz den Reis auf: {amount:reis} Reis waschen und nach Packung kochen.",
        tip: "Hast du Reis vom Vortag? Kurz heiß machen — dann bist du in 3 Minuten fertig.",
      },
      {
        text: "Thunfisch gut abtropfen und mit {amount:kewpie-mayo} Kewpie-Mayo und {amount:shoyu} Sojasauce cremig verrühren.",
      },
      {
        text: "Warmen Reis in zwei Schüsseln geben, die Thunfisch-Creme daraufsetzen und mit {amount:fruehlingszwiebel} Frühlingszwiebeln (und Nori) toppen.",
      },
    ],
    substitutionNotes:
      "Keine Kewpie-Mayo? Normale Mayo + eine Prise Zucker + ein paar Tropfen Reisessig kommen sehr nah dran.",
    guideIds: [],
    illustrationId: "tuna-mayo-don",
  },
];
