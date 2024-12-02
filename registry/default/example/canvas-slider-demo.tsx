import { CanvasSlider } from "@/registry/default/ui-canvas/canvas-slider";

export default function CanvasSliderDemo() {
  return (
    <div className="w-full max-w-xl space-y-6">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Default Style</h3>
        <CanvasSlider
          defaultValue={[50]}
          max={100}
          step={1}
          variant="default"
          primaryColor="#000000"
          secondaryColor="#666666"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Neon Style</h3>
        <CanvasSlider
          defaultValue={[60]}
          max={100}
          step={1}
          variant="neon"
          primaryColor="#FF0080"
          secondaryColor="#7928CA"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Glass Style</h3>
        <CanvasSlider
          defaultValue={[40]}
          max={100}
          step={1}
          variant="glass"
          primaryColor="#0EA5E9"
          secondaryColor="#6366F1"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Metallic Style</h3>
        <CanvasSlider
          defaultValue={[70]}
          max={100}
          step={1}
          variant="metallic"
          primaryColor="#94A3B8"
          secondaryColor="#E2E8F0"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Gradient Style</h3>
        <CanvasSlider
          defaultValue={[30]}
          max={100}
          step={1}
          variant="gradient"
          primaryColor="#F97316"
          secondaryColor="#FBBF24"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Watercolor Style</h3>
        <CanvasSlider defaultValue={[50]} max={100} step={1} />
        <CanvasSlider
          defaultValue={[30]}
          max={100}
          step={1}
          primaryColor="#EC4899"
          secondaryColor="#8B5CF6"
        />
      </div>
    </div>
  );
}
