import {
  Building2,
  Dumbbell,
  Layers,
  MonitorSmartphone,
  Compass,
  Package,
  Users,
  Cpu,
  Workflow,
  ChartColumn,
  ShieldCheck,
  ClipboardList,
  Headset,
  Wrench,
  Target,
  TrendingUp,
  CalendarCheck,
  ScanFace,
  Ruler,
  Search,
  type LucideProps,
} from "lucide-react";
import type { IconName } from "@/data/business";

const map: Record<IconName, React.ComponentType<LucideProps>> = {
  building: Building2,
  dumbbell: Dumbbell,
  layers: Layers,
  platform: MonitorSmartphone,
  compass: Compass,
  package: Package,
  users: Users,
  cpu: Cpu,
  workflow: Workflow,
  chart: ChartColumn,
  shield: ShieldCheck,
  clipboard: ClipboardList,
  headset: Headset,
  wrench: Wrench,
  target: Target,
  trending: TrendingUp,
  calendar: CalendarCheck,
  scan: ScanFace,
  ruler: Ruler,
  search: Search,
};

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Cmp = map[name];
  return <Cmp aria-hidden strokeWidth={1.5} {...props} />;
}
