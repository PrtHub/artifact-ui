"use client";

import React, { useState, useEffect } from "react";
import ArtisticDataViz from "@/registry/default/ui-canvas/artistic-data-viz";
import { Button } from "@/components/ui/button";
import { Shuffle, Share2, Download } from "lucide-react";
import { toast } from "sonner";

const generateRandomData = (points: number) => {
  const categories = ["Sales", "Revenue", "Growth", "Engagement"];
  const now = new Date();

  return Array.from({ length: points }, (_, i) => ({
    id: `point-${i}`,
    value: Math.random() * 100,
    label: `Data Point ${i + 1}`,
    category: categories[Math.floor(Math.random() * categories.length)],
    timestamp: new Date(now.getTime() - (points - i) * 24 * 60 * 60 * 1000),
    metadata: {
      trend: Math.random() > 0.5 ? "Increasing" : "Decreasing",
      confidence: `${(Math.random() * 100).toFixed(1)}%`,
      impact: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
    },
  }));
};

const generateTimeSeriesData = () => {
  const points = 24;
  const categories = ["Sales", "Revenue"];
  const now = new Date();
  const baseValues = {
    Sales: 50 + Math.random() * 20,
    Revenue: 70 + Math.random() * 30,
  };

  return categories.flatMap((category) =>
    Array.from({ length: points }, (_, i) => {
      const hourlyVariation = Math.sin((i / points) * Math.PI * 2) * 15;
      const randomNoise = (Math.random() - 0.5) * 10;

      return {
        id: `${category}-${i}`,
        value: baseValues[category] + hourlyVariation + randomNoise,
        label: `${category} at ${i}:00`,
        category,
        timestamp: new Date(now.getTime() - (points - i) * 60 * 60 * 1000),
        metadata: {
          hourOfDay: i,
          trend: hourlyVariation > 0 ? "Peak" : "Valley",
          variance: `±${Math.abs(randomNoise).toFixed(1)}`,
        },
      };
    }),
  );
};

export default function ArtisticDataVizDemo() {
  const [data, setData] = useState(() => generateRandomData(12));
  const [dataType, setDataType] = useState<"random" | "timeSeries">("random");

  const colorPalette = [
    "#FF6B6B", // Coral Red
    "#4ECDC4", // Medium Turquoise
    "#45B7D1", // Sky Blue
    "#96CEB4", // Sage Green
    "#FFEEAD", // Pale Yellow
  ];

  const handleRefreshData = () => {
    if (dataType === "timeSeries") {
      setData(generateTimeSeriesData());
    } else {
      setData(generateRandomData(12));
    }
  };

  const handleShare = (imageData: string) => {
    navigator.clipboard.writeText(imageData).then(() => {
      toast.success("Image data copied to clipboard!");
    });
  };

  const handleDownload = (imageData: string) => {
    const link = document.createElement("a");
    link.download = "visualization.png";
    link.href = imageData;
    link.click();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (dataType === "timeSeries") {
        setData(generateTimeSeriesData());
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [dataType]);

  return (
    <div className="z-30 space-y-4 rounded-lg bg-background p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Artistic Data Visualization</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setDataType((prev) =>
                prev === "random" ? "timeSeries" : "random",
              );
              handleRefreshData();
            }}
          >
            {dataType === "random"
              ? "Switch to Time Series"
              : "Switch to Random"}
          </Button>
          <Button variant="outline" size="icon" onClick={handleRefreshData}>
            <Shuffle className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="space-y-8">
        <ArtisticDataViz
          data={data}
          width={800}
          height={400}
          style="wave"
          colorPalette={colorPalette}
          animated={true}
          onDataPointClick={(point) =>
            toast.info(`Selected: ${point.label}`, {
              description: `Value: ${point.value.toFixed(2)}, Category: ${point.category}`,
            })
          }
          onShare={handleShare}
          onDownload={handleDownload}
        />
      </div>
    </div>
  );
}
