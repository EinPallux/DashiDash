import type { Recipe } from "@/content/schema";
import { ri } from "@/content/recipes/_helpers";

/**
 * Nudeln, Batch 2 (docs/06 #23,25,26,27,28,29) — füllen die 15/20-Min-Rails.
 * servingsBase 2, honest times, {amount:id} tokens.
 */
export const nudeln2Recipes: Recipe[] = [
  {
    id: "yakisoba",
    title: "Yakisoba",
    titleJp: "焼きそば",
    subtitle:
      "Gebratene Nudeln mit Kraut, Karotte und süß-würziger Sauce — Streetfood aus der Pfanne.",
    intro:
      "Der Duft von Yakisoba gehört auf jedes japanische Sommerfest: gebratene Nudeln mit Schweinebauch, Kohl und einer süß-würzigen Sauce. Ein schnelles Ein-Pfannen-Gericht, das immer gute Laune macht.",
    categories: ["20-minuten"],
    tags: ["nudeln", "yakisoba", "gebraten", "streetfood", "schwein"],
    timeMinutes: 20,
    activeMinutes: 18,
    difficulty: "easy",
    diet: "fleisch",
    spicy: 0,
    servingsBase: 2,
    ingredients: [
      ri("yakisoba-nudeln", 2, "packung", { note: "vorgekocht" }),
      ri("schweinebauch", 150, "g", { note: "in schmale Streifen" }),
      ri("spitzkohl", 150, "g", { note: "grob geschnitten" }),
      ri("karotte", 1, "stueck", { note: "in feine Stifte" }),
      ri("zwiebel", 0.5, "stueck", { note: "in Spalten" }),
      ri("oel-neutral", 1, "el", { scalable: false }),
      ri("okonomiyaki-sauce", 4, "el", { group: "Sauce" }),
      ri("shoyu", 1, "tl", { group: "Sauce" }),
      ri("fruehlingszwiebel", 2, "stueck", {
        note: "in Stücke",
        group: "Topping",
      }),
      ri("katsuobushi", 1, "prise", {
        note: "Bonitoflocken",
        group: "Topping",
        optional: true,
      }),
      ri("nori", 1, "blatt", {
        note: "fein zerkrümelt",
        group: "Topping",
        optional: true,
      }),
    ],
    equipment: ["schneidebrett", "pfanne"],
    steps: [
      {
        text: "Alles vorbereiten: Schweinebauch in Streifen, Kohl grob, Karotte in Stifte, Zwiebel in Spalten. Nudeln kurz mit warmem Wasser lösen.",
        tip: "Beim Braten geht’s schnell — leg dir alles griffbereit hin.",
      },
      {
        text: "{amount:oel-neutral} Öl in der Pfanne stark erhitzen (Stufe 8 von 9) und den Schweinebauch knusprig braten.",
        timerSeconds: 180,
      },
      {
        text: "{amount:zwiebel} Zwiebel, {amount:karotte} Karotte und {amount:spitzkohl} Kohl dazugeben und unter Rühren braten, bis der Kohl zusammenfällt.",
        timerSeconds: 180,
      },
      {
        text: "Nudeln dazugeben, kurz mitbraten, dann {amount:okonomiyaki-sauce} Sauce und {amount:shoyu} Sojasauce angießen und alles schwenken, bis es glänzt und leicht röstet.",
        timerSeconds: 120,
      },
      {
        text: "Mit {amount:fruehlingszwiebel} Frühlingszwiebeln, Bonitoflocken und zerkrümeltem Nori bestreuen und sofort servieren.",
      },
    ],
    substitutionNotes:
      "Keine Yakisoba-Nudeln? Instant-Ramen ohne Würze funktionieren super. Statt Okonomiyaki-Sauce geht Tonkatsu-Sauce oder eine Mischung aus Ketchup + Worcestersauce.",
    guideIds: ["udon-soba-ramen"],
    illustrationId: "yakisoba",
  },
  {
    id: "kitsune-udon",
    title: "Kitsune Udon",
    subtitle:
      "Udon in Dashi-Brühe mit süß geschmortem Tofu-Täschchen — das „Fuchs-Udon“.",
    intro:
      "„Kitsune“ heißt Fuchs — und der liebt der Legende nach das süß geschmorte, frittierte Tofu-Täschchen (Aburaage), das hier auf den Udon schwimmt. Eine warme, sanfte Schüssel Seelentrost.",
    categories: ["15-minuten", "vegetarisch"],
    tags: ["nudeln", "udon", "suppe", "tofu", "aburaage", "vegetarisch"],
    timeMinutes: 15,
    activeMinutes: 12,
    difficulty: "easy",
    diet: "vegetarisch",
    spicy: 0,
    servingsBase: 2,
    ingredients: [
      ri("udon", 2, "packung", { note: "vorgekocht" }),
      ri("aburaage", 2, "stueck", { note: "halbiert" }),
      ri("wasser", 700, "ml", { group: "Brühe" }),
      ri("dashi-pulver-vegan", 1, "el", { group: "Brühe" }),
      ri("shoyu", 2, "el", { group: "Brühe" }),
      ri("mirin", 1, "el", { group: "Brühe" }),
      ri("zucker", 1, "tl", { group: "Tofu" }),
      ri("fruehlingszwiebel", 1, "stueck", {
        note: "in Ringe",
        group: "Topping",
      }),
    ],
    equipment: ["topf", "kleiner-topf"],
    steps: [
      {
        text: "Aburaage kurz mit heißem Wasser übergießen, um überschüssiges Öl zu lösen, dann ausdrücken und halbieren.",
        tip: "Das kurze Überbrühen macht das Täschchen saugfähig für die süße Brühe.",
      },
      {
        text: "{amount:wasser} Wasser mit {amount:dashi-pulver-vegan} Dashi, {amount:shoyu} Sojasauce und {amount:mirin} Mirin aufkochen und Hitze runterdrehen (Stufe 4 von 9).",
        timerSeconds: 120,
      },
      {
        text: "Aburaage mit {amount:zucker} Zucker in die Brühe geben und ziehen lassen, bis es die Brühe aufgesogen hat.",
        timerSeconds: 240,
      },
      {
        text: "Udon dazugeben und warm ziehen lassen, bis sie sich lösen und heiß sind.",
        timerSeconds: 120,
      },
      {
        text: "In zwei Schüsseln füllen, das Tofu-Täschchen auflegen und mit {amount:fruehlingszwiebel} Frühlingszwiebeln bestreuen.",
      },
    ],
    substitutionNotes:
      "Kein Aburaage? Fester Tofu in dünnen Scheiben, kurz gebraten und in der Brühe geschmort, kommt nah dran. Mit Bonito-Dashi wird’s klassischer (dann nicht vegetarisch).",
    guideIds: ["udon-soba-ramen"],
    illustrationId: "kitsune-udon",
  },
  {
    id: "zaru-soba",
    title: "Zaru Soba",
    titleJp: "ざる蕎麦",
    subtitle:
      "Kalte Buchweizennudeln mit einem Dip — die perfekte Erfrischung im Sommer.",
    intro:
      "An heißen Tagen isst Japan Soba kalt: die nussigen Buchweizennudeln werden eiskalt abgespült und in eine würzige Dashi-Sauce („Tsuyu“) getunkt. Minimalistisch, erfrischend und in 15 Minuten fertig.",
    categories: ["15-minuten", "vegetarisch", "5-zutaten"],
    tags: ["nudeln", "soba", "kalt", "sommer", "vegan"],
    timeMinutes: 15,
    activeMinutes: 12,
    difficulty: "easy",
    diet: "vegan",
    spicy: 0,
    servingsBase: 2,
    ingredients: [
      ri("soba", 180, "g", { note: "trocken" }),
      ri("wasser", 150, "ml", { group: "Dip (Tsuyu)" }),
      ri("dashi-pulver-vegan", 1, "tl", { group: "Dip (Tsuyu)" }),
      ri("shoyu", 4, "el", { group: "Dip (Tsuyu)" }),
      ri("mirin", 2, "el", { group: "Dip (Tsuyu)" }),
      ri("fruehlingszwiebel", 1, "stueck", {
        note: "in feine Ringe",
        group: "Topping",
      }),
      ri("nori", 1, "blatt", {
        note: "in feine Streifen",
        group: "Topping",
        optional: true,
      }),
      ri("sesam", 1, "tl", { group: "Topping", optional: true }),
    ],
    equipment: ["topf", "sieb"],
    steps: [
      {
        text: "Für den Dip {amount:wasser} Wasser mit {amount:dashi-pulver-vegan} Dashi, {amount:shoyu} Sojasauce und {amount:mirin} Mirin einmal aufkochen, dann zum Abkühlen beiseitestellen.",
        timerSeconds: 120,
        tip: "Der Dip kühlt ab, während die Soba kochen — perfektes Timing.",
      },
      {
        text: "{amount:soba} Soba in reichlich sprudelndem Wasser nach Packung garen (meist 4–5 Min).",
        timerSeconds: 270,
        attention: "Soba nicht übergaren — sie sollen bissfest bleiben.",
      },
      {
        text: "Soba in ein Sieb abgießen und unter kaltem Wasser richtig kalt spülen, dabei die Stärke abreiben, bis die Nudeln quietschen.",
        tip: "Das kalte Spülen ist der ganze Trick: es macht die Soba fest und rutschig.",
      },
      {
        text: "Soba auf zwei Teller anrichten, mit {amount:nori} Nori und {amount:sesam} Sesam bestreuen. Den Dip mit {amount:fruehlingszwiebel} Frühlingszwiebeln in kleine Schälchen füllen — jeder Bissen kurz eintunken.",
      },
    ],
    substitutionNotes:
      "Ein Klecks Wasabi im Dip gibt Schärfe. Keine Soba? Somen oder dünne Weizennudeln gehen auch, schmecken nur weniger nussig. Mit Bonito-Dashi wird’s klassischer (dann nicht vegan).",
    guideIds: ["udon-soba-ramen"],
    illustrationId: "zaru-soba",
  },
  {
    id: "sesam-erdnuss-udon",
    title: "Kalte Sesam-Erdnuss-Udon",
    subtitle:
      "Cremig, nussig, leicht scharf — kalte Udon in Sesam-Erdnuss-Sauce in 10 Minuten.",
    intro:
      "Dicke Udon in einer cremigen Sauce aus Sesam und Erdnuss, mit einem Kick Sriracha und knackiger Gurke. Kalt serviert, in zehn Minuten fertig — der perfekte schnelle Sattmacher.",
    categories: ["15-minuten", "vegetarisch"],
    tags: ["nudeln", "udon", "kalt", "sesam", "erdnuss", "vegan"],
    timeMinutes: 10,
    activeMinutes: 10,
    difficulty: "easy",
    diet: "vegan",
    spicy: 1,
    servingsBase: 2,
    ingredients: [
      ri("udon", 2, "packung", { note: "vorgekocht" }),
      ri("erdnussbutter", 2, "el", { group: "Sauce" }),
      ri("sesampaste", 1, "el", { group: "Sauce" }),
      ri("shoyu", 2, "el", { group: "Sauce" }),
      ri("reisessig", 1, "el", { group: "Sauce" }),
      ri("sesamoel", 1, "tl", { group: "Sauce" }),
      ri("zucker", 1, "tl", { group: "Sauce" }),
      ri("knoblauch", 1, "zehe", { note: "gerieben", group: "Sauce" }),
      ri("sriracha", 1, "tl", { group: "Sauce" }),
      ri("gurke", 0.5, "stueck", { note: "in feine Stifte", group: "Topping" }),
      ri("sesam", 1, "tl", { group: "Topping" }),
      ri("fruehlingszwiebel", 1, "stueck", {
        note: "in Ringe",
        group: "Topping",
      }),
    ],
    equipment: ["schuessel", "sieb"],
    steps: [
      {
        text: "Für die Sauce {amount:erdnussbutter} Erdnussbutter, {amount:sesampaste} Sesampaste, {amount:shoyu} Sojasauce, {amount:reisessig} Reisessig, {amount:sesamoel} Sesamöl, {amount:zucker} Zucker, {amount:knoblauch} Knoblauch und {amount:sriracha} Sriracha glatt rühren.",
        tip: "Ist die Sauce zu dick, mit 1–2 EL Wasser verdünnen, bis sie schön cremig läuft.",
      },
      {
        text: "Udon mit heißem Wasser übergießen, vorsichtig lösen, dann in ein Sieb geben und unter kaltem Wasser kalt spülen.",
      },
      {
        text: "Die kalten Udon mit der Sauce vermengen, bis jede Nudel überzogen ist.",
      },
      {
        text: "Mit {amount:gurke} Gurkenstiften, {amount:sesam} Sesam und {amount:fruehlingszwiebel} Frühlingszwiebeln toppen.",
      },
    ],
    substitutionNotes:
      "Nur Erdnussbutter (ohne Sesampaste) geht auch — dann etwas mehr nehmen. Schärfer? Mehr Sriracha oder ein Löffel Chiliöl.",
    guideIds: [],
    illustrationId: "sesam-erdnuss-udon",
  },
  {
    id: "wafu-pasta",
    title: "Butter-Shoyu-Pilz-Pasta",
    subtitle:
      "Japanische Pasta im Wafu-Style: Pilze, Butter und Sojasauce, gekrönt mit Nori.",
    intro:
      "„Wafu“ heißt „im japanischen Stil“ — hier trifft Spaghetti auf Butter, Sojasauce und Pilze. Eine überraschend runde, herzhafte Pasta, die in Japan in jedem Café auf der Karte steht.",
    categories: ["20-minuten", "vegetarisch"],
    tags: ["nudeln", "pasta", "pilze", "butter", "wafu", "vegetarisch"],
    timeMinutes: 20,
    activeMinutes: 15,
    difficulty: "easy",
    diet: "vegetarisch",
    spicy: 0,
    servingsBase: 2,
    ingredients: [
      ri("spaghetti", 200, "g"),
      ri("champignons", 150, "g", { note: "in Scheiben" }),
      ri("butter", 20, "g"),
      ri("knoblauch", 1, "zehe", { note: "in Scheiben" }),
      ri("shoyu", 2, "el", { group: "Sauce" }),
      ri("mirin", 1, "el", { group: "Sauce" }),
      ri("nori", 1, "blatt", { note: "in feine Streifen", group: "Topping" }),
      ri("fruehlingszwiebel", 1, "stueck", {
        note: "in Ringe",
        group: "Topping",
      }),
    ],
    equipment: ["topf", "pfanne"],
    steps: [
      {
        text: "{amount:spaghetti} Spaghetti in gut gesalzenem Wasser nach Packung garen. Vor dem Abgießen eine Tasse Nudelwasser aufheben.",
        timerSeconds: 540,
      },
      {
        text: "{amount:butter} Butter in der Pfanne bei mittlerer Hitze (Stufe 6 von 9) schmelzen und die {amount:champignons} Pilze braten, bis sie goldbraun sind.",
        timerSeconds: 300,
        tip: "Pilze erst wenden, wenn sie Farbe haben — sonst ziehen sie Wasser.",
      },
      {
        text: "{amount:knoblauch} Knoblauch kurz mitbraten, dann {amount:shoyu} Sojasauce und {amount:mirin} Mirin angießen.",
      },
      {
        text: "Spaghetti mit einem Schuss Nudelwasser in die Pfanne geben und schwenken, bis eine glänzende Sauce entsteht.",
      },
      {
        text: "Auf Teller anrichten und mit {amount:nori} Nori-Streifen und {amount:fruehlingszwiebel} Frühlingszwiebeln bestreuen.",
      },
    ],
    substitutionNotes:
      "Jede Pilzsorte passt — Shiitake macht es besonders umami. Nicht vegetarisch nötig? Ein paar Speckwürfel oder Thunfisch machen die klassische Wafu-Variante.",
    guideIds: [],
    illustrationId: "wafu-pasta",
  },
  {
    id: "spicy-mayo-udon",
    title: "Spicy-Mayo-Udon mit Thunfisch",
    subtitle:
      "Sriracha-Mayo trifft dicke Udon und Thunfisch — cremig-scharf in 12 Minuten.",
    intro:
      "Ein schneller Konbini-Hack: dicke Udon, cremige Kewpie-Mayo mit Sriracha und Thunfisch aus der Dose. Cremig, scharf, herzhaft — Sattmacher ohne Aufwand.",
    categories: ["15-minuten"],
    tags: ["nudeln", "udon", "thunfisch", "mayo", "scharf"],
    timeMinutes: 12,
    activeMinutes: 10,
    difficulty: "easy",
    diet: "fisch",
    spicy: 2,
    servingsBase: 2,
    ingredients: [
      ri("udon", 2, "packung", { note: "vorgekocht" }),
      ri("thunfisch-dose", 1, "dose", { note: "gut abgetropft" }),
      ri("kewpie-mayo", 2, "el", { group: "Sauce" }),
      ri("sriracha", 1, "el", { group: "Sauce" }),
      ri("shoyu", 1, "tl", { group: "Sauce" }),
      ri("sesamoel", 1, "tl", { group: "Sauce" }),
      ri("fruehlingszwiebel", 1, "stueck", {
        note: "in Ringe",
        group: "Topping",
      }),
      ri("nori", 1, "blatt", {
        note: "in Streifen",
        group: "Topping",
        optional: true,
      }),
      ri("sesam", 1, "tl", { group: "Topping", optional: true }),
    ],
    equipment: ["topf", "schuessel"],
    steps: [
      {
        text: "Udon mit heißem Wasser übergießen und vorsichtig lösen (oder kurz in kochendem Wasser erwärmen), dann abtropfen.",
        timerSeconds: 120,
      },
      {
        text: "Thunfisch abtropfen und mit {amount:kewpie-mayo} Kewpie-Mayo, {amount:sriracha} Sriracha, {amount:shoyu} Sojasauce und {amount:sesamoel} Sesamöl cremig verrühren.",
      },
      {
        text: "Die warmen Udon mit der Spicy-Mayo vermengen, bis alles überzogen ist.",
      },
      {
        text: "Mit {amount:fruehlingszwiebel} Frühlingszwiebeln, Nori und Sesam bestreuen. Zu scharf? Ein Extra-Klecks Mayo mildert.",
      },
    ],
    substitutionNotes:
      "Keine Kewpie-Mayo? Normale Mayo + Prise Zucker + Schuss Reisessig. Statt Thunfisch schmeckt auch gebratener Lachs oder Krebsfleisch-Imitat.",
    guideIds: [],
    illustrationId: "spicy-mayo-udon",
  },
];
