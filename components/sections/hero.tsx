import { allDocs } from "content-collections";
import { compareDesc } from "date-fns";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

import TechStack from "@/components/tech-stack";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default async function Hero() {
  const post = allDocs
    .filter(
      (post) =>
        post.date && post.date <= new Date().toISOString() && post.published,
    )
    .sort((a, b) => {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return compareDesc(new Date(a.date), new Date(b.date));
    })[0];

  return (
    <section id="hero" className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background" />

      <div className="container relative mx-auto flex flex-col items-center px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
        {/* Latest post banner */}
        {post && (
          <Link
            href={post.slug}
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "sm",
              }),
              "mx-auto mb-8 inline-flex rounded-full",
            )}
          >
            ✨ <Separator className="mx-2 h-4" orientation="vertical" />
            New: {post.title}
            <ChevronRight className="ml-1 h-4 w-4 text-muted-foreground" />
          </Link>
        )}

        {/* Main content */}
        <div className="text-center">
          <h1 className="font-display mx-auto max-w-4xl text-5xl font-bold tracking-tight text-primary duration-700 animate-in fade-in slide-in-from-bottom-3 sm:text-7xl">
            Create Stunning{' '}
            <span className="relative whitespace-nowrap">
              <span className="relative bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">UI Components</span>
            </span>
            {' '}with Ease
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground delay-150 duration-700 animate-in fade-in slide-in-from-bottom-4">
            A modern, accessible, and customizable UI component library. Build beautiful interfaces faster with our pre-built components, powered by React, TypeScript, and Tailwind CSS.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6 delay-300 duration-700 animate-in fade-in slide-in-from-bottom-5">
            <Link
              href="/components"
              className={cn(
                buttonVariants({
                  variant: "rainbow",
                  size: "lg",
                }),
                "group",
              )}
            >
              Explore Components
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="https://pro.magicui.design"
              className={cn(
                buttonVariants({
                  variant: "rainbow-outline",
                  size: "lg",
                }),
                "group",
              )}
            >
              View Templates
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Tech stack */}
        {/* <div className="mt-16 delay-500 duration-700 animate-in fade-in slide-in-from-bottom-6">
          <p className="mb-6 text-center text-sm font-semibold text-muted-foreground">
            Powered by modern technologies you already love
          </p>
          <TechStack
            className="mx-auto flex max-w-3xl items-center justify-between px-4"
            technologies={[
              "react",
              "typescript",
              "tailwindcss",
              "framermotion",
              "shadcn",
            ]}
          />
        </div> */}
      </div>
    </section>
  );
}
