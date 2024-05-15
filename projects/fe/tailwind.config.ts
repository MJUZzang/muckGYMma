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



                // 커스텀 칼라들
                fluorescent: {
                    DEFAULT: "#dfff32",
                    light: "#f4ff8c",
                    lighter: "#eaff5e",
                    lightest: "#f5ff9e",
                    dark: "#b4ff00",
                    darker: "#7fff00",
                    darkest: "#4dff00",
                },

                "app-blue": {
                    DEFAULT: "#4880ee",
                    1: "#5c8cff",
                    2: "#6f9eff",
                    3: "#82afff",
                    4: "#95bfff",
                    5: "#a8d0ff",
                    6: "#bbf0ff",
                    "darker-1": "#3c6fd6",
                },

                "app-bg": {
                    DEFAULT: "var(--app-bg)",
                    1: "var(--app-bg-1)",
                    2: "var(--app-bg-2)",
                    3: "var(--app-bg-3)",
                    4: "var(--app-bg-4)",
                    5: "var(--app-bg-5)",
                    6: "var(--app-bg-6)",
                },

                "app-font": {
                    DEFAULT: "var(--app-font)",
                    1: "var(--app-font-1)",
                    2: "var(--app-font-2)",
                    3: "var(--app-font-3)",
                    4: "var(--app-font-4)",
                    5: "var(--app-font-5)",
                    6: "var(--app-font-6)",
                },

                "app-inverted-font": {
                    DEFAULT: "var(--app-inverted-font)",
                    1: "var(--app-inverted-font-1)",
                    2: "var(--app-inverted-font-2)",
                    3: "var(--app-inverted-font-3)",
                },
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
                "spin-360": {
                    from: { rotate: "0deg" },
                    to: { rotate: "360deg" },
                },
                "show-task": {
                    from: {
                        opacity: "0",
                        filter: "blur(5px)",
                        transform: "translateX(100%)",
                    },
                    to: {
                        opacity: "1",
                        filter: "blur(0)",
                        transform: "translateX(0)",
                    },
                },
                "page-enter": {
                    from: { transform: "translateX(100%)", opacity: "0" },
                    to: { transform: "translateX(0)", opacity: "1" },
                },
                "custom-pulse": {
                    "0%": { opacity: ".3" },
                    "50%": { opacity: "1" },
                    "100%": { opacity: ".3" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "spin-180": "spin-180 0.6s ease-in-out",
                "spin-360-slow": "spin-360 3s ease-in-out infinite",
                "show-task": "show-task 0.6s ease-in-out forwards",
                "page-enter": "page-enter 0.6s ease-in-out forwards",
                "custom-pulse": "custom-pulse 5s ease-in-out infinite",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
