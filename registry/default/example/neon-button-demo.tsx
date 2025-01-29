import { NeonButton } from "@/registry/default/ui/neon-button";

export default function NeonButtonDemo() {
  return (
    <div className="z-30 m-0 flex min-h-[600px] w-full flex-col items-center justify-center gap-8">
      <NeonButton
        backgroundColor="#0c002b"
        textColor="#1670f0"
        borderStartColor="rgba(22, 112, 240, 0.1)"
        borderEndColor="rgba(22, 112, 240, 0.7)"
      >
        Button 1
      </NeonButton>
      <NeonButton
        backgroundColor="#1a0b2e"
        textColor="#ff00ff"
        borderStartColor="rgba(255, 0, 255, 0.1)"
        borderEndColor="rgba(0, 255, 255, 0.7)"
      >
        Button 2
      </NeonButton>
    </div>
  );
}
