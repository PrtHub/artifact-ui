"use client";

import CanvasGrid from "@/registry/default/ui/canvas-grid";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  IconBrandBehance,
  IconBrandDribbble,
  IconHeart,
  IconShare,
} from "@tabler/icons-react";

// Example grid layouts
const gridExamples = {
  photoGallery: {
    title: "Photo Gallery Grid",
    description: "A classic photo gallery layout with varying image sizes",
    items: [
      {
        id: "photo1",
        content: (
          <Card className="h-full overflow-hidden">
            <div className="h-full bg-gradient-to-br from-blue-400 to-indigo-500 p-4">
              <h3 className="text-lg font-semibold text-white">
                Landscape View
              </h3>
            </div>
          </Card>
        ),
        width: 2,
        height: 1,
      },
      {
        id: "photo2",
        content: (
          <Card className="h-full overflow-hidden">
            <div className="h-full bg-gradient-to-tr from-purple-400 to-pink-500 p-4">
              <h3 className="text-lg font-semibold text-white">
                Portrait Shot
              </h3>
            </div>
          </Card>
        ),
        width: 1,
        height: 2,
      },
      {
        id: "photo3",
        content: (
          <Card className="h-full overflow-hidden">
            <div className="h-full bg-gradient-to-bl from-green-400 to-emerald-500 p-4">
              <h3 className="text-lg font-semibold text-white">Square Frame</h3>
            </div>
          </Card>
        ),
        width: 1,
        height: 1,
      },
      {
        id: "photo4",
        content: (
          <Card className="h-full overflow-hidden">
            <div className="h-full bg-gradient-to-br from-yellow-400 to-orange-500 p-4">
              <h3 className="text-lg font-semibold text-white">Sunset View</h3>
            </div>
          </Card>
        ),
        width: 1,
        height: 1,
      },
      {
        id: "photo5",
        content: (
          <Card className="h-full overflow-hidden">
            <div className="h-full bg-gradient-to-tr from-rose-400 to-pink-500 p-4">
              <h3 className="text-lg font-semibold text-white">Urban Scene</h3>
            </div>
          </Card>
        ),
        width: 1,
        height: 1,
      },
      {
        id: "photo6",
        content: (
          <Card className="h-full overflow-hidden">
            <div className="h-full bg-gradient-to-bl from-violet-400 to-indigo-500 p-4">
              <h3 className="text-lg font-semibold text-white">Night City</h3>
            </div>
          </Card>
        ),
        width: 1,
        height: 1,
      },
    ],
  },

  dashboardLayout: {
    title: "Dashboard Grid",
    description: "A modern dashboard layout with widgets",
    items: [
      {
        id: "stats",
        content: (
          <Card className="h-full bg-gradient-to-r from-slate-100 to-slate-200 p-6 dark:from-slate-800 dark:to-slate-900">
            <h3 className="mb-2 text-lg font-semibold">Statistics Overview</h3>
            <div className="mt-4 space-y-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-2 rounded-full bg-slate-300 dark:bg-slate-700"
                />
              ))}
            </div>
          </Card>
        ),
        width: 2,
        height: 1,
      },
      {
        id: "chart",
        content: (
          <Card className="h-full bg-gradient-to-b from-violet-100 to-violet-200 p-6 dark:from-violet-900 dark:to-violet-950">
            <h3 className="mb-2 text-lg font-semibold">Analytics Chart</h3>
            <div className="mt-4 flex h-32 items-end space-x-2">
              {[40, 70, 45, 30, 60].map((h, i) => (
                <div
                  key={i}
                  className="w-full rounded-t bg-violet-500/50"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </Card>
        ),
        width: 2,
        height: 2,
      },
      {
        id: "notifications",
        content: (
          <Card className="h-full bg-gradient-to-r from-rose-100 to-rose-200 p-6 dark:from-rose-900 dark:to-rose-950">
            <h3 className="mb-2 text-lg font-semibold ">Notifications</h3>
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-rose-500" />
                  <div className="h-2 w-full rounded-full bg-rose-300 dark:bg-rose-800" />
                </div>
              ))}
            </div>
          </Card>
        ),
        width: 2,
        height: 1,
      },
    ],
  },

  portfolioShowcase: {
    title: "Portfolio Showcase",
    description: "A creative portfolio layout with featured works",
    items: [
      {
        id: "featured",
        content: (
          <Card className="h-full overflow-hidden">
            <div className="h-full bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 p-6">
              <h3 className="text-2xl font-bold text-white">
                Featured Project
              </h3>
              <p className="mt-2 text-amber-100">
                Award-winning design showcase
              </p>
            </div>
          </Card>
        ),
        width: 3,
        height: 1,
      },
      {
        id: "project1",
        content: (
          <Card className="h-full overflow-hidden">
            <div className="h-full bg-gradient-to-tr from-teal-400 to-emerald-500 p-4">
              <h3 className="text-lg font-semibold text-white">
                Project Alpha
              </h3>
            </div>
          </Card>
        ),
        width: 1,
        height: 1,
      },
      {
        id: "project2",
        content: (
          <Card className="h-full overflow-hidden">
            <div className="h-full bg-gradient-to-bl from-cyan-400 to-blue-500 p-4">
              <h3 className="text-lg font-semibold text-white">Project Beta</h3>
            </div>
          </Card>
        ),
        width: 2,
        height: 1,
      },
      {
        id: "project3",
        content: (
          <Card className="h-full overflow-hidden">
            <div className="h-full bg-gradient-to-bl from-fuchsia-400 to-purple-500 p-4">
              <h3 className="text-lg font-semibold text-white">
                Project Gamma
              </h3>
              <p className="mt-1 text-sm text-fuchsia-100">
                Interactive Experience
              </p>
            </div>
          </Card>
        ),
        width: 2,
        height: 1,
      },
    ],
  },

  interactiveArtGallery: {
    title: "Interactive Art Gallery",
    description:
      "An immersive art gallery with interactive elements and dynamic effects",
    items: [
      {
        id: "featured-art",
        content: (
          <motion.div whileHover={{ scale: 1.02 }} className="h-full">
            <Card className="group h-full overflow-hidden bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
              <div className="relative h-full p-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)] transition-opacity duration-500 group-hover:opacity-70" />
                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div>
                    <h3 className="text-3xl font-bold text-white">
                      Neon Dreams
                    </h3>
                    <p className="mt-2 text-purple-100">
                      Digital Art Collection 2024
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-1 rounded-full bg-white/10 px-4 py-2 text-white backdrop-blur-sm"
                      >
                        <IconHeart size={18} />
                        <span>2.4k</span>
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-1 rounded-full bg-white/10 px-4 py-2 text-white backdrop-blur-sm"
                      >
                        <IconShare size={18} />
                        <span>Share</span>
                      </motion.button>
                    </div>
                    <div className="flex space-x-2">
                      <IconBrandDribbble className="h-6 w-6 text-white/80" />
                      <IconBrandBehance className="h-6 w-6 text-white/80" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ),
        width: 2,
        height: 2,
      },
      {
        id: "art-piece-1",
        content: (
          <motion.div
            whileHover={{ scale: 1.05, rotateZ: 2 }}
            className="h-full"
          >
            <Card className="group h-full overflow-hidden">
              <div className="relative h-full bg-gradient-to-tr from-emerald-400 to-cyan-500 p-4">
                <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(255,255,255,0.1)_0deg,transparent_60deg,transparent_300deg,rgba(255,255,255,0.1)_360deg)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold text-white">
                    Geometric Harmony
                  </h3>
                  <p className="mt-1 text-sm text-emerald-100">
                    Abstract Series
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ),
        width: 1,
        height: 1,
      },
      {
        id: "art-piece-2",
        content: (
          <motion.div
            whileHover={{ scale: 1.05, rotateZ: -2 }}
            className="h-full"
          >
            <Card className="group h-full overflow-hidden">
              <div className="relative h-full bg-gradient-to-bl from-amber-400 to-orange-500 p-4">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.1)_0px,transparent_2px,transparent_8px)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold text-white">
                    Solar Flare
                  </h3>
                  <p className="mt-1 text-sm text-amber-100">Light Study</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ),
        width: 1,
        height: 1,
      },
      {
        id: "art-piece-3",
        content: (
          <motion.div
            whileHover={{ scale: 1.05, rotateZ: -2 }}
            className="h-full"
          >
            <Card className="group h-full overflow-hidden">
              <div className="relative h-full bg-gradient-to-bl from-violet-400 to-purple-500 p-4">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.1)_0px,transparent_2px,transparent_8px)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold text-white">
                    Digital Wave
                  </h3>
                  <p className="mt-1 text-sm text-violet-100">Digital Series</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ),
        width: 2,
        height: 1,
      },
    ],
  },

  magazineLayout: {
    title: "Magazine Layout",
    description: "A modern editorial layout inspired by digital magazines",
    items: [
      {
        id: "cover-story",
        content: (
          <Card className="group h-full overflow-hidden">
            <div className="relative h-full bg-gradient-to-br from-neutral-900 to-neutral-800 p-8">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGgLTJWMTZoMnYxOHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvZz48L3N2Zz4=')] opacity-20" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <div className="inline-block rounded-full bg-white/10 px-3 py-1 text-sm text-white">
                    Featured Story
                  </div>
                  <h2 className="mt-4 text-4xl font-bold leading-tight text-white">
                    The Future of Digital Design
                  </h2>
                  <p className="mt-4 max-w-lg text-lg text-neutral-300">
                    Exploring the intersection of AI, creativity, and
                    human-centered design in the modern age.
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-neutral-400 to-neutral-300" />
                  <div>
                    <div className="text-sm font-medium text-white">
                      Sarah Anderson
                    </div>
                    <div className="text-sm text-neutral-400">
                      Design Director
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ),
        width: 3,
        height: 2,
      },
      {
        id: "quote",
        content: (
          <Card className="h-full overflow-hidden bg-gradient-to-r from-rose-100 to-teal-100 dark:from-rose-900 dark:to-teal-900">
            <div className="flex h-full items-center justify-center p-6 text-center">
              <div>
                <div className="font-serif text-4xl">&quot;</div>
                <p className="font-serif text-xl italic leading-relaxed">
                  Design is not just what it looks like and feels like. Design
                  is how it works.
                </p>
                <div className="mt-4 text-sm font-medium">— Steve Jobs</div>
              </div>
            </div>
          </Card>
        ),
        width: 1,
        height: 2,
      },
    ],
  },

  creativeStudio: {
    title: "Creative Studio Showcase",
    description: "A dynamic showcase of our creative studio's work and team",
    items: [
      {
        id: "stats",
        content: (
          <Card className="h-full overflow-hidden">
            <div className="flex h-full flex-col bg-gradient-to-br from-violet-500 to-purple-600 p-6">
              <h3 className="text-lg font-semibold text-white">
                Studio Metrics
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {[
                  { label: "Projects", value: "150+" },
                  { label: "Clients", value: "80+" },
                  { label: "Awards", value: "25" },
                  { label: "Team Size", value: "32" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-sm text-purple-200">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ),
        width: 2,
        height: 1,
      },
      {
        id: "timeline",
        content: (
          <Card className="h-full overflow-hidden">
            <div className="h-full bg-gradient-to-tr from-blue-500 to-cyan-500 p-6">
              <h3 className="text-lg font-semibold text-white">
                Project Timeline
              </h3>
              <div className="mt-4 space-y-3">
                {[
                  { phase: "Discovery", progress: 100 },
                  { phase: "Design", progress: 80 },
                  { phase: "Development", progress: 60 },
                  { phase: "Testing", progress: 30 },
                ].map((phase) => (
                  <div key={phase.phase} className="space-y-1">
                    <div className="flex justify-between text-sm text-blue-100">
                      <span>{phase.phase}</span>
                      <span>{phase.progress}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-blue-400/30">
                      <div
                        className="h-full rounded-full bg-white transition-all duration-500"
                        style={{ width: `${phase.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ),
        width: 2,
        height: 2,
      },
      {
        id: "testimonial",
        content: (
          <Card className="h-full overflow-hidden">
            <div className="flex h-full flex-col justify-between bg-gradient-to-bl from-amber-500 to-orange-600 p-6">
              <div className="text-lg italic text-white">
                &quot;Their creative approach and attention to detail exceeded
                our expectations. Truly outstanding work!&quot;
              </div>
              <div className="mt-4">
                <div className="font-medium text-white">Alex Chen</div>
                <div className="text-sm text-amber-200">
                  CEO, TechVision Inc.
                </div>
              </div>
            </div>
          </Card>
        ),
        width: 2,
        height: 1,
      },
    ],
  },
};

export default function CanvasGridDemo() {
  return (
    <div className="w-full space-y-16 p-0 2xl:p-8">
      {Object.entries(gridExamples).map(([key, example]) => (
        <div key={key} className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {example.title}
            </h2>
            <p className="text-muted-foreground">{example.description}</p>
          </div>
          <div className="rounded-xl border bg-background/50 p-6">
            <CanvasGrid
              items={example.items}
              columns={4}
              gap={8}
              className="relative z-10"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
