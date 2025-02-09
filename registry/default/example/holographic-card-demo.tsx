import HolographicCard from "@/registry/default/ui/holographic-card";

export default function HolographicCardDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <HolographicCard
        className="group relative flex h-52 w-96 flex-col justify-end overflow-hidden p-8 transition-all hover:scale-[1.02]"
        backgroundColor="rgba(0, 10, 30, 0.85)"
        darkBackgroundColor="rgba(0, 8, 20, 0.9)"
        depthEffect={true}
        glowIntensity={1.2}
        scanlineEffect={true}
        prismaticEffect={true}
        refractionPattern="diamond"
        rotationFactor={15}
        shadowColor="rgba(16, 185, 129, 0.25)"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.12),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(45,212,191,0.12),transparent_50%)]" />
          <div className="bg-grid-white/[0.02] absolute inset-0 bg-[size:20px_20px]" />
        </div>
        <div className="relative space-y-4">
          <div className="space-y-1">
            <h3 className="bg-gradient-to-r from-emerald-200 via-teal-200 to-emerald-200 bg-clip-text text-xl font-semibold text-transparent">
              Holographic Card
            </h3>
            <p className="max-w-md text-sm leading-relaxed text-emerald-200/60">
              A holographic card with advanced 3D effects, prismatic
              reflections, and dynamic patterns that respond to movement.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-300">
              3D Effect
            </span>
            <span className="inline-flex items-center rounded-full border border-teal-500/20 bg-teal-500/10 px-2.5 py-0.5 text-xs font-medium text-teal-300">
              Prismatic
            </span>
            <span className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-300">
              Interactive
            </span>
          </div>
        </div>
      </HolographicCard>
    </div>
  );
}
