import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vitePrerender from "vite-plugin-prerender";
import path from "path";
import chromium from "@sparticuz/chromium";

export default defineConfig(async ({ mode }) => {
  // Determine if we are running in a CI/Vercel environment
  const isVercel = process.env.VERCEL === "1";

  return {
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
        // Puppeteer settings for Serverless compatibility
        renderOptions: {
          launchOptions: isVercel
            ? {
                args: chromium.args,
                executablePath: await chromium.executablePath(),
                headless: chromium.headless,
              }
            : {}, // Uses default local chrome in development
        },
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 3000,
      open: true,
    },
  };
});
