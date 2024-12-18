"use client";

import { useState } from "react";
import SketchCalendarPicker from "@/registry/default/ui-canvas/sketch-calendar-picker";

export default function SketchCalendarPickerDemo() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <div className="grid grid-cols-1 gap-8 p-4 md:grid-cols-2">
      {/* Default Variant */}
      <div className="space-y-2">
        <h3 className="text-center text-sm font-medium text-muted-foreground">
          Default
        </h3>
        <SketchCalendarPicker
          value={selectedDate}
          onChange={setSelectedDate}
          variant="default"
        />
      </div>

      {/* Minimal Variant */}
      <div className="space-y-2">
        <h3 className="text-center text-sm font-medium text-muted-foreground">
          Minimal
        </h3>
        <SketchCalendarPicker
          value={selectedDate}
          onChange={setSelectedDate}
          variant="minimal"
        />
      </div>

      {/* Gradient Variant */}
      <div className="space-y-2">
        <h3 className="text-center text-sm font-medium text-muted-foreground">
          Gradient
        </h3>
        <SketchCalendarPicker
          value={selectedDate}
          onChange={setSelectedDate}
          variant="gradient"
        />
      </div>

      {/* Neon Variant */}
      <div className="space-y-2">
        <h3 className="text-center text-sm font-medium text-muted-foreground">
          Neon
        </h3>
        <SketchCalendarPicker
          value={selectedDate}
          onChange={setSelectedDate}
          variant="neon"
        />
      </div>

      {/* Candy Variant */}
      <div className="space-y-2">
        <h3 className="text-center text-sm font-medium text-muted-foreground">
          Candy
        </h3>
        <SketchCalendarPicker
          value={selectedDate}
          onChange={setSelectedDate}
          variant="candy"
        />
      </div>

      {/* Artistic Variant */}
      <div className="space-y-2">
        <h3 className="text-center text-sm font-medium text-muted-foreground">
          Artistic
        </h3>
        <SketchCalendarPicker
          value={selectedDate}
          onChange={setSelectedDate}
          variant="artistic"
        />
      </div>
    </div>
  );
}
