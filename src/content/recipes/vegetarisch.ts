import type { Recipe } from "@/content/schema";
import { ri } from "@/content/recipes/_helpers";

/**
 * Vegetarisch & Vegan, Batch 2 (docs/06 #43,44,46,48,49,50). Ganz ohne Fleisch,
 * ganz viel Umami. servingsBase 2, {amount:id} tokens.
 */
export const vegetarischRecipes: Recipe[] = [
  {
    id: "nasu-dengaku",
    title: "Nasu Dengaku",
    titleJp: "なす田楽",
    subtitle:
      "Miso-glasierte Aubergine, die im Mund schmilzt — süß-herzhaft und tiefviolett.",
    intro:
      "Auberginenhälften, weich gebraten und mit einer glänzenden, süßen Miso-Glasur überzogen. Das Fruchtfleisch wird cremig-zart, die Glasur karamellisiert — ein kleines Umami-Wunder als Beilage oder mit Reis.",
    categories: ["vegetarisch", "20-minuten"],
    tags: ["aubergine", "miso", "glasiert", "vegan", "beilage"],
    timeMinutes: 20,
    activeMinutes: 15,
    difficulty: "easy",
    diet: "vegan",
    spicy: 0,
    servingsBase: 2,
    ingredients: [
      ri("aubergine", 2, "stueck", { note: "längs halbiert" }),
      ri("oel-neutral", 2, "el", { scalable: false }),
      ri("miso-hell", 2, "el", { group: "Dengaku-Glasur" }),
      ri("mirin", 1, "el", { group: "Dengaku-Glasur" }),
      ri("zucker", 1, "el", { group: "Dengaku-Glasur" }),
      ri("wasser", 1, "el", { group: "Dengaku-Glasur" }),
      ri("sesam", 1, "tl", { group: "Topping" }),
      ri("fruehlingszwiebel", 1, "stueck", {
        note: "in feine Ringe",
        group: "Topping",
      }),
    ],
    equipment: ["schneidebrett", "pfanne", "ofen"],
    steps: [
      {
        text: "Auberginen längs halbieren und die Schnittflächen rautenförmig einritzen (nicht durchschneiden).",
        tip: "Das Einritzen lässt die Aubergine schneller garen und die Glasur eindringen.",
      },
      {
        text: "{amount:oel-neutral} Öl in der Pfanne erhitzen (Stufe 6 von 9) und die Auberginen auf beiden Seiten braten, bis das Fruchtfleisch weich und cremig ist.",
        timerSeconds: 480,
        attention:
          "Aubergine saugt Öl — lieber zugedeckt garen als immer mehr Öl nachgeben.",
      },
      {
        text: "Für die Glasur {amount:miso-hell} Miso, {amount:mirin} Mirin, {amount:zucker} Zucker und {amount:wasser} Wasser glatt rühren.",
      },
      {
        text: "Die Glasur auf die Schnittflächen streichen und unter dem heißen Backofengrill 2–3 Min überbacken, bis sie Blasen wirft und dunkelt.",
        timerSeconds: 180,
        attention: "Miso verbrennt schnell — nah am Grill dranbleiben.",
      },
      {
        text: "Mit {amount:sesam} Sesam und {amount:fruehlingszwiebel} Frühlingszwiebeln bestreuen.",
      },
    ],
    substitutionNotes:
      "Kein Grill? Die glasierten Hälften einfach zugedeckt in der Pfanne kurz weiterziehen lassen. Rotes Miso macht es kräftiger — dann etwas weniger nehmen.",
    guideIds: ["miso-richtig-verwenden"],
    illustrationId: "nasu-dengaku",
  },
  {
    id: "agedashi-tofu",
    title: "Agedashi-Style Tofu",
    subtitle:
      "Knusprig ausgebackener Tofu in warmer Dashi-Brühe — außen kross, innen seidig.",
    intro:
      "Ein Izakaya-Klassiker: Tofuwürfel, in Stärke gewälzt und knusprig gebraten, dann in eine warme, leicht süße Dashi-Brühe gesetzt. Der Kontrast aus krosser Hülle und seidigem Inneren ist das ganze Glück.",
    categories: ["vegetarisch", "20-minuten"],
    tags: ["tofu", "dashi", "knusprig", "izakaya", "vegetarisch"],
    timeMinutes: 20,
    activeMinutes: 18,
    difficulty: "mittel",
    diet: "vegetarisch",
    spicy: 0,
    servingsBase: 2,
    ingredients: [
      ri("tofu-seiden", 400, "g", { note: "gut abgetropft" }),
      ri("speisestaerke", 4, "el"),
      ri("oel-neutral", 4, "el", {
        note: "zum Ausbacken",
        scalable: false,
      }),
      ri("wasser", 250, "ml", { group: "Dashi-Brühe" }),
      ri("dashi-pulver-vegan", 1, "tl", { group: "Dashi-Brühe" }),
      ri("shoyu", 2, "el", { group: "Dashi-Brühe" }),
      ri("mirin", 1, "el", { group: "Dashi-Brühe" }),
      ri("ingwer", 8, "g", { note: "gerieben", group: "Topping" }),
      ri("fruehlingszwiebel", 1, "stueck", {
        note: "in Ringe",
        group: "Topping",
      }),
    ],
    equipment: ["kleiner-topf", "pfanne", "schuessel"],
    steps: [
      {
        text: "Tofu zwischen Küchenpapier 5 Min gut abtropfen lassen, dann in große Würfel schneiden.",
        timerSeconds: 300,
        tip: "Je trockener der Tofu, desto knuspriger wird die Hülle.",
      },
      {
        text: "Für die Brühe {amount:wasser} Wasser mit {amount:dashi-pulver-vegan} Dashi, {amount:shoyu} Sojasauce und {amount:mirin} Mirin aufkochen und warm halten.",
        timerSeconds: 120,
      },
      {
        text: "Tofuwürfel rundum in {amount:speisestaerke} Stärke wenden.",
      },
      {
        text: "{amount:oel-neutral} Öl in der Pfanne erhitzen (Stufe 7 von 9) und die Würfel rundum knusprig und goldbraun braten.",
        timerSeconds: 300,
        attention:
          "Vorsichtig wenden — Seidentofu ist zart, am besten mit zwei Löffeln.",
      },
      {
        text: "Tofu in Schüsseln setzen, die warme Brühe angießen und mit {amount:ingwer} geriebenem Ingwer und {amount:fruehlingszwiebel} Frühlingszwiebeln toppen.",
      },
    ],
    substitutionNotes:
      "Fester Tofu ist einfacher zu handhaben und wird ebenfalls knusprig. Mit Bonito-Dashi wird die Brühe klassischer (dann nicht vegetarisch).",
    guideIds: ["dashi-in-5-minuten"],
    illustrationId: "agedashi-tofu",
  },
  {
    id: "kinpira-karotte",
    title: "Kinpira-Karotten",
    subtitle:
      "Süß-scharf gebratene Karottenstifte mit Sesam — die Beilage, die süchtig macht.",
    intro:
      "Kinpira ist eine schnelle, süß-scharfe Pfannenbeilage. Karotten in feinen Stiften, in Sesamöl gebraten und mit Sojasauce und Mirin glasiert, dazu ein Hauch Chili. Warm oder kalt aus der Bento-Box ein Genuss.",
    categories: ["vegetarisch", "15-minuten", "guenstig"],
    tags: ["karotte", "beilage", "sesam", "vegan", "günstig"],
    timeMinutes: 15,
    activeMinutes: 12,
    difficulty: "easy",
    diet: "vegan",
    spicy: 1,
    servingsBase: 2,
    ingredients: [
      ri("karotte", 3, "stueck", { note: "in feine Stifte" }),
      ri("sesamoel", 1, "el"),
      ri("shoyu", 2, "el", { group: "Sauce" }),
      ri("mirin", 1, "el", { group: "Sauce" }),
      ri("zucker", 1, "tl", { group: "Sauce" }),
      ri("shichimi", 0.5, "tl", { group: "Sauce" }),
      ri("sesam", 1, "tl", { group: "Topping" }),
    ],
    equipment: ["schneidebrett", "pfanne"],
    steps: [
      {
        text: "Karotten in feine, streichholzdünne Stifte schneiden.",
        tip: "Je feiner die Stifte, desto schneller und gleichmäßiger garen sie.",
      },
      {
        text: "{amount:sesamoel} Sesamöl in der Pfanne erhitzen (Stufe 7 von 9) und die {amount:karotte} Karotten unter Rühren braten, bis sie weich, aber noch bissfest sind.",
        timerSeconds: 240,
      },
      {
        text: "{amount:shoyu} Sojasauce, {amount:mirin} Mirin, {amount:zucker} Zucker und {amount:shichimi} Shichimi angießen und schwenken, bis die Flüssigkeit fast weg und alles glänzend glasiert ist.",
        timerSeconds: 120,
      },
      {
        text: "Vom Herd nehmen und mit {amount:sesam} Sesam bestreuen. Schmeckt warm wie kalt.",
      },
    ],
    substitutionNotes:
      "Klassisch kommt noch Klettenwurzel (Gobo) dazu — mit nur Karotte wird es aber genauso gut. Keine Shichimi? Eine Prise Chiliflocken.",
    guideIds: [],
    illustrationId: "kinpira-karotte",
  },
  {
    id: "tofu-teriyaki",
    title: "Tofu-Teriyaki",
    subtitle:
      "Knusprige Tofuwürfel in glänzender Teriyaki-Sauce — der Klassiker, pflanzlich.",
    intro:
      "Teriyaki muss nicht Fleisch sein: fester Tofu, in Stärke knusprig gebraten und in einer glänzenden, süß-salzigen Sauce glasiert. Über Reis eine vollwertige, sättigende Bowl — komplett pflanzlich.",
    categories: ["vegetarisch", "15-minuten"],
    tags: ["tofu", "teriyaki", "knusprig", "vegan", "reis"],
    timeMinutes: 15,
    activeMinutes: 15,
    difficulty: "easy",
    diet: "vegan",
    spicy: 0,
    servingsBase: 2,
    ingredients: [
      ri("reis", 160, "g"),
      ri("tofu", 400, "g", { note: "fest, gut abgetropft" }),
      ri("speisestaerke", 2, "el"),
      ri("oel-neutral", 1, "el", { scalable: false }),
      ri("shoyu", 2, "el", { group: "Teriyaki-Sauce" }),
      ri("mirin", 2, "el", { group: "Teriyaki-Sauce" }),
      ri("kochsake", 1, "el", { group: "Teriyaki-Sauce" }),
      ri("zucker", 1, "tl", { group: "Teriyaki-Sauce" }),
      ri("sesam", 1, "tl", { group: "Topping" }),
      ri("fruehlingszwiebel", 1, "stueck", {
        note: "in Ringe",
        group: "Topping",
      }),
    ],
    equipment: ["pfanne", "reiskocher-oder-topf"],
    steps: [
      {
        text: "Setz zuerst den Reis auf: {amount:reis} Reis waschen und nach Packung kochen.",
        tip: "Reis zuerst — der Tofu ist in wenigen Minuten fertig.",
      },
      {
        text: "Tofu gut abtropfen, in Würfel schneiden und rundum in {amount:speisestaerke} Stärke wenden. Sauce aus {amount:shoyu} Sojasauce, {amount:mirin} Mirin, {amount:kochsake} Sake und {amount:zucker} Zucker anrühren.",
        tip: "Trockentupfen und Stärke sind der Trick für eine knusprige Hülle.",
      },
      {
        text: "{amount:oel-neutral} Öl in der Pfanne erhitzen (Stufe 7 von 9) und die Tofuwürfel rundum goldbraun und knusprig braten.",
        timerSeconds: 360,
      },
      {
        text: "Sauce angießen und schwenken, bis sie eindickt und den Tofu glänzend überzieht.",
        timerSeconds: 120,
        attention:
          "Die Zuckersauce klebt schnell an — dann Hitze etwas runter.",
      },
      {
        text: "Über den Reis geben und mit {amount:sesam} Sesam und {amount:fruehlingszwiebel} Frühlingszwiebeln bestreuen.",
      },
    ],
    substitutionNotes:
      "Räuchertofu gibt extra Aroma. Keinen Reis zur Hand? Schmeckt auch über Nudeln oder pur als Snack.",
    guideIds: ["teriyaki-sauce-selbst"],
    illustrationId: "tofu-teriyaki",
  },
  {
    id: "sunomono",
    title: "Sunomono-Gurkensalat",
    subtitle:
      "Erfrischend süß-sauer, in Minuten fertig — der leichte Gurkensalat Japans.",
    intro:
      "Sunomono heißt „essiggewürzte Sachen“: hauchdünne Gurke in einem süß-sauren Reisessig-Dressing. Leicht, erfrischend und der perfekte kühle Kontrast zu allem Herzhaften.",
    categories: ["vegetarisch", "15-minuten", "guenstig"],
    tags: ["gurke", "salat", "essig", "vegan", "günstig", "beilage"],
    timeMinutes: 10,
    activeMinutes: 10,
    difficulty: "easy",
    diet: "vegan",
    spicy: 0,
    servingsBase: 2,
    ingredients: [
      ri("gurke", 1, "stueck", { note: "in hauchdünne Scheiben" }),
      ri("salz", null, "prise"),
      ri("reisessig", 3, "el", { group: "Dressing" }),
      ri("zucker", 1, "el", { group: "Dressing" }),
      ri("shoyu", 1, "tl", { group: "Dressing" }),
      ri("wakame", 1, "tl", {
        note: "getrocknet",
        group: "Topping",
        optional: true,
      }),
      ri("sesam", 1, "tl", { group: "Topping" }),
    ],
    equipment: ["schneidebrett", "schuessel"],
    steps: [
      {
        text: "Gurke in hauchdünne Scheiben hobeln, mit einer Prise Salz mischen und 5 Min ziehen lassen.",
        timerSeconds: 300,
        tip: "Das Salz zieht Wasser — so wird der Salat nicht wässrig.",
      },
      {
        text: "Für das Dressing {amount:reisessig} Reisessig, {amount:zucker} Zucker und {amount:shoyu} Sojasauce verrühren, bis sich der Zucker löst.",
      },
      {
        text: "Die Gurke kräftig ausdrücken (Flüssigkeit weg) und mit dem Dressing (und aufgequollener {amount:wakame} Wakame) mischen.",
      },
      {
        text: "Kühl stellen und vor dem Servieren mit {amount:sesam} Sesam bestreuen.",
      },
    ],
    substitutionNotes:
      "Kein Reisessig? Milder Weißweinessig + Extra-Prise Zucker. Mit ein paar Streifen Wakame oder dünnen Karottenscheiben wird mehr daraus.",
    guideIds: [],
    illustrationId: "sunomono",
  },
  {
    id: "japanischer-kartoffelsalat",
    title: "Japanischer Kartoffelsalat",
    subtitle:
      "Cremig mit Kewpie-Mayo, leicht süß und knackig — süchtig machend anders.",
    intro:
      "Anders als der deutsche: die Kartoffeln werden grob zerdrückt, mit cremiger Kewpie-Mayo, einem Spritzer Reisessig und knackigem Gemüse gemischt. Leicht süß, seidig und überraschend spannend.",
    categories: ["vegetarisch", "20-minuten", "meal-prep"],
    tags: ["kartoffel", "salat", "mayo", "beilage", "meal prep", "vegetarisch"],
    timeMinutes: 20,
    activeMinutes: 15,
    difficulty: "easy",
    diet: "vegetarisch",
    spicy: 0,
    servingsBase: 4,
    ingredients: [
      ri("kartoffel", 4, "stueck", { note: "geschält, in Stücke" }),
      ri("karotte", 0.5, "stueck", { note: "in dünne Halbmonde" }),
      ri("gurke", 0.5, "stueck", { note: "in dünne Scheiben" }),
      ri("ei", 2, "stueck"),
      ri("salz", null, "prise"),
      ri("kewpie-mayo", 4, "el", { group: "Dressing" }),
      ri("reisessig", 1, "el", { group: "Dressing" }),
      ri("pfeffer", null, "nach-geschmack", { group: "Dressing" }),
    ],
    equipment: ["topf", "schuessel", "sieb"],
    steps: [
      {
        text: "{amount:kartoffel} Kartoffeln und {amount:karotte} Karotte in Salzwasser weich kochen. Die {amount:ei} Eier die letzten 8 Min mitkochen.",
        timerSeconds: 900,
      },
      {
        text: "Währenddessen die {amount:gurke} Gurke in dünne Scheiben schneiden, salzen, kurz ziehen lassen und ausdrücken.",
      },
      {
        text: "Kartoffeln und Karotte abgießen, kurz ausdampfen lassen und noch warm grob zerdrücken (nicht ganz glatt). Eier pellen und würfeln.",
        tip: "Warm zerdrückt nehmen die Kartoffeln das Dressing besser auf.",
      },
      {
        text: "{amount:kewpie-mayo} Kewpie-Mayo und {amount:reisessig} Reisessig unterheben, Gurke und Ei dazugeben und mit Salz und Pfeffer abschmecken.",
      },
    ],
    substitutionNotes:
      "Keine Kewpie-Mayo? Normale Mayo + Prise Zucker + Schuss Reisessig. Mit etwas gewürfeltem Kochschinken wird es herzhafter (dann nicht mehr vegetarisch).",
    guideIds: ["bento-basics"],
    illustrationId: "japanischer-kartoffelsalat",
    mealPrepNote:
      "Hält 3 Tage im Kühlschrank und schmeckt durchgezogen noch besser. Nicht einfrieren — die Kartoffeln werden sonst mehlig.",
  },
];
