import type { Recipe } from "@/content/schema";
import { ri } from "@/content/recipes/_helpers";

/**
 * Meal-Prep-Basics (docs/06 #57,58,59,60): einmal kochen, die ganze Woche
 * würzen. Höhere servingsBase (Vorratsmengen), alle mit mealPrepNote. Der
 * Waste-Loop dashi-vorrat → furikake-selbstgemacht ist die Markenstory in
 * Miniatur (docs/06). {amount:id} tokens skalieren mit dem Portionsregler.
 */
export const vorratRecipes: Recipe[] = [
  {
    id: "teriyaki-sauce-vorrat",
    title: "Teriyaki-Sauce auf Vorrat",
    subtitle:
      "Nie wieder Fertigsauce: vier Zutaten, einmal aufkochen, wochenlang glänzen.",
    intro:
      "Die echte Teriyaki-Sauce sind nur vier Zutaten — kein Vergleich zur klebrig-künstlichen Flasche. Einmal aufgekocht hältst du sie im Kühlschrank und hast für jedes Hähnchen, jeden Tofu, jede Bowl sofort Glanz und Geschmack parat.",
    categories: ["meal-prep", "vegetarisch", "guenstig"],
    tags: ["sauce", "teriyaki", "vorrat", "vegan", "günstig"],
    timeMinutes: 10,
    activeMinutes: 8,
    difficulty: "easy",
    diet: "vegan",
    spicy: 0,
    servingsBase: 8,
    ingredients: [
      ri("shoyu", 100, "ml"),
      ri("mirin", 100, "ml"),
      ri("kochsake", 50, "ml"),
      ri("zucker", 2, "el"),
    ],
    equipment: ["kleiner-topf"],
    steps: [
      {
        text: "{amount:shoyu} Sojasauce, {amount:mirin} Mirin, {amount:kochsake} Sake und {amount:zucker} Zucker in einem kleinen Topf verrühren.",
      },
      {
        text: "Aufkochen und bei mittlerer Hitze (Stufe 5 von 9) offen köcheln lassen, bis die Sauce leicht sirupartig eindickt.",
        timerSeconds: 300,
        attention:
          "Nicht zu weit einkochen — beim Abkühlen wird sie noch dicker.",
      },
      {
        text: "Vollständig abkühlen lassen und in ein sauberes, verschließbares Glas füllen.",
        timerSeconds: 600,
      },
    ],
    substitutionNotes:
      "Kein Sake? Einfach weglassen und etwas mehr Mirin nehmen. Für eine dickere Glasur ½ TL in Wasser gelöste Speisestärke einrühren.",
    guideIds: ["teriyaki-sauce-selbst"],
    illustrationId: "teriyaki-sauce-vorrat",
    mealPrepNote:
      "Hält im verschlossenen Glas 2–3 Wochen im Kühlschrank. Vor Gebrauch kurz schütteln. Passt zu Hähnchen, Tofu, Lachs, Hambagu und über Reisbowls.",
  },
  {
    id: "furikake-selbstgemacht",
    title: "Furikake aus Dashi-Resten",
    subtitle:
      "Zero-Waste: Kombu und Katsuobushi aus der Dashi werden zur Reis-Streuwürze.",
    intro:
      "Wirf die ausgekochten Dashi-Reste nie weg: Kombu und Katsuobushi stecken noch voller Geschmack. Kurz eingekocht und getrocknet werden sie zu würzigem Furikake, das jeden schlichten Reis in ein Gericht verwandelt.",
    categories: ["meal-prep", "guenstig"],
    tags: ["furikake", "vorrat", "zero waste", "reis", "günstig"],
    timeMinutes: 10,
    activeMinutes: 10,
    difficulty: "easy",
    diet: "fisch",
    spicy: 0,
    servingsBase: 8,
    ingredients: [
      ri("katsuobushi", 20, "g", { note: "aus der Dashi, ausgedrückt" }),
      ri("kombu", 10, "g", { note: "aus der Dashi" }),
      ri("shoyu", 2, "el", { group: "Würze" }),
      ri("mirin", 1, "el", { group: "Würze" }),
      ri("zucker", 1, "tl", { group: "Würze" }),
      ri("sesam", 2, "el", { group: "Finish" }),
      ri("nori", 1, "blatt", { note: "fein zerkrümelt", group: "Finish" }),
    ],
    equipment: ["schneidebrett", "pfanne"],
    steps: [
      {
        text: "Den ausgekochten {amount:kombu} Kombu fein hacken. Den {amount:katsuobushi} Katsuobushi grob zerzupfen.",
      },
      {
        text: "Beides mit {amount:shoyu} Sojasauce, {amount:mirin} Mirin und {amount:zucker} Zucker in die Pfanne geben und bei mittlerer Hitze (Stufe 5 von 9) trocken rösten, bis die Flüssigkeit verdampft ist.",
        timerSeconds: 300,
        attention:
          "Ständig rühren gegen Ende — es soll trocken-krümelig, nicht verbrannt werden.",
      },
      {
        text: "{amount:sesam} Sesam kurz mitrösten, bis er duftet, dann vom Herd nehmen.",
        timerSeconds: 60,
      },
      {
        text: "Vollständig abkühlen lassen, mit dem zerkrümelten {amount:nori} Nori mischen und trocken in ein Glas füllen.",
        timerSeconds: 300,
      },
    ],
    substitutionNotes:
      "Nur Katsuobushi (ohne Kombu) geht auch. Vegetarisch: Kombu-Reste plus extra Sesam und Nori, den Katsuobushi weglassen.",
    guideIds: ["umami-einfach-erklaert"],
    illustrationId: "furikake-selbstgemacht",
    mealPrepNote:
      "Trocken abgefüllt hält das Furikake 2 Wochen. Über Reis, Onigiri, Ei oder Nudeln streuen — der zweite Frühling deiner Dashi-Zutaten.",
  },
  {
    id: "dashi-vorrat",
    title: "Dashi auf Vorrat",
    subtitle:
      "Die Umami-Basis für die ganze Woche — Kombu, Katsuobushi, klares Gold.",
    intro:
      "Selbstgemachte Dashi schmeckt runder und klarer als jedes Pulver — und ist überraschend einfach. Kombu und Katsuobushi geben ihr Umami in wenigen Minuten ab. Einmal gekocht, ist sie die Basis für Misosuppe, Nudelbrühen und mehr.",
    categories: ["meal-prep"],
    tags: ["dashi", "brühe", "vorrat", "umami", "basis"],
    timeMinutes: 15,
    activeMinutes: 8,
    difficulty: "easy",
    diet: "fisch",
    spicy: 0,
    servingsBase: 4,
    ingredients: [
      ri("wasser", 1000, "ml"),
      ri("kombu", 10, "g", { note: "nicht abwaschen" }),
      ri("katsuobushi", 20, "g"),
    ],
    equipment: ["topf", "sieb"],
    steps: [
      {
        text: "{amount:kombu} Kombu in {amount:wasser} kaltem Wasser einweichen (wenn du Zeit hast: 30 Min, es geht aber auch direkt).",
        tip: "Den weißen Belag auf dem Kombu nie abwaschen — das ist konzentriertes Umami.",
      },
      {
        text: "Langsam erhitzen (Stufe 4 von 9) und den Kombu kurz vor dem Kochen herausnehmen.",
        timerSeconds: 480,
        attention:
          "Kombu darf nicht mitkochen — sonst wird die Dashi schleimig und bitter.",
      },
      {
        text: "Einmal aufkochen, {amount:katsuobushi} Katsuobushi einstreuen, Hitze ausschalten und die Flocken absinken lassen.",
        timerSeconds: 180,
      },
      {
        text: "Durch ein Sieb gießen. Nicht ausdrücken — das gibt bittere Noten. (Kombu und Flocken für Furikake aufheben!)",
      },
    ],
    substitutionNotes:
      "Vegan: den Katsuobushi weglassen und dafür ein paar getrocknete Shiitake mitziehen lassen — das ergibt eine tiefe Kombu-Pilz-Dashi.",
    guideIds: ["dashi-in-5-minuten", "umami-einfach-erklaert"],
    illustrationId: "dashi-vorrat",
    mealPrepNote:
      "Hält 3 Tage im Kühlschrank oder eingefroren (praktisch als Eiswürfel portioniert) mehrere Wochen. Basis für Misosuppe, Kake-Udon, Ochazuke und mehr.",
  },
  {
    id: "miso-dama",
    title: "Miso-Dama",
    titleJp: "味噌玉",
    subtitle:
      "Selbstgemachte Instant-Misosuppe: eine Kugel, heißes Wasser, fertig.",
    intro:
      "Instant-Misosuppe, aber ohne Tütchen: kleine Kugeln aus Miso, Dashi und Einlage, die du auf Vorrat machst. Im Büro oder abends nur mit heißem Wasser übergießen — in 30 Sekunden dampft die Suppe.",
    categories: ["meal-prep", "snacks", "vegetarisch", "guenstig"],
    tags: ["miso", "suppe", "vorrat", "instant", "vegan", "günstig", "büro"],
    timeMinutes: 15,
    activeMinutes: 15,
    difficulty: "easy",
    diet: "vegan",
    spicy: 0,
    servingsBase: 6,
    ingredients: [
      ri("miso-hell", 6, "el", { group: "Basis" }),
      ri("dashi-pulver-vegan", 2, "tl", { group: "Basis" }),
      ri("wakame", 2, "tl", { note: "getrocknet", group: "Einlage" }),
      ri("fruehlingszwiebel", 2, "stueck", {
        note: "in feine Ringe",
        group: "Einlage",
      }),
      ri("sesam", 1, "el", { group: "Einlage" }),
    ],
    equipment: ["schuessel"],
    steps: [
      {
        text: "{amount:miso-hell} Miso mit {amount:dashi-pulver-vegan} Dashi-Pulver zu einer glatten Paste verrühren.",
      },
      {
        text: "{amount:wakame} Wakame, {amount:fruehlingszwiebel} Frühlingszwiebeln und {amount:sesam} Sesam unter die Paste mischen.",
        tip: "Die Wakame trocken unterrühren — sie quillt später im heißen Wasser auf.",
      },
      {
        text: "Die Masse in 6 gleiche Portionen teilen und zu Kugeln formen. Einzeln in Frischhaltefolie wickeln (oder in kleine Förmchen setzen).",
      },
      {
        text: "Zum Essen eine Kugel in eine Tasse geben und mit ~200 ml heißem Wasser aufgießen, kurz umrühren — fertig ist die Misosuppe.",
      },
    ],
    substitutionNotes:
      "Rotes Miso macht es kräftiger. Mit Bonito-Dashi wird’s klassischer (dann nicht vegan). Getrockneter Tofu oder Instant-Wakame-Mix machen mehr Einlage.",
    guideIds: ["miso-richtig-verwenden"],
    illustrationId: "miso-dama",
    mealPrepNote:
      "Einzeln eingewickelt halten die Kugeln 1 Woche im Kühlschrank und mehrere Wochen im Gefrierfach. Perfekt fürs Büro oder für den schnellen Suppen-Notfall.",
  },
];
