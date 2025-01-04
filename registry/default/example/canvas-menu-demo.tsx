import * as React from "react";
import {
  CanvasMenu,
  CanvasMenuMenu,
  CanvasMenuContent,
  CanvasMenuItem,
  CanvasMenuTrigger,
  CanvasMenuSub,
  CanvasMenuSubContent,
  CanvasMenuSubTrigger,
  CanvasMenuCheckboxItem,
  CanvasMenuRadioGroup,
  CanvasMenuRadioItem,
  CanvasMenuLabel,
  CanvasMenuSeparator,
  CanvasMenuGroup,
  CanvasMenuPortal,
  PaintEffects,
} from "@/registry/default/ui/canvas-menu";
import { Button } from "@/components/ui/button";

export default function CanvasMenuDemo() {
  const [showGrid, setShowGrid] = React.useState(true);
  const [artStyle, setArtStyle] = React.useState("modern");

  return (
    <div className="relative">
      <PaintEffects />
      <CanvasMenu>
        <CanvasMenuMenu>
          <CanvasMenuTrigger asChild>
            <Button variant="outline">Artist Menu</Button>
          </CanvasMenuTrigger>
          <CanvasMenuContent className="w-56">
            <CanvasMenuGroup>
              <CanvasMenuItem>
                New Canvas{" "}
                <span className="ml-auto text-xs tracking-widest text-muted-foreground">
                  ⌘N
                </span>
              </CanvasMenuItem>
              <CanvasMenuItem>
                Open...{" "}
                <span className="ml-auto text-xs tracking-widest text-muted-foreground">
                  ⌘O
                </span>
              </CanvasMenuItem>
              <CanvasMenuItem disabled>
                Save{" "}
                <span className="ml-auto text-xs tracking-widest text-muted-foreground">
                  ⌘S
                </span>
              </CanvasMenuItem>
            </CanvasMenuGroup>
            <CanvasMenuSeparator />
            <CanvasMenuSub>
              <CanvasMenuSubTrigger>Art Tools</CanvasMenuSubTrigger>
              <CanvasMenuPortal>
                <CanvasMenuSubContent>
                  <CanvasMenuGroup>
                    <CanvasMenuItem>
                      Brush{" "}
                      <span className="ml-auto text-xs tracking-widest text-muted-foreground">
                        B
                      </span>
                    </CanvasMenuItem>
                    <CanvasMenuItem>
                      Pencil{" "}
                      <span className="ml-auto text-xs tracking-widest text-muted-foreground">
                        P
                      </span>
                    </CanvasMenuItem>
                    <CanvasMenuItem>
                      Watercolor{" "}
                      <span className="ml-auto text-xs tracking-widest text-muted-foreground">
                        W
                      </span>
                    </CanvasMenuItem>
                  </CanvasMenuGroup>
                  <CanvasMenuSeparator />
                  <CanvasMenuItem>
                    Eraser{" "}
                    <span className="ml-auto text-xs tracking-widest text-muted-foreground">
                      E
                    </span>
                  </CanvasMenuItem>
                </CanvasMenuSubContent>
              </CanvasMenuPortal>
            </CanvasMenuSub>
            <CanvasMenuSeparator />
            <CanvasMenuCheckboxItem
              checked={showGrid}
              onCheckedChange={setShowGrid}
            >
              Show Grid{" "}
              <span className="ml-auto text-xs tracking-widest text-muted-foreground">
                ⌘G
              </span>
            </CanvasMenuCheckboxItem>
            <CanvasMenuSeparator />
            <CanvasMenuLabel>Art Style</CanvasMenuLabel>
            <CanvasMenuRadioGroup value={artStyle} onValueChange={setArtStyle}>
              <CanvasMenuRadioItem value="classic">Classic</CanvasMenuRadioItem>
              <CanvasMenuRadioItem value="modern">Modern</CanvasMenuRadioItem>
              <CanvasMenuRadioItem value="abstract">
                Abstract
              </CanvasMenuRadioItem>
            </CanvasMenuRadioGroup>
          </CanvasMenuContent>
        </CanvasMenuMenu>
      </CanvasMenu>
    </div>
  );
}
