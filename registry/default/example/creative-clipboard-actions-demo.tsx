"use client";

import React from "react";
import CreativeClipboardActions from "../ui/creative-clipboard-actions";

export default function CreativeClipboardActionsDemo() {
  const variants = ["default", "minimal", "floating", "gradient", "outline"];
  const sizes = ["sm", "md", "lg"];

  return (
    <div className="z-30 flex flex-col gap-8 p-4">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Variants</h3>
        <div className="flex flex-wrap gap-4">
          {variants.map((variant) => (
            <div key={variant} className="flex flex-col items-center gap-2">
              <CreativeClipboardActions
                text="https://example.com"
                variant={variant as any}
                showLink
              />
              <span className="text-sm text-muted-foreground">{variant}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Sizes</h3>
        <div className="flex flex-wrap gap-4">
          {sizes.map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <CreativeClipboardActions text="Copy me!" size={size as any} />
              <span className="text-sm text-muted-foreground">{size}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Interactive Examples</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 rounded-lg border bg-card p-4">
            <span className="text-sm">https://ui-canvas.dev</span>
            <CreativeClipboardActions
              text="https://ui-canvas.dev"
              variant="minimal"
              showLink
            />
          </div>

          <div className="flex items-center gap-2 rounded-lg border bg-card p-4">
            <span className="text-sm">npm install ui-canvas</span>
            <CreativeClipboardActions
              text="npm install ui-canvas"
              variant="floating"
            />
          </div>

          <div className="flex items-center gap-2 rounded-lg border bg-card p-4">
            <span className="text-sm">API Key: ****</span>
            <CreativeClipboardActions
              text="sk_test_123456789"
              variant="gradient"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
