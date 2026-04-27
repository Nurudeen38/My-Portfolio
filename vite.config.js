import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vitePrerender from "vite-plugin-prerender";
import JSDomRenderer from "@prerenderer/renderer-jsdom"; // Import this
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    vitePrerender({
      staticDir: path.join(__dirname, "dist"),
      routes: ["/", "/work", "/resume", "/articles", "/contact"],
      minify: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        decodeEntities: true,
        keepClosingSlash: true,
        sortAttributes: true,
      },
      // Use JSDOM instead of Puppeteer
      renderer: new JSDomRenderer(),
      rendererOptions: {
        renderAfterDocumentEvent: "render-event", // Optional: if you dispatch a custom event
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
