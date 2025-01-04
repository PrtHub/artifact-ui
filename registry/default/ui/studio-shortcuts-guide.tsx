"use client";

import React, { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Command, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ShortcutItemProps {
  keys: string[];
  description: string;
  category: string;
}

interface ShortcutCategory {
  [key: string]: Array<{
    keys: string[];
    description: string;
  }>;
}

const DEFAULT_SHORTCUTS: ShortcutCategory = {
  general: [
    { keys: ["Ctrl", "S"], description: "Save current work" },
    { keys: ["Ctrl", "Z"], description: "Undo last action" },
    { keys: ["Ctrl", "Y"], description: "Redo last action" },
    { keys: ["Ctrl", "Shift", "Z"], description: "Redo alternative" },
    { keys: ["Ctrl", "/"], description: "Toggle shortcuts guide" },
  ],
  tools: [
    { keys: ["B"], description: "Brush tool" },
    { keys: ["E"], description: "Eraser tool" },
    { keys: ["M"], description: "Move tool" },
    { keys: ["L"], description: "Lasso tool" },
    { keys: ["P"], description: "Pen tool" },
    { keys: ["I"], description: "Eyedropper tool" },
  ],
};

interface StudioShortcutsGuideProps {
  className?: string;
  /** Custom shortcuts to merge with or override default shortcuts */
  shortcuts?: Partial<ShortcutCategory>;
  /** Whether to use only custom shortcuts (true) or merge with defaults (false) */
  customOnly?: boolean;
}

type CategoryState = string | null;
type SearchState = string;

const ShortcutItem: React.FC<ShortcutItemProps> = ({ keys, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 5 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -5 }}
    className="group flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-accent/50"
  >
    <span className="text-sm text-muted-foreground group-hover:text-foreground">
      {description}
    </span>
    <div className="flex gap-1">
      {keys.map((key, index) => (
        <React.Fragment key={index}>
          <motion.kbd
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="pointer-events-none inline-flex h-7 select-none items-center gap-1 rounded border bg-muted px-2.5 font-mono text-[12px] font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            {key}
          </motion.kbd>
          {index < keys.length - 1 && (
            <span className="text-muted-foreground">+</span>
          )}
        </React.Fragment>
      ))}
    </div>
  </motion.div>
);

export default function StudioShortcutsGuide({
  className,
  shortcuts: customShortcuts,
  customOnly = false,
}: StudioShortcutsGuideProps) {
  const [searchQuery, setSearchQuery] = useState<SearchState>("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryState>(null);

  // Merge default and custom shortcuts or use only custom shortcuts
  const shortcuts = useMemo(() => {
    if (customOnly) {
      return customShortcuts || {};
    }
    return {
      ...DEFAULT_SHORTCUTS,
      ...customShortcuts,
      // Deep merge categories if they exist in both
      ...(customShortcuts &&
        Object.entries(customShortcuts).reduce((acc, [category, items]) => {
          if (DEFAULT_SHORTCUTS[category]) {
            acc[category] = [...DEFAULT_SHORTCUTS[category], ...(items ?? [])];
          } else {
            acc[category] = items ?? [];
          }
          return acc;
        }, {} as ShortcutCategory)),
    };
  }, [customShortcuts, customOnly]);

  const filterShortcuts = (shortcuts: ShortcutCategory): ShortcutCategory => {
    return Object.entries(shortcuts).reduce((acc, [category, items]) => {
      if (selectedCategory && category !== selectedCategory) {
        return acc;
      }

      const filteredItems = items.filter(
        (item) =>
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.keys.some((key) =>
            key.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      );

      if (filteredItems.length > 0) {
        acc[category] = filteredItems;
      }

      return acc;
    }, {} as ShortcutCategory);
  };

  const filteredShortcuts = filterShortcuts(shortcuts as ShortcutCategory);
  const categories = Object.keys(shortcuts);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-2">
        <div className="flex items-center">
          <Command className="mr-2 h-4 w-4" />
          <h3 className="text-sm font-semibold">Keyboard Shortcuts</h3>
        </div>
        <div className="flex items-center gap-2">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === category ? null : category,
                )
              }
              className={cn(
                "rounded-md px-2 py-1 text-xs font-medium transition-colors",
                selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80",
              )}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="relative p-4">
        <div className="mb-4 flex items-center gap-2 rounded-md border bg-muted/30 px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search shortcuts..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {Object.entries(filteredShortcuts).map(([category, items]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 last:mb-0"
            >
              <h4 className="mb-2 text-sm font-medium capitalize text-foreground/70">
                {category}
              </h4>
              <div className="space-y-1">
                <AnimatePresence>
                  {items.map((shortcut, index) => (
                    <ShortcutItem
                      key={`${category}-${index}`}
                      keys={shortcut.keys}
                      description={shortcut.description}
                      category={category}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
