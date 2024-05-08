import { transform } from "next/dist/build/swc";
import type { Config } from "tailwindcss";

const config = {
    darkMode: "selector",
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
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

                default: "#0B1416",
                fluorescent: "#dfff32",
                "fluorescent-light": "#f4ff8c",
                "fluorescent-lighter": "#eaff5e",
                "fluorescent-lightest": "#f5ff9e",
                "fluorescent-dark": "#b4ff00",
                "fluorescent-darker": "#7fff00",
                "fluorescent-darkest": "#4dff00",

                purple: "#7310f8",
                "purple-light": "#a44eff",
                "purple-lighter": "#c97aff",
                "purple-lightest": "#e2aaff",
                "purple-dark": "#4b00b7",
                "purple-darker": "#2e0080",
                "purple-darkest": "#1a0054",
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
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
                "spin-180": {
                    from: { rotate: "0deg" },
                    to: { rotate: "180deg" },
                },
                "show-task": {
                    from: {
                        opacity: "0",
                        filter: "blur(5px)",
                        transform: "translateX(-100%)",
                    },
                    to: {
                        opacity: "1",
                        filter: "blur(0)",
                        transform: "translateX(0)",
                    },
                },
                "page-enter": {
                    from: { transform: "translateX(100%)", opacity: "0"},
                    to: { transform: "translateX(0)", opacity: "1"},
                },
                "custom-pulse": {
                    "0%": { opacity: "0"},
                    "50%": { opacity: "1"},
                    "100%": { opacity: "0"},
                }
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "spin-180": "spin-180 0.6s ease-in-out",
                "show-task": "show-task 0.6s ease-in-out forwards",
                "page-enter": "page-enter 0.6s ease-in-out forwards",
                "custom-pulse": "custom-pulse 1s ease-in-out infinite",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
