"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { PaletteToast } from "@/registry/default/ui-canvas/palette-toast";

export default function PaletteToastDemo() {
  const [toasts, setToasts] = React.useState<
    Array<{
      id: number;
      type: "info" | "success" | "warning" | "error";
      message: string;
    }>
  >([]);
  const [counter, setCounter] = React.useState(0);

  const addToast = (type: "info" | "success" | "warning" | "error") => {
    const messages = {
      info: "A splash of information has arrived!",
      success: "Your masterpiece has been created!",
      warning: "The canvas needs your attention...",
      error: "Oops! We spilled some paint...",
    };

    setToasts((prev) => [
      ...prev,
      { id: counter, type, message: messages[type] },
    ]);
    setCounter((prev) => prev + 1);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="z-10 flex flex-wrap gap-4">
        <Button
          variant="outline"
          onClick={() => addToast("info")}
          className="bg-blue-50 hover:bg-blue-100 dark:bg-blue-500/20 dark:hover:bg-blue-500/30"
        >
          Info Toast
        </Button>
        <Button
          variant="outline"
          onClick={() => addToast("success")}
          className="bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-500/20 dark:hover:bg-emerald-500/30"
        >
          Success Toast
        </Button>
        <Button
          variant="outline"
          onClick={() => addToast("warning")}
          className="bg-amber-50 hover:bg-amber-100 dark:bg-amber-500/20 dark:hover:bg-amber-500/30"
        >
          Warning Toast
        </Button>
        <Button
          variant="outline"
          onClick={() => addToast("error")}
          className="bg-rose-50 hover:bg-rose-100 dark:bg-rose-500/20 dark:hover:bg-rose-500/30"
        >
          Error Toast
        </Button>
      </div>

      <div className="fixed bottom-0 right-0 z-50 m-8 flex flex-col gap-4">
        {toasts.map((toast) => (
          <PaletteToast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </div>
  );
}
