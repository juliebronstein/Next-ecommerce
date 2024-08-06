import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          
"primary": "#0081ff",
          
"secondary": "#00cbab",
          
"accent": "#004bff",
          
"neutral": "#161a15",
          
"base-100": "#f3ffff",
          
"info": "#60bdff",
          
"success": "#00db00",
          
"warning": "#a06000",
          
"error": "#ff4150",
          },
        },
      ],
    },
};
export default config;
