"use client";

import * as React from "react";
import {
  PainterlySelect,
  PainterlySelectContent,
  PainterlySelectGroup,
  PainterlySelectItem,
  PainterlySelectLabel,
  PainterlySelectSeparator,
  PainterlySelectTrigger,
  PainterlySelectValue,
} from "@/registry/default/ui-canvas/painterly-select";

export default function PainterlySelectDemo() {
  const [color, setColor] = React.useState("red");

  return (
    <div className="flex w-full max-w-[280px] flex-col gap-4">
      {/* Basic Select */}
      <PainterlySelect value={color} onValueChange={setColor}>
        <PainterlySelectTrigger>
          <PainterlySelectValue placeholder="Select color" />
        </PainterlySelectTrigger>
        <PainterlySelectContent>
          <PainterlySelectGroup>
            <PainterlySelectLabel>Primary Colors</PainterlySelectLabel>
            <PainterlySelectItem value="red">Crimson Red</PainterlySelectItem>
            <PainterlySelectItem value="blue">Ocean Blue</PainterlySelectItem>
            <PainterlySelectItem value="yellow">
              Sunflower Yellow
            </PainterlySelectItem>
          </PainterlySelectGroup>
          <PainterlySelectSeparator />
          <PainterlySelectGroup>
            <PainterlySelectLabel>Secondary Colors</PainterlySelectLabel>
            <PainterlySelectItem value="green">
              Forest Green
            </PainterlySelectItem>
            <PainterlySelectItem value="purple">
              Royal Purple
            </PainterlySelectItem>
            <PainterlySelectItem value="orange">
              Sunset Orange
            </PainterlySelectItem>
          </PainterlySelectGroup>
          <PainterlySelectSeparator />
          <PainterlySelectGroup>
            <PainterlySelectLabel>Neutral Tones</PainterlySelectLabel>
            <PainterlySelectItem value="white">Pure White</PainterlySelectItem>
            <PainterlySelectItem value="gray">Storm Gray</PainterlySelectItem>
            <PainterlySelectItem value="black">
              Midnight Black
            </PainterlySelectItem>
          </PainterlySelectGroup>
        </PainterlySelectContent>
      </PainterlySelect>

      {/* Disabled Select */}
      <PainterlySelect disabled>
        <PainterlySelectTrigger>
          <PainterlySelectValue placeholder="Disabled select" />
        </PainterlySelectTrigger>
        <PainterlySelectContent>
          <PainterlySelectGroup>
            <PainterlySelectLabel>Colors</PainterlySelectLabel>
            <PainterlySelectItem value="red">Crimson Red</PainterlySelectItem>
            <PainterlySelectItem value="blue">Ocean Blue</PainterlySelectItem>
          </PainterlySelectGroup>
        </PainterlySelectContent>
      </PainterlySelect>
    </div>
  );
}
