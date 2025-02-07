import MagneticCard from "@/registry/default/ui/magnetic-card";

export default function MagneticCardDemo() {
  return (
    <div className="flex flex-wrap gap-8 items-center justify-center p-8 z-30">
      <MagneticCard
        className="w-72 h-44 p-6 flex flex-col items-center justify-center gap-2 bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-purple-200 dark:border-white/20 shadow-xl shadow-purple-500/5"
        showMagneticField={true}
        magneticStrength={0.4}
      >
        <div className="text-4xl">✨</div>
        <p className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400">
          Glass Effect
        </p>
      </MagneticCard>

      <MagneticCard
        className="w-72 h-44 p-6 flex flex-col items-center justify-center gap-3 border-2 border-purple-500/30 dark:border-purple-400/30 bg-white/50 dark:bg-background/50 shadow-xl shadow-purple-500/5"
        showMagneticField={true}
        magneticStrength={0.3}
        rotationStrength={20}
      >
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400 flex items-center justify-center">
          <span className="text-2xl text-white">🎨</span>
        </div>
        <p className="text-lg font-medium text-purple-950 dark:text-purple-100">
          Outline Style
        </p>
      </MagneticCard>

      <MagneticCard
        className="w-72 h-44 p-6 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 text-white shadow-xl shadow-purple-500/10"
        showMagneticField={true}
        fieldColor="rgba(236, 72, 153, 0.15)"
        darkFieldColor="rgba(236, 72, 153, 0.25)"
        scaleOnHover={1.15}
      >
        <div className="text-3xl">🚀</div>
        <p className="text-lg font-medium">Gradient Style</p>
        <p className="text-sm opacity-80">Hover to explore</p>
      </MagneticCard>

      <MagneticCard
        className="w-72 h-44 overflow-hidden group bg-white dark:bg-card shadow-xl shadow-purple-500/5"
        showMagneticField={true}
        magneticStrength={0.5}
        rotationStrength={12}
      >
        <div className="h-full w-full p-6 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_var(--tw-gradient-to)_100%)] from-purple-500/5 to-transparent dark:from-purple-400/20">
          <div className="flex flex-col items-center gap-2">
            <div className="text-2xl transition-transform group-hover:scale-110 duration-300">
              💫
            </div>
            <p className="text-lg font-medium text-purple-950 dark:text-purple-100">
              Interactive
            </p>
            <div className="flex gap-2 mt-1">
              <span className="px-2 py-0.5 rounded-full text-xs bg-purple-100 dark:bg-purple-400/20 text-purple-700 dark:text-purple-300">
                Magnetic
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs bg-pink-100 dark:bg-pink-400/20 text-pink-700 dark:text-pink-300">
                3D
              </span>
            </div>
          </div>
        </div>
      </MagneticCard>
    </div>
  );
}
