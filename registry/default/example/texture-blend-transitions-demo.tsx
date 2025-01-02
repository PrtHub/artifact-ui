"use client";

import React, { useState, useEffect } from "react";
import TextureBlendTransitions from "@/registry/default/xanthic/texture-blend-transitions";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const blendModes = ["normal", "multiply", "screen", "overlay"] as const;

export default function TextureBlendTransitionsDemo() {
  const [isActive, setIsActive] = useState(false);
  const [texture, setTexture] = useState<"watercolor" | "paint" | "paper">(
    "watercolor",
  );
  const [intensity, setIntensity] = useState(0.5);
  const [blendMode, setBlendMode] =
    useState<(typeof blendModes)[number]>("normal");
  const [autoPlay, setAutoPlay] = useState(true);

  const colorScheme = {
    light: "rgba(0, 0, 0, 0.1)",
    dark: "rgba(255, 255, 255, 0.1)",
  };

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        setIsActive((prev) => !prev);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [autoPlay]);

  const handleTransitionComplete = () => {
    console.log("Transition completed!");
  };

  return (
    <div className="z-30 w-full space-y-6 bg-white p-2 dark:bg-black 2xl:p-6">
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          <Switch
            checked={autoPlay}
            onCheckedChange={setAutoPlay}
            aria-label="Toggle autoplay"
          />
          <Label>Auto Play</Label>
        </div>
      </div>

      <div className="grid gap-4 2xl:grid-cols-2">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => setTexture("watercolor")}
              variant={texture === "watercolor" ? "default" : "outline"}
            >
              Watercolor
            </Button>
            <Button
              onClick={() => setTexture("paint")}
              variant={texture === "paint" ? "default" : "outline"}
            >
              Paint
            </Button>
            <Button
              onClick={() => setTexture("paper")}
              variant={texture === "paper" ? "default" : "outline"}
            >
              Paper
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Effect Intensity</Label>
            <Slider
              value={[intensity]}
              onValueChange={([value]) => setIntensity(value)}
              min={0.1}
              max={2}
              step={0.1}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label>Blend Mode</Label>
            <Select
              value={blendMode}
              onValueChange={(value: (typeof blendModes)[number]) =>
                setBlendMode(value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {blendModes.map((mode) => (
                  <SelectItem key={mode} value={mode}>
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {!autoPlay && (
            <Button onClick={() => setIsActive(!isActive)} className="w-full">
              Toggle Transition
            </Button>
          )}
        </div>

        <div className="h-[400px] overflow-hidden rounded-lg bg-gray-100 dark:bg-black">
          <TextureBlendTransitions
            isActive={isActive}
            texture={texture}
            duration={1.2}
            intensity={intensity}
            blendMode={blendMode}
            colorScheme={colorScheme}
            onTransitionComplete={handleTransitionComplete}
          >
            <div className="flex h-full w-full flex-col items-center justify-center space-y-4 p-6">
              <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white">
                {isActive ? "Content Revealed!" : "Click Toggle to Start"}
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-300">
                Current Effect:{" "}
                {texture.charAt(0).toUpperCase() + texture.slice(1)}
                <br />
                Intensity: {intensity.toFixed(1)}
                <br />
                Blend Mode: {blendMode}
              </p>
            </div>
          </TextureBlendTransitions>
        </div>
      </div>
    </div>
  );
}
