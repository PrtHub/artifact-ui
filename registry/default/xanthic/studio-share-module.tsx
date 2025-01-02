"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Share2,
  Link,
  QrCode,
  X,
  ChevronDown,
  Sparkles,
  Twitter,
  Facebook,
  Linkedin,
  Mail,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import CreativeClipboardActions from "./creative-clipboard-actions";

interface StudioShareModuleProps {
  url: string;
  title?: string;
  description?: string;
  theme?: keyof typeof themes;
  position?: "center" | "bottom-right";
  className?: string;
  iconClassName?: string;
  buttonClassName?: string;
  showQR?: boolean;
  platforms?: Array<"twitter" | "instagram" | "linkedin" | "email">;
  customPlatforms?: Array<{
    name: string;
    icon: (props: any) => JSX.Element;
    color: string;
    hoverEffect: string;
    getUrl: (url: string, title?: string) => string;
  }>;
  darkMode?: boolean;
}

interface Platform {
  name: string;
  icon: (props: any) => JSX.Element;
  color: string;
  hoverEffect: string;
  getUrl: (url: string, title?: string) => string;
}

const socialPlatforms: Platform[] = [
  {
    name: "twitter",
    icon: (props: any) => (
      <svg
        viewBox="0 0 24 24"
        className={cn("h-6 w-6 fill-current", props.className)}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14.258 10.152L23.176 0h-2.113l-7.747 8.813L7.133 0H0l9.352 13.328L0 23.973h2.113l8.176-9.309 6.531 9.309h7.133zm-2.895 3.293l-.949-1.328L2.875 1.56h3.246l6.086 8.523.945 1.328 7.91 11.078h-3.246zm0 0" />
      </svg>
    ),
    color: "bg-[#1DA1F2] dark:bg-[#1DA1F2]/80",
    hoverEffect: "hover:shadow-[#1DA1F2]/50 hover:shadow-xl",
    getUrl: (url: string, title: any) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    name: "instagram",
    icon: (props: any) => (
      <svg
        viewBox="0 0 24 24"
        className={cn("h-6 w-6 fill-current", props.className)}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    color:
      "bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] dark:from-[#833AB4]/80 dark:via-[#FD1D1D]/80 dark:to-[#FCAF45]/80",
    hoverEffect: "hover:shadow-[#FD1D1D]/50 hover:shadow-xl",
    getUrl: (url: string) =>
      `https://instagram.com/share?url=${encodeURIComponent(url)}`,
  },
  {
    name: "linkedin",
    icon: (props: any) => (
      <svg
        viewBox="0 0 24 24"
        className={cn("h-6 w-6 fill-current", props.className)}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M19 0H5a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5V5a5 5 0 00-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z" />
      </svg>
    ),
    color: "bg-[#0077B5] dark:bg-[#0077B5]/80",
    hoverEffect: "hover:shadow-[#0077B5]/50 hover:shadow-xl",
    getUrl: (url: string, title: any) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  },
  {
    name: "email",
    icon: (props: any) => (
      <svg
        viewBox="0 0 24 24"
        className={cn("h-6 w-6 fill-current", props.className)}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
    color: "bg-gray-600 dark:bg-gray-500/80",
    hoverEffect: "hover:shadow-gray-500/50 hover:shadow-xl",
    getUrl: (url: string, title: any) =>
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
  },
];

const themes = {
  neon: {
    container: "bg-black/90 border-primary/50 shadow-primary/20 shadow-lg",
    button:
      "bg-black/60 hover:bg-black/80 dark:bg-primary/20 hover:dark:bg-primary/30 text-white dark:text-primary border border-primary/50",
    socialButton: "backdrop-blur-xl shadow-lg",
    text: "text-white dark:text-foreground",
    highlight: "text-white dark:text-primary",
    glow: "animate-glow",
  },
  glassmorphism: {
    container:
      "bg-black/20 dark:bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg",
    button:
      "bg-black/20 hover:bg-black/30 dark:bg-white/20 hover:dark:bg-white/30 text-white border border-white/30",
    socialButton:
      "backdrop-blur-xl bg-black/20 dark:bg-white/10 border border-white/20",
    text: "text-white",
    highlight: "text-white",
    glow: "",
  },
  gradient: {
    container:
      "bg-gradient-to-br from-purple-500/90 to-pink-500/90 dark:from-purple-600/90 dark:to-pink-600/90 border-white/10",
    button: "bg-white/20 hover:bg-white/30 text-white border border-white/20",
    socialButton: "bg-white/20 hover:bg-white/30",
    text: "text-white",
    highlight: "text-white font-bold",
    glow: "",
  },
  minimal: {
    container: "bg-white dark:bg-background border shadow-sm",
    button:
      "bg-gray-100 hover:bg-gray-200 dark:bg-muted hover:dark:bg-muted/80 border text-gray-800 dark:text-white",
    socialButton:
      "bg-gray-100 hover:bg-gray-200 dark:bg-muted hover:dark:bg-muted/80 text-gray-800 dark:text-white",
    text: "text-gray-800 dark:text-foreground",
    highlight: "text-gray-900 dark:text-foreground font-bold",
    glow: "",
  },
  cyberpunk: {
    container:
      "bg-yellow-950/90 dark:bg-yellow-900/90 border-yellow-400/50 shadow-yellow-400/20",
    button:
      "bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-500 dark:text-yellow-400 border border-yellow-400/50",
    socialButton:
      "backdrop-blur-xl shadow-lg from-yellow-400 to-red-500 text-yellow-900 dark:text-white",
    text: "text-yellow-500 dark:text-yellow-400",
    highlight: "text-yellow-600 dark:text-yellow-300 font-bold",
    glow: "animate-pulse",
  },
  aurora: {
    container:
      "bg-gradient-to-br from-emerald-400/30 to-blue-400/30 dark:from-green-500/20 dark:to-blue-500/20 backdrop-blur-xl border-white/10",
    button:
      "bg-emerald-950/20 hover:bg-emerald-950/30 dark:bg-white/10 hover:dark:bg-white/20 text-emerald-950 dark:text-white border border-emerald-400/30 dark:border-white/20",
    socialButton:
      "backdrop-blur-xl bg-emerald-950/20 hover:bg-emerald-950/30 dark:bg-white/10 hover:dark:bg-white/20 text-emerald-950 dark:text-white",
    text: "text-emerald-950 dark:text-white",
    highlight: "text-emerald-600 dark:text-emerald-300",
    glow: "animate-aurora",
  },
  retro: {
    container:
      "bg-indigo-950/90 dark:bg-indigo-900/90 border-orange-500/50 shadow-orange-500/20",
    button:
      "bg-orange-500/20 hover:bg-orange-500/30 text-orange-600 dark:text-orange-500 border border-orange-500/50",
    socialButton:
      "bg-gradient-to-r from-orange-400/80 to-pink-400/80 dark:from-orange-500/80 dark:to-pink-500/80 text-white",
    text: "text-orange-600 dark:text-orange-500",
    highlight: "text-orange-500 dark:text-orange-400 font-bold",
    glow: "animate-retro",
  },
  synthwave: {
    container:
      "bg-gradient-to-br from-purple-800/90 via-pink-800/90 to-indigo-800/90 dark:from-purple-900/90 dark:via-pink-900/90 dark:to-indigo-900/90 border-pink-500/30",
    button:
      "bg-gradient-to-r from-pink-400/20 to-purple-400/20 hover:from-pink-400/30 hover:to-purple-400/30 dark:from-pink-500/20 dark:to-purple-500/20 hover:dark:from-pink-500/30 hover:dark:to-purple-500/30 text-white border border-pink-500/30",
    socialButton:
      "bg-gradient-to-r from-pink-400/80 to-purple-400/80 dark:from-pink-500/80 dark:to-purple-500/80 text-white",
    text: "text-white",
    highlight: "text-pink-200 dark:text-pink-300 font-bold",
    glow: "animate-synthwave",
  },
  nature: {
    container:
      "bg-gradient-to-br from-green-700/90 to-emerald-800/90 dark:from-green-800/90 dark:to-emerald-900/90 border-emerald-400/30",
    button:
      "bg-emerald-400/20 hover:bg-emerald-400/30 dark:bg-emerald-500/20 hover:dark:bg-emerald-500/30 text-white border border-emerald-400/30",
    socialButton:
      "bg-gradient-to-r from-green-400/80 to-emerald-400/80 dark:from-green-500/80 dark:to-emerald-500/80 text-white",
    text: "text-white",
    highlight: "text-emerald-200 dark:text-emerald-300 font-bold",
    glow: "animate-nature",
  },
  ocean: {
    container:
      "bg-gradient-to-br from-blue-800/90 to-cyan-800/90 dark:from-blue-900/90 dark:to-cyan-900/90 border-cyan-400/30",
    button:
      "bg-cyan-400/20 hover:bg-cyan-400/30 dark:bg-cyan-500/20 hover:dark:bg-cyan-500/30 text-white border border-cyan-400/30",
    socialButton:
      "bg-gradient-to-r from-blue-400/80 to-cyan-400/80 dark:from-blue-500/80 dark:to-cyan-500/80 text-white",
    text: "text-white",
    highlight: "text-cyan-200 dark:text-cyan-300 font-bold",
    glow: "animate-ocean",
  },
} as const;

const globalStyles = `
@keyframes aurora {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes synthwave {
  0% { text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff; }
  50% { text-shadow: 0 0 20px #00ffff, 0 0 30px #00ffff, 0 0 40px #00ffff; }
  100% { text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff; }
}

@keyframes retro {
  0% { text-shadow: 0 0 10px #ff6b00, 0 0 20px #ff6b00; }
  50% { text-shadow: 0 0 20px #ff6b00, 0 0 30px #ff6b00; }
  100% { text-shadow: 0 0 10px #ff6b00, 0 0 20px #ff6b00; }
}

@keyframes nature {
  0% { box-shadow: 0 0 10px #10b981, 0 0 20px #10b981; }
  50% { box-shadow: 0 0 20px #10b981, 0 0 30px #10b981; }
  100% { box-shadow: 0 0 10px #10b981, 0 0 20px #10b981; }
}

@keyframes ocean {
  0% { box-shadow: 0 0 10px #06b6d4, 0 0 20px #06b6d4; }
  50% { box-shadow: 0 0 20px #06b6d4, 0 0 30px #06b6d4; }
  100% { box-shadow: 0 0 10px #06b6d4, 0 0 20px #06b6d4; }
}

.animate-aurora {
  animation: aurora 3s ease infinite;
  background-size: 200% 200%;
}

.animate-synthwave {
  animation: synthwave 3s ease infinite;
}

.animate-retro {
  animation: retro 3s ease infinite;
}

.animate-nature {
  animation: nature 3s ease infinite;
}

.animate-ocean {
  animation: ocean 3s ease infinite;
}
`;

const ShareButton = ({
  icon: Icon,
  onClick,
  label,
  color,
  hoverEffect,
  theme,
  darkMode,
  className,
  iconClassName,
}: {
  icon: any;
  onClick: () => void;
  label: string;
  color: string;
  hoverEffect: string;
  theme: keyof typeof themes;
  darkMode?: boolean;
  className?: string;
  iconClassName?: string;
}) => (
  <motion.button
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={cn(
      "group relative flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300",
      color,
      hoverEffect,
      themes[theme].socialButton,
      darkMode ? "dark" : "",
      className,
    )}
  >
    <motion.div
      className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      initial={false}
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
    <Icon
      className={cn(
        "text-white transition-all duration-300 group-hover:scale-110",
        iconClassName,
      )}
    />
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileHover={{ opacity: 1, y: 0 }}
      className={cn(
        "absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs",
        darkMode ? "text-gray-300" : "text-muted-foreground",
      )}
    >
      {label}
    </motion.span>
    <motion.div
      className={cn(
        "absolute -right-1 -top-1 h-2 w-2 rounded-full",
        darkMode ? "bg-white/30" : "bg-white/50",
      )}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </motion.button>
);

export default function StudioShareModule({
  url,
  title = "",
  description = "",
  theme = "neon",
  position = "center",
  className,
  iconClassName,
  buttonClassName,
  platforms = ["twitter", "instagram", "linkedin", "email"],
  customPlatforms = [],
  darkMode = false,
}: StudioShareModuleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  const handleShare = (platform: Platform) => {
    window.open(platform.getUrl(url, title), "_blank");
  };

  const containerPosition =
    position === "center"
      ? "fixed inset-0 flex items-center justify-center"
      : "fixed bottom-4 right-4";

  if (!isOpen) {
    return (
      <motion.button
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-4 right-4 flex h-14 w-14 items-center justify-center rounded-full",
          themes[theme].button,
          themes[theme].glow,
        )}
      >
        <Share2 className="h-6 w-6" />
        <motion.div
          className="absolute -right-1 -top-1 h-3 w-3"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.8, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Sparkles className="h-3 w-3 text-primary" />
        </motion.div>
      </motion.button>
    );
  }

  return (
    <MotionConfig reducedMotion="user">
      <motion.div className={containerPosition}>
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={cn(
              "relative w-full max-w-md rounded-3xl border p-6",
              themes[theme].container,
              className,
            )}
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 rounded-full p-2 text-white hover:bg-muted/20"
            >
              <X className="h-5 w-5" />
            </motion.button>

            <div className="mb-6 space-y-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2"
              >
                <Share2 className={cn("h-5 w-5", themes[theme].highlight)} />
                <h3
                  className={cn("text-xl font-bold", themes[theme].highlight)}
                >
                  Share {title}
                </h3>
              </motion.div>
              <p className={cn("text-sm", themes[theme].text)}>{description}</p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-4 gap-4"
            >
              {[
                ...socialPlatforms.filter((platform: any) =>
                  platforms.includes(platform.name),
                ),
                ...customPlatforms,
              ].map((platform) => (
                <ShareButton
                  key={platform.name}
                  icon={platform.icon}
                  onClick={() => handleShare(platform)}
                  label={platform.name}
                  color={platform.color}
                  hoverEffect={platform.hoverEffect}
                  theme={theme}
                  darkMode={darkMode}
                  className={buttonClassName}
                  iconClassName={iconClassName}
                />
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-6"
            >
              <motion.div
                className="flex gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="group relative flex-1 overflow-hidden rounded-xl border bg-background/50">
                  <motion.input
                    type="text"
                    value={url}
                    readOnly
                    className="z-20 w-full bg-transparent px-4 py-3 pr-12 text-sm"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  />
                  <div className="absolute right-2 top-1/2 z-50 -translate-y-1/2">
                    <CreativeClipboardActions
                      text={url}
                      variant={theme === "neon" ? "gradient" : "minimal"}
                      size="sm"
                    />
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowQR(!showQR)}
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl",
                    themes[theme].button,
                  )}
                >
                  <QrCode className="h-5 w-5" />
                </motion.button>
              </motion.div>

              <AnimatePresence>
                {showQR && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6"
                  >
                    <div className="mx-auto w-fit rounded-xl border bg-background/50 p-4">
                      <QRCodeSVG
                        value={url}
                        size={200}
                        level="H"
                        includeMargin
                        className="mx-auto w-fit"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </MotionConfig>
  );
}
