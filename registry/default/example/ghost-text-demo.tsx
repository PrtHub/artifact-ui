import GhostText from "@/registry/default/ui/ghost-text";

export default function GhostTextDemo() {
  return (
    <div className="space-y-8">
      <div className="relative flex min-h-[200px] items-center justify-center">
        <GhostText
          text="Creativity blooms in the digital garden"
          duration={10}
          wordDelay={0.1}
          blurRadius={100}
          fontSize={300}
          sequential={true}
        />
      </div>
    </div>
  );
}
