import { GradientMeshBackground } from "@/registry/default/ui-canvas/gradient-mesh-background";

export default function GradientMeshBackgroundDemo() {
  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
      <GradientMeshBackground className="absolute inset-0" />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-[60] flex h-full items-center justify-center p-6">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-white drop-shadow-lg">
            Modern Gradient Mesh
          </h1>
          <p className="text-white drop-shadow-md">
            A beautiful, animated background for your hero sections
          </p>
        </div>
      </div>
    </div>
  );
}
