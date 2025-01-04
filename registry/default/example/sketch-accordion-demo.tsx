import * as React from "react";
import {
  SketchAccordion,
  SketchAccordionContent,
  SketchAccordionItem,
  SketchAccordionTrigger,
  PencilFilter,
} from "@/registry/default/ui/sketch-accordion";

export default function SketchAccordionDemo() {
  return (
    <div className="w-full max-w-2xl">
      <PencilFilter />
      <SketchAccordion type="single" collapsible className="w-full">
        <SketchAccordionItem value="item-1">
          <SketchAccordionTrigger>
            Quick Sketches & Ideas
          </SketchAccordionTrigger>
          <SketchAccordionContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Rough sketches and initial concepts for the project. These are
                preliminary ideas that need further refinement.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Wireframes", "UI Concepts", "Layout Ideas"].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full border border-neutral-200 px-2.5 py-0.5 text-xs font-medium dark:border-neutral-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </SketchAccordionContent>
        </SketchAccordionItem>

        <SketchAccordionItem value="item-2">
          <SketchAccordionTrigger>Design Explorations</SketchAccordionTrigger>
          <SketchAccordionContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Detailed design explorations and iterations. These designs are
                more refined and closer to the final product.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded border border-neutral-200 p-2 dark:border-neutral-800">
                  <div className="text-xs font-medium">Version 1.0</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    Initial design exploration
                  </div>
                </div>
                <div className="rounded border border-neutral-200 p-2 dark:border-neutral-800">
                  <div className="text-xs font-medium">Version 2.0</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    Refined based on feedback
                  </div>
                </div>
              </div>
            </div>
          </SketchAccordionContent>
        </SketchAccordionItem>

        <SketchAccordionItem value="item-3">
          <SketchAccordionTrigger>Final Designs & Notes</SketchAccordionTrigger>
          <SketchAccordionContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Finalized designs and important notes for implementation. Ready
                for development handoff.
              </p>
              <div className="rounded-md bg-neutral-50 p-3 dark:bg-neutral-900">
                <div className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 text-yellow-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                  <span className="text-sm font-medium">
                    Implementation Notes
                  </span>
                </div>
                <ul className="mt-2 list-inside list-disc text-xs text-muted-foreground">
                  <li>Use system font stack for better performance</li>
                  <li>Implement dark mode support</li>
                  <li>Add keyboard navigation</li>
                </ul>
              </div>
            </div>
          </SketchAccordionContent>
        </SketchAccordionItem>
      </SketchAccordion>
    </div>
  );
}
