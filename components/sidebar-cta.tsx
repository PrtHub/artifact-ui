"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import posthog from "posthog-js";

export default function SidebarCTA() {
  return (
    <Link
      href="https://github.com/PrtHub/ui-canvas"
      target="_blank"
      onClick={() => posthog.capture("sidebar_cta_clicked")}
      className="group my-20 flex w-full flex-col items-center justify-center gap-2 rounded-xl bg-indigo-600 p-4 text-center text-lg font-medium leading-tight text-white"
    >
      <video
        autoPlay
        loop
        playsInline
        muted
        src="/startup-template-demo.mp4"
        className="w-full overflow-hidden rounded-xl shadow-2xl"
      />
    </Link>
  );
}
