"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface CanvasVoiceCommanderProps {
  onCommand?: (command: string) => void;
  className?: string;
  customCommands?: Record<string, () => void>;
  theme?: "artist" | "minimal" | "futuristic";
  visualizerStyle?: "bars" | "ink" | "wave" | "pencil";
  visualizerEnabled?: boolean;
  noiseReductionEnabled?: boolean;
  soundFeedback?: boolean;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message?: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: ((event: Event) => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onnomatch: ((event: Event) => void) | null;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionConstructor;
    webkitSpeechRecognition: SpeechRecognitionConstructor;
  }
}

const themes = {
  artist: {
    gradient: "from-amber-500 to-rose-500 dark:from-amber-600 dark:to-rose-600",
    pulseColor: "rgba(251, 146, 60, 0.5)",
    textColor: "text-amber-900 dark:text-amber-100",
    borderColor: "border-amber-200 dark:border-amber-800",
    sound: "/sounds/brush-stroke.mp3",
  },
  minimal: {
    gradient:
      "from-purple-500 to-indigo-500 dark:from-purple-600 dark:to-indigo-600",
    pulseColor: "rgba(99, 102, 241, 0.5)",
    textColor: "text-gray-700 dark:text-gray-300",
    borderColor: "border-gray-200 dark:border-gray-700",
    sound: "/sounds/minimal-click.mp3",
  },
  futuristic: {
    gradient: "from-cyan-400 to-blue-500 dark:from-cyan-500 dark:to-blue-600",
    pulseColor: "rgba(34, 211, 238, 0.5)",
    textColor: "text-cyan-900 dark:text-cyan-100",
    borderColor: "border-cyan-200 dark:border-cyan-800",
    sound: "/sounds/digital-beep.mp3",
  },
};

const visualizerStyles = {
  bars: (value: number, index: number) => ({
    className: "w-1 bg-gradient-to-t",
    style: { height: `${value * 64}px` },
  }),
  ink: (value: number, index: number) => ({
    className: "rounded-full bg-gradient-to-br",
    style: {
      width: `${value * 32}px`,
      height: `${value * 32}px`,
      opacity: value,
      transform: `translate(${Math.sin(index) * 20}px, ${Math.cos(index) * 20}px)`,
    },
  }),
  wave: (value: number, index: number) => ({
    className: "w-2 bg-gradient-to-t",
    style: {
      height: `${Math.sin(index + value * 10) * 32 + 32}px`,
      opacity: value * 0.8 + 0.2,
    },
  }),
  pencil: (value: number, index: number) => ({
    className: "w-0.5 bg-gradient-to-t",
    style: {
      height: `${value * 48}px`,
      transform: `rotate(${(index - 16) * 3}deg)`,
    },
  }),
};

