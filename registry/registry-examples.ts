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
];
