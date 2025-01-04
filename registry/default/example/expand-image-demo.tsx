import ExpandImage from "@/registry/default/ui/expand-image";

export default function ExpandImageDemo() {
  return (
    <div className="h-full min-h-[600px] w-full ">
      <div className="relative mt-10 flex items-center justify-center font-mono">
        <ExpandImage
          shadowColor="#0f172a"
          hoverShadowColor="#3b82f6"
          shadowIntensity="medium"
        />
      </div>
    </div>
  );
}
