const { fontFamily } = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ["class"],
  content: [
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./content/**/*.mdx",
    "./registry/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1600px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        gradient: "gradient 8s linear infinite",
        meteor: "meteor 5s linear infinite",
        grid: "grid 15s linear infinite",
        marquee: "marquee var(--duration) infinite linear",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
        "spin-around": "spin-around calc(var(--speed) * 2) infinite linear",
        "shiny-text": "shiny-text 8s infinite",
        "shimmer-slide":
          "shimmer-slide var(--speed) ease-in-out infinite alternate",
        ripple: "ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite",
        rippling: "rippling var(--duration, 0.6s) ease-out",
        line: "line 2s linear infinite",
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
        orbit: "orbit 20s linear infinite",
        "background-position-spin":
          "background-position-spin 3000ms infinite alternate",
        shine: "shine var(--duration) infinite linear",
        pulse: "pulse var(--duration) ease-out infinite",
        rainbow: "rainbow var(--speed, 2s) infinite linear",
        "texture-float": "texture-float 8s ease-in-out infinite",
        "hue-rotate": "hue-rotate 10s linear infinite",
        "ink-spread": "ink-spread 0.5s ease-out forwards",
        "ink-spread-fast": "ink-spread 0.3s ease-out forwards",
        "ink-dissolve": "ink-dissolve 1s ease-out forwards",
        twinkle: "twinkle 3s ease-in-out infinite",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "background-position-spin": {
          "0%": { backgroundPosition: "top center" },
          "100%": { backgroundPosition: "bottom center" },
        },
        gradient: {
          to: {
            backgroundPosition: "var(--bg-size) 0",
          },
        },
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        },
        grid: {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
        "spin-around": {
          "0%": {
            transform: "translateZ(0) rotate(0)",
          },
          "15%, 35%": {
            transform: "translateZ(0) rotate(90deg)",
          },
          "65%, 85%": {
            transform: "translateZ(0) rotate(270deg)",
          },
          "100%": {
            transform: "translateZ(0) rotate(360deg)",
          },
        },
        ripple: {
          "0%, 100%": {
            transform: "translate(-50%, -50%) scale(1)",
          },
          "50%": {
            transform: "translate(-50%, -50%) scale(0.9)",
          },
        },
        rippling: {
          "0%": {
            opacity: "1",
          },
          "100%": {
            transform: "scale(2)",
            opacity: "0",
          }
        },
        "shimmer-slide": {
          to: {
            transform: "translate(calc(100cqw - 100%), 0)",
          },
        },
        line: {
          "0%": { "mask-position-x": "0%" },
          "100%": { "mask-position-x": "100%" },
        },
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
        "shiny-text": {
          "0%, 90%, 100%": {
            "background-position": "calc(-100% - var(--shiny-width)) 0",
          },
          "30%, 60%": {
            "background-position": "calc(100% + var(--shiny-width)) 0",
          },
        },
        orbit: {
          from: { 
            transform: "translate(-50%, -50%) rotate(0deg)"
          },
          to: { 
            transform: "translate(-50%, -50%) rotate(360deg)"
          }
        },
        twinkle: {
          "0%, 100%": { 
            opacity: "0.2",
            transform: "scale(0.8)"
          },
          "50%": {
            opacity: "1",
            transform: "scale(1.2)"
          }
        },
        shine: {
          "0%": {
            "background-position": "0% 0%",
          },
          "50%": {
            "background-position": "100% 100%",
          },
          to: {
            "background-position": "0% 0%",
          },
        },
        "texture-float": {
          "0%, 100%": { transform: "translate(0%, 0%)" },
          "25%": { transform: "translate(1%, 1%)" },
          "50%": { transform: "translate(-1%, -1%)" },
          "75%": { transform: "translate(-1%, 1%)" },
        },
        "hue-rotate": {
          "0%": { filter: "hue-rotate(0deg)" },
          "100%": { filter: "hue-rotate(360deg)" },
        },
        rainbow: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        pulse: {
          "0%, 100%": { boxShadow: "0 0 0 0 var(--pulse-color)" },
          "50%": { boxShadow: "0 0 0 8px var(--pulse-color)" },
        },
        "ink-spread": {
          "0%": { 
            transform: "scale(0.95)",
            opacity: "0",
            filter: "blur(4px)",
          },
          "100%": { 
            transform: "scale(1)",
            opacity: "1",
            filter: "blur(0px)",
          },
        },
        "ink-dissolve": {
          "0%": { 
            transform: "scale(1)",
            opacity: "1",
            filter: "blur(0px)",
          },
          "100%": { 
            transform: "scale(0.95)",
            opacity: "0",
            filter: "blur(4px)",
          },
        },
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        "ink-texture": "radial-gradient(circle at center, var(--ink-color) 0%, transparent 70%)",
        "ink-splatter": "radial-gradient(ellipse at center, var(--ink-color) 0%, transparent 70%), radial-gradient(circle at 30% 50%, var(--ink-color) 0%, transparent 60%), radial-gradient(circle at 70% 50%, var(--ink-color) 0%, transparent 60%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
