"use client";

import { Home, User, Settings, Mail } from "lucide-react";
import ArtisticNavigation from "@/registry/default/ui-canvas/artistic-navigation";
import { motion } from "framer-motion";

export default function ArtisticNavigationDemo() {
  const navItems = [
    { label: "Home", href: "#", icon: <Home /> },
    { label: "Profile", href: "#", icon: <User /> },
    { label: "Settings", href: "#", icon: <Settings /> },
    { label: "Contact", href: "#", icon: <Mail /> },
  ];

  return (
    <div className="relative flex min-h-[500px] w-full flex-col items-center gap-12 overflow-hidden bg-gradient-to-b from-background via-background/90 to-muted/30 p-12">
      {/* Background ambient effects */}
      <div className="bg-grid-white/[0.02] absolute inset-0" />
      <div className="bg-gradient-radial absolute inset-0 from-primary/5 via-transparent to-transparent opacity-50" />

      <div className="relative w-full max-w-4xl">
        <motion.div
          className="via-primary/2 absolute -inset-4 rounded-2xl bg-gradient-to-b from-primary/5 to-transparent opacity-50 blur-xl"
          animate={{
            scale: [1, 1.02, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <ArtisticNavigation items={navItems} />
      </div>

      {/* Scroll content to demonstrate transformation */}
      <div className="relative w-full max-w-4xl space-y-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            viewport={{ once: true, margin: "-50px" }}
            className="group relative rounded-xl bg-card/40 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-card/60"
          >
            {/* Card glow effect */}
            <motion.div className="absolute -inset-px rounded-xl bg-gradient-to-b from-primary/10 to-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <motion.h3
              className="relative mb-3 text-lg font-semibold tracking-tight"
              initial={{ opacity: 0.7 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              Section {i + 1}
            </motion.h3>
            <p className="relative text-muted-foreground/80 transition-colors duration-300 group-hover:text-muted-foreground">
              Scroll down to see the navigation transform. Hover over items to
              see the artistic effects in action. The navigation responds to
              your scroll position with subtle animations.
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
