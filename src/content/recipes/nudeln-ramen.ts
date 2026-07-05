import type { Recipe } from "@/content/schema";
import { ri } from "@/content/recipes/_helpers";

/** Nudeln, Ramen-Upgrades & ein Meal-Prep-Basic (docs/06 #10,12,15,22,24,56). */
export const nudelnRamenRecipes: Recipe[] = [
  {
    id: "yaki-udon",
    title: "Yaki Udon",
    titleJp: "焼きうどん",
    subtitle:
      "Gebratene dicke Udon-Nudeln mit Schwein und Kohl — ein Wok-Wunder.",
    intro:
      "Dicke, weiche Udon aus der Pfanne, knackiger Kohl und Karotte, dazu eine süß-salzige Sauce. Ein Ein-Pfannen-Gericht, das nach Streetfood schmeckt und trotzdem kinderleicht ist.",
    categories: ["15-minuten", "anfaenger"],
    tags: ["nudeln", "udon", "gebraten", "schwein", "pfanne"],
    timeMinutes: 15,
    activeMinutes: 15,
    difficulty: "easy",
    diet: "fleisch",
    spicy: 0,
    servingsBase: 2,
    ingredients: [
      ri("udon", 2, "packung", { note: "vorgekocht" }),
      ri("schweinebauch", 150, "g", { note: "in schmale Streifen" }),
      ri("spitzkohl", 150, "g", { note: "grob geschnitten" }),
      ri("karotte", 1, "stueck", { note: "in feine Stifte" }),
      ri("oel-neutral", 1, "el", { scalable: false }),
      ri("shoyu", 2, "el", { group: "Sauce" }),
      ri("mirin", 1, "el", { group: "Sauce" }),
      ri("kochsake", 1, "el", { group: "Sauce" }),
      ri("fruehlingszwiebel", 2, "stueck", {
        note: "in Stücke",
        group: "Topping",
      }),
      ri("sesam", 1, "tl", { group: "Topping", optional: true }),
    ],
    equipment: ["schneidebrett", "pfanne"],
    steps: [
      {
        text: "Alles vorbereiten: Schweinebauch in Streifen, Kohl grob, Karotte in feine Stifte, Frühlingszwiebeln in Stücke.",
        tip: "Beim Pfannen-Braten geht’s schnell — leg dir alles griffbereit hin.",
      },
      {
        text: "Udon kurz mit warmem Wasser übergießen und vorsichtig lösen, dann abtropfen.",
      },
      {
        text: "{amount:oel-neutral} Öl in der Pfanne stark erhitzen (Stufe 8 von 9) und den Schweinebauch knusprig braten.",
        timerSeconds: 180,
      },
      {
        text: "{amount:karotte} Karotte und {amount:spitzkohl} Kohl dazugeben und unter Rühren braten, bis der Kohl zusammenfällt.",
        timerSeconds: 180,
      },
      {
        text: "Udon dazugeben, dann {amount:shoyu} Sojasauce, {amount:mirin} Mirin und {amount:kochsake} Sake angießen und alles schwenken, bis die Sauce glänzt.",
        timerSeconds: 120,
      },
      {
        text: "Mit {amount:fruehlingszwiebel} Frühlingszwiebeln und etwas Sesam bestreuen und sofort servieren.",
      },
    ],
    substitutionNotes:
      "Spitzkohl geht auch als Chinakohl oder Weißkohl. Kein Sake? Ein Schuss Wasser oder Weißwein. Statt Schweinebauch schmeckt auch Hähnchen.",
    guideIds: [],
    illustrationId: "yaki-udon",
  },
  {
    id: "kake-udon",
    title: "Kake Udon",
    subtitle:
      "Udon in klarer, heißer Dashi-Brühe — minimalistisch und wärmend.",
    intro:
      "Die pure Version: dicke Udon in einer klaren, warmen Dashi-Brühe. Nichts lenkt ab, alles wärmt. In 10 Minuten und mit fünf Zutaten auf dem Tisch.",
    categories: ["15-minuten", "5-zutaten", "guenstig", "anfaenger"],
    tags: ["nudeln", "udon", "suppe", "brühe", "günstig"],
    timeMinutes: 10,
    activeMinutes: 10,
    difficulty: "easy",
    diet: "fisch",
    spicy: 0,
    servingsBase: 2,
    ingredients: [
      ri("udon", 2, "packung", { note: "vorgekocht" }),
      ri("wasser", 700, "ml", { group: "Brühe" }),
      ri("dashi-pulver", 1, "el", { group: "Brühe" }),
      ri("shoyu", 2, "el", { group: "Brühe" }),
      ri("mirin", 1, "el", { group: "Brühe" }),
      ri("fruehlingszwiebel", 1, "stueck", {
        note: "in Ringe",
        group: "Topping",
      }),
    ],
    equipment: ["topf"],
    steps: [
      {
        text: "{amount:wasser} Wasser mit {amount:dashi-pulver} Dashi, {amount:shoyu} Sojasauce und {amount:mirin} Mirin aufkochen, dann Hitze runter (Stufe 4 von 9).",
        timerSeconds: 120,
      },
      {
        text: "Udon in die Brühe geben und warm ziehen lassen, bis sie sich lösen und heiß sind.",
        timerSeconds: 120,
      },
      {
        text: "In zwei Schüsseln füllen und mit {amount:fruehlingszwiebel} Frühlingszwiebeln bestreuen. Wer mag, streut Shichimi darüber.",
      },
    ],
    substitutionNotes:
      "Kein Dashi-Pulver? Ein Stück Kombu 15 Min in dem heißen Wasser ziehen lassen (dann vegetarisch). Mirin kannst du durch eine Prise Zucker ersetzen.",
    guideIds: [],
    illustrationId: "kake-udon",
  },
  {
    id: "miso-butter-mais-ramen",
    title: "Miso-Butter-Mais-Ramen",
    subtitle: "Hokkaido-Style: Instant-Ramen mit Miso, Butter und süßem Mais.",
    intro:
      "Der Trick aus dem Norden Japans: Instant-Ramen ohne das Würzpäckchen, dafür mit Miso, einem Stück Butter und süßem Mais. Aus 1,20 € wird ein echtes Gericht.",
    categories: [
      "ramen-upgrades",
      "15-minuten",
      "5-zutaten",
      "anfaenger",
      "guenstig",
    ],
    tags: ["ramen", "miso", "mais", "butter", "instant", "günstig"],
    timeMinutes: 10,
    activeMinutes: 10,
    difficulty: "easy",
    diet: "vegetarisch",
    spicy: 0,
    servingsBase: 2,
    ingredients: [
      ri("ramen-instant", 2, "packung", {
        note: "nur die Nudeln, Würze weglassen",
      }),
      ri("wasser", 800, "ml", { group: "Brühe" }),
      ri("miso-hell", 2, "el", { group: "Brühe" }),
      ri("butter", 20, "g", { group: "Topping" }),
      ri("mais", 1, "dose", { note: "abgetropft", group: "Topping" }),
      ri("fruehlingszwiebel", 2, "stueck", {
        note: "in Ringe",
        group: "Topping",
      }),
    ],
    equipment: ["topf"],
    steps: [
      {
        text: "{amount:wasser} Wasser aufkochen und die Ramen-Nudeln nach Packung garen (das Würzpäckchen brauchst du nicht).",
        timerSeconds: 240,
      },
      {
        text: "Rühr {amount:miso-hell} helles Miso in etwas heißer Brühe glatt, dann zurück in den Topf — aber nicht mehr sprudelnd kochen.",
        attention: "Miso nie stark kochen, sonst verliert es sein Aroma.",
      },
      {
        text: "Nudeln und Brühe in zwei Schüsseln füllen. Mit {amount:butter} Butter, {amount:mais} Mais und {amount:fruehlingszwiebel} Frühlingszwiebeln toppen — die Butter schmilzt cremig hinein.",
      },
    ],
    substitutionNotes:
      "Rotes Miso geht auch (kräftiger, etwas weniger nehmen). Vegan? Lass die Butter weg oder nimm einen Klecks pflanzliche Alternative.",
    guideIds: [],
    illustrationId: "miso-butter-mais-ramen",
  },
  {
    id: "gochujang-sesam-ramen",
    title: "Gochujang-Sesam-Ramen",
    subtitle: "Feurig-nussige Instant-Ramen für Schärfe-Fans — in 12 Minuten.",
    intro:
      "Brühearme Ramen, bei denen alles an der Nudel klebt: eine scharfe Gochujang-Sesam-Sauce, viel Knoblauch, geröstetes Sesamöl. Macht wach und glücklich.",
    categories: ["ramen-upgrades", "15-minuten", "vegetarisch"],
    tags: ["ramen", "gochujang", "scharf", "sesam", "vegan"],
    timeMinutes: 12,
    activeMinutes: 12,
    difficulty: "easy",
    diet: "vegan",
    spicy: 3,
    servingsBase: 2,
    ingredients: [
      ri("ramen-instant", 2, "packung", { note: "nur die Nudeln" }),
      ri("gochujang", 2, "el", { group: "Sauce" }),
      ri("sesamoel", 1, "el", { group: "Sauce" }),
      ri("shoyu", 1, "el", { group: "Sauce" }),
      ri("knoblauch", 1, "zehe", { note: "gerieben", group: "Sauce" }),
      ri("sesam", 1, "el", { note: "geröstet", group: "Topping" }),
      ri("fruehlingszwiebel", 2, "stueck", {
        note: "in Ringe",
        group: "Topping",
      }),
    ],
    equipment: ["topf", "schuessel"],
    steps: [
      {
        text: "Ramen-Nudeln nach Packung garen, dann abgießen — ein paar Löffel Kochwasser aufheben.",
        timerSeconds: 240,
      },
      {
        text: "In einer Schüssel {amount:gochujang} Gochujang, {amount:sesamoel} Sesamöl, {amount:shoyu} Sojasauce und {amount:knoblauch} Knoblauch mit 2 EL Kochwasser glatt rühren.",
      },
      {
        text: "Die heißen Nudeln in die Sauce geben und schwenken, bis alles gleichmäßig überzogen ist.",
      },
      {
        text: "Mit {amount:sesam} Sesam und {amount:fruehlingszwiebel} Frühlingszwiebeln bestreuen. Zu scharf? Ein Klecks Mayo mildert.",
      },
    ],
    substitutionNotes:
      "Kein Gochujang? Rotes Miso + Chili + eine Prise Zucker kommen in die Nähe. Weniger scharf: erst 1 EL Gochujang nehmen und abschmecken.",
    guideIds: [],
    illustrationId: "gochujang-sesam-ramen",
  },
  {
    id: "ajitama",
    title: "Ajitama (Ramen-Eier)",
    titleJp: "味玉",
    subtitle:
      "Seidig marinierte Ramen-Eier auf Vorrat — Gold für jede Schüssel.",
    intro:
      "Die weichen, mahagonifarbenen Eier, die jede Ramen sofort besser machen. Du kochst sie einmal, marinierst sie über Nacht und hast tagelang das perfekte Topping (oder einen Snack) parat.",
    categories: ["meal-prep", "ramen-upgrades", "vegetarisch"],
    tags: ["ei", "ramen", "topping", "meal prep", "vorrat"],
    timeMinutes: 15,
    activeMinutes: 15,
    difficulty: "easy",
    diet: "vegetarisch",
    spicy: 0,
    servingsBase: 6,
    ingredients: [
      ri("ei", 6, "stueck", { note: "zimmerwarm" }),
      ri("shoyu", 4, "el", { group: "Marinade" }),
      ri("mirin", 3, "el", { group: "Marinade" }),
      ri("kochsake", 2, "el", { group: "Marinade" }),
      ri("wasser", 4, "el", { group: "Marinade" }),
      ri("zucker", 1, "tl", { group: "Marinade" }),
    ],
    equipment: ["kleiner-topf", "schuessel"],
    steps: [
      {
        text: "Einen kleinen Topf Wasser sprudelnd kochen. Die {amount:ei} Eier vorsichtig hineingleiten lassen und genau 6:30 Min kochen — das ergibt weiches Eigelb.",
        timerSeconds: 390,
        tip: "Zimmerwarme Eier platzen weniger. Ein Löffel hilft beim sanften Einlegen.",
      },
      {
        text: "Sofort in eine Schüssel mit Eiswasser geben und ganz abkühlen lassen — so lösen sie sich leichter.",
        timerSeconds: 180,
      },
      {
        text: "Für die Marinade {amount:shoyu} Sojasauce, {amount:mirin} Mirin, {amount:kochsake} Sake, {amount:wasser} Wasser und {amount:zucker} Zucker kurz aufkochen und abkühlen lassen.",
        attention:
          "Marinade muss kalt sein, bevor die Eier hinein — sonst garen sie nach.",
      },
      {
        text: "Eier vorsichtig pellen, mit der Marinade in einen Gefrierbeutel geben (so sind sie rundum bedeckt) und mindestens 4 Stunden, besser über Nacht, im Kühlschrank ziehen lassen.",
      },
    ],
    substitutionNotes:
      "Kein Sake? Einfach durch Wasser ersetzen. Für eine schnellere Runde reichen auch 2 Stunden Marinierzeit — dann sind sie milder.",
    guideIds: [],
    illustrationId: "ajitama",
    mealPrepNote:
      "Halten 3–4 Tage im Kühlschrank in der Marinade (danach werden sie sehr salzig). Perfekt als Topping für jede Ramen oder als Snack zwischendurch.",
  },
];
