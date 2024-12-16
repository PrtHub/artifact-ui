"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";
import { ChevronDown, Copy, Download, Palette, RefreshCw } from "lucide-react";
import { CanvasButton } from "./canvas-button";
import { SketchInput } from "./sketch-input";
import { CanvasSlider } from "./canvas-slider";
import { useToast } from "@/hooks/use-toast";

interface ColorSchemeGeneratorProps {
  className?: string;
}

type HarmonyMode =
  | "complementary"
  | "analogous"
  | "triadic"
  | "tetradic"
  | "monochromatic";

const harmonies: { value: HarmonyMode; label: string }[] = [
  { value: "complementary", label: "Complementary" },
  { value: "analogous", label: "Analogous" },
  { value: "triadic", label: "Triadic" },
  { value: "tetradic", label: "Tetradic" },
  { value: "monochromatic", label: "Monochromatic" },
];

function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function hexToHsl(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [0, 0, 0];

  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  let l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function generateHarmony(
  baseHue: number,
  baseSat: number,
  baseLight: number,
  mode: HarmonyMode,
): string[] {
  const colors: string[] = [];

  // Always add the base color
  colors.push(hslToHex(baseHue, baseSat, baseLight));

  switch (mode) {
    case "complementary":
      colors.push(hslToHex((baseHue + 180) % 360, baseSat, baseLight));
      break;
    case "analogous":
      colors.push(hslToHex((baseHue + 30) % 360, baseSat, baseLight));
      colors.push(hslToHex((baseHue - 30 + 360) % 360, baseSat, baseLight));
      break;
    case "triadic":
      colors.push(hslToHex((baseHue + 120) % 360, baseSat, baseLight));
      colors.push(hslToHex((baseHue + 240) % 360, baseSat, baseLight));
      break;
    case "tetradic":
      colors.push(hslToHex((baseHue + 90) % 360, baseSat, baseLight));
      colors.push(hslToHex((baseHue + 180) % 360, baseSat, baseLight));
      colors.push(hslToHex((baseHue + 270) % 360, baseSat, baseLight));
      break;
    case "monochromatic":
      colors.push(hslToHex(baseHue, baseSat, Math.max(20, baseLight - 30)));
      colors.push(hslToHex(baseHue, baseSat, Math.min(90, baseLight + 30)));
      break;
  }

  return colors;
}

export function ColorSchemeGenerator({ className }: ColorSchemeGeneratorProps) {
  const { toast } = useToast();
  const [baseColor, setBaseColor] = useState("#6366f1");
  const [harmony, setHarmony] = useState<HarmonyMode>("tetradic");
  const [hue, saturation, lightness] = hexToHsl(baseColor);
  const [showHarmonyDropdown, setShowHarmonyDropdown] = useState(false);

  const colorScheme = generateHarmony(hue, saturation, lightness, harmony);

  const handleRandomize = useCallback(() => {
    const newHue = Math.floor(Math.random() * 360);
    const newSat = Math.floor(Math.random() * 40) + 60; // 60-100
    const newLight = Math.floor(Math.random() * 30) + 35; // 35-65
    setBaseColor(hslToHex(newHue, newSat, newLight));
  }, []);

  const copyToClipboard = useCallback(
    (text: string) => {
      navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    },
    [toast],
  );

  const exportScheme = useCallback(() => {
    const data = {
      baseColor,
      harmony,
      colors: colorScheme,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "color-scheme.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [baseColor, harmony, colorScheme]);

  return (
    <div className={cn("flex flex-col gap-6 p-4 xl:p-0 2xl:p-6", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          <h2 className="whitespace-nowrap text-lg font-semibold">
            Color Scheme Generator
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <CanvasButton
            variant="default"
            effect="splash"
            size="sm"
            onClick={handleRandomize}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Randomize
          </CanvasButton>
          <CanvasButton
            variant="default"
            effect="splash"
            size="sm"
            onClick={exportScheme}
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </CanvasButton>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <SketchInput
              type="color"
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              className="h-10 w-20 cursor-pointer"
            />
            <SketchInput
              type="text"
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              className="w-28"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Hue</label>
            <CanvasSlider
              value={[hue]}
              max={360}
              step={1}
              variant="default"
              onValueChange={(value) =>
                setBaseColor(hslToHex(value[0], saturation, lightness))
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Saturation</label>
            <CanvasSlider
              value={[saturation]}
              max={100}
              step={1}
              variant="default"
              onValueChange={(value) =>
                setBaseColor(hslToHex(hue, value[0], lightness))
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Lightness</label>
            <CanvasSlider
              value={[lightness]}
              max={100}
              step={1}
              variant="default"
              onValueChange={(value) =>
                setBaseColor(hslToHex(hue, saturation, value[0]))
              }
            />
          </div>

          <div className="relative">
            <button
              className="flex w-full items-center justify-between rounded-lg border bg-transparent px-4 py-2 text-left"
              onClick={() => setShowHarmonyDropdown(!showHarmonyDropdown)}
            >
              <span className="capitalize">{harmony}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            {showHarmonyDropdown && (
              <div className="absolute inset-x-0 top-full z-50 mt-1 rounded-lg border bg-background shadow-lg">
                {harmonies.map((h) => (
                  <button
                    key={h.value}
                    className="flex w-full items-center px-4 py-2 hover:bg-accent"
                    onClick={() => {
                      setHarmony(h.value);
                      setShowHarmonyDropdown(false);
                    }}
                  >
                    {h.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-4">
          {colorScheme.map((color, index) => (
            <div
              key={index}
              className="group flex items-center justify-between rounded-lg border p-4"
              style={{ backgroundColor: color }}
            >
              <div
                className="font-mono text-sm"
                style={{
                  color: hexToHsl(color)[2] > 50 ? "#000000" : "#ffffff",
                }}
              >
                {color}
              </div>
              <CanvasButton
                variant="default"
                size="sm"
                onClick={() => copyToClipboard(color)}
                className="opacity-0 group-hover:opacity-100"
              >
                <Copy className="h-4 w-4" />
              </CanvasButton>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
