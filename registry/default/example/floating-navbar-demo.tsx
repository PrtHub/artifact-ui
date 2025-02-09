import FloatingNavbar from "@/registry/default/ui/floating-navbar";
import { Button } from "@/components/ui/button";

export default function FloatingNavbarDemo() {
  return (
    <div className="relative min-h-[200vh] w-full bg-gradient-to-b from-background to-muted">
      <FloatingNavbar>
        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-6 text-sm">
            <a
              className="text-muted-foreground transition-colors hover:text-foreground/90"
              href="#home"
            >
              Home
            </a>
            <a
              className="text-muted-foreground transition-colors hover:text-foreground/90"
              href="#features"
            >
              Features
            </a>
            <a
              className="text-muted-foreground transition-colors hover:text-foreground/90"
              href="#about"
            >
              About
            </a>
            <a
              className="text-muted-foreground transition-colors hover:text-foreground/90"
              href="#blog"
            >
              Blog
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 rounded-full px-0"
            >
              <span className="sr-only">Toggle theme</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            </Button>
          </div>
        </div>
      </FloatingNavbar>
      <div className="container mt-20 space-y-10">
        <div className="space-y-2">
          <h4 className="text-xl font-medium">Scroll down to see the effect</h4>
          <p className="text-muted-foreground">
            The navbar will hide when scrolling down and show when scrolling up
          </p>
        </div>
      </div>
    </div>
  );
}
