import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'fluorescent': '#dfff32',
                'fluorescent-light': '#f4ff8c',
                'fluorescent-lighter': '#eaff5e',
                'fluorescent-lightest': '#f5ff9e',
                'fluorescent-dark': '#b4ff00',
                'fluorescent-darker': '#7fff00',
                'fluorescent-darkest': '#4dff00',
                
                'purple': '#7310f8',
                'purple-light': '#a44eff',
                'purple-lighter': '#c97aff',
                'purple-lightest': '#e2aaff',
                'purple-dark': '#4b00b7',
                'purple-darker': '#2e0080',
                'purple-darkest': '#1a0054',
            },
        },
    },
    plugins: [],
    darkMode: "selector",
};
export default config;
