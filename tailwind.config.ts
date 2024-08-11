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
          primary: '#0081ff',  
          secondary: "#00cbab",  
          accent: "#004bff",  
          neutral: "#161a15",  
          "base-100": "#f3ffff",  
          info: "#60bdff",  
          success: "#00db00",  
          warning: "#a06000",  
          error: "#ff4150",  
        },  
      },  
    ],  
  },  
};  

export default config;



// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   plugins: [require("daisyui")],
//   daisyui: {
//     themes: [
//       {
//         lightTheme: {
//           primary: "#f4aa3a",
//           secondary: "#f4f4a1",
//           accent: "#1be885",
//           neutral: "#272136",
//           "base-100": "#ffffff",
//           info: "#778ad4",
//           success: "#23b893",
//           warning: "#f79926",
//           error: "#ea535a",
//           body: {
//             "background-color": "#e3e6e6",
//           },
//         },
//       },
//     ],
//   },
// };