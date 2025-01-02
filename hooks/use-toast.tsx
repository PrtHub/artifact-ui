"use client";

import * as React from "react";
import {
  PaletteToast
} from "@/registry/default/xanthic/palette-toast";

type ToastType = "info" | "success" | "warning" | "error";

interface ToastOptions {
  duration?: number;
}

interface Toast {
  id: number;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (message: string, type: ToastType, options?: ToastOptions) => void;
  removeToast: (id: number) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

let toastCount = 0;

interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const addToast = React.useCallback(
    (message: string, type: ToastType, options?: ToastOptions) => {
      const id = toastCount++;
      setToasts((prev) => [...prev, { id, message, type, duration: options?.duration }]);
    },
    []
  );

  const removeToast = React.useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const contextValue = React.useMemo(
    () => ({
      toasts,
      addToast,
      removeToast,
    }),
    [toasts, addToast, removeToast]
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div className="fixed bottom-0 right-0 z-50 m-8 flex flex-col gap-4">
        {toasts.map((toast) => (
          <PaletteToast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  const toast = React.useMemo(
    () => ({
      success: (message: string, options?: ToastOptions) =>
        context.addToast(message, "success", options),
      error: (message: string, options?: ToastOptions) =>
        context.addToast(message, "error", options),
      warning: (message: string, options?: ToastOptions) =>
        context.addToast(message, "warning", options),
      info: (message: string, options?: ToastOptions) =>
        context.addToast(message, "info", options),
    }),
    [context]
  );

  return { toast };
}
