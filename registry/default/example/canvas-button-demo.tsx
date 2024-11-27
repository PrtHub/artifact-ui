"use client";

import * as React from "react";
import { CanvasButton } from "@/registry/default/ui-canvas/canvas-button";

export default function CanvasButtonDemo() {
  return (
    <div className="flex flex-col items-center gap-8 rounded-lg bg-background p-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="flex flex-col items-center gap-4">
          <h3 className="mb-2 text-lg font-semibold">Watercolor Style</h3>
          <CanvasButton variant="watercolor" effect="splash">
            Click Me
          </CanvasButton>
          <CanvasButton variant="watercolor" effect="brush" size="lg">
            Hover Me
          </CanvasButton>
          <CanvasButton variant="watercolor" size="sm">
            Small Button
          </CanvasButton>
        </div>

        <div className="flex flex-col items-center gap-4">
          <h3 className="mb-2 text-lg font-semibold">Oil Paint Style</h3>
          <CanvasButton variant="oil" effect="splash">
            Click Me
          </CanvasButton>
          <CanvasButton variant="oil" effect="brush" size="lg">
            Hover Me
          </CanvasButton>
          <CanvasButton variant="oil" size="sm">
            Small Button
          </CanvasButton>
        </div>

        <div className="flex flex-col items-center gap-4">
          <h3 className="mb-2 text-lg font-semibold">Charcoal Style</h3>
          <CanvasButton variant="charcoal" effect="splash">
            Click Me
          </CanvasButton>
          <CanvasButton variant="charcoal" effect="brush" size="lg">
            Hover Me
          </CanvasButton>
          <CanvasButton variant="charcoal" size="sm">
            Small Button
          </CanvasButton>
        </div>
      </div>

      <div className="w-full max-w-md space-y-4 text-center">
        <h3 className="text-lg font-semibold">Interactive Effects</h3>
        <p className="text-sm text-gray-600">
          Click buttons with splash effect to see paint splatter animation.
          Hover over brush effect buttons to see paintbrush stroke animation.
        </p>
      </div>
    </div>
  );
}
