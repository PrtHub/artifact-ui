"use client";

import * as React from "react";
import { ColorPalette } from "@/registry/default/ui-canvas/color-palette";

export default function ColorPaletteDemo() {
  return (
    <div className="grid grid-cols-2 gap-20">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Watercolor Palette</h3>
        <ColorPalette variant="watercolor" />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Oil Paint Palette</h3>
        <ColorPalette variant="oilpaint" />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Charcoal Palette</h3>
        <ColorPalette variant="charcoal" />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Pastel Palette</h3>
        <ColorPalette variant="pastel" />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Acrylic Palette</h3>
        <ColorPalette variant="acrylic" />
      </div>
    </div>
  );
}
