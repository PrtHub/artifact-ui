import CircuitPulse from "@/registry/default/ui/circuit-pulse";

export default function CircuitPulseDemo() {
  return (
    <div className="relative z-30 grid min-h-screen grid-cols-1 gap-8 overflow-hidden bg-gradient-to-b from-background via-background to-black/50 p-8">
      <div className="relative flex min-h-[400px] items-center justify-center">
        <CircuitPulse color="#4545ff" />
      </div>
    </div>
  );
}
