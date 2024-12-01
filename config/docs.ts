import { MainNavItem, SidebarNavItem } from "@/types";

interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Docs",
      href: "/docs",
    },
    {
      title: "Components",
      href: "/docs/components/canvas-button",
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
          title: "Sketch Input",
          href: "/docs/components/sketch-input",
          items: [],
        },
        // {
        //   title: "Painterly Select",
        //   href: "/docs/components/painterly-select",
        //   items: [],
        //   label: "New",
        // },
        {
          title: "Gallery Grid",
          href: "/docs/components/gallery-grid",
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
          label: "New",
        },
        {
          title: "Canvas Drawer",
          href: "/docs/components/canvas-drawer",
          items: [],
          label: "New",
        },
      ],
    },
  ],
};
