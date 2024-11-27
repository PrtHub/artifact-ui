import { Registry } from "@/registry/schema";

export const examples: Registry = [
  {
    name: "canvas-button-demo",
    type: "registry:example",
    files: ["example/canvas-button-demo.tsx"],
    dependencies: ["@/registry/default/ui-canvas/canvas-button"],
  },
];
