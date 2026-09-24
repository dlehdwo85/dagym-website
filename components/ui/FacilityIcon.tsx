import {
  Dumbbell,
  LandPlot,
  Music,
  PersonStanding,
  Waves,
  ThermometerSun,
  BookOpen,
  Library,
  BedDouble,
  Baby,
  Coffee,
  Sofa,
  Laptop,
  Theater,
  type LucideProps,
} from "lucide-react";
import type { FacilityIcon as Key } from "@/data/facilities";

const map: Record<Key, React.ComponentType<LucideProps>> = {
  fitness: Dumbbell,
  golf: LandPlot,
  gx: Music,
  pilates: PersonStanding,
  swimming: Waves,
  sauna: ThermometerSun,
  study: BookOpen,
  library: Library,
  guesthouse: BedDouble,
  kids: Baby,
  cafe: Coffee,
  lounge: Sofa,
  office: Laptop,
  culture: Theater,
};

export function FacilityIcon({ name, ...props }: { name: Key } & LucideProps) {
  const Cmp = map[name];
  return <Cmp aria-hidden strokeWidth={1.5} {...props} />;
}
