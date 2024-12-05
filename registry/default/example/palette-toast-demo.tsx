"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ToastProvider, useToast } from "@/hooks/use-toast";

function ToastDemo() {
  const { toast } = useToast();

  return (
    <div className="flex flex-col gap-8">
      <div className="z-10 flex flex-wrap gap-4">
        <Button
          variant="outline"
          onClick={() => toast.info("A splash of information has arrived!")}
          className="bg-blue-50 hover:bg-blue-100 dark:bg-blue-500/20 dark:hover:bg-blue-500/30"
        >
          Info Toast
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.success("Your masterpiece has been created!")}
          className="bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-500/20 dark:hover:bg-emerald-500/30"
        >
          Success Toast
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.warning("The canvas needs your attention...")}
          className="bg-amber-50 hover:bg-amber-100 dark:bg-amber-500/20 dark:hover:bg-amber-500/30"
        >
          Warning Toast
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.error("Oops! We spilled some paint...")}
          className="bg-rose-50 hover:bg-rose-100 dark:bg-rose-500/20 dark:hover:bg-rose-500/30"
        >
          Error Toast
        </Button>
      </div>
    </div>
  );
}

export default function PaletteToastDemo() {
  return (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  );
}
