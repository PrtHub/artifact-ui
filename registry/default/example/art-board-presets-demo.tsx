import ArtBoardPresets from "@/registry/default/ui-canvas/art-board-presets";

export default function ArtBoardPresetsDemo() {
  return (
    <div className="z-20 flex min-h-[600px] items-center justify-center bg-slate-50 p-4 dark:bg-black">
      <ArtBoardPresets
        onSelectPreset={(width, height) => {
          console.log(`Selected size: ${width}×${height}`);
        }}
      />
    </div>
  );
}
