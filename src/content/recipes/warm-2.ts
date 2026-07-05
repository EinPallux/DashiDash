import type { Recipe } from "@/content/schema";
import { ri } from "@/content/recipes/_helpers";

/**
 * Warme Hauptgerichte, Batch 2 (docs/06 #31,33,35,36,37,38,39,42). Tonkatsu &
 * Hambagu brauchen ehrlich 25 Min, passen also nicht in „20-Minuten“ — sie
 * landen in „Günstig“ bzw. „Meal-Prep“ (docs/06: Kategorie anpassen, nicht die
 * Zeit). servingsBase 2, {amount:id} tokens.
 */
export const warm2Recipes: Recipe[] = [
  {
    id: "shogayaki",
    title: "Shogayaki",
    titleJp: "生姜焼き",
    subtitle:
      "Ingwer-Schwein aus der Pfanne — Japans Feierabend-Held, süß-würzig glasiert.",
    intro:
      "„Shoga“ heißt Ingwer — und der ist hier der Star: dünnes Schwein, in einer Ingwer-Sojasauce gebraten, bis es glänzt. In Japan das klassische schnelle Abendessen, dazu Reis und ein Berg roher Kohl.",
    categories: ["15-minuten"],
    tags: ["schwein", "ingwer", "pfanne", "feierabend"],
    timeMinutes: 15,
    activeMinutes: 13,
    difficulty: "easy",
    diet: "fleisch",
    spicy: 0,
    servingsBase: 2,
    ingredients: [
      ri("reis", 160, "g"),
      ri("schweinenacken", 250, "g", { note: "dünn geschnitten" }),
      ri("zwiebel", 0.5, "stueck", { note: "in dünne Spalten" }),
      ri("oel-neutral", 1, "el", { scalable: false }),
      ri("ingwer", 15, "g", { note: "gerieben", group: "Sauce" }),
      ri("shoyu", 2, "el", { group: "Sauce" }),
      ri("mirin", 1, "el", { group: "Sauce" }),
      ri("kochsake", 1, "el", { group: "Sauce" }),
      ri("zucker", 1, "tl", { group: "Sauce" }),
      ri("spitzkohl", 100, "g", {
        note: "fein gehobelt, roh",
        group: "Beilage",
      }),
    ],
    equipment: ["schneidebrett", "pfanne", "reiskocher-oder-topf"],
    steps: [
      {
        text: "Setz zuerst den Reis auf: {amount:reis} Reis waschen und nach Packung kochen.",
        tip: "Reis zuerst — das Fleisch ist in Minuten fertig.",
      },
      {
        text: "Rühr {amount:ingwer} geriebenen Ingwer, {amount:shoyu} Sojasauce, {amount:mirin} Mirin, {amount:kochsake} Sake und {amount:zucker} Zucker zur Sauce.",
      },
      {
        text: "{amount:oel-neutral} Öl in der Pfanne erhitzen (Stufe 7 von 9) und Schwein mit den {amount:zwiebel} Zwiebeln braten, bis das Fleisch fast durch ist.",
        timerSeconds: 240,
      },
      {
        text: "Sauce angießen und schwenken, bis alles glänzend glasiert ist und die Sauce leicht eindickt.",
        timerSeconds: 120,
        attention:
          "Die Zuckersauce karamellisiert schnell — nicht zu lange braten.",
      },
      {
        text: "Mit Reis und dem fein gehobelten {amount:spitzkohl} rohen Kohl servieren — der Kohl fängt die Sauce auf.",
      },
    ],
    substitutionNotes:
      "Statt Schweinenacken geht dünn geschnittener Schweinebauch. Kein Sake? Weißwein oder weglassen. Frischer Ingwer ist hier wirklich das Herzstück — nicht durch Pulver ersetzen.",
    guideIds: [],
    illustrationId: "shogayaki",
  },
  {
    id: "karaage",
    title: "Karaage",
    titleJp: "唐揚げ",
    subtitle:
      "Japanisches Knusper-Hähnchen — außen kross, innen saftig, mit Limette.",
    intro:
      "Die knusprigen Hähnchenhappen, die in Japan in keiner Izakaya fehlen: in Sojasauce, Sake und Ingwer mariniert, in Stärke gewälzt und goldbraun ausgebacken. Ein Spritzer Limette macht sie perfekt.",
    categories: ["snacks"],
    tags: ["hähnchen", "frittiert", "knusprig", "snack", "izakaya"],
    timeMinutes: 25,
    activeMinutes: 20,
    difficulty: "mittel",
    diet: "fleisch",
    spicy: 0,
    servingsBase: 2,
    ingredients: [
      ri("haehnchenschenkel", 400, "g", { note: "in mundgerechte Stücke" }),
      ri("shoyu", 2, "el", { group: "Marinade" }),
      ri("kochsake", 1, "el", { group: "Marinade" }),
      ri("ingwer", 10, "g", { note: "gerieben", group: "Marinade" }),
      ri("knoblauch", 1, "zehe", { note: "gerieben", group: "Marinade" }),
      ri("speisestaerke", 4, "el", { group: "Panade" }),
      ri("mehl", 2, "el", { group: "Panade" }),
      ri("oel-neutral", 500, "ml", {
        note: "zum Frittieren",
        scalable: false,
      }),
      ri("limette", 0.5, "stueck", { note: "in Spalten", group: "Beilage" }),
    ],
    equipment: ["schneidebrett", "topf", "schuessel"],
    steps: [
      {
        text: "Hähnchen mit {amount:shoyu} Sojasauce, {amount:kochsake} Sake, {amount:ingwer} Ingwer und {amount:knoblauch} Knoblauch mischen und marinieren.",
        timerSeconds: 600,
        tip: "Schon 10 Minuten reichen — länger (bis 30 Min) macht es aromatischer.",
      },
      {
        text: "{amount:speisestaerke} Stärke und {amount:mehl} Mehl mischen. Die marinierten Stücke rundum darin wälzen, überschüssiges Mehl abklopfen.",
      },
      {
        text: "{amount:oel-neutral} Öl in einem Topf auf mittlere-hohe Hitze bringen (ca. 170 °C — ein Holzstäbchen sprudelt sofort).",
        attention:
          "Öl nie unbeaufsichtigt lassen und nicht zu voll machen — heißes Fett spritzt.",
      },
      {
        text: "Hähnchen portionsweise 3–4 Min goldbraun ausbacken, herausnehmen und kurz abtropfen lassen.",
        timerSeconds: 210,
        tip: "In Portionen frittieren, damit das Öl heiß bleibt und alles knusprig wird.",
      },
      {
        text: "Für extra Knusper die Stücke ein zweites Mal kurz frittieren, dann mit {amount:limette} Limettenspalten servieren.",
        timerSeconds: 60,
      },
    ],
    substitutionNotes:
      "Nur Stärke (ohne Mehl) macht es besonders kross. Kein Sake? Weglassen. Wenig Öl? Es geht auch in ~1 cm Öl in der Pfanne, dann öfter wenden.",
    guideIds: ["bento-basics"],
    illustrationId: "karaage",
  },
  {
    id: "nikujaga",
    title: "Nikujaga",
    titleJp: "肉じゃが",
    subtitle:
      "Japanischer Fleisch-Kartoffel-Eintopf — süß-herzhaft, wärmend, riesige Portionen.",
    intro:
      "Japans „Mutti-Essen“ schlechthin: Kartoffeln, Zwiebeln und dünnes Rind, in einer süß-salzigen Dashi-Brühe weich geschmort. Am nächsten Tag, wenn alles durchgezogen ist, schmeckt es sogar noch besser.",
    categories: ["meal-prep"],
    tags: ["eintopf", "kartoffel", "rind", "meal prep", "wärmend"],
    timeMinutes: 35,
    activeMinutes: 15,
    difficulty: "mittel",
    diet: "fleisch",
    spicy: 0,
    servingsBase: 4,
    ingredients: [
      ri("rindfleisch", 200, "g", { note: "hauchdünn geschnitten" }),
      ri("kartoffel", 4, "stueck", { note: "in große Stücke" }),
      ri("zwiebel", 1, "stueck", { note: "in Spalten" }),
      ri("karotte", 1, "stueck", { note: "in Stücke" }),
      ri("oel-neutral", 1, "el", { scalable: false }),
      ri("wasser", 500, "ml", { group: "Brühe" }),
      ri("dashi-pulver", 1, "tl", { group: "Brühe" }),
      ri("shoyu", 4, "el", { group: "Brühe" }),
      ri("mirin", 2, "el", { group: "Brühe" }),
      ri("kochsake", 2, "el", { group: "Brühe" }),
      ri("zucker", 1, "el", { group: "Brühe" }),
      ri("tk-erbsen", 40, "g", {
        note: "kurz überbrüht",
        group: "Topping",
        optional: true,
      }),
    ],
    equipment: ["schneidebrett", "topf"],
    steps: [
      {
        text: "{amount:oel-neutral} Öl im Topf erhitzen (Stufe 6 von 9) und das Rindfleisch kurz anbraten, bis es Farbe hat.",
        timerSeconds: 120,
      },
      {
        text: "{amount:zwiebel} Zwiebeln, {amount:kartoffel} Kartoffeln und {amount:karotte} Karotten dazugeben und kurz mitbraten.",
        timerSeconds: 120,
      },
      {
        text: "{amount:wasser} Wasser mit {amount:dashi-pulver} Dashi, {amount:shoyu} Sojasauce, {amount:mirin} Mirin, {amount:kochsake} Sake und {amount:zucker} Zucker angießen und aufkochen.",
      },
      {
        text: "Zugedeckt bei niedriger Hitze (Stufe 3 von 9) köcheln lassen, bis die Kartoffeln weich sind.",
        timerSeconds: 1200,
        tip: "Ein Deckel direkt auf dem Eintopf (oder Backpapier mit Loch) hält alles saftig.",
      },
      {
        text: "Deckel abnehmen und offen etwas einkochen, bis die Brühe sirupartig wird. Mit Erbsen bestreut servieren.",
        timerSeconds: 300,
        attention:
          "Nicht mehr umrühren, nur den Topf schwenken — sonst zerfallen die Kartoffeln.",
      },
    ],
    substitutionNotes:
      "Statt Rind geht auch dünner Schweinebauch (Kansai-Style). Vegetarisch: Fleisch weglassen, vegane Dashi und ein Schuss Sesamöl für Tiefe.",
    guideIds: [],
    illustrationId: "nikujaga",
    mealPrepNote:
      "Über Nacht durchgezogen schmeckt es am besten. Hält 3 Tage im Kühlschrank; einfrieren geht, die Kartoffeln werden dabei minimal weicher.",
  },
  {
    id: "hambagu",
    title: "Hambagu mit Teriyaki-Demi",
    subtitle:
      "Japanische Frikadelle, saftig und weich, unter einer glänzenden Teriyaki-Sauce.",
    intro:
      "Hambagu ist Japans zärtliche Version der Frikadelle: mit Panko und Milch besonders weich, in der Pfanne gebraten und mit einer glänzenden, süß-salzigen Sauce überzogen. Kinder wie Erwachsene lieben sie.",
    categories: ["meal-prep"],
    tags: ["frikadelle", "hack", "teriyaki", "meal prep"],
    timeMinutes: 25,
    activeMinutes: 22,
    difficulty: "mittel",
    diet: "fleisch",
    spicy: 0,
    servingsBase: 2,
    ingredients: [
      ri("hackfleisch", 300, "g", { group: "Frikadellen" }),
      ri("zwiebel", 0.5, "stueck", {
        note: "fein gewürfelt",
        group: "Frikadellen",
      }),
      ri("panko", 30, "g", { group: "Frikadellen" }),
      ri("milch", 3, "el", { group: "Frikadellen" }),
      ri("ei", 1, "stueck", { group: "Frikadellen" }),
      ri("salz", null, "prise", { group: "Frikadellen" }),
      ri("pfeffer", null, "prise", { group: "Frikadellen" }),
      ri("oel-neutral", 1, "el", { scalable: false }),
      ri("ketchup", 2, "el", { group: "Teriyaki-Demi" }),
      ri("shoyu", 1, "el", { group: "Teriyaki-Demi" }),
      ri("mirin", 1, "el", { group: "Teriyaki-Demi" }),
      ri("zucker", 1, "tl", { group: "Teriyaki-Demi" }),
      ri("butter", 10, "g", { group: "Teriyaki-Demi" }),
    ],
    equipment: ["schneidebrett", "pfanne", "schuessel"],
    steps: [
      {
        text: "{amount:panko} Panko mit {amount:milch} Milch kurz einweichen. Zwiebel fein würfeln.",
        tip: "Das eingeweichte Panko macht die Frikadelle besonders saftig.",
      },
      {
        text: "{amount:hackfleisch} Hack mit Zwiebel, Panko-Milch, {amount:ei} Ei, Salz und Pfeffer kräftig kneten, bis die Masse klebt. Zu zwei ovalen Frikadellen formen und in die Handfläche klatschen, um Luft herauszuklopfen.",
        attention:
          "Luft herausklopfen verhindert, dass die Frikadelle beim Braten aufreißt.",
      },
      {
        text: "{amount:oel-neutral} Öl in der Pfanne erhitzen (Stufe 6 von 9), Frikadellen hineinlegen und eine Mulde in die Mitte drücken. Erste Seite braun braten.",
        timerSeconds: 240,
      },
      {
        text: "Wenden, Hitze reduzieren (Stufe 4 von 9), Deckel drauf und durchgaren, bis beim Einstechen klarer Saft austritt.",
        timerSeconds: 360,
        attention: "Bei Hackfleisch gilt: gut durchgaren, kein rosa Saft mehr.",
      },
      {
        text: "Frikadellen herausnehmen. {amount:ketchup} Ketchup, {amount:shoyu} Sojasauce, {amount:mirin} Mirin, {amount:zucker} Zucker und {amount:butter} Butter im Bratensatz aufkochen, bis die Sauce glänzt, und über die Hambagu geben.",
      },
    ],
    substitutionNotes:
      "Gemischtes Hack ist ideal (saftig). Keine Milch? Wasser tut es auch. Statt Ketchup-Demi passt auch pure Teriyaki-Sauce.",
    guideIds: ["teriyaki-sauce-selbst"],
    illustrationId: "hambagu",
    mealPrepNote:
      "Die gebratenen Frikadellen halten 3 Tage im Kühlschrank und lassen sich einfrieren. Sauce separat aufbewahren und frisch dazugeben.",
  },
  {
    id: "gyoza-knusprig",
    title: "TK-Gyoza mit Knusperflügel",
    subtitle:
      "Der Frozen-Food-Hack mit Wow-Effekt: TK-Gyoza mit knuspriger Spitzenhaube.",
    intro:
      "Tiefgekühlte Gyoza sind schon gut — mit dem „Hane“-Trick werden sie großartig: eine dünne Mehl-Wasser-Schicht backt zu einem knusprigen Flügel, der alle Gyoza verbindet. Sieht aus wie vom Profi, ist aber idiotensicher.",
    categories: ["15-minuten", "5-zutaten", "anfaenger"],
    tags: ["gyoza", "tiefkühl", "knusprig", "hack", "schnell"],
    timeMinutes: 15,
    activeMinutes: 12,
    difficulty: "easy",
    diet: "fleisch",
    spicy: 0,
    servingsBase: 2,
    ingredients: [
      ri("tk-gyoza", 12, "stueck", { note: "gefroren" }),
      ri("oel-neutral", 1, "el", { scalable: false }),
      ri("wasser", 100, "ml", { group: "Knusperflügel" }),
      ri("mehl", 1, "tl", { group: "Knusperflügel" }),
      ri("sesamoel", 1, "tl", { note: "zum Finish" }),
      ri("shoyu", 2, "el", { group: "Dip" }),
      ri("reisessig", 1, "el", { group: "Dip" }),
    ],
    equipment: ["pfanne"],
    steps: [
      {
        text: "Für den Flügel {amount:wasser} Wasser mit {amount:mehl} Mehl klümpchenfrei verrühren.",
        tip: "Die dünne Mehlmischung wird später zum knusprigen Spitzenrand.",
      },
      {
        text: "{amount:oel-neutral} Öl in der Pfanne erhitzen (Stufe 6 von 9), die gefrorenen Gyoza kreisförmig hineinsetzen und den Boden 2 Min anbraten.",
        timerSeconds: 120,
      },
      {
        text: "Die Mehlmischung angießen, sofort Deckel drauf und dämpfen lassen, bis das Wasser fast verdampft ist.",
        timerSeconds: 300,
        attention: "Deckel drauf lassen — der Dampf gart die Füllung durch.",
      },
      {
        text: "Deckel abnehmen, {amount:sesamoel} Sesamöl am Rand angießen und offen weiterbraten, bis der Boden und der Mehl-Flügel goldbraun und knusprig sind.",
        timerSeconds: 120,
      },
      {
        text: "Einen Teller auf die Pfanne legen und alles zusammen umdrehen — der Knusperflügel zeigt nach oben. Mit einem Dip aus {amount:shoyu} Sojasauce und {amount:reisessig} Reisessig servieren.",
      },
    ],
    substitutionNotes:
      "Jede TK-Gyoza-Sorte funktioniert (Gemüse, Schwein, Hähnchen). Für einen schärferen Dip ein paar Tropfen Chiliöl dazugeben.",
    guideIds: [],
    illustrationId: "gyoza-knusprig",
  },
  {
    id: "okonomiyaki",
    title: "Okonomiyaki",
    titleJp: "お好み焼き",
    subtitle:
      "Der herzhafte Kraut-Pfannkuchen aus Osaka — mit Sauce, Mayo und Bonito-Tanz.",
    intro:
      "„Okonomi“ heißt „wie du magst“: ein dicker, herzhafter Pfannkuchen aus viel Kohl und Teig, gekrönt mit süß-würziger Sauce, Mayo und tanzenden Bonitoflocken. Osaka-Streetfood zum Selbermachen.",
    categories: ["vegetarisch"],
    tags: ["pfannkuchen", "kohl", "osaka", "streetfood", "vegetarisch"],
    timeMinutes: 25,
    activeMinutes: 22,
    difficulty: "mittel",
    diet: "vegetarisch",
    spicy: 0,
    servingsBase: 2,
    ingredients: [
      ri("mehl", 100, "g", { group: "Teig" }),
      ri("wasser", 100, "ml", { group: "Teig" }),
      ri("dashi-pulver-vegan", 1, "tl", { group: "Teig" }),
      ri("ei", 2, "stueck", { group: "Teig" }),
      ri("spitzkohl", 250, "g", { note: "fein geschnitten" }),
      ri("fruehlingszwiebel", 2, "stueck", { note: "in Ringe" }),
      ri("oel-neutral", 1, "el", { scalable: false }),
      ri("schweinebauch", 80, "g", {
        note: "in dünnen Streifen",
        optional: true,
      }),
      ri("okonomiyaki-sauce", 3, "el", { group: "Topping" }),
      ri("kewpie-mayo", 2, "el", { group: "Topping" }),
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
    equipment: ["schuessel", "pfanne"],
    steps: [
      {
        text: "{amount:mehl} Mehl mit {amount:wasser} Wasser und {amount:dashi-pulver-vegan} Dashi zu einem glatten Teig rühren, die {amount:ei} Eier unterrühren.",
      },
      {
        text: "{amount:spitzkohl} fein geschnittenen Kohl und {amount:fruehlingszwiebel} Frühlingszwiebeln unterheben, bis alles vom Teig überzogen ist.",
        tip: "Viel Kohl, wenig Teig — der Teig ist nur der Kleber.",
      },
      {
        text: "{amount:oel-neutral} Öl in der Pfanne erhitzen (Stufe 5 von 9), die Masse als dicken Kreis einfüllen (optional Schweinebauch auflegen) und zugedeckt braten, bis die Unterseite goldbraun ist.",
        timerSeconds: 420,
        attention:
          "Nicht flach drücken — der Pfannkuchen soll dick und fluffig bleiben.",
      },
      {
        text: "Mutig wenden (ein Teller hilft) und die zweite Seite goldbraun und durchgaren.",
        timerSeconds: 360,
      },
      {
        text: "Mit {amount:okonomiyaki-sauce} Sauce und {amount:kewpie-mayo} Mayo im Zickzack beträufeln, mit Bonitoflocken und Nori bestreuen — und die tanzenden Flocken bewundern.",
      },
    ],
    substitutionNotes:
      "Klassisch kommt Schweinebauch obendrauf — für vegetarisch einfach weglassen und vegane Dashi nehmen. Statt Okonomiyaki-Sauce geht Tonkatsu-Sauce.",
    guideIds: [],
    illustrationId: "okonomiyaki",
  },
  {
    id: "tonkatsu",
    title: "Tonkatsu",
    titleJp: "とんかつ",
    subtitle:
      "Panko-Schnitzel, unfassbar knusprig — mit süß-würziger Sauce und Kohl.",
    intro:
      "Das japanische Schnitzel: Schweinelende in luftigem Panko paniert und goldbraun ausgebacken, in Streifen geschnitten und mit süß-würziger Tonkatsu-Sauce serviert. Dazu fein gehobelter Kohl und Reis — ein Festessen für kleines Geld.",
    categories: ["guenstig"],
    tags: ["schwein", "schnitzel", "panko", "knusprig", "günstig"],
    timeMinutes: 25,
    activeMinutes: 20,
    difficulty: "mittel",
    diet: "fleisch",
    spicy: 0,
    servingsBase: 2,
    ingredients: [
      ri("reis", 160, "g"),
      ri("schweineschnitzel", 250, "g", { note: "2 Schnitzel" }),
      ri("mehl", 2, "el", { group: "Panade" }),
      ri("ei", 1, "stueck", { note: "verquirlt", group: "Panade" }),
      ri("panko", 50, "g", { group: "Panade" }),
      ri("oel-neutral", 200, "ml", {
        note: "zum Ausbacken (ca. 1 cm hoch)",
        scalable: false,
      }),
      ri("tonkatsu-sauce", 3, "el", { group: "Beilage" }),
      ri("spitzkohl", 100, "g", {
        note: "hauchfein gehobelt, roh",
        group: "Beilage",
      }),
    ],
    equipment: ["schneidebrett", "pfanne", "reiskocher-oder-topf"],
    steps: [
      {
        text: "Setz zuerst den Reis auf: {amount:reis} Reis waschen und nach Packung kochen.",
        tip: "Reis zuerst — er ist fertig, wenn das Schnitzel aus der Pfanne kommt.",
      },
      {
        text: "Schnitzel trocken tupfen, leicht salzen und am Rand ein paar Mal einschneiden, damit sie sich nicht wölben.",
      },
      {
        text: "Drei Teller vorbereiten: {amount:mehl} Mehl, {amount:ei} verquirltes Ei, {amount:panko} Panko. Schnitzel nacheinander in Mehl, Ei und Panko wenden und das Panko gut andrücken.",
        tip: "Reihenfolge merken: erst Mehl, dann Ei, dann Panko — so haftet die Panade.",
      },
      {
        text: "{amount:oel-neutral} Öl in der Pfanne auf mittlere-hohe Hitze bringen (ca. 170 °C — ein Panko-Krümel sprudelt sofort) und die Schnitzel je Seite goldbraun ausbacken.",
        timerSeconds: 360,
        attention:
          "Öl im Blick behalten und die Pfanne nicht überfüllen — heißes Fett spritzt.",
      },
      {
        text: "Auf einem Gitter oder Küchenpapier kurz abtropfen lassen, dann in fingerbreite Streifen schneiden.",
        timerSeconds: 120,
        tip: "In Streifen schneiden, ohne die Panade zu quetschen — mit einem scharfen Messer und wenig Druck.",
      },
      {
        text: "Mit dem hauchfein gehobelten {amount:spitzkohl} Kohl, Reis und {amount:tonkatsu-sauce} Tonkatsu-Sauce servieren.",
      },
    ],
    substitutionNotes:
      "Kein Panko? Grobe Semmelbrösel gehen, werden nur weniger luftig. Tonkatsu-Sauce selbst gemacht: Ketchup + Worcestersauce + Prise Zucker.",
    guideIds: [],
    illustrationId: "tonkatsu",
  },
  {
    id: "omurice",
    title: "Omurice",
    titleJp: "オムライス",
    subtitle:
      "Ketchup-Reis im weichen Omelett-Mantel — Japans liebstes Comfort Food.",
    intro:
      "Ein Kindheitstraum aus dem Café: würziger Ketchup-Hähnchen-Reis, eingehüllt in ein weiches Omelett. Ein Herz aus Ketchup obendrauf gehört dazu. Sieht verspielt aus, schmeckt nach Zuhause.",
    categories: ["20-minuten"],
    tags: ["reis", "omelett", "ketchup", "hähnchen", "comfort food"],
    timeMinutes: 20,
    activeMinutes: 18,
    difficulty: "mittel",
    diet: "fleisch",
    spicy: 0,
    servingsBase: 2,
    ingredients: [
      ri("reis", 300, "g", { note: "gekocht & kalt" }),
      ri("haehnchenschenkel", 120, "g", { note: "klein gewürfelt" }),
      ri("zwiebel", 0.5, "stueck", { note: "fein gewürfelt" }),
      ri("oel-neutral", 1, "el", { scalable: false }),
      ri("ketchup", 4, "el", { group: "Reis" }),
      ri("tk-erbsen", 40, "g", {
        note: "aufgetaut",
        group: "Reis",
        optional: true,
      }),
      ri("ei", 4, "stueck", { group: "Omelett" }),
      ri("milch", 1, "el", { group: "Omelett" }),
      ri("butter", 10, "g", { group: "Omelett" }),
      ri("salz", null, "prise", { group: "Omelett" }),
    ],
    equipment: ["schneidebrett", "pfanne"],
    steps: [
      {
        text: "{amount:oel-neutral} Öl in der Pfanne erhitzen (Stufe 7 von 9), {amount:zwiebel} Zwiebel und {amount:haehnchenschenkel} Hähnchen anbraten, bis das Fleisch durch ist.",
        timerSeconds: 240,
      },
      {
        text: "{amount:reis} kalten Reis, {amount:ketchup} Ketchup und Erbsen dazugeben und unter Rühren braten, bis der Reis heiß und gleichmäßig rot ist. Warm stellen.",
        timerSeconds: 180,
        tip: "Kalter Reis vom Vortag bleibt schön körnig statt matschig.",
      },
      {
        text: "Pro Portion 2 {amount:ei} Eier mit etwas {amount:milch} Milch und einer Prise Salz verquirlen. {amount:butter} Butter in der Pfanne bei niedriger Hitze (Stufe 4 von 9) schmelzen.",
      },
      {
        text: "Ei eingießen, schwenken und mit dem Spatel schieben, bis es fast gestockt, oben aber noch cremig ist.",
        attention:
          "Nicht durchbraten — das Omelett soll innen weich und glänzend bleiben.",
      },
      {
        text: "Eine Portion Ketchup-Reis auf das Omelett setzen, einschlagen und mit der Naht nach unten auf den Teller stürzen. Mit einem Streifen Ketchup toppen.",
      },
    ],
    substitutionNotes:
      "Statt Hähnchen gehen Kochschinken oder für vegetarisch nur Gemüse. Traut man sich das Einschlagen nicht zu: das Omelett einfach als Decke über den Reis legen.",
    guideIds: [],
    illustrationId: "omurice",
  },
];
