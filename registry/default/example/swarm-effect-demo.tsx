import SwarmEffect from "@/registry/default/ui/swarm-effect";

export default function SwarmEffectDemo() {
  return (
    <div className="flex flex-col items-center gap-8">
      <SwarmEffect
        src="/placeholder.svg"
        particleSize={2}
        particleSpacing={4}
        particleColor="hsl(210, 100%, 60%)"
        displacementRadius={50}
        hoverEffect="scatter"
        className="h-[400px] w-full"
      />

      <SwarmEffect
        src="/placeholder-dark.svg"
        particleSize={1.5}
        particleSpacing={3}
        particleColor="hsl(330, 100%, 50%)"
        displacementRadius={40}
        hoverEffect="gather"
        className="h-[400px] w-full"
      />

      <SwarmEffect
        src="/placeholder-dark.svg"
        particleSize={2.5}
        particleSpacing={5}
        particleColor="hsl(160, 100%, 45%)"
        displacementRadius={40}
        hoverEffect="scatter"
        className="h-[400px] w-full"
      />
    </div>
  );
}
