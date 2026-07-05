import type { IconProps } from "@/components/ui/icons";
import type { Equipment as EquipmentId } from "@/content/schema";
import {
  IconBlender,
  IconBowl,
  IconGrater,
  IconKettle,
  IconKnife,
  IconOven,
  IconPan,
  IconPot,
  IconRiceCooker,
  IconSaucepan,
  IconSieve,
} from "@/components/ui/icons";

/** German label + icon for every Equipment value (docs/04 §1). */
export const EQUIPMENT_META: Record<
  EquipmentId,
  { label: string; Icon: (p: IconProps) => React.ReactElement }
> = {
  pfanne: { label: "Pfanne", Icon: IconPan },
  topf: { label: "Topf", Icon: IconPot },
  "kleiner-topf": { label: "Kleiner Topf", Icon: IconSaucepan },
  "reiskocher-oder-topf": {
    label: "Reiskocher oder Topf",
    Icon: IconRiceCooker,
  },
  ofen: { label: "Ofen", Icon: IconOven },
  schneidebrett: { label: "Schneidebrett", Icon: IconKnife },
  schuessel: { label: "Schüssel", Icon: IconBowl },
  sieb: { label: "Sieb", Icon: IconSieve },
  reibe: { label: "Reibe", Icon: IconGrater },
  stabmixer: { label: "Stabmixer", Icon: IconBlender },
  wasserkocher: { label: "Wasserkocher", Icon: IconKettle },
};
