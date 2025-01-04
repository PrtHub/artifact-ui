"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Paintbrush,
  Eraser,
  Bug,
  RefreshCw,
  Camera,
  Share2,
} from "lucide-react";

interface Props {
  children: ReactNode;
  theme?: "watercolor" | "sketch" | "oil-painting";
  onErrorCapture?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  showDebug: boolean;
  errorSnapshot: string | null;
}

export default class CreativeErrorBoundaries extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showDebug: false,
      errorSnapshot: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.onErrorCapture?.(error, errorInfo);
    this.setState({
      error,
      errorInfo,
      errorSnapshot: new Date().toISOString(),
    });
  }

  private getThemeStyles() {
    switch (this.props.theme) {
      case "watercolor":
        return "bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-blue-200 dark:border-blue-800";
      case "sketch":
        return "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800";
      case "oil-painting":
        return "bg-gradient-to-br from-amber-50 to-rose-50 dark:from-amber-950 dark:to-rose-950 border-amber-200 dark:border-amber-800";
      default:
        return "bg-canvas-50 dark:bg-canvas-950 border-canvas-200 dark:border-canvas-800";
    }
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  private handleShare = () => {
    const errorDetails = {
      message: this.state.error?.message,
      stack: this.state.error?.stack,
      timestamp: this.state.errorSnapshot,
    };
    navigator.clipboard.writeText(JSON.stringify(errorDetails, null, 2));
  };

  private captureErrorState = () => {
    const errorDetails = {
      message: this.state.error?.message,
      timestamp: this.state.errorSnapshot,
    };
    console.log("Error State Captured:", errorDetails);
  };

  render() {
    if (this.state.hasError) {
      return (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`${this.getThemeStyles()} relative overflow-hidden rounded-lg border-2 border-dashed p-6`}
          >
            <motion.div
              className="absolute inset-0 opacity-10"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
                backgroundSize: ["100% 100%", "150% 150%"],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{
                backgroundImage:
                  "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
              }}
            />

            <div className="relative space-y-6">
              {/* Artistic Error Display */}
              <motion.div
                className="text-canvas-800 dark:text-canvas-200 flex items-center space-x-3"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Paintbrush className="h-6 w-6" />
                <h3 className="text-xl font-semibold">
                  Artistic Happy Accident
                </h3>
              </motion.div>

              {/* Error Message as Art Description */}
              <motion.div
                className={`rounded-lg bg-white/50 p-6 shadow-lg backdrop-blur-sm dark:bg-black/50`}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring" }}
              >
                <p className="text-canvas-700 dark:text-canvas-300 font-serif text-lg italic">
                  &quot;{this.state.error?.message}&quot;
                </p>
                <div className="text-canvas-500 dark:text-canvas-400 mt-4 text-sm">
                  Captured at: {this.state.errorSnapshot}
                </div>
              </motion.div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={this.handleRetry}
                  className="bg-canvas-200 dark:bg-canvas-800 hover:bg-canvas-300 dark:hover:bg-canvas-700 flex items-center space-x-2 rounded-md px-4 py-2 transition-colors"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Try Again</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={this.handleShare}
                  className="bg-canvas-200 dark:bg-canvas-800 hover:bg-canvas-300 dark:hover:bg-canvas-700 flex items-center space-x-2 rounded-md px-4 py-2 transition-colors"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Share Error</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={this.captureErrorState}
                  className="bg-canvas-200 dark:bg-canvas-800 hover:bg-canvas-300 dark:hover:bg-canvas-700 flex items-center space-x-2 rounded-md px-4 py-2 transition-colors"
                >
                  <Camera className="h-4 w-4" />
                  <span>Capture State</span>
                </motion.button>
              </div>

              {/* Debug Info */}
              <motion.div
                initial={false}
                animate={{ height: this.state.showDebug ? "auto" : 0 }}
                className="overflow-hidden"
              >
                <div className="rounded-lg bg-white/30 p-6 backdrop-blur-sm dark:bg-black/30">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bug className="h-4 w-4" />
                      <h4 className="font-medium">Conservation Notes</h4>
                    </div>
                  </div>
                  <pre className="overflow-auto rounded-lg bg-black/5 p-4 text-sm dark:bg-white/5">
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </div>
              </motion.div>

              {/* Toggle Debug Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  this.setState((state) => ({ showDebug: !state.showDebug }))
                }
                className="text-canvas-600 dark:text-canvas-400 text-sm underline decoration-dashed underline-offset-4"
              >
                {this.state.showDebug ? "Hide" : "Show"} Technical Details
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      );
    }

    return this.props.children;
  }
}
