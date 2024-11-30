"use client";

import { ArtBoardLayout } from "@/registry/default/ui-canvas/art-board-layout";

export default function ArtBoardLayoutDemo() {
  return (
    <div className="flex flex-col gap-8">
      {/* Basic Example */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Basic Layout</h3>
        <ArtBoardLayout className="min-h-[300px] w-96">
          <div className="rounded-lg bg-gray-500/10 p-6 backdrop-blur-sm">
            <h3 className="font-semibold text-black/80">Drag me!</h3>
            <p className="text-sm text-muted-foreground">Use mouse to drag</p>
          </div>
          <div className="rounded-lg bg-blue-500/10 p-6 backdrop-blur-sm">
            <h3 className="font-semibold text-black/80">Me too!</h3>
            <p className="text-sm text-muted-foreground">Snaps to grid</p>
          </div>
        </ArtBoardLayout>
      </div>

      {/* Styled Example */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Styled Layout</h3>
        <ArtBoardLayout
          borderStyle="rustic"
          borderWidth="thick"
          gridColor="rgba(0, 0, 255, 0.03)"
          backgroundColor="#fafafa"
          gridSize={40}
          className="min-h-[300px]"
        >
          <div className="rounded-lg bg-rose-500/10 p-6 backdrop-blur-sm">
            <h3 className="font-semibold text-black/80">Custom Grid</h3>
            <p className="text-sm text-muted-foreground">40px grid size</p>
          </div>
          <div className="rounded-lg bg-emerald-500/10 p-6 backdrop-blur-sm">
            <h3 className="font-semibold text-black/80">Rustic Style</h3>
            <p className="text-sm text-muted-foreground">With thick border</p>
          </div>
        </ArtBoardLayout>
      </div>
    </div>
  );
}
