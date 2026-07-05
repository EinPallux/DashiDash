import type { Guide } from "@/content/schema";

/**
 * Mini-guides (docs/05 §5): the Lernen tab's short, illustrated basics. Each is
 * a ≤ 3-min read — hook teaser → 3–7 steps (heading + ≤ 3 sentences) → „Wende
 * es an“ recipe links. Beginner du-Form, zero jargon. Every guide is linked by
 * ≥ 2 recipes (via recipe.guideIds) so the tab stays integrated but small
 * (validator enforces this).
 */
export const guides: Guide[] = [
  {
    id: "reis-richtig-kochen",
    title: "Reis richtig kochen",
    emoji: "🍚",
    teaser: "Locker, klebrig, perfekt — der Reis ist die halbe Miete.",
    minutes: 3,
    steps: [
      {
        heading: "Waschen, bis das Wasser klar ist",
        text: "Reis in eine Schüssel geben, mit kaltem Wasser bedecken, kurz umrühren und das milchige Wasser abgießen. 2–3-mal wiederholen. Das spült überschüssige Stärke ab, damit der Reis nicht pappt.",
      },
      {
        heading: "Das richtige Wasser-Verhältnis",
        text: "Für japanischen Rundkornreis gilt ungefähr 1 Teil Reis zu 1,2 Teilen Wasser. Im Reiskocher einfach die Markierung nutzen — im Topf abmessen.",
      },
      {
        heading: "Quellen lassen, dann köcheln",
        text: "Wenn du Zeit hast, den gewaschenen Reis 20 Min im Wasser stehen lassen. Dann zugedeckt aufkochen und bei niedrigster Hitze köcheln, bis das Wasser aufgesogen ist (ca. 12 Min).",
      },
      {
        heading: "Ruhen ist Pflicht",
        text: "Nach dem Kochen den Deckel drauf lassen und 10 Min ruhen — nicht rühren! Erst dann mit einem Löffel vorsichtig auflockern. Jetzt ist er perfekt.",
      },
    ],
    recipeIds: [
      "oyakodon",
      "chicken-teriyaki",
      "teriyaki-chicken-don",
      "butadon",
    ],
  },
  {
    id: "dashi-in-5-minuten",
    title: "Dashi in 5 Minuten",
    emoji: "🥣",
    teaser: "Die Umami-Brühe unter fast allem — einfacher, als du denkst.",
    minutes: 2,
    steps: [
      {
        heading: "Was Dashi ist",
        text: "Dashi ist die japanische Grundbrühe — leicht, klar und herzhaft. Sie steckt in Misosuppe, Nudelbrühen und vielen Saucen und ist der Grund, warum sie nach „mehr“ schmecken.",
      },
      {
        heading: "Der Pulver-Shortcut",
        text: "Am schnellsten geht’s mit Dashi-Pulver: ein Teelöffel in heißem (nicht kochendem) Wasser auflösen — fertig. Für vegan nimmst du Kombu-Dashi-Pulver.",
      },
      {
        heading: "Selbst gemacht: Kombu",
        text: "Ein Stück Kombu in kaltem Wasser langsam erhitzen und kurz vor dem Kochen herausnehmen. Kombu darf nie mitkochen, sonst wird die Brühe bitter und schleimig.",
      },
      {
        heading: "Katsuobushi dazu",
        text: "Einmal aufkochen, Hitze aus, eine Handvoll Bonitoflocken einstreuen und absinken lassen. Nach 2 Min abseihen — nicht ausdrücken. Die Reste werden zu Furikake.",
      },
    ],
    recipeIds: ["misosuppe-klassisch", "kake-udon", "ochazuke", "dashi-vorrat"],
  },
  {
    id: "ajitama-ramen-eier",
    title: "Ajitama: die perfekten Ramen-Eier",
    emoji: "🥚",
    teaser:
      "Cremiges Eigelb, mahagonifarbene Marinade — das Topping für alles.",
    minutes: 2,
    steps: [
      {
        heading: "Genau 6:30 Minuten kochen",
        text: "Zimmerwarme Eier vorsichtig in sprudelndes Wasser gleiten lassen und exakt 6½ Minuten kochen. Das ergibt festes Eiweiß und noch flüssig-cremiges Eigelb.",
      },
      {
        heading: "Sofort ins Eiswasser",
        text: "Die Eier gleich in kaltes Wasser geben und ganz abkühlen lassen. Das stoppt das Garen und macht sie leichter zu pellen.",
      },
      {
        heading: "Die Marinade",
        text: "Sojasauce, Mirin, Sake und etwas Wasser kurz aufkochen und abkühlen lassen. Wichtig: kalt muss sie sein, bevor die Eier hinein — sonst garen sie nach.",
      },
      {
        heading: "Über Nacht ziehen lassen",
        text: "Gepellte Eier in einem Beutel mit der Marinade rundum bedecken und mindestens 4 Stunden, besser über Nacht, in den Kühlschrank. Danach: Gold für jede Schüssel.",
      },
    ],
    recipeIds: ["ajitama", "shoyu-ramen-upgrade", "mazemen"],
  },
  {
    id: "teriyaki-sauce-selbst",
    title: "Teriyaki-Sauce selbst gemacht",
    emoji: "🍯",
    teaser: "Vier Zutaten schlagen jede Fertigflasche — versprochen.",
    minutes: 2,
    steps: [
      {
        heading: "Nur vier Zutaten",
        text: "Echte Teriyaki-Sauce ist Sojasauce, Mirin, Sake und Zucker — mehr nicht. Der Name heißt „glänzend gegrillt“ und beschreibt genau das Ergebnis.",
      },
      {
        heading: "Das Verhältnis merken",
        text: "Ein einfacher Startpunkt sind gleiche Teile Sojasauce und Mirin, etwas Sake und ein Löffel Zucker. Von dort schmeckst du nach süßer oder salziger ab.",
      },
      {
        heading: "Zur Glasur einkochen",
        text: "Alles zusammen köcheln lassen, bis es sirupartig eindickt. Achtung: Der Zucker verbrennt schnell, also die Hitze eher niedrig halten und dabeibleiben.",
      },
      {
        heading: "Immer wieder darüberlöffeln",
        text: "Fleisch, Tofu oder Lachs in der Sauce wenden und die Glasur immer wieder darüberlöffeln, bis alles glänzt. Ein Vorrat im Glas macht dich für Wochen glücklich.",
      },
    ],
    recipeIds: [
      "chicken-teriyaki",
      "tofu-teriyaki",
      "teriyaki-sauce-vorrat",
      "hambagu",
    ],
  },
  {
    id: "miso-richtig-verwenden",
    title: "Miso richtig verwenden",
    emoji: "🍲",
    teaser: "Die Paste, die alles herzhafter macht — nur bitte nicht kochen.",
    minutes: 2,
    steps: [
      {
        heading: "Hell oder rot?",
        text: "Helles Miso (Shiro) ist mild und leicht süß, rotes (Aka) kräftiger und salziger. Im Zweifel nimm helles — es passt fast überall. Rot dosierst du etwas sparsamer.",
      },
      {
        heading: "Niemals kochen",
        text: "Miso darf nie sprudelnd kochen, sonst verliert es Aroma und wird flockig. Immer erst am Ende und bei ausgeschalteter oder niedriger Hitze einrühren.",
      },
      {
        heading: "Erst glatt rühren",
        text: "Miso in einer Kelle mit etwas heißer Brühe glatt rühren, dann in den Topf geben. So gibt es keine Klümpchen und es verteilt sich gleichmäßig.",
      },
      {
        heading: "Mehr als nur Suppe",
        text: "Miso ist auch eine geniale Marinade (Lachs!), Glasur (Aubergine!) und Umami-Boost für Butter und Saucen. Im Kühlschrank hält es monatelang.",
      },
    ],
    recipeIds: [
      "misosuppe-klassisch",
      "miso-lachs",
      "nasu-dengaku",
      "miso-dama",
    ],
  },
  {
    id: "udon-soba-ramen",
    title: "Udon, Soba & Ramen — welche Nudel?",
    emoji: "🍜",
    teaser:
      "Vier Nudeln, ein Spickzettel — damit du nie wieder ratlos im Regal stehst.",
    minutes: 2,
    steps: [
      {
        heading: "Udon",
        text: "Dicke, weiche Weizennudeln mit angenehmem Biss. Es gibt sie vorgekocht im Vakuumbeutel — die schnellste Nudel überhaupt. Super in Brühe oder gebraten.",
      },
      {
        heading: "Soba",
        text: "Dünne Nudeln aus Buchweizen, nussig im Geschmack. Schmecken warm in Brühe, aber besonders gut kalt mit einem Dip (Zaru Soba) im Sommer.",
      },
      {
        heading: "Somen",
        text: "Sehr dünne Weizennudeln, in Minuten gar. Meist kalt gegessen — die zarteste, leichteste Variante für heiße Tage.",
      },
      {
        heading: "Ramen",
        text: "Gewellte Weizennudeln mit Biss, klassisch in Brühe. Aus der Instant-Packung (Würzpäckchen weg!) baust du im Handumdrehen ein echtes Gericht.",
      },
    ],
    recipeIds: ["yaki-udon", "kake-udon", "zaru-soba", "kitsune-udon"],
  },
  {
    id: "donburi-verstehen",
    title: "Donburi verstehen",
    emoji: "🍜",
    teaser:
      "Das Prinzip hinter jeder Reisschüssel — und wie du selbst welche erfindest.",
    minutes: 2,
    steps: [
      {
        heading: "Reis + Topping + Sauce",
        text: "„Donburi“ heißt eigentlich die Schüssel selbst. Das Prinzip: eine Schale Reis, ein herzhaftes Topping und eine süß-salzige Sauce, die in den Reis zieht.",
      },
      {
        heading: "Die Sauce ist der Schlüssel",
        text: "Fast jede Donburi-Sauce basiert auf Dashi, Sojasauce, Mirin und Zucker. Wer dieses Quartett kann, kann jede Reisschüssel.",
      },
      {
        heading: "Timing: Reis zuerst",
        text: "Immer zuerst den Reis aufsetzen, damit er parallel gart. Das Topping ist meist in unter 10 Minuten fertig — so kommt alles gleichzeitig heiß auf den Tisch.",
      },
      {
        heading: "Endlos variierbar",
        text: "Huhn und Ei ergeben Oyakodon, Rind Gyudon, Schwein Butadon. Tausch das Topping, behalte das Sauce-Prinzip — und mach die Bowl zu deiner.",
      },
    ],
    recipeIds: ["oyakodon", "gyudon", "soboro-don", "butadon"],
  },
  {
    id: "japanisches-curry-erklaert",
    title: "Japanisches Curry erklärt",
    emoji: "🍛",
    teaser: "Mild, sämig, tröstlich — und ganz anders als indisches Curry.",
    minutes: 2,
    steps: [
      {
        heading: "Der Roux-Block ist der Trick",
        text: "Japanisches Curry kommt aus fertigen Würzblöcken (Roux): Gewürze, Fett und Bindung in einem. Kein Nachwürzen nötig — der Block ist das ganze Geheimnis.",
      },
      {
        heading: "Gemüse und Fleisch anbraten",
        text: "Klassisch sind Zwiebel, Karotte, Kartoffel und ein Fleisch deiner Wahl. Kurz anbraten, mit Wasser aufgießen und weich köcheln.",
      },
      {
        heading: "Hitze aus, dann Roux",
        text: "Immer erst den Topf vom Herd ziehen, dann die Würfel auflösen. So wird die Sauce schön glatt statt klumpig. Danach kurz sämig einköcheln.",
      },
      {
        heading: "Morgen schmeckt’s noch besser",
        text: "Curry ist das perfekte Meal-Prep: über Nacht ziehen die Aromen durch und es wird runder. Große Portion kochen lohnt sich immer.",
      },
    ],
    recipeIds: ["japanisches-curry", "curry-ramen"],
  },
  {
    id: "bento-basics",
    title: "Bento-Basics",
    emoji: "🍱",
    teaser:
      "Die japanische Lunchbox — hübsch gepackt und nichts wird matschig.",
    minutes: 3,
    steps: [
      {
        heading: "Die Aufteilung",
        text: "Eine bewährte Faustregel: etwa die Hälfte Reis, ein Viertel Protein (Fleisch, Fisch, Ei) und ein Viertel Gemüse. So wird’s satt und ausgewogen.",
      },
      {
        heading: "Farben machen Appetit",
        text: "Denk in Farben: etwas Grünes, etwas Rotes, etwas Gelbes. Ein Bento isst das Auge mit — schon ein paar Frühlingszwiebeln oder eine Karotte machen viel aus.",
      },
      {
        heading: "Alles gut abkühlen lassen",
        text: "Reis und Warmes vor dem Schließen komplett auskühlen lassen. Warm eingepackt bildet sich Kondenswasser — und das macht alles matschig.",
      },
      {
        heading: "Clever vorbereiten",
        text: "Onigiri, Tamagoyaki, Karaage und Kartoffelsalat lassen sich super vorbereiten. Nori erst kurz vorm Essen dazugeben, damit es knusprig bleibt.",
      },
    ],
    recipeIds: [
      "onigiri-drei-fuellungen",
      "tamago-sando",
      "onigirazu",
      "karaage",
    ],
  },
  {
    id: "umami-einfach-erklaert",
    title: "Umami einfach erklärt",
    emoji: "✨",
    teaser:
      "Der fünfte Geschmack — und warum japanisches Essen so „rund“ schmeckt.",
    minutes: 2,
    steps: [
      {
        heading: "Was ist Umami?",
        text: "Neben süß, sauer, salzig und bitter ist Umami der fünfte Grundgeschmack: herzhaft, „rund“, mundfüllend. Er ist der Grund, warum manches Essen einfach nach „mehr“ schmeckt.",
      },
      {
        heading: "Die japanischen Quellen",
        text: "Umami steckt in Kombu (Alge), Katsuobushi (Bonitoflocken), Miso, Sojasauce und getrockneten Pilzen. Genau darum drehen sich die japanischen Basics.",
      },
      {
        heading: "Kombinieren verstärkt",
        text: "Der Clou: zwei Umami-Quellen zusammen schmecken viel intensiver als einzeln. Kombu + Katsuobushi in der Dashi sind das klassische Duo — 1 + 1 ergibt hier 3.",
      },
      {
        heading: "Im Alltag nutzen",
        text: "Ein Löffel Miso, ein Schuss Sojasauce oder etwas Furikake heben fast jedes Gericht. Selbst ein Ei über Reis mit Sojasauce ist pures Umami.",
      },
    ],
    recipeIds: [
      "dashi-vorrat",
      "furikake-selbstgemacht",
      "tamago-kake-gohan",
      "hiyayakko",
    ],
  },
];
