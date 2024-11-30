import { useState, useEffect } from "react";
import BrushStrokeLoader from "@/registry/default/ui-canvas/brush-stroke-loader";

export default function BrushStrokeLoaderDemo() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 p-4">
      {/* Paint style */}
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Paint Style</p>
        <BrushStrokeLoader progress={progress} strokeStyle="paint" />
      </div>

      {/* Ink style */}
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Ink Style</p>
        <BrushStrokeLoader progress={progress} strokeStyle="ink" />
      </div>

      {/* Watercolor style */}
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Watercolor Style</p>
        <BrushStrokeLoader progress={progress} strokeStyle="watercolor" />
      </div>

      {/* Different sizes */}
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Different Sizes</p>
        <div className="space-y-4">
          <BrushStrokeLoader progress={progress} size="sm" />
          <BrushStrokeLoader progress={progress} size="md" />
          <BrushStrokeLoader progress={progress} size="lg" />
        </div>
      </div>

      {/* Single color */}
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Single Color</p>
        <BrushStrokeLoader progress={progress} colorFlow={false} />
      </div>
    </div>
  );
}
