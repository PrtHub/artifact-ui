import { MainNavItem, SidebarNavItem } from "@/types";

interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Getting Started",
      href: "/docs",
    },
    {
      title: "Components",
      href: "/components",
    },
    // {
    //   title: "Showcase",
    //   href: "/showcase",
    // },
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
        // {
        //   title: "CLI",
        //   href: "/docs/cli",
        //   items: [],
        // },
      ],
    },
    // {
    //   title: "Templates",
    //   items: [
    //     {
    //       title: "Dev Tool",
    //       href: `/docs/templates/devtool`,
    //       items: [],
    //       label: "New",
    //       paid: true,
    //       event: "template_devtool_clicked",
    //     },
    //     {
    //       title: "Mobile",
    //       href: `/docs/templates/mobile`,
    //       items: [],
    //       label: "",
    //       paid: true,
    //       event: "template_mobile_clicked",
    //     },
    //     {
    //       title: "SaaS",
    //       href: `/docs/templates/saas`,
    //       items: [],
    //       label: "",
    //       paid: true,
    //       event: "template_saas_clicked",
    //     },

    //     {
    //       title: "Startup",
    //       href: `/docs/templates/startup`,
    //       items: [],
    //       label: "",
    //       paid: true,
    //       event: "template_startup_clicked",
    //     },
    //     {
    //       title: "Portfolio",
    //       href: `/docs/templates/portfolio`,
    //       items: [],
    //       label: "",
    //       event: "template_portfolio_clicked",
    //     },
    //   ],
    // },
    {
      title: "Components",
      items: [
        {
          title: "Canvas Button",
          href: "/docs/components/canvas-button",
          items: [],
          label: "New",
        },
        {
          title: "Color Palette",
          href: "/docs/components/color-palette",
          items: [],
          label: "New",
        },
      ],
    },
  ],
};
