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
        flicker: "flicker 30s cubic-bezier(0.45, 0, 0.55, 1) infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "beam-drop": "beam-drop 7s cubic-bezier(0.4, 0.26, 0, 0.97) infinite",
        "beam-wave": "beam-wave 10s ease-in-out infinite",
        "beam-pulse": "beam-pulse 4s ease-in-out infinite",
        "beam-zigzag": "beam-zigzag 6s ease-in-out infinite",
        "beam-shimmer": "beam-shimmer 7s linear infinite",
        spin: "spin 10s linear infinite",
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
        pulse: "pulse 2s ease-in-out infinite",
        rainbow: "rainbow var(--speed, 2s) infinite linear",
        "texture-float": "texture-float 8s ease-in-out infinite",
        "hue-rotate": "hue-rotate 10s linear infinite",
        "ink-spread": "ink-spread 0.5s ease-out forwards",
        "ink-spread-fast": "ink-spread 0.3s ease-out forwards",
        "ink-dissolve": "ink-dissolve 1s ease-out forwards",
        twinkle: "twinkle 3s ease-in-out infinite",
        "dots-shift": "dots-shift 20s linear infinite",
        "lines-shift": "lines-shift 20s linear infinite",
        "squares-shift": "squares-shift 20s linear infinite",
        "crosshatch-shift": "crosshatch-shift 20s linear infinite",
        "diamonds-shift": "diamonds-shift 20s linear infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
        "shimmer-reverse": "shimmer 2s linear infinite reverse",
        starfall: "starfall 5s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        aurora: "aurora 15s ease-in-out infinite",
        "aurora-reverse": "aurora-reverse 20s ease-in-out infinite",
        "aurora-shift": "aurora-shift 15s ease-in-out infinite",
        "aurora-shift-alt": "aurora-shift-alt 20s ease-in-out infinite",
        "pulse-subtle": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.95", transform: "scale(0.98)" },
        },
        "continuous-fall":
          "continuous-fall var(--fall-duration, 10s) linear infinite",
        "nebula-shift": "nebula-shift 20s ease-in-out infinite",
        "nebula-shift-reverse": "nebula-shift-reverse 25s ease-in-out infinite",
        tile: "tile 8s infinite",
      },
      keyframes: {
        flicker: {
          "0%": {
            maskPosition: "50% 50%, 4px 50%",
            "-webkit-mask-position": "50% 50%, 4px 50%",
          },
          "25%": {
            maskPosition: "50% 50%, 2.75px 50%",
            "-webkit-mask-position": "50% 50%, 2.75px 50%",
          },
          "50%": {
            maskPosition: "50% 50%, 1.5px 50%",
            "-webkit-mask-position": "50% 50%, 1.5px 50%",
          },
          "75%": {
            maskPosition: "50% 50%, 0.75px 50%",
            "-webkit-mask-position": "50% 50%, 0.75px 50%",
          },
          "100%": {
            maskPosition: "50% 50%, 0 50%",
            "-webkit-mask-position": "50% 50%, 0 50%",
          },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "dots-shift": {
          "0%, 100%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(180deg)",
          },
        },
        "lines-shift": {
          "0%": {
            transform: "translateX(0) translateY(0)",
          },
          "50%": {
            transform: "translateX(50%) translateY(50%)",
          },
          "100%": {
            transform: "translateX(0) translateY(0)",
          },
        },
        "squares-shift": {
          "0%": {
            transform: "translateX(0) translateY(0) rotate(0deg)",
          },
          "50%": {
            transform: "translateX(25%) translateY(25%) rotate(180deg)",
          },
          "100%": {
            transform: "translateX(0) translateY(0) rotate(360deg)",
          },
        },
        "crosshatch-shift": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(45deg)",
          },
          "100%": {
            transform: "rotate(0deg)",
          },
        },
        "diamonds-shift": {
          "0%": {
            transform: "translateX(0) translateY(0) scale(1)",
          },
          "50%": {
            transform: "translateX(25%) translateY(25%) scale(0.8)",
          },
          "100%": {
            transform: "translateX(0) translateY(0) scale(1)",
          },
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
          },
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
            transform: "translate(-50%, -50%) rotate(0deg)",
          },
          to: {
            transform: "translate(-50%, -50%) rotate(360deg)",
          },
        },
        twinkle: {
          "0%, 100%": {
            opacity: "0.2",
            transform: "scale(0.8)",
          },
          "50%": {
            opacity: "1",
            transform: "scale(1.2)",
          },
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
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        shimmer: {
          "0%": { "background-position": "200% 50%" },
          "100%": { "background-position": "-200% 50%" },
        },
        sparkle: {
          "0%": { "background-position": "0% 50%, 100% 50%" },
          "100%": { "background-position": "100% 50%, 0% 50%" },
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
        starfall: {
          "0%": {
            transform: "translateY(-10vh) translateX(-15px) scale(0.2)",
            opacity: "0",
          },
          "5%": {
            opacity: "1",
            transform: "translateY(-5vh) translateX(-10px) scale(1)",
          },
          "95%": {
            opacity: "1",
            transform: "translateY(90vh) translateX(10px) scale(1)",
          },
          "100%": {
            transform: "translateY(110vh) translateX(15px) scale(0.2)",
            opacity: "0",
          },
        },
        aurora: {
          "0%, 100%": {
            transform: "translateY(0) scale(1.5, 1)",
          },
          "50%": {
            transform: "translateY(-15%) scale(1.2, 1.2)",
          },
        },
        "aurora-reverse": {
          "0%, 100%": {
            transform: "translateY(-15%) scale(1.2, 1.2)",
          },
          "50%": {
            transform: "translateY(0) scale(1.5, 1)",
          },
        },
        "aurora-shift": {
          "0%, 100%": {
            transform: "translate(0%, 0%) scale(1.2)",
            opacity: "0.4",
          },
          "50%": {
            transform: "translate(5%, 5%) scale(1.3)",
            opacity: "0.6",
          },
        },
        "aurora-shift-alt": {
          "0%, 100%": {
            transform: "translate(5%, 5%) scale(1.3)",
            opacity: "0.6",
          },
          "50%": {
            transform: "translate(0%, 0%) scale(1.2)",
            opacity: "0.4",
          },
        },
        rotate: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        "continuous-fall": {
          "0%": {
            transform: "translateY(-100%)",
          },
          "100%": {
            transform: "translateY(100vh)",
          },
        },
        "nebula-shift": {
          "0%, 100%": {
            transform: "translate(0%, 0%) scale(1.5)",
          },
          "50%": {
            transform: "translate(10%, 10%) scale(1.2)",
          },
        },
        "nebula-shift-reverse": {
          "0%, 100%": {
            transform: "translate(10%, 10%) scale(1.2)",
          },
          "50%": {
            transform: "translate(0%, 0%) scale(1.5)",
          },
        },
        "beam-drop": {
          "0%": {
            opacity: 0,
            "--offset": "-100%",
          },
          "5%": {
            opacity: 1,
          },
          "90%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0,
            "--offset": "100%",
          },
        },
        "beam-wave": {
          "0%": {
            "--wave-offset": "-20px",
          },
          "50%": {
            "--wave-offset": "20px",
          },
          "100%": {
            "--wave-offset": "-20px",
          },
        },
        "beam-pulse": {
          "0%": {
            opacity: 0.3,
            "--pulse-scale": "0.95",
          },
          "50%": {
            opacity: 1,
            "--pulse-scale": "1.05",
          },
          "100%": {
            opacity: 0.3,
            "--pulse-scale": "0.95",
          },
        },
        "beam-zigzag": {
          "0%": {
            "--zigzag-offset": "-20px",
          },
          "25%": {
            "--zigzag-offset": "20px",
          },
          "50%": {
            "--zigzag-offset": "-20px",
          },
          "75%": {
            "--zigzag-offset": "20px",
          },
          "100%": {
            "--zigzag-offset": "-20px",
          },
        },
        "beam-shimmer": {
          "0%": {
            opacity: 0.3,
          },
          "50%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0.3,
          },
        },
        spin: {
          from: {
            transform: "rotate(0deg)",
          },
          to: {
            transform: "rotate(360deg)",
          },
        },
        tile: {
          "0%, 12.5%, 100%": { opacity: 1 },
          "25%, 82.5%": { opacity: 0 },
        },
      },
      backgroundImage: {
        noise:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        "ink-texture":
          "radial-gradient(circle at center, var(--ink-color) 0%, transparent 70%)",
        "ink-splatter":
          "radial-gradient(ellipse at center, var(--ink-color) 0%, transparent 70%), radial-gradient(circle at 30% 50%, var(--ink-color) 0%, transparent 60%), radial-gradient(circle at 70% 50%, var(--ink-color) 0%, transparent 60%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
