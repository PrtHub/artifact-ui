import {
  Activity,
  Users,
  DollarSign,
  TrendingUp,
  Zap,
  Target,
} from "lucide-react";
import ArtisticStatisticsCard from "@/registry/default/xanthic/artistic-statistics-card";

export default function ArtisticStatisticsCardDemo() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <ArtisticStatisticsCard
        title="Total Revenue"
        value="$2.4M"
        description="Monthly recurring revenue"
        icon={<DollarSign />}
        variant="gradient"
        animation="float"
        trend={12.5}
      />
      <ArtisticStatisticsCard
        title="Active Users"
        value="14,532"
        description="Real-time platform users"
        icon={<Users />}
        variant="glass"
        animation="glow"
        trend={8.2}
      />
      <ArtisticStatisticsCard
        title="Conversion Rate"
        value="3.8%"
        description="From total visitors"
        icon={<Target />}
        variant="neon"
        animation="float"
        trend={-2.4}
      />
      <ArtisticStatisticsCard
        title="Energy Usage"
        value="284 kWh"
        description="Average daily consumption"
        icon={<Zap />}
        variant="outline"
        animation="glow"
        trend={-5.7}
      />
      <ArtisticStatisticsCard
        title="System Load"
        value="67%"
        description="Average CPU utilization"
        icon={<Activity />}
        variant="default"
        animation="none"
        trend={4.3}
      />
      <ArtisticStatisticsCard
        title="Growth Rate"
        value="+27%"
        description="Year over year growth"
        icon={<TrendingUp />}
        variant="glass"
        animation="float"
        trend={27}
      />
    </div>
  );
}
