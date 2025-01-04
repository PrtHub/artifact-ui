"use client";

import { useState } from "react";
import LayerManager, { Layer } from "@/registry/default/ui/layer-manager";

export default function LayerManagerDemo() {
  const [layers, setLayers] = useState<Layer[]>([
    {
      id: "1",
      name: "Background",
      visible: true,
      locked: true,
      thumbnail: "https://picsum.photos/32/32?random=1",
    },
    {
      id: "2",
      name: "Sketch Layer",
      visible: true,
      locked: false,
      thumbnail: "https://picsum.photos/32/32?random=2",
    },
    {
      id: "3",
      name: "Color Layer",
      visible: true,
      locked: false,
      thumbnail: "https://picsum.photos/32/32?random=3",
    },
    {
      id: "4",
      name: "Effects Layer",
      visible: false,
      locked: false,
      thumbnail: "https://picsum.photos/32/32?random=4",
    },
    {
      id: "5",
      name: "Text Layer",
      visible: false,
      locked: false,
      thumbnail: "https://picsum.photos/32/32?random=5",
    },
  ]);

  const [selectedLayerId, setSelectedLayerId] = useState<string>("2");

  const handleVisibilityToggle = (id: string) => {
    setLayers((prev) =>
      prev.map((layer) =>
        layer.id === id ? { ...layer, visible: !layer.visible } : layer,
      ),
    );
  };

  const handleLockToggle = (id: string) => {
    setLayers((prev) =>
      prev.map((layer) =>
        layer.id === id ? { ...layer, locked: !layer.locked } : layer,
      ),
    );
  };

  const handleDelete = (id: string) => {
    setLayers((prev) => prev.filter((layer) => layer.id !== id));
  };

  const handleMove = (id: string, direction: "up" | "down") => {
    const index = layers.findIndex((layer) => layer.id === id);
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === layers.length - 1)
    ) {
      return;
    }

    const newLayers = [...layers];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    [newLayers[index], newLayers[newIndex]] = [
      newLayers[newIndex],
      newLayers[index],
    ];
    setLayers(newLayers);
  };

  const handleRename = (id: string, newName: string) => {
    setLayers((prev) =>
      prev.map((layer) =>
        layer.id === id ? { ...layer, name: newName } : layer,
      ),
    );
  };

  return (
    <div className="bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.2] flex min-h-[500px] items-center justify-center">
      <div className="w-[380px]">
        <LayerManager
          layers={layers}
          selectedLayerId={selectedLayerId}
          onLayerSelect={setSelectedLayerId}
          onLayerVisibilityToggle={handleVisibilityToggle}
          onLayerLockToggle={handleLockToggle}
          onLayerDelete={handleDelete}
          onLayerMove={handleMove}
          onLayerRename={handleRename}
        />
      </div>
    </div>
  );
}
