import type { Recipe } from "@/content/schema";
import { ri } from "@/content/recipes/_helpers";

/**
 * Donburi & Reisschüsseln, Batch 2 (docs/06 #4,6,7,8,9). Same authoring rules
 * as batch 1: servingsBase 2, honest German times, one action per step, rice
 * as step 1, {amount:id} tokens so steps scale with the portion stepper.
 */
export const donburi2Recipes: Recipe[] = [
  {
    id: "soboro-don",
    title: "Soboro Don",
    titleJp: "そぼろ丼",
    subtitle:
      "Süß-salziges Hack und lockeres Rührei, zweifarbig über Reis — Bento-Klassiker.",
    intro:
      "Zwei „Soboro“ nebeneinander: krümeliges, süß-salziges Hack und feines gelbes Rührei. Zusammen auf Reis ergibt das ein fröhlich zweifarbiges Schüsselgericht, das auch kalt im Bento glücklich macht.",
    categories: ["donburi", "20-minuten", "meal-prep"],
    tags: ["reisschüssel", "hack", "ei", "bento", "donburi", "meal prep"],
    timeMinutes: 20,
    activeMinutes: 18,
    difficulty: "easy",
    diet: "fleisch",
    spicy: 0,
    servingsBase: 2,
    ingredients: [
      ri("reis", 160, "g"),
      ri("hackfleisch-schwein", 200, "g", { group: "Hack-Soboro" }),
      ri("shoyu", 2, "el", { group: "Hack-Soboro" }),
      ri("mirin", 1, "el", { group: "Hack-Soboro" }),
      ri("kochsake", 1, "el", { group: "Hack-Soboro" }),
      ri("zucker", 1, "el", { group: "Hack-Soboro" }),
      ri("ingwer", 8, "g", { note: "gerieben", group: "Hack-Soboro" }),
      ri("ei", 3, "stueck", { note: "verquirlt", group: "Ei-Soboro" }),
      ri("zucker", 1, "tl", { group: "Ei-Soboro" }),
      ri("salz", null, "prise", { group: "Ei-Soboro" }),
      ri("tk-erbsen", 40, "g", {
        note: "kurz überbrüht",
        group: "Topping",
        optional: true,
      }),
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
        tip: "Reis zuerst — beide Soboro sind schneller fertig als der Reis.",
      },
      {
        text: "Fürs Hack-Soboro {amount:shoyu} Sojasauce, {amount:mirin} Mirin, {amount:kochsake} Sake, {amount:zucker} Zucker und {amount:ingwer} geriebenen Ingwer verrühren.",
      },
      {
        text: "{amount:hackfleisch-schwein} Hack in der kalten Pfanne mit der Sauce mischen, dann bei mittlerer Hitze (Stufe 6 von 9) krümelig braten, bis die Flüssigkeit fast weg ist.",
        timerSeconds: 300,
        tip: "Mit einem Schneebesen oder zwei Gabeln bleibt das Hack schön fein.",
      },
      {
        text: "Hack herausnehmen. Pfanne abwischen, die {amount:ei} Eier mit {amount:zucker} Zucker und einer Prise Salz verquirlen und bei niedriger Hitze (Stufe 4 von 9) zu feinem Rührei rühren.",
        attention:
          "Ständig rühren — das Ei soll krümelig werden, nicht stocken.",
      },
      {
        text: "Reis in zwei Schüsseln geben und Hack und Ei nebeneinander als zwei Farbfelder auflegen.",
      },
      {
        text: "Mit Erbsen und {amount:fruehlingszwiebel} Frühlingszwiebeln in die Mitte tupfen — das ergibt die klassische dreifarbige Optik.",
      },
    ],
    substitutionNotes:
      "Statt Schweinehack geht Hähnchen- oder gemischtes Hack genauso. Kein Sake? Einfach weglassen und 1 EL Wasser mehr nehmen.",
    guideIds: ["donburi-verstehen", "reis-richtig-kochen"],
    illustrationId: "soboro-don",
    mealPrepNote:
      "Beide Soboro halten getrennt 3 Tage im Kühlschrank und lassen sich einfrieren. Kalt aufs Bento oder kurz aufwärmen — bleibt saftig.",
  },
  {
    id: "teriyaki-chicken-don",
    title: "Teriyaki-Hähnchen-Don",
    subtitle:
      "Glänzendes Teriyaki-Hähnchen in Streifen über Reis — klebrig und unschlagbar.",
    intro:
      "Das Chicken Teriyaki, aber direkt als Bowl gedacht: saftige Hähnchenstreifen unter einer glänzenden Sauce, dazu Reis, der die Sauce aufsaugt. Feierabend-Glück in einer Schüssel.",
    categories: ["donburi", "20-minuten"],
    tags: ["reisschüssel", "hähnchen", "teriyaki", "huhn", "donburi"],
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
      }),
      ri("nori", 1, "blatt", {
        note: "in Streifen",
        group: "Topping",
        optional: true,
      }),
    ],
    equipment: ["schneidebrett", "pfanne", "reiskocher-oder-topf"],
    steps: [
      {
        text: "Setz zuerst den Reis auf: {amount:reis} Reis waschen und nach Packung kochen.",
        tip: "Reis zuerst — dann passt das Timing perfekt.",
      },
      {
        text: "Rühr die Sauce an: {amount:shoyu} Sojasauce, {amount:mirin} Mirin, {amount:kochsake} Sake und {amount:zucker} Zucker.",
      },
      {
        text: "Hähnchen trocken tupfen. {amount:oel-neutral} Öl in der Pfanne erhitzen (Stufe 6 von 9) und das Hähnchen mit der Hautseite nach unten goldbraun braten.",
        timerSeconds: 360,
      },
      {
        text: "Wenden und fertig braten, bis das Fleisch durch ist (nicht mehr glasig).",
        timerSeconds: 240,
      },
      {
        text: "Sauce angießen und köcheln, bis sie sirupartig eindickt und glänzend überzieht — dabei immer wieder darüberlöffeln.",
        timerSeconds: 180,
        attention:
          "Die Zuckersauce verbrennt schnell — Hitze eher etwas runter.",
      },
      {
        text: "Hähnchen in Streifen schneiden, auf den Reis legen, Sauce darüber und mit {amount:sesam} Sesam, {amount:fruehlingszwiebel} Frühlingszwiebeln und Nori toppen.",
      },
    ],
    substitutionNotes:
      "Hähnchenbrust geht auch — kürzer braten, damit sie saftig bleibt. Fertige Teriyaki-Sauce brauchst du nie: die vier Zutaten sind das Original.",
    guideIds: ["teriyaki-sauce-selbst", "reis-richtig-kochen"],
    illustrationId: "teriyaki-chicken-don",
  },
  {
    id: "butadon",
    title: "Butadon",
    titleJp: "豚丼",
    subtitle:
      "Karamellisierter Schweinebauch mit süßen Zwiebeln auf Reis — herzhaft und schnell.",
    intro:
      "Gyudons kleiner Bruder mit Schwein: dünner Schweinebauch, in einer süß-salzigen Sauce glasiert, dazu weiche Zwiebeln. In Hokkaido isst man das an jeder Ecke — zu Recht.",
    categories: ["donburi", "20-minuten"],
    tags: ["reisschüssel", "schwein", "zwiebel", "donburi"],
    timeMinutes: 20,
    activeMinutes: 15,
    difficulty: "easy",
    diet: "fleisch",
    spicy: 0,
    servingsBase: 2,
    ingredients: [
      ri("reis", 160, "g"),
      ri("schweinebauch", 250, "g", { note: "in schmale Streifen" }),
      ri("zwiebel", 1, "stueck", { note: "in dünne Spalten" }),
      ri("oel-neutral", 1, "tl", { scalable: false }),
      ri("shoyu", 3, "el", { group: "Sauce" }),
      ri("mirin", 2, "el", { group: "Sauce" }),
      ri("kochsake", 1, "el", { group: "Sauce" }),
      ri("zucker", 1, "el", { group: "Sauce" }),
      ri("ingwer", 8, "g", { note: "gerieben", group: "Sauce" }),
      ri("fruehlingszwiebel", 1, "stueck", {
        note: "in Ringe",
        group: "Topping",
      }),
    ],
    equipment: ["schneidebrett", "pfanne", "reiskocher-oder-topf"],
    steps: [
      {
        text: "Setz zuerst den Reis auf: {amount:reis} Reis waschen und nach Packung kochen.",
        tip: "Reis zuerst — der Rest ist in 10 Minuten fertig.",
      },
      {
        text: "Schneide den Schweinebauch in schmale Streifen und die Zwiebel in dünne Spalten. Rühr {amount:shoyu} Sojasauce, {amount:mirin} Mirin, {amount:kochsake} Sake, {amount:zucker} Zucker und {amount:ingwer} Ingwer zur Sauce.",
      },
      {
        text: "{amount:oel-neutral} Öl in der Pfanne erhitzen (Stufe 7 von 9) und den Schweinebauch braten, bis er leicht knusprig ist.",
        timerSeconds: 240,
      },
      {
        text: "Zwiebeln dazugeben und mitbraten, bis sie weich werden.",
        timerSeconds: 120,
      },
      {
        text: "Sauce angießen und schwenken, bis alles glänzend glasiert ist und die Sauce leicht eindickt.",
        timerSeconds: 120,
        attention:
          "Die Sauce mit Zucker karamellisiert schnell — Hitze im Blick behalten.",
      },
      {
        text: "Über den Reis geben und mit {amount:fruehlingszwiebel} Frühlingszwiebeln bestreuen.",
      },
    ],
    substitutionNotes:
      "Statt Schweinebauch geht dünn geschnittener Schweinenacken (magerer). Kein Sake? Weißwein oder weglassen.",
    guideIds: ["donburi-verstehen", "reis-richtig-kochen"],
    illustrationId: "butadon",
  },
  {
    id: "sake-don",
    title: "Lachs-Don (gebraten)",
    subtitle:
      "Knusprig gebratener Lachs mit Sesam und Shoyu über Reis — in 15 Minuten.",
    intro:
      "„Sake“ heißt hier Lachs, nicht Reiswein: gebratener Lachs, mit der Gabel zerteilt, über Reis mit Nori und Sesam. Schnell, sättigend und voller Umami.",
    categories: ["donburi", "15-minuten"],
    tags: ["reisschüssel", "lachs", "fisch", "sesam", "donburi"],
    timeMinutes: 15,
    activeMinutes: 12,
    difficulty: "easy",
    diet: "fisch",
    spicy: 0,
    servingsBase: 2,
    ingredients: [
      ri("reis", 160, "g"),
      ri("lachs", 250, "g", { note: "2 Filets" }),
      ri("oel-neutral", 1, "tl", { scalable: false }),
      ri("shoyu", 1, "el", { group: "Würze" }),
      ri("mirin", 1, "tl", { group: "Würze" }),
      ri("sesam", 1, "tl", { group: "Topping" }),
      ri("nori", 1, "blatt", { note: "in Streifen", group: "Topping" }),
      ri("fruehlingszwiebel", 1, "stueck", {
        note: "in Ringe",
        group: "Topping",
      }),
    ],
    equipment: ["pfanne", "reiskocher-oder-topf"],
    steps: [
      {
        text: "Setz zuerst den Reis auf: {amount:reis} Reis waschen und nach Packung kochen.",
        tip: "Reis zuerst — er ist gleichzeitig mit dem Lachs fertig.",
      },
      {
        text: "Lachs trocken tupfen und leicht salzen. {amount:oel-neutral} Öl in der Pfanne erhitzen (Stufe 6 von 9).",
      },
      {
        text: "Lachs mit der Hautseite nach unten braten, bis die Haut knusprig ist, dann wenden und fertig garen.",
        timerSeconds: 360,
      },
      {
        text: "Mit {amount:shoyu} Sojasauce und {amount:mirin} Mirin ablöschen, sodass der Lachs glänzt, und mit der Gabel grob zerteilen.",
      },
      {
        text: "Über den Reis geben, mit {amount:sesam} Sesam, {amount:nori} Nori und {amount:fruehlingszwiebel} Frühlingszwiebeln bestreuen.",
      },
    ],
    substitutionNotes:
      "Reste vom Vortag? Kalten Lachs einfach kurz in der Pfanne erwärmen. Statt frischem Lachs geht auch eine Dose Lachs, gut abgetropft.",
    guideIds: ["reis-richtig-kochen"],
    illustrationId: "sake-don",
  },
  {
    id: "miso-butter-pilz-don",
    title: "Miso-Butter-Pilz-Don",
    subtitle:
      "Pilze in Miso-Butter über Reis — die vegetarische Umami-Bombe in 15 Minuten.",
    intro:
      "Shiitake und Champignons, in Butter goldbraun gebraten und mit einem Löffel Miso zu einer glänzenden Umami-Sauce verrührt. Über Reis wird daraus ein Gericht, das kein Fleisch vermisst.",
    categories: ["donburi", "15-minuten", "vegetarisch"],
    tags: ["reisschüssel", "pilze", "miso", "butter", "vegetarisch", "donburi"],
    timeMinutes: 15,
    activeMinutes: 13,
    difficulty: "easy",
    diet: "vegetarisch",
    spicy: 0,
    servingsBase: 2,
    ingredients: [
      ri("reis", 160, "g"),
      ri("shiitake", 100, "g", { note: "in Scheiben" }),
      ri("champignons", 150, "g", { note: "in Scheiben" }),
      ri("butter", 20, "g"),
      ri("knoblauch", 1, "zehe", { note: "gehackt" }),
      ri("miso-hell", 1, "el", { group: "Sauce" }),
      ri("shoyu", 1, "el", { group: "Sauce" }),
      ri("mirin", 1, "el", { group: "Sauce" }),
      ri("fruehlingszwiebel", 1, "stueck", {
        note: "in Ringe",
        group: "Topping",
      }),
    ],
    equipment: ["schneidebrett", "pfanne", "reiskocher-oder-topf"],
    steps: [
      {
        text: "Setz zuerst den Reis auf: {amount:reis} Reis waschen und nach Packung kochen.",
        tip: "Reis zuerst — die Pilze sind in wenigen Minuten fertig.",
      },
      {
        text: "Pilze in Scheiben schneiden. Rühr {amount:miso-hell} Miso, {amount:shoyu} Sojasauce und {amount:mirin} Mirin glatt.",
      },
      {
        text: "{amount:butter} Butter in der Pfanne bei mittlerer bis hoher Hitze (Stufe 7 von 9) schmelzen und die Pilze braten, ohne viel zu rühren, bis sie goldbraun sind.",
        timerSeconds: 300,
        tip: "Pilze erst wenden, wenn sie Farbe haben — sonst ziehen sie Wasser.",
      },
      {
        text: "{amount:knoblauch} Knoblauch kurz mitbraten, bis er duftet, dann die Miso-Sauce angießen und schwenken, bis alles glänzt.",
        attention:
          "Miso nicht lange kochen — kurz schwenken reicht, sonst wird es bitter.",
      },
      {
        text: "Pilze über den Reis geben und mit {amount:fruehlingszwiebel} Frühlingszwiebeln bestreuen.",
      },
    ],
    substitutionNotes:
      "Nimm die Pilze, die du bekommst — Kräuterseitlinge oder Austernpilze sind super. Nur Champignons gehen auch. Vegan: Butter durch pflanzliche Alternative ersetzen.",
    guideIds: ["miso-richtig-verwenden"],
    illustrationId: "miso-butter-pilz-don",
  },
];
