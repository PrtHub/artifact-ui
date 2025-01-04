import { CanvasColorPicker } from "../ui/canvas-color-picker";

export default function CanvasColorPickerDemo() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Light Consistency */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">
          Light Consistency
        </h3>
        <CanvasColorPicker
          defaultValue="#4f46e5"
          defaultConsistency="thin"
          previewSize="md"
        />
      </div>

      {/* Medium Consistency */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">
          Medium Consistency
        </h3>
        <CanvasColorPicker
          defaultValue="#ec4899"
          defaultConsistency="medium"
          previewSize="md"
        />
      </div>

      {/* Heavy Consistency */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">
          Heavy Consistency
        </h3>
        <CanvasColorPicker
          defaultValue="#10b981"
          defaultConsistency="thick"
          previewSize="md"
        />
      </div>

      {/* Large Preview with Brush */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">Large Preview</h3>
        <CanvasColorPicker
          defaultValue="#f59e0b"
          defaultConsistency="medium"
          previewSize="lg"
          showBrushPreview={true}
        />
      </div>
    </div>
  );
}
