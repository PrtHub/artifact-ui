import * as React from "react";
import { CanvasDrawer } from "@/registry/default/xanthic/canvas-drawer";
import { Button } from "@/components/ui/button";
import {
  EaselTabs,
  EaselTabsContent,
  EaselTabsList,
  EaselTabsTrigger,
} from "@/registry/default/xanthic/easel-tabs";

export default function CanvasDrawerDemo() {
  const [leftOpen, setLeftOpen] = React.useState(false);
  const [rightOpen, setRightOpen] = React.useState(false);

  return (
    <EaselTabs defaultValue="with-handle" className="w-full">
      <EaselTabsList className="grid w-full grid-cols-2">
        <EaselTabsTrigger value="with-handle">With Handle</EaselTabsTrigger>
        <EaselTabsTrigger value="no-handle">No Handle</EaselTabsTrigger>
      </EaselTabsList>

      <EaselTabsContent value="with-handle" className="mt-4">
        <div className="flex min-h-[400px] w-full items-center justify-center gap-4">
          <CanvasDrawer side="left" open={leftOpen} onOpenChange={setLeftOpen}>
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold">
                Left Drawer (with handle)
              </h3>
              <p className="text-sm text-muted-foreground">
                This drawer has the artistic handle enabled. Click the handle on
                the left to toggle, or use the close icon.
              </p>
            </div>
          </CanvasDrawer>
          <CanvasDrawer
            side="right"
            open={rightOpen}
            onOpenChange={setRightOpen}
          >
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold">
                Right Drawer (with handle)
              </h3>
              <p className="text-sm text-muted-foreground">
                Both drawers can be open at the same time. Use the artistic
                handles or close icons to toggle them.
              </p>
            </div>
          </CanvasDrawer>

          {/* Demo Controls */}
          <div className="z-10 space-x-4">
            <Button variant="outline" onClick={() => setLeftOpen(true)}>
              Open Left Drawer
            </Button>
            <Button variant="outline" onClick={() => setRightOpen(true)}>
              Open Right Drawer
            </Button>
          </div>
        </div>
      </EaselTabsContent>

      <EaselTabsContent value="no-handle" className="mt-4">
        <div className="flex min-h-[400px] w-full items-center justify-center gap-4">
          <CanvasDrawer
            side="right"
            open={rightOpen}
            onOpenChange={setRightOpen}
            showHandle={false}
          >
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold">
                Right Drawer (no handle)
              </h3>
              <p className="text-sm text-muted-foreground">
                These drawers are controlled by buttons. Use the close icon or
                click outside to dismiss.
              </p>
            </div>
          </CanvasDrawer>
          <CanvasDrawer
            side="left"
            open={leftOpen}
            onOpenChange={setLeftOpen}
            showHandle={false}
          >
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold">Left Drawer (no handle)</h3>
              <p className="text-sm text-muted-foreground">
                Without handles, the drawers maintain a cleaner look while still
                being easily dismissible.
              </p>
            </div>
          </CanvasDrawer>

          {/* Demo Controls */}
          <div className="z-10 space-x-4">
            <Button variant="outline" onClick={() => setLeftOpen(true)}>
              Open Left Drawer
            </Button>
            <Button variant="outline" onClick={() => setRightOpen(true)}>
              Open Right Drawer
            </Button>
          </div>
        </div>
      </EaselTabsContent>
    </EaselTabs>
  );
}
