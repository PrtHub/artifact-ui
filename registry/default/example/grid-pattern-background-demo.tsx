import GridPatternBackground from "@/registry/default/ui/grid-pattern-background";

export default function GridPatternBackgroundDemo() {
  return (
    <div className="z-30 flex w-full flex-col gap-4 bg-white dark:bg-black">
      <div className="relative h-[400px] rounded-lg bg-gradient-to-br from-violet-500/20 to-purple-500/20 dark:from-violet-500/10 dark:to-purple-500/10">
        <GridPatternBackground
          gridType="dots"
          gridSize={24}
          opacity={0.6}
          color="#6d28d9"
          animate={true}
          className="dark:opacity-80"
        />
        <div className="absolute inset-0 flex items-center justify-center text-3xl font-medium text-violet-900 dark:text-violet-200">
          Animated Dot Grid Pattern
        </div>
      </div>

      <div className="relative h-[400px] rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 dark:from-blue-500/10 dark:to-cyan-500/10">
        <GridPatternBackground
          gridType="lines"
          gridSize={32}
          opacity={0.5}
          color="#0369a1"
          animate={false}
          className="dark:opacity-80"
        />
        <div className="absolute inset-0 flex items-center justify-center text-3xl font-medium text-blue-900 dark:text-blue-200">
          Line Grid Pattern
        </div>
      </div>

      <div className="relative h-[400px] rounded-lg bg-gradient-to-br from-indigo-500/20 to-sky-500/20 dark:from-indigo-500/10 dark:to-sky-500/10">
        <GridPatternBackground
          gridType="squares"
          gridSize={28}
          opacity={0.5}
          color="#4f46e5"
          animate={false}
          className="dark:opacity-80"
        />
        <div className="absolute inset-0 flex items-center justify-center text-3xl font-medium text-indigo-900 dark:text-indigo-200">
          Square Grid Pattern
        </div>
      </div>

      <div className="relative h-[400px] rounded-lg bg-gradient-to-br from-rose-500/20 to-pink-500/20 dark:from-rose-500/10 dark:to-pink-500/10">
        <GridPatternBackground
          gridType="crosshatch"
          gridSize={30}
          opacity={0.4}
          color="#be185d"
          animate={true}
          className="dark:opacity-80"
        />
        <div className="absolute inset-0 flex items-center justify-center text-3xl font-medium text-rose-900 dark:text-rose-200">
          Animated Crosshatch Pattern
        </div>
      </div>

      <div className="relative h-[400px] rounded-lg bg-gradient-to-br from-teal-500/20 to-emerald-500/20 dark:from-teal-500/10 dark:to-emerald-500/10">
        <GridPatternBackground
          gridType="diamonds"
          gridSize={36}
          opacity={0.5}
          color="#0d9488"
          animate={false}
          className="dark:opacity-80"
        />
        <div className="absolute inset-0 flex items-center justify-center text-3xl font-medium text-teal-900 dark:text-teal-200">
          Diamond Grid Pattern
        </div>
      </div>
    </div>
  );
}
