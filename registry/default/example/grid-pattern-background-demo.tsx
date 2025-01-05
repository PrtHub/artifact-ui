import GridPatternBackground from "@/registry/default/ui/grid-pattern-background";

export default function GridPatternBackgroundDemo() {
  return (
    <div className="z-30 flex w-full flex-col gap-4 dark:bg-black">
      <div className="relative h-[600px] rounded-lg bg-gradient-to-br from-violet-500/20 to-purple-500/20">
        <GridPatternBackground
          gridType="dots"
          gridSize={24}
          opacity={0.6}
          color="#6d28d9"
          animate={true}
        />
        <div className="absolute inset-0 flex items-center justify-center text-3xl font-medium text-violet-900">
          Animated Dot Grid Pattern
        </div>
      </div>

      <div className="relative h-[600px] rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
        <GridPatternBackground
          gridType="lines"
          gridSize={32}
          opacity={0.4}
          color="#0369a1"
        />
        <div className="absolute inset-0 flex items-center justify-center text-3xl font-medium text-blue-900">
          Line Grid Pattern
        </div>
      </div>
    </div>
  );
}
