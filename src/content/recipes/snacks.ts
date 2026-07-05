import type { Recipe } from "@/content/schema";
import { ri } from "@/content/recipes/_helpers";

/**
 * Snacks & Onigiri, Batch 2 (docs/06 #53,54,55). Kleine Häppchen für
 * zwischendurch und fürs Bento. servingsBase 2, {amount:id} tokens.
 */
export const snacksRecipes: Recipe[] = [
  {
    id: "edamame-chili-salz",
    title: "Edamame mit Chili-Salz",
    subtitle:
      "Der Suchtfaktor-Snack aus dem TK — warm, salzig, mit einem Kick Chili.",
    intro:
      "In fünf Minuten vom Tiefkühler auf den Tisch: warme Edamame, geschwenkt in Sesamöl, Knoblauch und würzigem Chili-Salz. Man pult, man knabbert, man kann nicht aufhören.",
    categories: [
      "snacks",
      "15-minuten",
      "5-zutaten",
      "vegetarisch",
      "guenstig",
    ],
    tags: ["edamame", "snack", "tiefkühl", "vegan", "günstig"],
    timeMinutes: 10,
    activeMinutes: 8,
    difficulty: "easy",
    diet: "vegan",
    spicy: 1,
    servingsBase: 2,
    ingredients: [
      ri("edamame-tk", 250, "g", { note: "in der Schote" }),
      ri("sesamoel", 1, "tl"),
      ri("knoblauch", 1, "zehe", { note: "gerieben" }),
      ri("shichimi", 0.5, "tl"),
      ri("salz", 1, "tl"),
    ],
    equipment: ["topf", "schuessel"],
    steps: [
      {
        text: "{amount:edamame-tk} Edamame in sprudelndem Salzwasser garen, bis sie heiß und zart sind, dann abgießen.",
        timerSeconds: 300,
      },
      {
        text: "{amount:sesamoel} Sesamöl in der noch warmen Pfanne oder Schüssel mit {amount:knoblauch} geriebenem Knoblauch verrühren.",
        tip: "Die Restwärme reicht, damit der Knoblauch duftet — er soll nicht braten.",
      },
      {
        text: "Edamame darin schwenken und mit {amount:salz} Salz und {amount:shichimi} Shichimi bestreuen, bis alle Schoten überzogen sind.",
      },
      {
        text: "Warm servieren — das Fruchtfleisch aus der Schote direkt in den Mund drücken, die Schoten bleiben liegen.",
      },
    ],
    substitutionNotes:
      "Keine Shichimi? Chiliflocken + eine Prise Sesam. Ohne Knoblauch geht es auch — dann einfach nur mit Chili-Salz.",
    guideIds: [],
    illustrationId: "edamame-chili-salz",
  },
  {
    id: "tamago-sando",
    title: "Tamago Sando",
    titleJp: "たまごサンド",
    subtitle:
      "Das fluffige Konbini-Ei-Sandwich — cremig, leicht süß, wolkenweich.",
    intro:
      "Japans berühmtestes Sandwich: cremiger Eiersalat mit Kewpie-Mayo zwischen zwei weichen, entrindeten Toastscheiben. Simpel, aber durch die Kewpie-Mayo unwiderstehlich anders als jedes deutsche Eibrot.",
    categories: ["snacks", "15-minuten", "vegetarisch"],
    tags: ["sandwich", "ei", "konbini", "snack", "vegetarisch"],
    timeMinutes: 15,
    activeMinutes: 10,
    difficulty: "easy",
    diet: "vegetarisch",
    spicy: 0,
    servingsBase: 2,
    ingredients: [
      ri("ei", 4, "stueck"),
      ri("kewpie-mayo", 3, "el", { group: "Ei-Creme" }),
      ri("zucker", 1, "prise", { group: "Ei-Creme" }),
      ri("salz", null, "prise", { group: "Ei-Creme" }),
      ri("pfeffer", null, "prise", { group: "Ei-Creme" }),
      ri("sandwichbrot", 4, "blatt", { note: "Rinde entfernt" }),
      ri("butter", 10, "g", { note: "weich" }),
    ],
    equipment: ["kleiner-topf", "schuessel"],
    steps: [
      {
        text: "{amount:ei} Eier hart kochen (ca. 9 Min), abschrecken und pellen.",
        timerSeconds: 540,
      },
      {
        text: "Eier fein hacken — ein paar größere Stücke dürfen bleiben — und mit {amount:kewpie-mayo} Kewpie-Mayo, einer Prise Zucker, Salz und Pfeffer cremig mischen.",
        tip: "Ein Teil sehr fein, ein Teil grob: das gibt die schöne Textur.",
      },
      {
        text: "Toastscheiben dünn mit {amount:butter} Butter bestreichen — sie schützt das Brot vor dem Durchweichen.",
      },
      {
        text: "Die Ei-Creme großzügig auf zwei Scheiben verteilen, zuklappen, kurz andrücken und die Rinde abschneiden. Diagonal halbieren.",
        tip: "Ein scharfes Messer und leichter Druck: so bleibt die Füllung schön sichtbar.",
      },
    ],
    substitutionNotes:
      "Keine Kewpie-Mayo? Normale Mayo + Prise Zucker + ein paar Tropfen Reisessig kommen nah dran. Weiches Sandwichtoast ist Pflicht — je fluffiger, desto besser.",
    guideIds: ["bento-basics"],
    illustrationId: "tamago-sando",
  },
  {
    id: "onigirazu",
    title: "Onigirazu (Sushi-Sandwich)",
    subtitle:
      "Onigiri trifft Sandwich — ein gefülltes Nori-Reis-Päckchen, perfekt to go.",
    intro:
      "Die geniale, schnelle Variante des Onigiri: Reis und Füllung werden zwischen einem Noriblatt zu einem Päckchen gefaltet und durchgeschnitten. Kein Formen, keine Übung — nur schichten, falten, halbieren.",
    categories: ["snacks", "15-minuten"],
    tags: ["onigiri", "sandwich", "nori", "reis", "to go", "thunfisch"],
    timeMinutes: 15,
    activeMinutes: 15,
    difficulty: "mittel",
    diet: "fisch",
    spicy: 0,
    servingsBase: 2,
    ingredients: [
      ri("sushi-reis", 300, "g", { note: "gekocht, warm" }),
      ri("nori", 2, "blatt", { note: "ganze Blätter" }),
      ri("ei", 2, "stueck", { note: "für ein dünnes Omelett" }),
      ri("oel-neutral", 1, "tl", { scalable: false }),
      ri("thunfisch-dose", 1, "dose", {
        note: "abgetropft",
        group: "Füllung",
      }),
      ri("kewpie-mayo", 1, "el", { group: "Füllung" }),
      ri("shoyu", 1, "tl", { group: "Füllung" }),
      ri("salz", null, "prise"),
    ],
    equipment: ["pfanne", "schuessel"],
    steps: [
      {
        text: "{amount:sushi-reis} Sushi-Reis kochen und leicht abkühlen lassen. Thunfisch mit {amount:kewpie-mayo} Kewpie-Mayo und {amount:shoyu} Sojasauce verrühren.",
      },
      {
        text: "{amount:ei} Eier verquirlen und mit {amount:oel-neutral} Öl in der Pfanne bei mittlerer Hitze (Stufe 5 von 9) zu einem dünnen, festen Omelett braten.",
        timerSeconds: 120,
      },
      {
        text: "Ein Noriblatt mit der glänzenden Seite nach unten als Raute auf ein Brett legen. In die Mitte eine dünne Schicht Reis als Quadrat drücken.",
        tip: "Feuchte Hände oder ein Löffel verhindern, dass der Reis klebt.",
      },
      {
        text: "Omelett und Thunfisch-Mayo daraufsetzen, mit einer zweiten Reisschicht abdecken und leicht andrücken.",
      },
      {
        text: "Die vier Nori-Ecken wie ein Päckchen zur Mitte einschlagen, kurz mit der Naht nach unten ruhen lassen, dann mit einem feuchten Messer halbieren.",
        attention:
          "Kurz ruhen lassen, bevor du schneidest — so hält das Nori zusammen.",
      },
    ],
    substitutionNotes:
      "Füllung ist frei: gebratener Lachs, Teriyaki-Hähnchen oder nur Omelett und Salat gehen genauso. Kein Sushi-Reis? Klebriger Rundkornreis funktioniert auch.",
    guideIds: ["bento-basics"],
    illustrationId: "onigirazu",
  },
];
