"use client";

import * as React from "react";
import { StudioLight } from "@/registry/default/ui-canvas/studio-light";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function StudioLightDemo() {
  const [intensity, setIntensity] = React.useState(1);
  const [variant, setVariant] = React.useState<
    "soft" | "harsh" | "dramatic" | "rim" | "butterfly"
  >("butterfly");
  const [autoAnimate, setAutoAnimate] = React.useState(true);
  const [followMouse, setFollowMouse] = React.useState(false);
  const [color, setColor] = React.useState("#89b4fa");

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Intensity</label>
          <Slider
            value={[intensity]}
            onValueChange={([value]) => setIntensity(value)}
            min={0}
            max={2}
            step={0.1}
            className="w-[200px]"
          />
        </div>

        <div className="z-10 flex flex-col gap-2">
          <label className="text-sm font-medium">Variant</label>
          <Select value={variant} onValueChange={setVariant as any}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="soft">Soft Light</SelectItem>
              <SelectItem value="harsh">Harsh Light</SelectItem>
              <SelectItem value="dramatic">Dramatic</SelectItem>
              <SelectItem value="rim">Rim Light</SelectItem>
              <SelectItem value="butterfly">Butterfly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Light Color</label>
          <div className="z-30 flex gap-2">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="h-10 w-10 rounded-md border"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Animation</label>
          <div className="z-10 flex gap-2">
            <Button
              variant={followMouse ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setFollowMouse(true);
                setAutoAnimate(false);
              }}
            >
              Follow Mouse
            </Button>
            <Button
              variant={autoAnimate ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setAutoAnimate(true);
                setFollowMouse(false);
              }}
            >
              Auto Animate
            </Button>
          </div>
        </div>
      </div>

      <div className="grid h-full grid-cols-1 gap-8 2xl:grid-cols-2">
        <StudioLight
          intensity={intensity}
          variant={variant}
          color={color}
          autoAnimate={autoAnimate}
          followMouse={followMouse}
          className="aspect-video h-full rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800"
        >
          <></>
        </StudioLight>

        <StudioLight
          intensity={intensity}
          variant={variant}
          color={color}
          autoAnimate={autoAnimate}
          followMouse={followMouse}
          className="aspect-video rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800"
        >
          <div className="flex h-full w-full flex-col items-center justify-center gap-4">
            <div className="mt-32 space-y-2 text-center">
              <h3 className="text-2xl font-bold">Interactive Card</h3>
              <p className="text-sm text-muted-foreground">
                Move your mouse around to see the lighting effect
              </p>
            </div>
            <Button size="lg">Click Me</Button>
          </div>
        </StudioLight>
      </div>
    </div>
  );
}
