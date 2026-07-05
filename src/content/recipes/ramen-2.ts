import type { Recipe } from "@/content/schema";
import { ri } from "@/content/recipes/_helpers";

/**
 * Ramen-Upgrades, Batch 2 (docs/06 #11,12,13,14). All openly framed as
 * Instant-Packung hacks (docs/05 §1): the noodles come from a packet, the
 * flavour is built by hand. servingsBase 2, honest times, {amount:id} tokens.
 */
export const ramen2Recipes: Recipe[] = [
  {
    id: "tantan-instant-ramen",
    title: "Tantan-Style-Ramen",
    subtitle:
      "Cremig-scharfe Sesambrühe mit würzigem Hack — das Instant-Ramen-Upgrade für Schärfe-Fans.",
    intro:
      "Die Hausmacher-Version von Tantanmen: eine nussige Sesambrühe mit Miso und Doubanjiang, darauf krosses, würziges Hack. Aus der Instant-Packung wird ein Gericht, für das man sonst ins Restaurant geht.",
    categories: ["ramen-upgrades", "15-minuten"],
    tags: ["ramen", "sesam", "scharf", "hack", "instant"],
    timeMinutes: 15,
    activeMinutes: 15,
    difficulty: "mittel",
    diet: "fleisch",
    spicy: 2,
    servingsBase: 2,
    ingredients: [
      ri("ramen-instant", 2, "packung", { note: "nur die Nudeln" }),
      ri("hackfleisch-schwein", 120, "g", { group: "Würz-Hack" }),
      ri("doubanjiang", 1, "el", { group: "Würz-Hack" }),
      ri("knoblauch", 1, "zehe", { note: "gehackt", group: "Würz-Hack" }),
      ri("ingwer", 8, "g", { note: "gehackt", group: "Würz-Hack" }),
      ri("wasser", 700, "ml", { group: "Sesambrühe" }),
      ri("sesampaste", 2, "el", { group: "Sesambrühe" }),
      ri("miso-rot", 1, "el", { group: "Sesambrühe" }),
      ri("shoyu", 1, "el", { group: "Sesambrühe" }),
      ri("sesamoel", 1, "tl", { group: "Sesambrühe" }),
      ri("pak-choi", 1, "stueck", {
        note: "geviertelt",
        group: "Topping",
        optional: true,
      }),
      ri("fruehlingszwiebel", 2, "stueck", {
        note: "in Ringe",
        group: "Topping",
      }),
    ],
    equipment: ["topf", "pfanne", "schuessel"],
    steps: [
      {
        text: "{amount:wasser} Wasser erhitzen. In zwei Schüsseln je {amount:sesampaste} Sesampaste, {amount:miso-rot} Miso, {amount:shoyu} Sojasauce und {amount:sesamoel} Sesamöl vorbereiten.",
        tip: "Die Brühe wird direkt in der Schüssel gemixt — spart Abwasch.",
      },
      {
        text: "In der Pfanne bei mittlerer Hitze (Stufe 6 von 9) {amount:doubanjiang} Doubanjiang, {amount:knoblauch} Knoblauch und {amount:ingwer} Ingwer kurz anbraten, bis es duftet.",
        timerSeconds: 60,
        attention: "Doubanjiang nicht verbrennen — sonst wird es bitter.",
      },
      {
        text: "{amount:hackfleisch-schwein} Hack dazugeben und krümelig braten, bis es kross und durch ist.",
        timerSeconds: 180,
      },
      {
        text: "Die Ramen-Nudeln (und den Pak Choi) im heißen Wasser nach Packung garen.",
        timerSeconds: 180,
      },
      {
        text: "Je eine Kelle heißes Kochwasser in die Schüsseln rühren, bis die Sesam-Basis eine cremige Brühe ergibt. Nudeln hineinlegen.",
      },
      {
        text: "Das Würz-Hack daraufsetzen und mit {amount:fruehlingszwiebel} Frühlingszwiebeln bestreuen. Wer will, gibt einen Spritzer Chiliöl dazu.",
      },
    ],
    substitutionNotes:
      "Keine Sesampaste? Nimm Tahin oder glatte Erdnussbutter. Weniger scharf: mit ½ EL Doubanjiang starten. Vegetarisch: Hack durch krümelig gebratenen Tofu ersetzen.",
    guideIds: ["ajitama-ramen-eier"],
    illustrationId: "tantan-instant-ramen",
  },
  {
    id: "shoyu-ramen-upgrade",
    title: "Shoyu-Ramen-Upgrade",
    subtitle:
      "Klare Shoyu-Brühe, weiches Ei, Nori & Frühlingszwiebel — Instant-Ramen wie vom Stand.",
    intro:
      "Wirf das Würzpäckchen weg und bau eine echte Brühe aus Dashi und Sojasauce. Mit einem weich gekochten Ei, Nori und frischem Grün wird aus 1,20 € ein Ramen, das schmeckt wie vom Stand.",
    categories: ["ramen-upgrades", "15-minuten"],
    tags: ["ramen", "shoyu", "ei", "nori", "instant", "vegetarisch"],
    timeMinutes: 15,
    activeMinutes: 12,
    difficulty: "easy",
    diet: "vegetarisch",
    spicy: 0,
    servingsBase: 2,
    ingredients: [
      ri("ramen-instant", 2, "packung", { note: "nur die Nudeln" }),
      ri("ei", 2, "stueck", { note: "zimmerwarm" }),
      ri("wasser", 700, "ml", { group: "Brühe" }),
      ri("dashi-pulver-vegan", 1, "el", { group: "Brühe" }),
      ri("shoyu", 3, "el", { group: "Brühe" }),
      ri("mirin", 1, "el", { group: "Brühe" }),
      ri("sesamoel", 1, "tl", { group: "Brühe" }),
      ri("knoblauch", 1, "zehe", { note: "gerieben", group: "Brühe" }),
      ri("nori", 2, "blatt", { note: "halbiert", group: "Topping" }),
      ri("fruehlingszwiebel", 2, "stueck", {
        note: "in Ringe",
        group: "Topping",
      }),
      ri("mais", 0.5, "dose", {
        note: "abgetropft",
        group: "Topping",
        optional: true,
      }),
    ],
    equipment: ["kleiner-topf", "topf"],
    steps: [
      {
        text: "Eier in sprudelndem Wasser 7 Minuten kochen, dann in kaltem Wasser abschrecken, pellen und halbieren — so bleibt das Eigelb cremig.",
        timerSeconds: 420,
        tip: "Hast du Ajitama auf Vorrat? Dann überspring diesen Schritt einfach.",
      },
      {
        text: "{amount:wasser} Wasser mit {amount:dashi-pulver-vegan} Dashi, {amount:shoyu} Sojasauce, {amount:mirin} Mirin, {amount:sesamoel} Sesamöl und {amount:knoblauch} Knoblauch aufkochen und Hitze runterdrehen (Stufe 4 von 9).",
        timerSeconds: 120,
      },
      {
        text: "Die Ramen-Nudeln in die Brühe geben und nach Packung garen.",
        timerSeconds: 180,
      },
      {
        text: "Nudeln und Brühe in zwei Schüsseln füllen. Mit halbem Ei, {amount:nori} Nori, {amount:fruehlingszwiebel} Frühlingszwiebeln und Mais anrichten.",
      },
    ],
    substitutionNotes:
      "Mit normalem Dashi-Pulver (Bonito) wird die Brühe klassischer, ist dann aber nicht mehr vegetarisch. Kein Dashi? Ein Stück Kombu 10 Min mitziehen lassen.",
    guideIds: ["ajitama-ramen-eier"],
    illustrationId: "shoyu-ramen-upgrade",
  },
  {
    id: "mazemen",
    title: "Mazemen mit Hack",
    subtitle:
      "Brühelose Ramen — alles klebt an der Nudel, ein Eigelb macht sie cremig.",
    intro:
      "„Mazemen“ heißt „Misch-Nudeln“: keine Brühe, dafür eine konzentrierte Würzpaste, würziges Hack und ein Eigelb, das man unterrührt. Cremig, herzhaft, ein bisschen scharf — und in 15 Minuten fertig.",
    categories: ["ramen-upgrades", "15-minuten"],
    tags: ["ramen", "brühelos", "hack", "ei", "instant"],
    timeMinutes: 15,
    activeMinutes: 15,
    difficulty: "mittel",
    diet: "fleisch",
    spicy: 1,
    servingsBase: 2,
    ingredients: [
      ri("ramen-instant", 2, "packung", { note: "nur die Nudeln" }),
      ri("hackfleisch-schwein", 120, "g", { group: "Würz-Hack" }),
      ri("doubanjiang", 1, "tl", { group: "Würz-Hack" }),
      ri("knoblauch", 1, "zehe", { note: "gehackt", group: "Würz-Hack" }),
      ri("ingwer", 8, "g", { note: "gehackt", group: "Würz-Hack" }),
      ri("shoyu", 2, "el", { group: "Tare" }),
      ri("miso-rot", 1, "tl", { group: "Tare" }),
      ri("sesamoel", 1, "el", { group: "Tare" }),
      ri("ei", 2, "stueck", { note: "nur das Eigelb", group: "Topping" }),
      ri("fruehlingszwiebel", 2, "stueck", {
        note: "in Ringe",
        group: "Topping",
      }),
      ri("nori", 1, "blatt", { note: "in Streifen", group: "Topping" }),
      ri("sesam", 1, "tl", { group: "Topping", optional: true }),
    ],
    equipment: ["pfanne", "topf", "schuessel"],
    steps: [
      {
        text: "Reichlich Wasser für die Nudeln aufsetzen. In zwei Schüsseln je {amount:shoyu} Sojasauce, {amount:miso-rot} Miso und {amount:sesamoel} Sesamöl als Tare verrühren.",
      },
      {
        text: "In der Pfanne bei mittlerer Hitze (Stufe 6 von 9) {amount:doubanjiang} Doubanjiang, {amount:knoblauch} Knoblauch und {amount:ingwer} Ingwer kurz anbraten, bis es duftet.",
        timerSeconds: 60,
      },
      {
        text: "{amount:hackfleisch-schwein} Hack dazugeben und krümelig-kross braten, bis es durch ist.",
        timerSeconds: 180,
      },
      {
        text: "Ramen-Nudeln nach Packung garen, abgießen und noch heiß in die Tare-Schüsseln geben. Kräftig mischen, bis alles glänzt.",
        timerSeconds: 180,
      },
      {
        text: "Hack darauf verteilen, in die Mitte je ein {amount:ei} rohes Eigelb setzen und mit {amount:fruehlingszwiebel} Frühlingszwiebeln, {amount:nori} Nori und Sesam toppen.",
        tip: "Vor dem Essen alles kräftig durchmischen — das Eigelb macht die Sauce cremig.",
        attention:
          "Das Eigelb bleibt roh: nimm sehr frische, gut gekühlte Eier.",
      },
    ],
    substitutionNotes:
      "Unsicher wegen rohem Eigelb? Nimm stattdessen ein weich gekochtes Ei. Weniger scharf: das Doubanjiang halbieren oder weglassen.",
    guideIds: ["ajitama-ramen-eier"],
    illustrationId: "mazemen",
  },
  {
    id: "curry-ramen",
    title: "Curry-Ramen",
    subtitle:
      "Ein Curry-Würfel macht Instant-Ramen sämig und würzig — Hokkaido-Wohlfühlessen.",
    intro:
      "In Hokkaido eine Institution: Ramen in einer sämigen Curry-Brühe. Ein Block japanische Curry-Roux dickt die Dashi-Brühe an, Mais und Butter machen sie rund. Wärmt von innen.",
    categories: ["ramen-upgrades", "15-minuten"],
    tags: ["ramen", "curry", "sämig", "instant", "wärmend"],
    timeMinutes: 15,
    activeMinutes: 12,
    difficulty: "easy",
    diet: "fleisch",
    spicy: 1,
    servingsBase: 2,
    ingredients: [
      ri("ramen-instant", 2, "packung", { note: "nur die Nudeln" }),
      ri("schweinebauch", 120, "g", { note: "in schmale Streifen" }),
      ri("wasser", 700, "ml", { group: "Curry-Brühe" }),
      ri("dashi-pulver", 1, "tl", { group: "Curry-Brühe" }),
      ri("curry-roux", 2, "stueck", { note: "Würfel", group: "Curry-Brühe" }),
      ri("mais", 0.5, "dose", { note: "abgetropft", group: "Topping" }),
      ri("butter", 10, "g", { group: "Topping" }),
      ri("fruehlingszwiebel", 2, "stueck", {
        note: "in Ringe",
        group: "Topping",
      }),
    ],
    equipment: ["topf"],
    steps: [
      {
        text: "Schweinebauch in einem Topf bei mittlerer Hitze (Stufe 6 von 9) anbraten, bis er leicht kross ist.",
        timerSeconds: 180,
      },
      {
        text: "{amount:wasser} Wasser und {amount:dashi-pulver} Dashi angießen und aufkochen.",
        timerSeconds: 120,
      },
      {
        text: "Topf vom Herd ziehen, die {amount:curry-roux} Curry-Würfel darin auflösen und wieder kurz aufkochen, bis die Brühe sämig ist.",
        attention:
          "Erst Hitze aus, dann die Roux auflösen — so wird die Brühe schön glatt.",
      },
      {
        text: "Die Ramen-Nudeln in der Curry-Brühe nach Packung garen.",
        timerSeconds: 180,
      },
      {
        text: "In zwei Schüsseln füllen und mit {amount:mais} Mais, {amount:butter} Butter und {amount:fruehlingszwiebel} Frühlingszwiebeln toppen — die Butter schmilzt cremig hinein.",
      },
    ],
    substitutionNotes:
      "Vegetarisch: Schweinebauch weglassen, vegane Dashi und vegetarische Roux nehmen. Schärfer? „Hot“-Roux oder ein Spritzer Sriracha.",
    guideIds: ["japanisches-curry-erklaert"],
    illustrationId: "curry-ramen",
  },
];
