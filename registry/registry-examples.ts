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
];
