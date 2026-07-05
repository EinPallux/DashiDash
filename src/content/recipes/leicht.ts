import type { Recipe } from "@/content/schema";
import { ri } from "@/content/recipes/_helpers";

/** Frühstück, vegetarische Beilagen & Snacks (docs/06 #16,18,45,47,51,52). */
export const leichtRecipes: Recipe[] = [
  {
    id: "tamago-kake-gohan",
    title: "Tamago Kake Gohan",
    titleJp: "卵かけご飯",
    subtitle: "Rohes Ei über heißem Reis — Japans schnellstes Comfort Food.",
    intro:
      "„TKG“ ist das Frühstück, das jedes japanische Kind kennt: ein rohes Ei über dampfend heißen Reis, ein Schuss Sojasauce, kräftig verrührt — cremig, warm, in einer Minute fertig.",
    categories: [
      "fruehstueck",
      "15-minuten",
      "5-zutaten",
      "guenstig",
      "anfaenger",
    ],
    tags: ["ei", "reis", "frühstück", "schnell", "günstig"],
    timeMinutes: 5,
    activeMinutes: 5,
    difficulty: "easy",
    diet: "vegetarisch",
    spicy: 0,
    servingsBase: 2,
    ingredients: [
      ri("reis", 160, "g", { note: "frisch gekocht & heiß" }),
      ri("ei", 2, "stueck", { note: "sehr frisch" }),
      ri("shoyu", 2, "tl"),
      ri("fruehlingszwiebel", 1, "stueck", {
        note: "in Ringe",
        group: "Topping",
        optional: true,
      }),
      ri("furikake", 1, "tl", { group: "Topping", optional: true }),
    ],
    equipment: ["schuessel", "reiskocher-oder-topf"],
    steps: [
      {
        text: "Heißen, frisch gekochten Reis in zwei Schüsseln geben. (Hast du warmen Reis vom Reiskocher? Dann geht’s sofort los.)",
      },
      {
        text: "Pro Schüssel ein {amount:ei} Ei direkt auf den heißen Reis schlagen und {amount:shoyu} Sojasauce darübergeben.",
        tip: "Die Hitze des Reises wärmt das Ei leicht an — deshalb sollte der Reis richtig heiß sein.",
        attention:
          "Das Ei bleibt roh: Nimm sehr frische, gut gekühlte Eier (am besten Bio).",
      },
      {
        text: "Kräftig verrühren, bis alles cremig und leicht schaumig ist. Mit {amount:fruehlingszwiebel} Frühlingszwiebeln oder Furikake toppen.",
      },
    ],
    substitutionNotes:
      "Unsicher wegen rohem Ei? Verrühr Ei + Sojasauce kurz in einer heißen (leeren) Pfanne zu ganz weichem Rührei und gib es über den Reis.",
    guideIds: [],
    illustrationId: "tamago-kake-gohan",
  },
  {
    id: "misosuppe-klassisch",
    title: "Misosuppe mit Tofu & Wakame",
    titleJp: "味噌汁",
    subtitle: "Die Suppe, die alles besser macht — Tofu, Wakame, Miso.",
    intro:
      "Die Grundsuppe Japans: eine klare Dashi-Brühe, in der sich Miso auflöst, dazu weiche Tofuwürfel und Wakame-Algen. Wärmt, tröstet und ist in 10 Minuten fertig.",
    categories: [
      "fruehstueck",
      "15-minuten",
      "vegetarisch",
      "guenstig",
      "anfaenger",
    ],
    tags: ["suppe", "miso", "tofu", "wakame", "vegan", "günstig"],
    timeMinutes: 10,
    activeMinutes: 10,
    difficulty: "easy",
    diet: "vegan",
    spicy: 0,
    servingsBase: 2,
    ingredients: [
      ri("wasser", 700, "ml", { group: "Brühe" }),
      ri("dashi-pulver-vegan", 1, "tl", { group: "Brühe" }),
      ri("miso-hell", 3, "el", { group: "Brühe" }),
      ri("tofu", 150, "g", { note: "in kleine Würfel" }),
      ri("wakame", 1, "tl", { note: "getrocknet" }),
      ri("fruehlingszwiebel", 1, "stueck", {
        note: "in feine Ringe",
        group: "Topping",
      }),
    ],
    equipment: ["kleiner-topf"],
    steps: [
      {
        text: "{amount:wasser} Wasser mit {amount:dashi-pulver-vegan} veganer Dashi erwärmen — heiß, aber nicht sprudelnd kochen.",
        timerSeconds: 120,
      },
      {
        text: "{amount:wakame} Wakame und den {amount:tofu} Tofu hineingeben. Die Wakame quellen in ein bis zwei Minuten auf.",
        timerSeconds: 120,
      },
      {
        text: "Topf von der starken Hitze ziehen. {amount:miso-hell} Miso in einer Kelle mit etwas Brühe glatt rühren und dann einrühren.",
        attention:
          "Miso nie kochen — sonst verliert es Aroma und wird flockig.",
      },
      {
        text: "Mit {amount:fruehlingszwiebel} Frühlingszwiebeln bestreuen und sofort servieren.",
      },
    ],
    substitutionNotes:
      "Mit normalem Dashi-Pulver (Bonito) schmeckt es klassischer, ist dann aber nicht mehr vegan. Keine Wakame? Ein paar Blattspinat-Blätter geben eine ähnliche, mildere Note.",
    guideIds: [],
    illustrationId: "misosuppe-klassisch",
  },
  {
    id: "spinat-gomaae",
    title: "Spinat-Gomaae",
    titleJp: "胡麻和え",
    subtitle: "Sesam-Spinat — die nussig-süße Beilage, die süchtig macht.",
    intro:
      "Eine der beliebtesten kleinen Beilagen Japans: blanchierter Spinat in einer nussig-süßen Sesamsauce. Schmeckt viel raffinierter, als die drei Handgriffe vermuten lassen.",
    categories: ["vegetarisch", "15-minuten", "5-zutaten"],
    tags: ["spinat", "sesam", "beilage", "vegan"],
    timeMinutes: 10,
    activeMinutes: 10,
    difficulty: "easy",
    diet: "vegan",
    spicy: 0,
    servingsBase: 2,
    ingredients: [
      ri("spinat", 200, "g", { note: "frisch" }),
      ri("sesam", 3, "el", { note: "geröstet", group: "Sesamsauce" }),
      ri("shoyu", 2, "tl", { group: "Sesamsauce" }),
      ri("zucker", 1, "tl", { group: "Sesamsauce" }),
      ri("dashi-pulver-vegan", 1, "prise", {
        group: "Sesamsauce",
        optional: true,
      }),
    ],
    equipment: ["kleiner-topf", "schuessel"],
    steps: [
      {
        text: "{amount:spinat} Spinat in sprudelndem Wasser 30 Sekunden blanchieren, dann sofort in kaltes Wasser geben, damit er grün bleibt.",
        timerSeconds: 30,
      },
      {
        text: "Den Spinat richtig gut ausdrücken (er soll fast trocken sein) und in mundgerechte Stücke schneiden.",
        tip: "Je trockener der Spinat, desto besser haftet die Sauce.",
      },
      {
        text: "Den Großteil des {amount:sesam} Sesams im Mörser (oder mit einer Gabel) grob zerdrücken, bis er duftet.",
      },
      {
        text: "Sesam mit {amount:shoyu} Sojasauce und {amount:zucker} Zucker zu einer Paste rühren, den Spinat unterheben und mit dem restlichen Sesam bestreuen.",
      },
    ],
    substitutionNotes:
      "Statt Sesam kannst du auch 1–2 EL Sesampaste (Tahin) nehmen. Eine Prise Dashi in der Sauce gibt mehr Tiefe (nicht mehr vegan mit Bonito-Dashi).",
    guideIds: [],
    illustrationId: "spinat-gomaae",
  },
  {
    id: "hiyayakko",
    title: "Hiyayakko",
    titleJp: "冷奴",
    subtitle:
      "Kalter Seidentofu mit Ingwer und Frühlingszwiebel — null Kochen.",
    intro:
      "Im japanischen Sommer der Klassiker: ein Block kalter Seidentofu, getoppt mit Ingwer, Frühlingszwiebel und Sojasauce. Kein Herd, fünf Minuten, überraschend elegant.",
    categories: ["vegetarisch", "15-minuten", "5-zutaten", "snacks"],
    tags: ["tofu", "kalt", "schnell", "beilage", "snack"],
    timeMinutes: 5,
    activeMinutes: 5,
    difficulty: "easy",
    diet: "vegetarisch",
    spicy: 0,
    servingsBase: 2,
    ingredients: [
      ri("tofu-seiden", 300, "g", { note: "gut gekühlt" }),
      ri("fruehlingszwiebel", 1, "stueck", {
        note: "in feine Ringe",
        group: "Topping",
      }),
      ri("ingwer", 10, "g", { note: "frisch gerieben", group: "Topping" }),
      ri("shoyu", 2, "tl", { group: "Topping" }),
      ri("katsuobushi", 1, "prise", {
        note: "Bonitoflocken — nicht vegetarisch",
        group: "Topping",
        optional: true,
      }),
    ],
    equipment: ["schneidebrett"],
    steps: [
      {
        text: "Den {amount:tofu-seiden} kalten Seidentofu vorsichtig abtropfen und auf zwei Teller setzen (ganz oder halbiert).",
        tip: "Der Tofu sollte richtig kalt sein — das ist der ganze Reiz.",
      },
      {
        text: "{amount:ingwer} Ingwer reiben und {amount:fruehlingszwiebel} Frühlingszwiebel in feine Ringe schneiden.",
      },
      {
        text: "Tofu mit Ingwer und Frühlingszwiebel belegen, {amount:shoyu} Sojasauce darüberträufeln und (wer mag) mit Bonitoflocken toppen.",
      },
    ],
    substitutionNotes:
      "Kein Seidentofu? Fester Tofu geht auch, ist nur weniger zart. Für eine vegane Variante die Bonitoflocken weglassen.",
    guideIds: [],
    illustrationId: "hiyayakko",
  },
  {
    id: "onigiri-drei-fuellungen",
    title: "Onigiri, 3 Füllungen",
    titleJp: "おにぎり",
    subtitle:
      "Reisdreiecke mit drei Füllungen: Lachs, Thunfisch-Mayo, Umeboshi.",
    intro:
      "Die japanischen Reisdreiecke to go: außen klebriger Reis mit Nori, innen eine Überraschung. Wir machen gleich drei Klassiker-Füllungen — perfekt fürs Bento oder als Snack.",
    categories: ["snacks", "meal-prep", "20-minuten"],
    tags: ["onigiri", "reis", "snack", "bento", "lachs", "thunfisch"],
    timeMinutes: 20,
    activeMinutes: 20,
    difficulty: "mittel",
    diet: "fisch",
    spicy: 0,
    servingsBase: 2,
    ingredients: [
      ri("sushi-reis", 250, "g", { note: "gekocht, noch warm" }),
      ri("salz", null, "prise", { note: "für die Hände", group: "Basis" }),
      ri("nori", 3, "blatt", { note: "in Streifen", group: "Basis" }),
      ri("lachs", 120, "g", {
        note: "gebraten & zerpflückt",
        group: "Füllung: Lachs",
      }),
      ri("thunfisch-dose", 1, "dose", {
        note: "abgetropft",
        group: "Füllung: Thunfisch-Mayo",
      }),
      ri("kewpie-mayo", 1, "el", { group: "Füllung: Thunfisch-Mayo" }),
      ri("umeboshi", 2, "stueck", {
        note: "entkernt & zerdrückt",
        group: "Füllung: Umeboshi",
      }),
    ],
    equipment: ["reiskocher-oder-topf", "pfanne", "schuessel"],
    steps: [
      {
        text: "{amount:sushi-reis} Sushi-Reis kochen und leicht abkühlen lassen — warm, aber anfassbar.",
        tip: "Sushi-/Rundkornreis klebt am besten. Langkorn hält leider nicht zusammen.",
      },
      {
        text: "Für die Lachs-Füllung den {amount:lachs} Lachs in der Pfanne braten, bis er durch ist, dann mit der Gabel zerpflücken.",
        timerSeconds: 300,
      },
      {
        text: "Thunfisch mit {amount:kewpie-mayo} Kewpie-Mayo verrühren. Die {amount:umeboshi} Umeboshi entkernen und zerdrücken.",
      },
      {
        text: "Hände mit Wasser befeuchten und leicht salzen. Eine Handvoll Reis nehmen, eine Mulde drücken, etwas Füllung hineingeben und den Reis darüber verschließen.",
        attention:
          "Feuchte, gesalzene Hände sind der Trick — sonst klebt alles an dir statt am Onigiri.",
      },
      {
        text: "Zu einem Dreieck formen: Hand zur Ecke winkeln, drehen, drücken. Zum Schluss mit einem Streifen {amount:nori} Nori umwickeln.",
      },
    ],
    substitutionNotes:
      "Keine Umeboshi? Nimm einfach zweimal Lachs oder Thunfisch. Statt Kewpie normale Mayo + Prise Zucker. Warmer Reis lässt sich am leichtesten formen.",
    guideIds: [],
    illustrationId: "onigiri",
    mealPrepNote:
      "Am besten frisch, halten aber 1 Tag (kühl, in Frischhaltefolie gewickelt). Das Nori erst kurz vor dem Essen umwickeln, damit es knusprig bleibt.",
  },
  {
    id: "yaki-onigiri",
    title: "Yaki Onigiri",
    titleJp: "焼きおにぎり",
    subtitle:
      "Knusprig gebratene Reisbälle mit Shoyu-Glasur — außen kross, innen weich.",
    intro:
      "Onigiri, aber gegrillt: die Reisdreiecke werden in der Pfanne knusprig, mit Sojasauce bestrichen und karamellisieren zu einer herzhaften Kruste. Fünf Zutaten, großes Kino.",
    categories: [
      "snacks",
      "15-minuten",
      "5-zutaten",
      "guenstig",
      "vegetarisch",
    ],
    tags: ["onigiri", "reis", "gebraten", "snack", "vegan", "günstig"],
    timeMinutes: 15,
    activeMinutes: 12,
    difficulty: "easy",
    diet: "vegan",
    spicy: 0,
    servingsBase: 2,
    ingredients: [
      ri("sushi-reis", 250, "g", { note: "gekocht, klebrig" }),
      ri("shoyu", 2, "el", { group: "Glasur" }),
      ri("mirin", 1, "tl", { group: "Glasur", optional: true }),
      ri("sesamoel", 1, "tl", { scalable: false, optional: true }),
      ri("salz", null, "prise", { note: "für die Hände", group: "Basis" }),
    ],
    equipment: ["reiskocher-oder-topf", "pfanne"],
    steps: [
      {
        text: "{amount:sushi-reis} Sushi-Reis kochen und etwas abkühlen lassen, bis er sich anfassen lässt.",
        tip: "Klebriger Rundkornreis hält am besten zusammen.",
      },
      {
        text: "Mit feuchten, leicht gesalzenen Händen feste Dreiecke formen — richtig andrücken, damit sie beim Braten nicht zerfallen.",
        attention:
          "Fest pressen ist wichtig: lockere Onigiri fallen in der Pfanne auseinander.",
      },
      {
        text: "Etwas {amount:sesamoel} Öl in der Pfanne bei mittlerer Hitze (Stufe 6 von 9) erhitzen und die Onigiri braten, bis die Unterseite goldbraun und knusprig ist.",
        timerSeconds: 240,
      },
      {
        text: "Wenden, die zweite Seite bräunen, dann mit {amount:shoyu} Sojasauce (und Mirin) bestreichen und kurz weiterbraten, bis die Glasur karamellisiert.",
        timerSeconds: 120,
        tip: "Die Sojasauce erst zum Schluss — sie verbrennt sonst.",
      },
    ],
    substitutionNotes:
      "Für extra Umami etwas Miso mit unter die Glasur mischen. Kein Sesamöl? Neutrales Öl geht auch, schmeckt nur weniger nussig.",
    guideIds: [],
    illustrationId: "yaki-onigiri",
  },
];
