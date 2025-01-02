"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import CanvasVoiceCommander from "@/registry/default/xanthic/canvas-voice-commander";

export default function CanvasVoiceCommanderDemo() {
  const [lastCommand, setLastCommand] = useState("");
  const [theme, setTheme] = useState<"artist" | "minimal" | "futuristic">(
    "artist",
  );
  const [brushSize, setBrushSize] = useState(10);
  const [color, setColor] = useState("#FF5733");
  const [visualizerStyle, setVisualizerStyle] = useState<
    "bars" | "ink" | "wave" | "pencil"
  >("bars");
  const [noiseReduction, setNoiseReduction] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const customCommands = {
    "switch to minimal": () => setTheme("minimal"),
    "switch to artist": () => setTheme("artist"),
    "switch to futuristic": () => setTheme("futuristic"),
    "increase brush size": () => setBrushSize((prev) => Math.min(prev + 5, 50)),
    "decrease brush size": () => setBrushSize((prev) => Math.max(prev - 5, 1)),
    "set color red": () => setColor("#FF0000"),
    "set color blue": () => setColor("#0000FF"),
    "set color green": () => setColor("#00FF00"),
    "show bars": () => setVisualizerStyle("bars"),
    "show ink": () => setVisualizerStyle("ink"),
    "show wave": () => setVisualizerStyle("wave"),
    "show pencil": () => setVisualizerStyle("pencil"),
    "toggle noise reduction": () => setNoiseReduction((prev) => !prev),
    "toggle sound": () => setSoundEnabled((prev) => !prev),
  };

  const handleCommand = (command: string) => {
    setLastCommand(command);
  };

  return (
    <div
      className="relative flex min-h-[600px] flex-col items-center justify-start overflow-hidden rounded-xl 
      bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 p-12 text-gray-900 
      dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 dark:text-gray-100"
    >
      {/* Background Decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bg-grid-gray-900/[0.02] dark:bg-grid-white/[0.02] absolute inset-0" />
        <div
          className="absolute -left-1/2 top-0 h-[500px] w-[1000px] rotate-[-35deg] bg-gradient-to-r 
          from-transparent via-gray-100/50 to-transparent blur-3xl dark:via-gray-800/20"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 mb-12 text-center"
      >
        <h2 className="mb-3 text-3xl font-bold tracking-tight text-gray-800 dark:text-white">
          Canvas Voice Commander
        </h2>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          Try these commands:
        </p>
        <div className="z-30 flex flex-wrap justify-center gap-2">
          {Object.entries(customCommands).map(([cmd], index) => (
            <motion.span
              key={cmd}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="dark:shadow-sm/20 rounded-full border border-gray-200/80 
                bg-white/90 px-4 py-1.5 text-sm text-gray-600 shadow-sm backdrop-blur-sm
                transition-colors hover:border-gray-300 hover:bg-white 
                dark:border-gray-700 dark:bg-gray-800/90 dark:text-gray-300
                dark:hover:border-gray-600 dark:hover:bg-gray-800"
            >
              &quot;{cmd}&quot;
            </motion.span>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative mb-12"
      >
        <CanvasVoiceCommander
          onCommand={handleCommand}
          customCommands={customCommands}
          theme={theme}
          visualizerStyle={visualizerStyle}
          noiseReductionEnabled={noiseReduction}
          soundFeedback={soundEnabled}
          className="mb-8"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-52 w-full max-w-md space-y-6"
      >
        <div
          className="dark:shadow-lg/20 overflow-hidden rounded-xl border border-gray-200/80 
          bg-white/90 shadow-lg backdrop-blur-sm transition-colors 
          dark:border-gray-700/80 dark:bg-gray-800/90"
        >
          <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4 dark:border-gray-800 dark:bg-gray-900/50">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Visual Settings
            </h3>
          </div>
          <div className="space-y-4 p-6">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">Theme:</span>
              <span className="font-medium capitalize text-gray-800 dark:text-white">
                {theme}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">
                Visualizer Style:
              </span>
              <span className="font-medium capitalize text-gray-800 dark:text-white">
                {visualizerStyle}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">
                Brush Size:
              </span>
              <div className="flex items-center">
                <div
                  className="h-4 w-4 rounded-full ring-2 ring-white/50 transition-all dark:ring-black/50"
                  style={{
                    width: `${brushSize}px`,
                    height: `${brushSize}px`,
                    backgroundColor: color,
                  }}
                />
                <span className="ml-2 font-medium text-gray-800 dark:text-white">
                  {brushSize}px
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">Color:</span>
              <div className="flex items-center gap-2">
                <div
                  className="h-6 w-6 rounded-full ring-2 ring-white/50 transition-all dark:ring-black/50"
                  style={{ backgroundColor: color }}
                />
                <span className="font-medium text-gray-800 dark:text-white">
                  {color}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="dark:shadow-lg/20 overflow-hidden rounded-xl border border-gray-200/80 
          bg-white/90 shadow-lg backdrop-blur-sm transition-colors 
          dark:border-gray-700/80 dark:bg-gray-800/90"
        >
          <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4 dark:border-gray-800 dark:bg-gray-900/50">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Audio Settings
            </h3>
          </div>
          <div className="space-y-4 p-6">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">
                Noise Reduction:
              </span>
              <button
                onClick={() => setNoiseReduction((prev) => !prev)}
                className={`relative h-6 w-11 rounded-full transition-all ${
                  noiseReduction
                    ? "bg-green-500 dark:bg-green-600"
                    : "bg-gray-300 dark:bg-gray-500"
                }`}
              >
                <motion.span
                  layout
                  className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full 
                    bg-white shadow-sm transition-colors dark:bg-gray-100`}
                  animate={{ x: noiseReduction ? 20 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">
                Sound Feedback:
              </span>
              <button
                onClick={() => setSoundEnabled((prev) => !prev)}
                className={`relative h-6 w-11 rounded-full transition-all ${
                  soundEnabled
                    ? "bg-green-500 dark:bg-green-600"
                    : "bg-gray-300 dark:bg-gray-500"
                }`}
              >
                <motion.span
                  layout
                  className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full 
                    bg-white shadow-sm transition-colors dark:bg-gray-100`}
                  animate={{ x: soundEnabled ? 20 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
