import ParticleBackground from "@/registry/default/ui-canvas/particle-background";

export default function ParticleNetworkBackgroundDemo() {
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="relative h-[600px] w-full overflow-hidden rounded-lg border bg-slate-950">
        <ParticleBackground
          particleCount={70}
          particleSize={2}
          particleColor="#F472B6"
          lineColor="rgba(244, 114, 182, 0.15)"
          maxDistance={100}
          speed={0.5}
          interactive={false}
        />
        <div className="relative z-10 flex h-full flex-col items-center justify-center p-10 text-center">
          <h2 className="mb-4 text-4xl font-bold text-white">
            Particle Background
          </h2>
          <p className="text-lg text-pink-200">
            A particle network background for your hero sections
          </p>
        </div>
      </div>
    </div>
  );
}
