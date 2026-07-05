import type { Recipe } from "@/content/schema";
import { ri } from "@/content/recipes/_helpers";

/** Warme Hauptgerichte (docs/06 #30,32,34,40,41). */
export const warmRecipes: Recipe[] = [
  {
    id: "chicken-teriyaki",
    title: "Chicken Teriyaki",
    subtitle:
      "Der glänzende Klassiker — klebrig, süß-salzig, ganz ohne Fertigsauce.",
    intro:
      "Teriyaki heißt „glänzend gegrillt“ — und genau so sieht es aus: saftiges Hähnchen unter einer klebrigen, glänzenden Sauce aus nur vier Zutaten. Einfacher und besser als jede gekaufte Flasche.",
    categories: ["20-minuten", "anfaenger"],
    tags: ["hähnchen", "teriyaki", "huhn", "klassiker"],
    timeMinutes: 20,
    activeMinutes: 18,
    difficulty: "easy",
    diet: "fleisch",
    spicy: 0,
    servingsBase: 2,
    ingredients: [
      ri("reis", 160, "g"),
      ri("haehnchenschenkel", 300, "g", { note: "entbeint" }),
      ri("oel-neutral", 1, "el", { scalable: false }),
      ri("shoyu", 3, "el", { group: "Teriyaki-Sauce" }),
      ri("mirin", 2, "el", { group: "Teriyaki-Sauce" }),
      ri("kochsake", 1, "el", { group: "Teriyaki-Sauce" }),
      ri("zucker", 1, "el", { group: "Teriyaki-Sauce" }),
      ri("sesam", 1, "tl", { group: "Topping", optional: true }),
      ri("fruehlingszwiebel", 1, "stueck", {
        note: "in Ringe",
        group: "Topping",
        optional: true,
      }),
    ],
    equipment: ["schneidebrett", "pfanne", "reiskocher-oder-topf"],
    steps: [
      {
        text: "Setz zuerst den Reis auf: {amount:reis} Reis waschen und nach Packung kochen.",
        tip: "Reis zuerst — er ist dann gleichzeitig mit dem Hähnchen fertig.",
      },
      {
        text: "Rühr die Sauce zusammen: {amount:shoyu} Sojasauce, {amount:mirin} Mirin, {amount:kochsake} Sake und {amount:zucker} Zucker.",
      },
      {
        text: "Hähnchen trocken tupfen. {amount:oel-neutral} Öl in der Pfanne erhitzen (Stufe 6 von 9) und das Hähnchen mit der Hautseite nach unten goldbraun braten.",
        timerSeconds: 360,
      },
      {
        text: "Wenden und die zweite Seite braten, bis das Fleisch durch ist (nicht mehr glasig).",
        timerSeconds: 240,
      },
      {
        text: "Sauce angießen und köcheln, bis sie sirupartig eindickt und das Hähnchen glänzend überzieht — dabei immer wieder darüberlöffeln.",
        timerSeconds: 180,
        attention:
          "Die Sauce mit Zucker verbrennt schnell — Hitze eher etwas runter.",
      },
      {
        text: "Hähnchen in Streifen schneiden, auf den Reis legen, restliche Sauce darüber und mit {amount:sesam} Sesam und {amount:fruehlingszwiebel} Frühlingszwiebeln bestreuen.",
      },
    ],
    substitutionNotes:
      "Hähnchenbrust geht auch — dann etwas kürzer braten, damit sie saftig bleibt. Kein Sake? Weißwein oder ein Schuss Wasser.",
    guideIds: ["teriyaki-sauce-selbst", "reis-richtig-kochen"],
    illustrationId: "chicken-teriyaki",
  },
  {
    id: "miso-lachs",
    title: "Miso-Lachs aus der Pfanne",
    subtitle: "4-Zutaten-Marinade, maximaler Geschmack — süß, salzig, umami.",
    intro:
      "Lachs, in einer schnellen Miso-Marinade gewendet und in der Pfanne goldbraun gebraten. Die Marinade karamellisiert zu einer glänzenden Kruste — beeindruckend einfach.",
    categories: ["15-minuten"],
    tags: ["lachs", "fisch", "miso", "pfanne"],
    timeMinutes: 15,
    activeMinutes: 15,
    difficulty: "easy",
    diet: "fisch",
    spicy: 0,
    servingsBase: 2,
    ingredients: [
      ri("lachs", 250, "g", { note: "2 Filets" }),
      ri("miso-hell", 2, "el", { group: "Marinade" }),
      ri("mirin", 1, "el", { group: "Marinade" }),
      ri("shoyu", 1, "tl", { group: "Marinade" }),
      ri("zucker", 1, "tl", { group: "Marinade" }),
      ri("oel-neutral", 1, "tl", { scalable: false }),
      ri("fruehlingszwiebel", 1, "stueck", {
        note: "in Ringe",
        group: "Topping",
        optional: true,
      }),
      ri("sesam", 1, "tl", { group: "Topping", optional: true }),
    ],
    equipment: ["pfanne"],
    steps: [
      {
        text: "Rühr {amount:miso-hell} Miso, {amount:mirin} Mirin, {amount:shoyu} Sojasauce und {amount:zucker} Zucker zu einer Paste und streich sie auf die Lachsfilets.",
        timerSeconds: 300,
        tip: "Schon 5 Minuten Marinieren bringen viel — länger (bis über Nacht) wird noch intensiver.",
      },
      {
        text: "Überschüssige Marinade grob abstreifen (sie verbrennt sonst). {amount:oel-neutral} Öl in der Pfanne bei mittlerer bis niedriger Hitze (Stufe 5 von 9) erwärmen.",
        attention:
          "Miso verbrennt schnell — lieber niedrigere Hitze und Geduld.",
      },
      {
        text: "Lachs mit der Hautseite nach unten hineinlegen und braten, bis die Haut knusprig ist.",
        timerSeconds: 240,
      },
      {
        text: "Vorsichtig wenden und fertig braten, bis der Lachs innen gerade eben glasig bleibt.",
        timerSeconds: 180,
      },
      {
        text: "Mit {amount:fruehlingszwiebel} Frühlingszwiebeln und {amount:sesam} Sesam bestreuen. Dazu passt Reis und eine Misosuppe.",
      },
    ],
    substitutionNotes:
      "Rotes Miso geht auch (kräftiger, etwas weniger nehmen). Ohne Mirin: eine Prise mehr Zucker in etwas Wasser.",
    guideIds: ["miso-richtig-verwenden"],
    illustrationId: "miso-lachs",
  },
  {
    id: "chahan",
    title: "Chahan (gebratener Reis)",
    titleJp: "チャーハン",
    subtitle: "Gebratener Reis — der König der Resteverwertung, in 15 Minuten.",
    intro:
      "Der beste Chahan entsteht aus kaltem Reis vom Vortag: die Körner bleiben schön einzeln und werden am Pfannenrand leicht knusprig. Ei, Schinken, Frühlingszwiebel — fertig ist das Soulfood.",
    categories: ["15-minuten", "guenstig", "anfaenger"],
    tags: ["reis", "gebraten", "resteverwertung", "ei", "günstig"],
    timeMinutes: 15,
    activeMinutes: 15,
    difficulty: "easy",
    diet: "fleisch",
    spicy: 0,
    servingsBase: 2,
    ingredients: [
      ri("reis", 300, "g", { note: "gekocht & kalt (am besten vom Vortag)" }),
      ri("ei", 2, "stueck", { note: "verquirlt" }),
      ri("kochschinken", 100, "g", { note: "gewürfelt" }),
      ri("fruehlingszwiebel", 2, "stueck", {
        note: "Weißes und Grün getrennt",
      }),
      ri("shoyu", 2, "el", { group: "Sauce" }),
      ri("sesamoel", 1, "tl", { group: "Sauce" }),
      ri("oel-neutral", 1, "el", { scalable: false }),
      ri("salz", null, "nach-geschmack", { group: "Würze" }),
      ri("pfeffer", null, "nach-geschmack", { group: "Würze" }),
    ],
    equipment: ["schneidebrett", "pfanne"],
    steps: [
      {
        text: "Alles bereitstellen: Reis auflockern, Schinken würfeln, Frühlingszwiebeln in Weiß und Grün trennen, Eier verquirlen.",
        tip: "Chahan geht schnell — ist alles vorbereitet, gelingt er entspannt.",
      },
      {
        text: "{amount:oel-neutral} Öl stark erhitzen (Stufe 8 von 9), das Ei hineingeben, kurz stocken lassen, verrühren und wieder herausnehmen.",
        timerSeconds: 60,
      },
      {
        text: "Schinken und das weiße der Frühlingszwiebeln kurz anbraten, bis es duftet.",
        timerSeconds: 60,
      },
      {
        text: "{amount:reis} kalten Reis dazugeben, mit dem Wender auseinanderdrücken und unter Rühren braten, bis er heiß ist und leicht springt.",
        timerSeconds: 240,
      },
      {
        text: "Ei zurück in die Pfanne. {amount:shoyu} Sojasauce am Pfannenrand entlanggießen (so wird sie röstig), dann {amount:sesamoel} Sesamöl, das grüne der Frühlingszwiebeln, Salz und Pfeffer unterheben.",
      },
    ],
    substitutionNotes:
      "Statt Schinken gehen auch Speck, Reste von Hähnchen oder für vegetarisch einfach mehr Gemüse (Erbsen, Karotte). Nur frisch gekochten Reis? Kurz ausbreiten und abkühlen lassen.",
    guideIds: ["reis-richtig-kochen"],
    illustrationId: "chahan",
  },
  {
    id: "japanisches-curry",
    title: "Japanisches Curry",
    titleJp: "カレー",
    subtitle: "Mild-würzig, sämig, riesige Portionen — Japans Lieblings-Curry.",
    intro:
      "Kein scharfes Curry, sondern ein sämiger, mild-würziger Kindheitstraum. Der Trick sind die fertigen Curry-Roux-Würfel: einfach auflösen. Am nächsten Tag schmeckt es sogar noch besser.",
    categories: ["meal-prep", "anfaenger"],
    tags: ["curry", "hähnchen", "kartoffel", "meal prep", "wärmend"],
    timeMinutes: 35,
    activeMinutes: 20,
    difficulty: "easy",
    diet: "fleisch",
    spicy: 1,
    servingsBase: 4,
    ingredients: [
      ri("haehnchenschenkel", 300, "g", { note: "in mundgerechte Stücke" }),
      ri("zwiebel", 2, "stueck", { note: "in Spalten" }),
      ri("karotte", 2, "stueck", { note: "in Stücke" }),
      ri("kartoffel", 3, "stueck", { note: "in Stücke" }),
      ri("oel-neutral", 1, "el", { scalable: false }),
      ri("wasser", 750, "ml", { group: "Sauce" }),
      ri("curry-roux", 4, "stueck", { note: "Würfel", group: "Sauce" }),
      ri("apfel", 0.5, "stueck", {
        note: "gerieben, für die Süße",
        group: "Sauce",
        optional: true,
      }),
      ri("reis", 200, "g"),
    ],
    equipment: ["schneidebrett", "topf", "reiskocher-oder-topf"],
    steps: [
      {
        text: "Setz den Reis auf: {amount:reis} Reis waschen und nach Packung kochen.",
        tip: "Reis parallel — dann passt das Timing perfekt.",
      },
      {
        text: "{amount:oel-neutral} Öl im Topf erhitzen (Stufe 6 von 9) und das Hähnchen rundum anbraten.",
        timerSeconds: 240,
      },
      {
        text: "{amount:zwiebel} Zwiebeln, {amount:karotte} Karotten und {amount:kartoffel} Kartoffeln dazugeben und kurz mitbraten.",
        timerSeconds: 180,
      },
      {
        text: "{amount:wasser} Wasser angießen, aufkochen und zugedeckt köcheln lassen, bis die Kartoffeln weich sind.",
        timerSeconds: 900,
      },
      {
        text: "Topf vom Herd ziehen, die {amount:curry-roux} Curry-Würfel darin auflösen (und den geriebenen Apfel einrühren).",
        attention:
          "Erst Hitze aus, dann Roux auflösen — so wird die Sauce schön glatt.",
      },
      {
        text: "Wieder kurz aufsetzen und unter Rühren 5 Min sämig einköcheln lassen. Über den Reis geben.",
        timerSeconds: 300,
      },
    ],
    substitutionNotes:
      "Vegetarisch: Hähnchen weglassen und mehr Gemüse (Champignons, Zucchini) nehmen — achte auf vegetarische Roux. Schärfer? „Hot“-Roux nehmen oder etwas Sriracha einrühren.",
    guideIds: ["japanisches-curry-erklaert"],
    illustrationId: "japanisches-curry",
    mealPrepNote:
      "Schmeckt am nächsten Tag noch besser. Hält 3 Tage im Kühlschrank und lässt sich portionsweise einfrieren — Kartoffeln werden dabei minimal weicher.",
  },
  {
    id: "mapo-tofu",
    title: "Mapo Tofu (japanische Art)",
    titleJp: "麻婆豆腐",
    subtitle:
      "Seidiger Tofu in würziger Hack-Sauce — scharf, umami, süchtig machend.",
    intro:
      "Die japanische, etwas mildere Version des chinesischen Klassikers: seidiger Tofu in einer tiefroten, würzigen Sauce aus Hack und Doubanjiang. Über Reis ein absolutes Suchtgericht.",
    categories: ["20-minuten"],
    tags: ["tofu", "scharf", "hack", "reis", "doubanjiang"],
    timeMinutes: 20,
    activeMinutes: 20,
    difficulty: "mittel",
    diet: "fleisch",
    spicy: 2,
    servingsBase: 2,
    ingredients: [
      ri("tofu-seiden", 400, "g", { note: "in 2-cm-Würfel" }),
      ri("hackfleisch-schwein", 150, "g"),
      ri("doubanjiang", 1, "el", { group: "Sauce" }),
      ri("knoblauch", 2, "zehe", { note: "fein gehackt", group: "Sauce" }),
      ri("ingwer", 10, "g", { note: "fein gehackt", group: "Sauce" }),
      ri("shoyu", 1, "el", { group: "Sauce" }),
      ri("miso-rot", 1, "tl", { group: "Sauce", optional: true }),
      ri("wasser", 200, "ml", { group: "Sauce" }),
      ri("speisestaerke", 1, "el", {
        note: "in 2 EL Wasser angerührt",
        group: "Sauce",
      }),
      ri("sesamoel", 1, "tl", { group: "Sauce" }),
      ri("oel-neutral", 1, "el", { scalable: false }),
      ri("fruehlingszwiebel", 2, "stueck", {
        note: "in Ringe",
        group: "Topping",
      }),
      ri("reis", 160, "g"),
    ],
    equipment: ["schneidebrett", "pfanne", "reiskocher-oder-topf"],
    steps: [
      {
        text: "Setz den Reis auf: {amount:reis} Reis waschen und nach Packung kochen.",
        tip: "Reis zuerst — Mapo Tofu geht dann Schlag auf Schlag.",
      },
      {
        text: "Den Seidentofu in Würfel schneiden und in leicht gesalzenem, heißem Wasser 2 Min ziehen lassen — so bleibt er beim Rühren ganz. Dann vorsichtig abgießen.",
        timerSeconds: 120,
      },
      {
        text: "{amount:oel-neutral} Öl erhitzen (Stufe 6 von 9), {amount:knoblauch} Knoblauch, {amount:ingwer} Ingwer und {amount:doubanjiang} Doubanjiang anbraten, bis es duftet und das Öl rot wird.",
        timerSeconds: 60,
        attention: "Doubanjiang nicht verbrennen — sonst wird’s bitter.",
      },
      {
        text: "{amount:hackfleisch-schwein} Hack dazugeben und krümelig braten, bis es durch ist.",
        timerSeconds: 180,
      },
      {
        text: "{amount:wasser} Wasser, {amount:shoyu} Sojasauce und das Miso einrühren, aufkochen, dann den Tofu vorsichtig hineingleiten lassen und 3 Min ziehen lassen.",
        timerSeconds: 180,
        tip: "Ab jetzt nur noch sanft schieben, nicht rühren — sonst zerfällt der Tofu.",
      },
      {
        text: "Die angerührte {amount:speisestaerke} Speisestärke einrühren, bis die Sauce glänzend bindet. {amount:sesamoel} Sesamöl und {amount:fruehlingszwiebel} Frühlingszwiebeln unterheben, über Reis servieren.",
      },
    ],
    substitutionNotes:
      "Kein Doubanjiang? Gochujang (süßer) oder rotes Miso + Chili. Fester Tofu geht auch, wenn dir Seidentofu zu heikel ist. Vegetarisch: Hack durch krümelig gebratenen festen Tofu ersetzen.",
    guideIds: [],
    illustrationId: "mapo-tofu",
  },
];