export default function CanvasVoiceCommander({
  onCommand,
  className = "",
  customCommands = {},
  theme = "artist",
  visualizerStyle = "bars",
  visualizerEnabled = true,
  noiseReductionEnabled = true,
  soundFeedback = true,
}: CanvasVoiceCommanderProps) {
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null,
  );
  const [confidence, setConfidence] = useState(0);
  const [audioData, setAudioData] = useState<number[]>(new Array(32).fill(0));
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [fallbackMode, setFallbackMode] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);

  const loadSound = useCallback(async (url: string) => {
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioContext = new AudioContext();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      return audioBuffer;
    } catch (error) {
      console.error("Error loading sound:", error);
      return null;
    }
  }, []);

  useEffect(() => {
    if (!soundFeedback) return;

    const loadSoundEffect = async () => {
      try {
        const audioBuffer = await loadSound(themes[theme].sound);
        if (audioBuffer) {
          audioBufferRef.current = audioBuffer;
        }
      } catch (error) {
        console.error("Error loading sound effect:", error);
      }
    };

    loadSoundEffect();
  }, [theme, soundFeedback, loadSound]);

  const playSound = useCallback(() => {
    if (!soundFeedback || !audioContextRef.current || !audioBufferRef.current)
      return;

    const source = audioContextRef.current.createBufferSource();
    source.buffer = audioBufferRef.current;
    source.connect(audioContextRef.current.destination);
    source.start();
  }, [soundFeedback]);

  useEffect(() => {
    if (!visualizerEnabled || !isListening) return;

    let audioContext: AudioContext;
    let analyser: AnalyserNode;
    let dataArray: Uint8Array;
    let animationId: number;
    let dynamicNoiseThreshold = 0;

    const setupAudioVisualizer = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        audioContext = new AudioContext();
        analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaStreamSource(stream);

        if (noiseReductionEnabled) {
          const noiseFilter = audioContext.createBiquadFilter();
          noiseFilter.type = "highpass";
          noiseFilter.frequency.value = 100;
          source.connect(noiseFilter);
          noiseFilter.connect(analyser);
        } else {
          source.connect(analyser);
        }

        analyser.fftSize = 64;
        dataArray = new Uint8Array(analyser.frequencyBinCount);

        analyser.getByteFrequencyData(dataArray);
        dynamicNoiseThreshold =
          (Array.from(dataArray).reduce((a, b) => a + b, 0) /
            dataArray.length) *
          0.5;

        const updateVisualizer = () => {
          analyser.getByteFrequencyData(dataArray);
          const processedData = Array.from(dataArray).map((val) => {
            const normalized = val / 255;
            return noiseReductionEnabled
              ? Math.max(0, normalized - dynamicNoiseThreshold / 255)
              : normalized;
          });
          setAudioData(processedData);
          animationId = requestAnimationFrame(updateVisualizer);
        };
        updateVisualizer();
      } catch (error) {
        console.error("Error setting up audio visualizer:", error);
        setFallbackMode(true);
      }
    };

    setupAudioVisualizer();
    return () => {
      if (audioContext) audioContext.close();
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [isListening, visualizerEnabled, noiseReductionEnabled]);

  useEffect(() => {
    let recognition: SpeechRecognition | null = null;

    const initializeSpeechRecognition = () => {
      const SpeechRecognitionAPI =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SpeechRecognitionAPI) {
        console.warn("Speech recognition not supported");
        setFallbackMode(true);
        return;
      }

      recognition = new SpeechRecognitionAPI();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const results = event.results;
        const currentResult = results.item(results.length - 1);
        const firstAlternative = currentResult[0];
        const command = firstAlternative.transcript.toLowerCase();
        const currentConfidence = Math.round(firstAlternative.confidence * 100);

        setConfidence(currentConfidence);
        setFeedback(command);

        if (currentResult.isFinal) {
          if (soundFeedback) {
            playSound();
          }

          if (command in customCommands) {
            customCommands[command]();
          }
          onCommand?.(command);
        }
      };

      recognition.onend = (event: Event) => {
        setIsListening(false);
        setConfidence(0);
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        setFeedback(`Error: ${event.error}`);
        setIsListening(false);
        setFallbackMode(true);
      };

      setRecognition(recognition);
    };

    initializeSpeechRecognition();
  }, [onCommand, customCommands, soundFeedback, playSound]);

  const toggleListening = useCallback(() => {
    if (fallbackMode) {
      setFeedback(
        "Speech recognition not supported. Please type your commands.",
      );
      return;
    }

    if (!recognition) {
      setFeedback("Speech recognition not supported in this browser");
      return;
    }

    if (isListening) {
      recognition.stop();
    } else {
      setFeedback("Listening...");
      recognition.start();
      setIsListening(true);
    }
  }, [recognition, isListening, fallbackMode]);

  const currentTheme = themes[theme];
  const currentVisualizer = visualizerStyles[visualizerStyle];

  return (
    <div
      className={`relative ${className}`}
      role="application"
      aria-label="Voice Commander"
    >
      <motion.div
        className="relative"
        animate={isListening ? { scale: [1, 1.1, 1] } : {}}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        {isListening && (
          <motion.div
            className={`absolute inset-0 rounded-full bg-gradient-to-r ${currentTheme.gradient}`}
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        )}

        <motion.button
          onClick={toggleListening}
          className={`relative rounded-full bg-gradient-to-r ${currentTheme.gradient} dark:shadow-lg/20 
            p-4 shadow-lg transition-all duration-300 hover:shadow-xl
            ${isListening ? "animate-pulse" : ""}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isListening ? "Stop listening" : "Start listening"}
          aria-pressed={isListening}
        >
          <svg
            className="h-6 w-6 text-white dark:text-white/90"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
        </motion.button>
      </motion.div>

      {visualizerEnabled && !fallbackMode && (
        <div className="absolute left-1/2 top-full mt-4 -translate-x-1/2">
          <div className="flex h-16 items-end justify-center gap-0.5">
            {audioData.map((value, index) => {
              const visualizerProps = currentVisualizer(value, index);
              return (
                <motion.div
                  key={index}
                  className={`${visualizerProps.className} ${currentTheme.gradient}`}
                  style={visualizerProps.style}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.1 }}
                />
              );
            })}
          </div>
        </div>
      )}

      <AnimatePresence>
        {(feedback || commandHistory.length > 0 || fallbackMode) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute top-full mt-24 min-w-[300px] rounded-lg 
              bg-white/90 p-4 text-sm dark:bg-gray-900/90 ${currentTheme.textColor} 
              dark:shadow-lg/20 border border-gray-100 shadow-lg backdrop-blur-sm dark:border-gray-800`}
            role="status"
            aria-live="polite"
          >
            {feedback && (
              <div className="mb-2 text-center font-medium">{feedback}</div>
            )}
            {confidence > 0 && (
              <div className="mb-2">
                <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${currentTheme.gradient}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${confidence}%` }}
                  />
                </div>
              </div>
            )}
            {fallbackMode && (
              <div className="mb-4">
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-200 bg-white 
                    p-2 text-gray-900 placeholder:text-gray-500 dark:border-gray-700 dark:bg-gray-800
                    dark:text-gray-100 dark:placeholder:text-gray-400"
                  placeholder="Type your command here..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const command = e.currentTarget.value.toLowerCase();
                      if (command) {
                        setCommandHistory((prev) => [
                          ...prev.slice(-4),
                          command,
                        ]);
                        if (command in customCommands) {
                          customCommands[command]();
                        }
                        onCommand?.(command);
                        e.currentTarget.value = "";
                      }
                    }
                  }}
                  aria-label="Command input"
                />
              </div>
            )}
            {commandHistory.length > 0 && (
              <div className={`mt-3 border-t pt-2 ${currentTheme.borderColor}`}>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Recent Commands:
                </div>
                <ul
                  className="mt-1 space-y-1"
                  role="log"
                  aria-label="Command history"
                >
                  {commandHistory.map((cmd, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-sm"
                    >
                      {cmd}
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
