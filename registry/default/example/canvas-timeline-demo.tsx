"use client";

import { useState } from "react";
import CanvasTimeline, {
  TimelineStep,
} from "@/registry/default/xanthic/canvas-timeline";
import Image from "next/image";

const demoSteps: TimelineStep[] = [
  {
    id: "1",
    thumbnail:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=60",
    timestamp: new Date(2024, 0, 1, 10, 0, 0),
    label: "Initial Sketch",
    type: "brush",
    description: "Basic outline and composition",
    duration: 120,
    markers: [
      { time: 30, label: "Started outline", color: "#4CAF50" },
      { time: 90, label: "Composition complete", color: "#2196F3" },
    ],
  },
  {
    id: "2",
    thumbnail:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&auto=format&fit=crop&q=60",
    timestamp: new Date(2024, 0, 1, 10, 2, 0),
    label: "Base Colors",
    type: "brush",
    description: "Adding primary color blocks",
    duration: 180,
    markers: [
      { time: 60, label: "Background colors", color: "#FF9800" },
      { time: 150, label: "Foreground colors", color: "#9C27B0" },
    ],
  },
  {
    id: "3",
    thumbnail:
      "https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=800&auto=format&fit=crop&q=60",
    timestamp: new Date(2024, 0, 1, 10, 5, 0),
    label: "Add Text",
    type: "text",
    description: "Title and caption placement",
    duration: 60,
  },
  {
    id: "4",
    thumbnail:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=60",
    timestamp: new Date(2024, 0, 1, 10, 6, 0),
    label: "New Layer",
    type: "layer",
    description: "Overlay layer for details",
    duration: 30,
  },
  {
    id: "5",
    thumbnail:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&auto=format&fit=crop&q=60",
    timestamp: new Date(2024, 0, 1, 10, 6, 30),
    label: "Shadows",
    type: "brush",
    description: "Adding depth with shadows",
    duration: 150,
    markers: [{ time: 75, label: "Main shadows", color: "#607D8B" }],
  },
  {
    id: "6",
    thumbnail:
      "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&auto=format&fit=crop&q=60",
    timestamp: new Date(2024, 0, 1, 10, 9, 0),
    label: "Highlights",
    type: "brush",
    description: "Adding light and highlights",
    duration: 120,
  },
  {
    id: "7",
    thumbnail:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=60",
    timestamp: new Date(2024, 0, 1, 10, 11, 0),
    label: "Color Filter",
    type: "filter",
    description: "Adjusting overall color balance",
    duration: 45,
  },
  {
    id: "8",
    thumbnail:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&auto=format&fit=crop&q=60",
    timestamp: new Date(2024, 0, 1, 10, 11, 45),
    label: "Final Snapshot",
    type: "snapshot",
    description: "Completed artwork",
    duration: 15,
  },
];

export default function CanvasTimelineDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [canUndo, setCanUndo] = useState(true);
  const [canRedo, setCanRedo] = useState(true);

  return (
    <div className="w-full max-w-4xl space-y-4">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
        <Image
          src={demoSteps[currentStep].thumbnail}
          alt={demoSteps[currentStep].label}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-x-4 bottom-4">
          <div className="rounded-lg bg-background/95 p-4 shadow-lg">
            <h3 className="text-lg font-semibold">
              {demoSteps[currentStep].label}
            </h3>
            <p className="text-sm text-muted-foreground">
              {demoSteps[currentStep].description}
            </p>
          </div>
        </div>
      </div>

      <CanvasTimeline
        steps={demoSteps}
        currentStepIndex={currentStep}
        onStepChange={setCurrentStep}
        onSnapshot={() => console.log("Taking snapshot...")}
        onUndo={() => console.log("Undo")}
        onRedo={() => console.log("Redo")}
        onSave={() => console.log("Saving timeline...")}
        canUndo={canUndo}
        canRedo={canRedo}
        className="bg-slate-50 dark:bg-black"
      />
    </div>
  );
}
