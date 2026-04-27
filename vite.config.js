import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vitePrerender from "vite-plugin-prerender";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePrerender({
      // The path to the folder where Vite outputs your build
      staticDir: path.join(__dirname, "dist"),
      // The list of routes you want to prerender
      routes: ["/", "/work", "/resume", "/articles", "/contact"],
      // Optional: Minify the resulting HTML
      minify: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        decodeEntities: true,
        keepClosingSlash: true,
        sortAttributes: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    port: 3000, // Set your desired port (default is 5173)
    open: true, // Automatically open the app in the browser
  },
});
