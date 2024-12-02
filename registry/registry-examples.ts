import { Registry } from "@/registry/schema";

export const examples: Registry = [
  {
    name: "color-palette-demo",
    type: "registry:example",
    registryDependencies: ["color-palette"],
    files: ["example/color-palette-demo.tsx"],
  },
  {
    name: "canvas-button-demo",
    type: "registry:example",
    registryDependencies: ["canvas-button"],
    files: ["example/canvas-button-demo.tsx"],
  },
  {
    name: "sketch-input-demo",
    type: "registry:example",
    registryDependencies: ["sketch-input"],
    files: ["example/sketch-input-demo.tsx"],
  },
  {
    name: "gallery-grid-demo",
    type: "registry:example",
    registryDependencies: ["gallery-grid"],
    files: ["example/gallery-grid-demo.tsx"],
  },
  {
    name: "easel-tabs-demo",
    type: "registry:example",
    registryDependencies: ["easel-tabs"],
    files: ["example/easel-tabs-demo.tsx"],
  },
  {
    name: "palette-navigation-demo",
    type: "registry:example",
    registryDependencies: ["palette-navigation"],
    files: ["example/palette-navigation-demo.tsx"],
  },
  {
    name: "canvas-modal-demo",
    type: "registry:example",
    registryDependencies: ["canvas-modal"],
    files: ["example/canvas-modal-demo.tsx"],
  },
  {
    name: "brush-stroke-loader-demo",
    type: "registry:example",
    registryDependencies: ["brush-stroke-loader"],
    files: ["example/brush-stroke-loader-demo.tsx"],
  },
  {
    name: "canvas-slider-demo",
    type: "registry:example",
    registryDependencies: ["canvas-slider"],
    files: ["example/canvas-slider-demo.tsx"],
  },
  {
    name: "art-board-layout-demo",
    type: "registry:example",
    registryDependencies: ["art-board-layout"],
    files: ["example/art-board-layout-demo.tsx"],
  },
  {
    name: "palette-toast-demo",
    type: "registry:example",
    registryDependencies: ["palette-toast", "button"],
    files: ["example/palette-toast-demo.tsx"],
  },
  {
    name: "canvas-drawer-demo",
    type: "registry:example",
    registryDependencies: ["canvas-drawer", "button"],
    files: ["example/canvas-drawer-demo.tsx"],
  },
  {
    name: "painterly-select-demo",
    type: "registry:example",
    registryDependencies: ["painterly-select", "button"],
    files: ["example/painterly-select-demo.tsx"],
  },
  {
    name: "texture-overlay-demo",
    type: "registry:example",
    registryDependencies: ["texture-overlay"],
    files: ["example/texture-overlay-demo.tsx"],
  },
  {
    name: "canvas-color-picker-demo",
    type: "registry:example",
    registryDependencies: ["canvas-color-picker"],
    files: ["example/canvas-color-picker-demo.tsx"],
  },
  {
    name: "canvas-grid-demo",
    type: "registry:example",
    registryDependencies: ["canvas-grid"],
    files: ["example/canvas-grid-demo.tsx"],
  },
  {
    name: "artistic-navigation-demo",
    type: "registry:example",
    registryDependencies: ["artistic-navigation"],
    files: ["example/artistic-navigation-demo.tsx"],
  },
];
