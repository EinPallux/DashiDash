import type { Recipe } from "@/content/schema";
import { ri } from "@/content/recipes/_helpers";

/**
 * Japanisches Frühstück, Batch 2 (docs/06 #17,19,20,21). Sanft, herzhaft,
 * Umami am Morgen. servingsBase 2, honest times, {amount:id} tokens.
 */
export const fruehstueckRecipes: Recipe[] = [
  {
    id: "tamagoyaki",
    title: "Tamagoyaki",
    titleJp: "卵焼き",
    subtitle:
      "Das süß-herzhafte gerollte Omelett — Schicht für Schicht in der Pfanne aufgerollt.",
    intro:
      "Das gerollte japanische Omelett: dünne Eischichten, immer wieder aufgerollt, bis ein saftiger, leicht süßer Block entsteht. Es braucht etwas Übung, aber schon der erste Versuch schmeckt. Klassisch fürs Frühstück oder Bento.",
    categories: ["fruehstueck", "15-minuten", "vegetarisch"],
    tags: ["ei", "omelett", "frühstück", "bento", "vegetarisch"],
    timeMinutes: 15,
    activeMinutes: 15,
    difficulty: "mittel",
    diet: "vegetarisch",
    spicy: 0,
    servingsBase: 2,
    ingredients: [
      ri("ei", 4, "stueck"),
      ri("wasser", 2, "el", { group: "Würze" }),
      ri("dashi-pulver-vegan", 1, "tl", { group: "Würze" }),
      ri("zucker", 1, "el", { group: "Würze" }),
      ri("shoyu", 1, "tl", { group: "Würze" }),
      ri("mirin", 1, "tl", { group: "Würze" }),
      ri("oel-neutral", 1, "tl", { scalable: false }),
    ],
    equipment: ["pfanne", "schuessel"],
    steps: [
      {
        text: "{amount:wasser} Wasser mit {amount:dashi-pulver-vegan} Dashi glatt rühren, dann die {amount:ei} Eier mit {amount:zucker} Zucker, {amount:shoyu} Sojasauce und {amount:mirin} Mirin verquirlen — nur locker, nicht schaumig.",
      },
      {
        text: "Pfanne bei mittlerer Hitze (Stufe 5 von 9) erwärmen und mit etwas {amount:oel-neutral} Öl dünn auspinseln.",
        tip: "Eine eckige Tamagoyaki-Pfanne macht es leichter — eine normale kleine Pfanne geht aber auch.",
      },
      {
        text: "Eine dünne Schicht Ei eingießen, schwenken. Sobald sie fast gestockt ist, mit einem Wender vom oberen Rand her zu einer Rolle aufrollen.",
        attention:
          "Nicht durchbraten lassen — die Oberfläche darf noch leicht feucht sein, sonst klebt die nächste Schicht nicht.",
      },
      {
        text: "Die Rolle an den Pfannenrand schieben, Pfanne wieder ölen, neue Schicht eingießen (auch unter die Rolle laufen lassen) und erneut über die Rolle aufrollen.",
        tip: "So Schicht für Schicht wiederholen — jede Lage macht die Rolle dicker.",
      },
      {
        text: "Die fertige Rolle kurz abkühlen lassen, dann in dicke Scheiben schneiden.",
        timerSeconds: 60,
      },
    ],
    substitutionNotes:
      "Statt Dashi geht auch nur ein Schuss Wasser — dann wird es schlichter, aber immer noch lecker. Herzhafter statt süß? Den Zucker halbieren.",
    guideIds: [],
    illustrationId: "tamagoyaki",
  },
  {
    id: "fruehstuecks-set",
    title: "Japanisches Frühstücks-Set",
    subtitle:
      "Reis, Misosuppe, Ei & Nori — das warme Ryokan-Frühstück in 20 Minuten.",
    intro:
      "So startet Japan in den Tag: eine Schale Reis, eine klare Misosuppe, ein einfaches Ei und knuspriges Nori. Zusammen ist es mehr als die Summe der Teile — sanft, herzhaft, sättigend.",
    categories: ["fruehstueck", "20-minuten"],
    tags: ["frühstück", "reis", "misosuppe", "ei", "set"],
    timeMinutes: 20,
    activeMinutes: 15,
    difficulty: "mittel",
    diet: "fisch",
    spicy: 0,
    servingsBase: 2,
    ingredients: [
      ri("reis", 160, "g"),
      ri("wasser", 500, "ml", { group: "Misosuppe" }),
      ri("dashi-pulver", 1, "tl", { group: "Misosuppe" }),
      ri("miso-hell", 2, "el", { group: "Misosuppe" }),
      ri("tofu", 100, "g", { note: "in kleine Würfel", group: "Misosuppe" }),
      ri("wakame", 1, "tl", { note: "getrocknet", group: "Misosuppe" }),
      ri("ei", 2, "stueck", { group: "Beilagen" }),
      ri("oel-neutral", 1, "tl", { scalable: false, group: "Beilagen" }),
      ri("nori", 2, "blatt", { group: "Beilagen" }),
      ri("furikake", 1, "tl", { group: "Beilagen" }),
      ri("fruehlingszwiebel", 1, "stueck", {
        note: "in Ringe",
        group: "Misosuppe",
      }),
    ],
    equipment: ["kleiner-topf", "pfanne", "reiskocher-oder-topf"],
    steps: [
      {
        text: "Setz zuerst den Reis auf: {amount:reis} Reis waschen und nach Packung kochen.",
        tip: "Reis zuerst — Suppe und Ei sind in der Zwischenzeit fertig.",
      },
      {
        text: "Für die Suppe {amount:wasser} Wasser mit {amount:dashi-pulver} Dashi erwärmen (nicht sprudelnd), {amount:tofu} Tofu und {amount:wakame} Wakame hineingeben.",
        timerSeconds: 120,
      },
      {
        text: "Topf von der starken Hitze ziehen und {amount:miso-hell} Miso mit etwas Brühe glatt rühren, dann einrühren.",
        attention: "Miso nie kochen — sonst verliert es Aroma.",
      },
      {
        text: "In der Pfanne mit {amount:oel-neutral} Öl bei mittlerer Hitze (Stufe 6 von 9) zwei Spiegeleier braten, bis das Weiße gestockt ist.",
        timerSeconds: 180,
      },
      {
        text: "Anrichten: je eine Schale Reis (mit {amount:furikake} Furikake bestreut), eine Schale Suppe mit {amount:fruehlingszwiebel} Frühlingszwiebeln, das Ei und {amount:nori} Nori zum Einwickeln.",
      },
    ],
    substitutionNotes:
      "Statt Spiegelei passt auch Tamagoyaki oder ein weich gekochtes Ei. Vegetarisch: vegane Dashi nehmen.",
    guideIds: ["dashi-in-5-minuten"],
    illustrationId: "fruehstuecks-set",
  },
  {
    id: "dashi-ruehrei",
    title: "Dashi-Rührei",
    subtitle:
      "Cremiges Rührei mit einem Umami-Boost aus Dashi — Frühstück in 10 Minuten.",
    intro:
      "Rührei, aber mit Tiefe: ein Löffel Dashi macht die Eier herzhaft-rund und unfassbar cremig. Auf Reis oder Toast ein schneller, tröstlicher Start in den Tag.",
    categories: ["fruehstueck", "15-minuten", "vegetarisch"],
    tags: ["ei", "rührei", "dashi", "frühstück", "vegetarisch"],
    timeMinutes: 10,
    activeMinutes: 8,
    difficulty: "easy",
    diet: "vegetarisch",
    spicy: 0,
    servingsBase: 2,
    ingredients: [
      ri("ei", 4, "stueck"),
      ri("wasser", 2, "el", { group: "Würze" }),
      ri("dashi-pulver-vegan", 1, "tl", { group: "Würze" }),
      ri("shoyu", 1, "tl", { group: "Würze" }),
      ri("butter", 10, "g"),
      ri("fruehlingszwiebel", 1, "stueck", {
        note: "in Ringe",
        group: "Topping",
      }),
    ],
    equipment: ["pfanne", "schuessel"],
    steps: [
      {
        text: "{amount:wasser} Wasser mit {amount:dashi-pulver-vegan} Dashi glatt rühren, dann die {amount:ei} Eier mit {amount:shoyu} Sojasauce dazu verquirlen.",
      },
      {
        text: "{amount:butter} Butter in der Pfanne bei niedriger Hitze (Stufe 4 von 9) schmelzen, ohne dass sie bräunt.",
        tip: "Niedrige Hitze ist der ganze Trick für cremiges Rührei.",
      },
      {
        text: "Eimasse hineingeben und mit einem Spatel langsam schieben, bis sich weiche Flocken bilden — vom Herd nehmen, solange es noch leicht glänzt.",
        attention: "Lieber zu früh vom Herd — das Ei gart nach.",
      },
      {
        text: "Auf Reis oder Toast anrichten und mit {amount:fruehlingszwiebel} Frühlingszwiebeln bestreuen.",
      },
    ],
    substitutionNotes:
      "Kein Dashi? Eine Prise Salz und ein Extra-Spritzer Sojasauce tun es auch. Vegan: Butter durch pflanzliche Alternative ersetzen und veganes Dashi nehmen.",
    guideIds: [],
    illustrationId: "dashi-ruehrei",
  },
  {
    id: "ochazuke",
    title: "Ochazuke",
    titleJp: "お茶漬け",
    subtitle:
      "Reis, heiße Dashi-Brühe und Toppings — das tröstlichste Fast Food Japans.",
    intro:
      "Wenn es schnell und leicht gehen soll: warmer Reis, mit heißer Dashi-Brühe (oder grünem Tee) übergossen, dazu ein paar salzige Toppings. In Japan der Klassiker für spätabends oder gegen den kleinen Hunger.",
    categories: ["fruehstueck", "15-minuten", "guenstig"],
    tags: ["reis", "brühe", "schnell", "günstig", "resteverwertung"],
    timeMinutes: 10,
    activeMinutes: 8,
    difficulty: "easy",
    diet: "fisch",
    spicy: 0,
    servingsBase: 2,
    ingredients: [
      ri("reis", 300, "g", { note: "gekocht & warm" }),
      ri("wasser", 500, "ml", { group: "Brühe" }),
      ri("dashi-pulver", 1, "tl", { group: "Brühe" }),
      ri("shoyu", 1, "tl", { group: "Brühe" }),
      ri("umeboshi", 2, "stueck", {
        note: "entkernt",
        group: "Topping",
      }),
      ri("nori", 1, "blatt", { note: "in Streifen", group: "Topping" }),
      ri("sesam", 1, "tl", { group: "Topping" }),
      ri("fruehlingszwiebel", 1, "stueck", {
        note: "in Ringe",
        group: "Topping",
      }),
    ],
    equipment: ["kleiner-topf", "schuessel"],
    steps: [
      {
        text: "Warmen {amount:reis} Reis in zwei Schüsseln geben. (Reis vom Vortag? Kurz heiß machen.)",
      },
      {
        text: "{amount:wasser} Wasser mit {amount:dashi-pulver} Dashi und {amount:shoyu} Sojasauce aufkochen — eine leichte, klare Brühe.",
        timerSeconds: 120,
      },
      {
        text: "Auf jede Reisschale eine {amount:umeboshi} Umeboshi, {amount:nori} Nori und {amount:sesam} Sesam geben.",
      },
      {
        text: "Die heiße Brühe über den Reis gießen und mit {amount:fruehlingszwiebel} Frühlingszwiebeln bestreuen. Sofort essen, solange es dampft.",
      },
    ],
    substitutionNotes:
      "Ganz klassisch geht es auch mit heißem grünem Tee statt Brühe. Statt Umeboshi passen Lachsflocken, Furikake oder ein Stück gebratener Lachs.",
    guideIds: ["dashi-in-5-minuten"],
    illustrationId: "ochazuke",
  },
];
