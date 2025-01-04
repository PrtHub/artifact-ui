"use client";

import { Button } from "@/components/ui/button";
import {
  CanvasModal,
  CanvasModalContent,
  CanvasModalDescription,
  CanvasModalHeader,
  CanvasModalTitle,
  CanvasModalTrigger,
  CanvasModalFooter,
} from "@/registry/default/ui/canvas-modal";
import { Paintbrush, Palette } from "lucide-react";

export default function CanvasModalDemo() {
  return (
    <div className="grid gap-8">
      <div className="flex flex-wrap items-center gap-4">
        <CanvasModal>
          <CanvasModalTrigger asChild>
            <Button variant="outline" className="z-10 gap-2">
              <Paintbrush className="h-4 w-4" />
              Simple Modal
            </Button>
          </CanvasModalTrigger>
          <CanvasModalContent>
            <CanvasModalHeader>
              <CanvasModalTitle>Welcome to Canvas Modal</CanvasModalTitle>
              <CanvasModalDescription>
                A beautifully crafted modal component with artistic styling and
                smooth animations.
              </CanvasModalDescription>
            </CanvasModalHeader>
            <div className="py-6">
              <p className="text-muted-foreground/80">
                This modal features an easel-frame design with paint-splash
                animations and a modern, clean interface. Perfect for creating
                engaging user interactions in your application.
              </p>
            </div>
          </CanvasModalContent>
        </CanvasModal>

        <CanvasModal>
          <CanvasModalTrigger asChild>
            <Button variant="outline" className="z-10 gap-2">
              <Palette className="h-4 w-4" />
              Advanced Modal
            </Button>
          </CanvasModalTrigger>
          <CanvasModalContent className="sm:max-w-xl">
            <CanvasModalHeader>
              <CanvasModalTitle>Canvas Modal Features</CanvasModalTitle>
              <CanvasModalDescription>
                Explore the advanced features and styling options available in
                the Canvas Modal component.
              </CanvasModalDescription>
            </CanvasModalHeader>
            <div className="grid gap-6 py-6">
              <div className="grid gap-4">
                <h4 className="text-sm font-semibold">Key Features</h4>
                <ul className="grid gap-3 text-sm text-muted-foreground/80">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary/20" />
                    Easel-frame styling with gradient effects
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary/40" />
                    Smooth paint-splash entrance animations
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary/60" />
                    Artistic close button with hover effects
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary/80" />
                    Fully responsive and accessible design
                  </li>
                </ul>
              </div>
            </div>
            <CanvasModalFooter>
              <Button variant="outline" size="sm">
                Learn More
              </Button>
              <Button size="sm">Get Started</Button>
            </CanvasModalFooter>
          </CanvasModalContent>
        </CanvasModal>
      </div>
    </div>
  );
}
