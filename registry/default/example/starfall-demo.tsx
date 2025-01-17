import Starfall from "@/registry/default/ui/starfall";
import Image from "next/image";

export default function StarfallDemo() {
  return (
    <div className="w-full space-y-12">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Hero Section</h3>
        <div className="relative h-[500px] overflow-hidden rounded-lg">
          <Starfall
            className="absolute inset-0"
            variant="cosmic"
            count={25}
            speed={1.5}
          />
          <div className="relative flex h-full flex-col items-center justify-center space-y-6 text-center">
            <h1 className="max-w-3xl bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-6xl font-bold tracking-tight text-transparent">
              Build Beautiful Websites
            </h1>
            <p className="max-w-xl text-lg text-white/70">
              Create stunning web experiences with our modern UI components
            </p>
            <button className="rounded-full bg-white/10 px-8 py-3 font-medium text-white backdrop-blur-sm transition hover:bg-white/20">
              Get Started
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Feature Cards</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="group relative overflow-hidden rounded-lg">
            <Starfall
              className="h-[300px]"
              variant="aurora"
              count={15}
              speed={1}
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-6">
              <h3 className="font-semibold text-emerald-300">Aurora Theme</h3>
              <p className="mt-2 text-sm text-white/70">
                Ethereal northern lights effect
              </p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-lg">
            <Starfall
              className="h-[300px]"
              variant="ocean"
              count={18}
              speed={0.8}
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-6">
              <h3 className="font-semibold text-blue-300">Ocean Depths</h3>
              <p className="mt-2 text-sm text-white/70">
                Deep sea bioluminescence
              </p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-lg">
            <Starfall
              className="h-[300px]"
              variant="sunset"
              count={12}
              speed={1.2}
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-6">
              <h3 className="font-semibold text-orange-300">Sunset Glow</h3>
              <p className="mt-2 text-sm text-white/70">
                Warm evening atmosphere
              </p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-lg">
            <Starfall
              className="h-[300px]"
              variant="forest"
              count={15}
              speed={1}
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-6">
              <h3 className="font-semibold text-emerald-300">Forest Magic</h3>
              <p className="mt-2 text-sm text-white/70">
                Mystical woodland lights
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Background Sections</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-lg">
            <div className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&w=1000&q=80"
                alt="Galaxy background"
                fill
                className="h-full w-full object-cover"
              />
            </div>
            <Starfall
              className="h-[250px]"
              variant="minimal"
              count={20}
              speed={1}
              showBackground={false}
              backgroundOpacity={0.2}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 p-6 text-center">
              <p className="text-lg font-medium text-white/90">
                Custom Background with Image
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg">
            <Starfall
              className="h-[250px]"
              variant="gradient"
              count={15}
              speed={1.2}
              backgroundStars={50}
              backgroundOpacity={0.4}
            />
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
              <p className="text-lg font-medium text-white/90">
                Enhanced Background
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
