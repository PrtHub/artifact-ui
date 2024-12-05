"use client";

import { ToastProvider } from "@/hooks/use-toast";
import { ColorSchemeGenerator } from "@/registry/default/ui-canvas/color-scheme-generator";

export default function ColorSchemeGeneratorDemo() {
  return (
    <ToastProvider>
      <div className="w-full max-w-3xl">
        <ColorSchemeGenerator />
      </div>
    </ToastProvider>
  );
}
