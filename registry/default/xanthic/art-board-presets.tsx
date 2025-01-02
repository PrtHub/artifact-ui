"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search, Star, RotateCw, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PresetSize {
  name: string;
  width: number;
  height: number;
  category: string;
}

const commonPresets: PresetSize[] = [
  {
    name: "Instagram Post",
    width: 1080,
    height: 1080,
    category: "Social Media",
  },
  {
    name: "Instagram Story",
    width: 1080,
    height: 1920,
    category: "Social Media",
  },
  {
    name: "Instagram Reel",
    width: 1080,
    height: 1920,
    category: "Social Media",
  },
  { name: "Twitter Post", width: 1200, height: 675, category: "Social Media" },
  { name: "Facebook Post", width: 1200, height: 630, category: "Social Media" },
  { name: "LinkedIn Post", width: 1200, height: 627, category: "Social Media" },
  { name: "YouTube Thumbnail", width: 1280, height: 720, category: "Video" },
  { name: "YouTube Banner", width: 2560, height: 1440, category: "Video" },
  { name: "A4 Print", width: 2480, height: 3508, category: "Print" },
  { name: "A3 Print", width: 3508, height: 4961, category: "Print" },
  { name: "Business Card", width: 1050, height: 600, category: "Print" },
  { name: "Desktop Wallpaper", width: 1920, height: 1080, category: "Screen" },
  { name: "iPhone Wallpaper", width: 1170, height: 2532, category: "Screen" },
];

interface ArtBoardPresetsProps {
  onSelectPreset?: (width: number, height: number) => void;
}

export default function ArtBoardPresets({
  onSelectPreset,
}: ArtBoardPresetsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [customWidth, setCustomWidth] = useState("");
  const [customHeight, setCustomHeight] = useState("");

  const categories = ["all", ...new Set(commonPresets.map((p) => p.category))];

  const filteredPresets = commonPresets
    .filter((preset) =>
      preset.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter(
      (preset) =>
        selectedCategory === "all" || preset.category === selectedCategory,
    )
    .sort((a, b) => {
      // Sort by favorites first
      const aFav = favorites.has(a.name);
      const bFav = favorites.has(b.name);
      if (aFav !== bFav) return bFav ? 1 : -1;
      return 0;
    });

  const toggleFavorite = (name: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(name)) {
      newFavorites.delete(name);
    } else {
      newFavorites.add(name);
    }
    setFavorites(newFavorites);
  };

  const handleCustomSize = () => {
    const width = parseInt(customWidth);
    const height = parseInt(customHeight);
    if (width > 0 && height > 0) {
      onSelectPreset?.(width, height);
      setCustomWidth("");
      setCustomHeight("");
    }
  };

  const rotateSize = (width: number, height: number) => {
    onSelectPreset?.(height, width);
  };

  return (
    <Card className="w-full max-w-sm p-4">
      <h3 className="mb-4 text-lg font-semibold">Art Board Presets</h3>

      <div className="space-y-4">
        {/* Search and Category Filter */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search presets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Custom Size Input */}
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Width"
            value={customWidth}
            onChange={(e) => setCustomWidth(e.target.value)}
            className="flex-1"
          />
          <Input
            type="number"
            placeholder="Height"
            value={customHeight}
            onChange={(e) => setCustomHeight(e.target.value)}
            className="flex-1"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={handleCustomSize}
            disabled={!customWidth || !customHeight}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Presets List */}
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-2">
            {filteredPresets.map((preset) => (
              <div key={preset.name} className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 justify-between"
                  onClick={() => onSelectPreset?.(preset.width, preset.height)}
                >
                  <span>{preset.name}</span>
                  <span className="text-muted-foreground">
                    {preset.width}×{preset.height}
                  </span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => rotateSize(preset.width, preset.height)}
                >
                  <RotateCw className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleFavorite(preset.name)}
                >
                  <Star
                    className={`h-4 w-4 ${
                      favorites.has(preset.name)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </Card>
  );
}
