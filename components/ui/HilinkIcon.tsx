import {
  Users,
  ScanFace,
  CalendarCheck,
  Music,
  LandPlot,
  Armchair,
  KeyRound,
  CreditCard,
  Receipt,
  ChartColumn,
  Megaphone,
  BellRing,
  DoorOpen,
  Shuffle,
  LayoutDashboard,
  type LucideProps,
} from "lucide-react";
import type { HilinkFeatureIcon } from "@/data/hilink";

const map: Record<HilinkFeatureIcon, React.ComponentType<LucideProps>> = {
  members: Users,
  face: ScanFace,
  calendar: CalendarCheck,
  gx: Music,
  golf: LandPlot,
  seat: Armchair,
  locker: KeyRound,
  payment: CreditCard,
  revenue: Receipt,
  stats: ChartColumn,
  notice: Megaphone,
  push: BellRing,
  rental: DoorOpen,
  lottery: Shuffle,
  dashboard: LayoutDashboard,
};

export function HilinkIcon({ name, ...props }: { name: HilinkFeatureIcon } & LucideProps) {
  const Cmp = map[name];
  return <Cmp aria-hidden strokeWidth={1.5} {...props} />;
}
