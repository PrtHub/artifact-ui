import { MainNavItem, SidebarNavItem } from "@/types";

interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Components",
      href: "/docs/components/sketch-input",
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
          items: [],
        },
        {
          title: "Installation",
          href: "/docs/installation",
          items: [],
        },
      ],
    },
    {
      title: "Components",
      items: [
        {
          title: "Canvas Button",
          href: "/docs/components/canvas-button",
          items: [],
        },
        {
          title: "Color Palette",
          href: "/docs/components/color-palette",
          items: [],
        },
        {
          title: "Texture Browser",
          href: "/docs/components/texture-browser",
          items: [],
        },
        {
          title: "Creative OTP Input",
          href: "/docs/components/creative-otp-input",
          items: [],
          label: "New",
        },
        {
          title: "Collapsible Card",
          href: "/docs/components/collapsible-card",
          items: [],
        },
        {
          title: "Sketch Input",
          href: "/docs/components/sketch-input",
          items: [],
        },
        {
          title: "Gallery Grid",
          href: "/docs/components/gallery-grid",
          items: [],
        },
        {
          title: "Canvas Color Picker",
          href: "/docs/components/canvas-color-picker",
          items: [],
        },
        {
          title: "Easel Tabs",
          href: "/docs/components/easel-tabs",
          items: [],
        },
        {
          title: "Palette Navigation",
          href: "/docs/components/palette-navigation",
          items: [],
        },
        {
          title: "Canvas Modal",
          href: "/docs/components/canvas-modal",
          items: [],
        },
        {
          title: "Color Scheme Generator",
          href: "/docs/components/color-scheme-generator",
          items: [],
        },
        {
          title: "Brush Stroke Loader",
          href: "/docs/components/brush-stroke-loader",
          items: [],
        },
        {
          title: "Art Board Layout",
          href: "/docs/components/art-board-layout",
          items: [],
        },
        {
          title: "Palette Toast",
          href: "/docs/components/palette-toast",
          items: [],
        },
        {
          title: "Canvas Drawer",
          href: "/docs/components/canvas-drawer",
          items: [],
        },
        {
          title: "Texture Overlay",
          href: "/docs/components/texture-overlay",
          items: [],
        },
        {
          title: "Canvas Grid",
          href: "/docs/components/canvas-grid",
          items: [],
        },
        {
          title: "Canvas Dock",
          href: "/docs/components/canvas-dock",
          items: [],
        },
        {
          title: "Artistic Navigation",
          href: "/docs/components/artistic-navigation",
          items: [],
        },
        {
          title: "Canvas Slider",
          href: "/docs/components/canvas-slider",
          items: [],
        },
        {
          title: "Sketch Accordion",
          href: "/docs/components/sketch-accordion",
          items: [],
        },
        {
          title: "Studio Light",
          href: "/docs/components/studio-light",
          items: [],
        },
        {
          title: "Canvas Menu",
          href: "/docs/components/canvas-menu",
          items: [],
        },
        {
          title: "Ink Alert",
          href: "/docs/components/ink-alert",
          items: [],
        },
        {
          title: "Artistic Tooltip",
          href: "/docs/components/artistic-tooltip",
          items: [],
        },
        {
          title: "Canvas Annotations",
          href: "/docs/components/canvas-annotations",
          items: [],
        },
        {
          title: "Layer Manager",
          href: "/docs/components/layer-manager",
          items: [],
        },
        {
          title: "Brush Style Selector",
          href: "/docs/components/brush-style-selector",
          items: [],
        },
        {
          title: "Pattern Library",
          href: "/docs/components/pattern-library",
          items: [],
        },
        {
          title: "Art Board Presets",
          href: "/docs/components/art-board-presets",
          items: [],
        },
        {
          title: "Canvas Timeline",
          href: "/docs/components/canvas-timeline",
          items: [],
        },
        {
          title: "Artistic Data Viz",
          href: "/docs/components/artistic-data-viz",
          items: [],
        },
        {
          title: "Artistic Statistics Card",
          href: "/docs/components/artistic-statistics-card",
          items: [],
        },
        {
          title: "Stepper",
          href: "/docs/components/stepper",
          items: [],
        },
        {
          title: "Studio Pagination",
          href: "/docs/components/studio-pagination",
          items: [],
        },
        {
          title: "Gallery Flow",
          href: "/docs/components/gallery-flow",
          items: [],
        },
        {
          title: "Studio Shortcuts Guide",
          href: "/docs/components/studio-shortcuts-guide",
          items: [],
        },
        {
          title: "Creative Clipboard Actions",
          href: "/docs/components/creative-clipboard-actions",
          items: [],
        },
        {
          title: "Studio Share Module",
          href: "/docs/components/studio-share-module",
          items: [],
        },
      ],
    },
  ],
};
