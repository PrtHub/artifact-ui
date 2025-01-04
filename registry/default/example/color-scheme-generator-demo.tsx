"use client";

import { ToastProvider } from "@/hooks/use-toast";
import { ColorSchemeGenerator } from "@/registry/default/ui/color-scheme-generator";

export default function ColorSchemeGeneratorDemo() {
  return (
    <ToastProvider>
      <div className="w-full">
        <ColorSchemeGenerator />
      </div>
    </ToastProvider>
  );
}
