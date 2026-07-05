import type { LexiconEntry } from "@/content/schema";

/**
 * Lexicon (docs/04 §4, docs/05 §3). Written for someone who has never stood in
 * an Asia-Laden: one plain sentence what it physically is → taste comparison to
 * familiar foods → concrete buying advice with a German price → honest
 * substitute. Referenced by ingredients via `lexiconId` and opened from recipe
 * ingredient rows as a bottom sheet.
 */
export const lexicon: LexiconEntry[] = [
  {
    id: "shoyu",
    term: "Shoyu (Sojasauce)",
    termJp: "醤油",
    whatIsIt:
      "Japanische Sojasauce — die salzige Umami-Basis fast jeder japanischen Sauce. Dünnflüssig, dunkelbraun.",
    tastesLike:
      "Salzig-herzhaft mit einer leichten Süße, runder und weniger scharf als die meisten China-Sojasaucen.",
    whereToBuy:
      "In jedem Supermarkt (Kikkoman steht meist bei den Asia-Zutaten), ca. 3–4 € für 500 ml. Hält im Kühlschrank ewig.",
    substitute:
      "Jede normale Sojasauce funktioniert. Kikkoman ist quasi überall die sichere Wahl.",
    compareWith:
      "Deutsche „Sojasauce“ ist meist genau das — nimm einfach die, die du hast.",
  },
  {
    id: "mirin",
    term: "Mirin",
    termJp: "みりん",
    whatIsIt:
      "Süßer Reiswein zum Kochen — quasi der Zucker- und Glanz-Booster der japanischen Küche.",
    tastesLike: "Wie milder Sherry mit Honig, nur ohne Schärfe.",
    whereToBuy:
      "Asia-Regal im Supermarkt oder Asia-Laden, ca. 4 € für 400 ml. Hält ewig.",
    substitute:
      "1 EL Zucker in 2 EL Weißwein (oder Wasser) auflösen — okay, aber das Original lohnt sich wirklich.",
  },
  {
    id: "sake",
    term: "Sake (zum Kochen)",
    termJp: "酒",
    whatIsIt:
      "Reiswein, der beim Kochen Fleisch zarter macht und Gerüche neutralisiert. Der Alkohol verdampft.",
    tastesLike: "Neutral-herb, ähnlich einem trockenen Weißwein.",
    whereToBuy:
      "Asia-Laden oder Asia-Regal, ca. 4 € für 500 ml. Günstiger „Ryorishu“ (Kochsake) reicht völlig.",
    substitute:
      "Trockener Weißwein ist ein 1:1-Ersatz. Oder weglassen und 1 EL Wasser mehr nehmen.",
  },
  {
    id: "miso",
    term: "Miso (hell & rot)",
    termJp: "味噌",
    whatIsIt:
      "Fermentierte Sojabohnenpaste — die tiefe Umami-Würze für Suppen, Marinaden und Saucen. Hell (mild, süßlich) und rot (kräftig, salzig).",
    tastesLike:
      "Salzig-herzhaft mit Fermentiertiefe, ein bisschen wie sehr intensive Brühe als Paste.",
    whereToBuy:
      "Asia-Regal oder Asia-Laden, ca. 5 € für 500 g. Im Kühlschrank hält es monatelang.",
    substitute:
      "Hell und rot sind gegenseitig ersetzbar (rot ist stärker, also weniger nehmen). Ohne Miso wird’s schwierig — es ist das Herzstück.",
    compareWith: "Miso vs. Gochujang: Miso ist nicht scharf, Gochujang schon.",
  },
  {
    id: "dashi",
    term: "Dashi",
    termJp: "出汁",
    whatIsIt:
      "Die japanische Grundbrühe — die Umami-Basis unter fast allem. Klassisch aus Kombu (Alge) und Katsuobushi (Bonitoflocken), es gibt sie auch als Pulver.",
    tastesLike:
      "Leicht, klar, herzhaft-„rund“ — der Geschmack, der Misosuppe nach Misosuppe schmecken lässt.",
    whereToBuy:
      "Dashi-Pulver (Marke Hondashi) im Asia-Laden, ca. 4 € — reicht ewig. Für vegan: Kombu-Dashi-Pulver oder einfach Kombu auskochen.",
    substitute:
      "Ein Löffel helles Miso in heißem Wasser gibt eine schnelle, unperfekte Notlösung.",
  },
  {
    id: "kombu",
    term: "Kombu",
    termJp: "昆布",
    whatIsIt:
      "Getrocknete Seetang-Blätter (dick, dunkelgrün) — die pflanzliche Umami-Quelle für Dashi.",
    tastesLike: "Mild-meerig, herzhaft, gar nicht fischig.",
    whereToBuy:
      "Asia-Laden, ca. 6 € für eine Tüte, die monatelang hält. Nie abwaschen — der weiße Belag ist Geschmack.",
    substitute: "Für vegane Brühe kaum ersetzbar; sonst Dashi-Pulver nehmen.",
  },
  {
    id: "katsuobushi",
    term: "Katsuobushi (Bonitoflocken)",
    termJp: "鰹節",
    whatIsIt:
      "Hauchdünne Flocken von getrocknetem, geräuchertem Bonito-Fisch — sie „tanzen“ auf warmem Essen.",
    tastesLike: "Rauchig-herzhaft, konzentriertes Umami, dezent fischig.",
    whereToBuy: "Asia-Laden, ca. 4 € die Tüte. Als Topping und für Dashi.",
    substitute:
      "Für Dashi: Dashi-Pulver. Als Topping schwer zu ersetzen — Furikake gibt eine andere, aber schöne Note.",
  },
  {
    id: "reisessig",
    term: "Reisessig",
    termJp: "米酢",
    whatIsIt:
      "Milder Essig aus Reis — die sanfte Säure für Sushi-Reis, Salate und Dressings.",
    tastesLike:
      "Deutlich milder und süßlicher als Weißweinessig, kaum stechend.",
    whereToBuy: "Asia-Regal, ca. 3 € für 500 ml.",
    substitute:
      "Milder Weißweinessig mit einer Prise Zucker kommt nah dran. Apfelessig nur zur Not.",
  },
  {
    id: "sesamoel",
    term: "Sesamöl (geröstet)",
    termJp: "ごま油",
    whatIsIt:
      "Dunkles Öl aus gerösteten Sesamkörnern — kein Brat-, sondern ein Aroma-Öl. Kommt zum Schluss dazu.",
    tastesLike: "Intensiv nussig, warm, unverkennbar „asiatisch“.",
    whereToBuy:
      "Asia-Regal oder gut sortierter Supermarkt, ca. 5 € für 250 ml. Ein paar Tropfen reichen.",
    substitute:
      "Schwer zu ersetzen. Zur Not neutrales Öl mit ein paar gerösteten Sesamkörnern.",
  },
  {
    id: "panko",
    term: "Panko",
    termJp: "パン粉",
    whatIsIt:
      "Grobe, luftige japanische Semmelbrösel — sie machen Panade extra knusprig und leicht.",
    tastesLike: "Neutral wie Semmelbrösel, aber viel krosser und luftiger.",
    whereToBuy: "Asia-Regal, oft auch bei den Backzutaten, ca. 2 € für 200 g.",
    substitute:
      "Normale Semmelbrösel gehen — die Panade wird etwas feiner und weniger knusprig.",
    compareWith:
      "Panko vs. Semmelbrösel: Panko ist gröber, saugt weniger Fett, bleibt knuspriger.",
  },
  {
    id: "nori",
    term: "Nori",
    termJp: "海苔",
    whatIsIt:
      "Dünne, getrocknete Algenblätter (die Sushi-Hülle) — als Streifen, Topping oder um Onigiri gewickelt.",
    tastesLike: "Dezent meerig, knusprig, mit leichtem Röstaroma.",
    whereToBuy:
      "Supermarkt oder Asia-Laden, ca. 3 € für ~10 Blätter. Trocken lagern, sonst wird’s labberig.",
    substitute:
      "Kaum ersetzbar, aber gut lagerbar — leg dir einfach eine Packung hin.",
  },
  {
    id: "wakame",
    term: "Wakame",
    termJp: "わかめ",
    whatIsIt:
      "Getrocknete Algen, die in Wasser in Sekunden zu zarten grünen Blättchen aufquellen — der Klassiker in der Misosuppe.",
    tastesLike: "Mild, leicht meerig, angenehm rutschig.",
    whereToBuy:
      "Asia-Laden, ca. 3 € für eine Tüte, die ewig hält (quillt stark, also sparsam).",
    substitute:
      "Nichts kommt wirklich ran; im Notfall die Suppe einfach ohne machen.",
  },
  {
    id: "furikake",
    term: "Furikake",
    termJp: "ふりかけ",
    whatIsIt:
      "Fertige Streuwürze für Reis — meist Sesam, Nori-Stückchen, Salz und manchmal getrockneter Fisch.",
    tastesLike: "Nussig-salzig-meerig, macht schlichten Reis sofort spannend.",
    whereToBuy:
      "Asia-Laden im Streuer, ca. 3 €. Es gibt viele Sorten — einfach eine nehmen, die dich anlacht.",
    substitute:
      "Selbst mischen: gerösteter Sesam + zerkrümeltes Nori + Prise Salz.",
  },
  {
    id: "kewpie-mayo",
    term: "Kewpie-Mayo",
    termJp: "キユーピー",
    whatIsIt:
      "Japanische Mayonnaise in der roten Netz-Flasche — cremiger und würziger als deutsche Mayo.",
    tastesLike:
      "Reicher, leicht süßlich-säuerlich, mit mehr Umami (durch Reisessig und nur Eigelb).",
    whereToBuy: "Asia-Laden oder Asia-Regal, ca. 4 € die Quetschflasche.",
    substitute:
      "Normale Mayo + Prise Zucker + Schuss Reisessig kommt nah dran.",
  },
  {
    id: "curry-roux",
    term: "Curry-Roux",
    termJp: "カレールー",
    whatIsIt:
      "Feste Würzblöcke fürs japanische Curry — Gewürze, Fett und Bindung in einem. Einfach in Wasser auflösen.",
    tastesLike:
      "Mild-würzig, leicht süßlich, sämig — Kindheits-Curry, nicht scharf-indisch.",
    whereToBuy:
      "Asia-Laden (Marken S&B „Golden Curry“ oder House „Vermont“), ca. 3–4 € pro Block für viele Portionen.",
    substitute:
      "Schwer nachzubauen — der Block ist der ganze Trick. Dafür hält er ewig.",
  },
  {
    id: "gochujang",
    term: "Gochujang",
    termJp: "コチュジャン",
    whatIsIt:
      "Koreanische fermentierte Chilipaste (dickflüssig, tiefrot) — süß, salzig und scharf zugleich.",
    tastesLike: "Wie eine Mischung aus Chili, Miso und einem Hauch Karamell.",
    whereToBuy:
      "Asia-Laden im roten Becher, ca. 4 € für 500 g. Hält im Kühlschrank ewig.",
    substitute: "Rotes Miso + Chili + Prise Zucker als grobe Notlösung.",
    compareWith:
      "Gochujang vs. Miso: Gochujang ist scharf und süßer, Miso ist mild und nur salzig-herzhaft.",
  },
  {
    id: "sriracha",
    term: "Sriracha",
    termJp: "シラチャー",
    whatIsIt:
      "Scharfe Chilisauce mit Knoblauch (die Flasche mit dem Hahn) — dünnflüssig, für Schärfe zum Schluss.",
    tastesLike: "Scharf, knoblauchig, leicht süß-säuerlich.",
    whereToBuy: "Mittlerweile in fast jedem Supermarkt, ca. 3 €.",
    substitute:
      "Jede scharfe Chilisauce oder etwas Sambal Oelek + Prise Zucker.",
  },
  {
    id: "shichimi",
    term: "Shichimi Togarashi",
    termJp: "七味唐辛子",
    whatIsIt:
      "„Sieben-Gewürze-Chili“ — eine streubare Mischung aus Chili, Sesam, Nori, Orangenschale u. a.",
    tastesLike:
      "Mild scharf mit Zitrus- und Sesamnoten, mehr aromatisch als brennend.",
    whereToBuy: "Asia-Laden im kleinen Streuer, ca. 3 €.",
    substitute: "Chiliflocken + etwas Sesam geben eine simple Annäherung.",
  },
  {
    id: "tonkatsu-sauce",
    term: "Tonkatsu- & Okonomiyaki-Sauce",
    termJp: "とんかつソース",
    whatIsIt:
      "Dickflüssige, dunkle süß-würzige Sauce (wie eine japanische BBQ-/Worcester-Sauce). Okonomiyaki-Sauce ist die etwas süßere Schwester.",
    tastesLike:
      "Süß-fruchtig-umami, ein bisschen wie milde Worcester- mit Ketchup-Note.",
    whereToBuy: "Asia-Laden, ca. 4 € die Flasche.",
    substitute:
      "Ketchup + Worcestersauce + Prise Zucker zu gleichen Teilen kommt erstaunlich nah.",
  },
  {
    id: "japanische-nudeln",
    term: "Udon, Soba, Somen & Ramen",
    termJp: "麺",
    whatIsIt:
      "Die vier Alltagsnudeln: Udon (dick, weich), Soba (dünn, aus Buchweizen, nussig), Somen (sehr dünn) und Ramen (gewellt, aus Weizen).",
    tastesLike:
      "Udon mild und bissig, Soba erdig-nussig, Somen zart, Ramen federnd — alle neutral genug für jede Sauce.",
    whereToBuy:
      "Asia-Laden: vorgekochte Udon (Vakuum, ~1 €/Portion) sind am schnellsten; Soba/Somen trocken; Instant-Ramen fast überall.",
    substitute:
      "Untereinander tauschbar. Zur Not tun es auch Spaghetti oder Mie-Nudeln.",
  },
  {
    id: "doubanjiang",
    term: "Doubanjiang (Tobanjan)",
    termJp: "豆板醤",
    whatIsIt:
      "Scharf-salzige fermentierte Bohnenpaste mit Chili — das Rückgrat von Mapo Tofu.",
    tastesLike:
      "Salzig, scharf und tief fermentiert, weniger süß als Gochujang.",
    whereToBuy: "Asia-Laden im Glas, ca. 4 €. Hält im Kühlschrank sehr lange.",
    substitute: "Gochujang (süßer) oder rotes Miso + Chili als Notlösung.",
    compareWith:
      "Doubanjiang vs. Gochujang: Doubanjiang ist salzig-scharf, Gochujang süßer und milder.",
  },
  {
    id: "umeboshi",
    term: "Umeboshi",
    termJp: "梅干し",
    whatIsIt:
      "In Salz eingelegte, getrocknete japanische Aprikose („Sauerpflaume“) — knallig sauer-salzig, oft als Onigiri-Füllung.",
    tastesLike:
      "Extrem sauer und salzig, weckt sofort den Appetit — ein winziges Stück reicht.",
    whereToBuy:
      "Asia-Laden im Glas, ca. 5 €. Auch als Paste (Umeboshi-Paste) erhältlich.",
    substitute:
      "Schwer zu ersetzen; die Füllung sonst mit etwas Frischkäse + Zitrone abwandeln.",
  },
];
