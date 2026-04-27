import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vitePrerender from "vite-plugin-prerender";
import path from "path";
import chromium from "@sparticuz/chromium";

export default defineConfig(async ({ mode }) => {
  // Determine if we are running in a CI/Vercel environment
  const isVercel = process.env.VERCEL === "1";

  const puppeteerOptions = isVercel
    ? {
        args: [...chromium.args, "--no-sandbox", "--disable-setuid-sandbox"],
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
      }
    : {};

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
          launchOptions: puppeteerOptions,
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
