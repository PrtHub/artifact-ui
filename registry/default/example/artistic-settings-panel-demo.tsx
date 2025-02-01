import React from "react";
import ArtisticSettingsPanel from "@/registry/default/ui/artistic-settings-panel";

export default function ArtisticSettingsPanelDemo() {
  const handleSettingsChange = (settings: any) => {
    console.log("Settings changed:", settings);
  };

  return (
    <div className="relative z-30 min-h-[400px] w-full rounded-lg border p-8">
      <div className="absolute inset-0 bg-[url('/demo-bg.jpg')] bg-cover bg-center opacity-50" />
      <div className="relative">
        <h2 className="mb-4 text-2xl font-bold">Interactive Demo</h2>
        <p className="text-muted-foreground">
          Click the settings icon in the top-right corner to customize the
          artistic settings. Try adjusting brightness, contrast, and other
          effects.
        </p>
      </div>
      <ArtisticSettingsPanel
        defaultOpen={true}
        onSettingsChange={handleSettingsChange}
      />
    </div>
  );
}
